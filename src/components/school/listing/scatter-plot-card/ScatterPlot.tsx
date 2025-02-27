"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DataPoint {
  sat: number;
  gpa: number;
  status: "accepted" | "rejected" | "considering";
}

interface UserPoint {
  sat: number;
  gpa: number;
}

interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

class ScatterPlot {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: DataPoint[];
  userPoint: UserPoint;
  tooltipEl: HTMLElement | null;
  padding: Padding;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get canvas context");
    this.ctx = context;
    this.data = [];
    this.userPoint = { sat: 1554, gpa: 4.0 };
    this.tooltipEl = document.querySelector(".tooltip");

    this.padding = {
      top: 30,
      right: 40,
      bottom: 50,
      left: 70,
    };

    this.resize();
    this.setupInteractions();
    this.generateData();

    // Call draw explicitly after generating data to ensure points appear initially
    this.draw();
  }

  resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * 2;
    this.canvas.height = rect.height * 2;
    this.ctx.scale(2, 2);
    this.draw();
  }

  generateData(): void {
    const statuses: Array<"accepted" | "rejected" | "considering"> = [
      "accepted",
      "rejected",
      "considering",
    ];
    const numPoints = 2000;

    for (let i = 0; i < numPoints; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      let sat: number, gpa: number;

      if (status === "accepted") {
        sat = 1200 + Math.random() * 400;
        gpa = 3.3 + Math.random() * 0.7;
      } else if (status === "rejected") {
        sat = 1000 + Math.random() * 500;
        gpa = 2.5 + Math.random() * 1.0;
      } else {
        sat = 1100 + Math.random() * 450;
        gpa = 2.8 + Math.random() * 0.9;
      }

      this.data.push({ sat, gpa, status });
    }
  }

  setupInteractions(): void {
    document.querySelectorAll(".checkbox-item input").forEach((checkbox) => {
      checkbox.addEventListener("change", () => this.draw());
    });

    this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * 2;
      const y = (e.clientY - rect.top) * 2;

      const hoveredPoint = this.findClosestPoint(x, y);

      if (hoveredPoint) {
        this.showTooltip(hoveredPoint, e.clientX, e.clientY);
      } else {
        this.hideTooltip();
      }
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.hideTooltip();
    });
  }

  findClosestPoint(x: number, y: number): DataPoint | null {
    const threshold = 10;
    let closest: DataPoint | null = null;
    let minDist = Infinity;

    this.data.forEach((point) => {
      const px = this.satToX(point.sat);
      const py = this.gpaToY(point.gpa);
      const dist = Math.sqrt((px - x) ** 2 + (py - y) ** 2);

      if (dist < threshold && dist < minDist) {
        minDist = dist;
        closest = point;
      }
    });

    return closest;
  }

  showTooltip(point: DataPoint, clientX: number, clientY: number): void {
    if (!this.tooltipEl) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set initial position with offset from cursor
    const offsetX = 15;
    const offsetY = 10;

    // Make tooltip visible first
    this.tooltipEl.style.display = "block";

    // Set initial positioning
    this.tooltipEl.style.left = `${clientX + offsetX}px`;
    this.tooltipEl.style.top = `${clientY + offsetY}px`;

    // Update tooltip content
    const satToAct = (sat: number): number =>
      Math.round((sat - 720) * (24 / 880) + 12);

    this.tooltipEl.innerHTML = `
      <div class="tooltip-row">
        <span class="tooltip-label">SAT:</span>
        <span class="tooltip-value">${Math.round(point.sat)}</span>
      </div>
      <div class="tooltip-row">
        <span class="tooltip-label">ACT:</span>
        <span class="tooltip-value">${satToAct(point.sat)}</span>
      </div>
      <div class="tooltip-row">
        <span class="tooltip-label">GPA:</span>
        <span class="tooltip-value">${point.gpa.toFixed(2)}</span>
      </div>
      <div class="tooltip-status">
        ${point.status.charAt(0).toUpperCase() + point.status.slice(1)}
      </div>
    `;

    // Now check boundaries and adjust position
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    // Check right edge
    if (clientX + offsetX + tooltipRect.width > viewportWidth) {
      this.tooltipEl.style.left = `${clientX - tooltipRect.width - 10}px`;
    }

    // Check bottom edge
    if (clientY + offsetY + tooltipRect.height > viewportHeight) {
      this.tooltipEl.style.top = `${clientY - tooltipRect.height - 10}px`;
    }
  }

  hideTooltip(): void {
    if (!this.tooltipEl) return;
    this.tooltipEl.style.display = "none";
  }

  satToX(sat: number): number {
    const width = this.canvas.width / 2;
    const plotWidth = width - this.padding.left - this.padding.right;
    return this.padding.left + ((sat - 720) / (1600 - 720)) * plotWidth;
  }

  gpaToY(gpa: number): number {
    const height = this.canvas.height / 2;
    const plotHeight = height - this.padding.top - this.padding.bottom;
    return this.padding.top + (1 - (gpa - 2.0) / 2.0) * plotHeight;
  }

  draw(): void {
    const width = this.canvas.width / 2;
    const height = this.canvas.height / 2;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw GPA axis and labels
    this.drawGPAAxis(width, height);

    // Draw SAT axis and labels
    this.drawSATAxis(width, height);

    // Draw data points
    this.drawDataPoints();

    // Draw user's point
    this.drawUserPoint();
  }

  drawGPAAxis(width: number, height: number): void {
    const gpaSteps = [2.0, 2.5, 3.0, 3.5, 4.0];

    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "right";

    gpaSteps.forEach((gpa) => {
      const y = this.gpaToY(gpa);

      // Draw GPA label
      this.ctx.fillStyle = "#4A4A4A";
      this.ctx.font = "600 13px sans-serif";
      this.ctx.fillText(gpa.toFixed(1), this.padding.left - 10, y);

      // Draw grid line
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#E5E5E5";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(this.padding.left, y);
      this.ctx.lineTo(width - this.padding.right, y);
      this.ctx.stroke();
    });
  }

  drawSATAxis(width: number, height: number): void {
    const satSteps = [720, 940, 1160, 1380, 1600];
    const actSteps = [12, 18, 24, 30, 36];

    satSteps.forEach((sat, index) => {
      const x = this.satToX(sat);

      // Draw vertical grid line
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#E5E5E5";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(x, this.padding.top);
      this.ctx.lineTo(x, height - this.padding.bottom);
      this.ctx.stroke();

      // Draw SAT label
      this.ctx.fillStyle = "#4A4A4A";
      this.ctx.font = "600 13px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(sat.toString(), x, height - this.padding.bottom + 20);

      // Draw ACT label
      this.ctx.fillStyle = "#666666";
      this.ctx.font = "500 12px sans-serif";
      this.ctx.fillText(
        actSteps[index].toString(),
        x,
        height - this.padding.bottom + 35
      );
    });
  }

  drawDataPoints(): void {
    const checkboxElements = document.querySelectorAll<HTMLInputElement>(
      ".checkbox-item input"
    );
    const activeFilters = Array.from(checkboxElements)
      .filter((cb) => cb.checked)
      .map((cb) => cb.dataset.type);

    this.ctx.globalAlpha = 0.6;
    this.data.forEach((point) => {
      if (activeFilters.includes(point.status)) {
        const x = this.satToX(point.sat);
        const y = this.gpaToY(point.gpa);

        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);

        switch (point.status) {
          case "accepted":
            this.ctx.fillStyle = "#0B6333";
            break;
          case "rejected":
            this.ctx.fillStyle = "#FF4B4B";
            break;
          case "considering":
            this.ctx.fillStyle = "#1D77BD";
            break;
        }

        this.ctx.fill();
      }
    });
    this.ctx.globalAlpha = 1.0;
  }

  drawUserPoint(): void {
    const userX = this.satToX(this.userPoint.sat);
    const userY = this.gpaToY(this.userPoint.gpa);

    // Draw outer glow
    const gradient = this.ctx.createRadialGradient(
      userX,
      userY,
      4,
      userX,
      userY,
      12
    );
    gradient.addColorStop(0, "rgba(0, 223, 139, 0.3)");
    gradient.addColorStop(1, "rgba(0, 223, 139, 0)");

    this.ctx.beginPath();
    this.ctx.arc(userX, userY, 12, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Draw point border
    this.ctx.beginPath();
    this.ctx.arc(userX, userY, 6, 0, Math.PI * 2);
    this.ctx.strokeStyle = "#00DF8B";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw point center
    this.ctx.beginPath();
    this.ctx.arc(userX, userY, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = "#00DF8B";
    this.ctx.fill();

    // Add "You" label
    this.ctx.fillStyle = "#00DF8B";
    this.ctx.font = "bold 12px sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText("You", userX + 10, userY - 5);
  }
}

export default function AdmissionsScatterPlot({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plot, setPlot] = useState<ScatterPlot | null>(null);

  useEffect(() => {
    if (canvasRef.current && !plot) {
      const newPlot = new ScatterPlot(canvasRef.current);
      setPlot(newPlot);

      // Add window resize handler with debounce
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          newPlot.resize();
        }, 250);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [plot]);

  const handleMajorChange = () => {
    if (plot) {
      plot.draw();
    }
  };

  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");

    // Add CSS to style element
    style.textContent = `
        .checkbox-item input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border: 1px solid #DFDDDB;
        border-radius: 3px;
        outline: none;
        background-color: white;
        cursor: pointer;
        position: relative;
        }

        .checkbox-item input[type="checkbox"]:checked {
        -webkit-appearance: checkbox;
        -moz-appearance: checkbox;
        appearance: checkbox;
        }

        .accepted input[type="checkbox"]:checked {
        background-color: #0B6333;
        border-color: #0B6333;
        accent-color: #0B6333;
        }

        .rejected input[type="checkbox"]:checked {
        background-color: #FF4B4B;
        border-color: #FF4B4B;
        accent-color: #FF4B4B;
        }

        .considering input[type="checkbox"]:checked {
        background-color: #1D77BD;
        border-color: #1D77BD;
        accent-color: #1D77BD;
        }
        
        .tooltip-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        
        .tooltip-label {
          margin-right: 8px;
          color: #666;
        }
        
        .tooltip-value {
          font-weight: 600;
          color: #333;
        }
        
        .tooltip-status {
          margin-top: 6px;
          font-weight: 600;
          text-align: center;
        }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);

    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      id={id}
      className="flex justify-center items-center min-h-screen my-cardMargin font-sans"
    >
      <div className="w-full bg-cardBackground rounded-cardBorderRadius shadow-cardShadow p-cardPadding">
        <div className="mb-6">
          <h1 className="text-[#016853] text-2xl font-semibold mb-5">
            Will You Get Into Lincoln University?
          </h1>
        </div>

        <div className="flex gap-8 mb-5">
          <div className="flex-1">
            <div className="flex flex-col gap-3 mb-5">
              <label className="checkbox-item flex items-center gap-2 cursor-pointer accepted">
                <input
                  type="checkbox"
                  defaultChecked
                  data-type="accepted"
                  className="w-[18px] h-[18px] cursor-pointer accent-[#0B6333]"
                />
                <span className="text-[#0B6333] font-medium">Accepted</span>
              </label>
              <label className="checkbox-item flex items-center gap-2 cursor-pointer rejected">
                <input
                  type="checkbox"
                  defaultChecked
                  data-type="rejected"
                  className="w-[18px] h-[18px] cursor-pointer accent-[#FF4B4B]"
                />
                <span className="text-[#FF4B4B] font-medium">Rejected</span>
              </label>
              <label className="checkbox-item flex items-center gap-2 cursor-pointer considering">
                <input
                  type="checkbox"
                  defaultChecked
                  data-type="considering"
                  className="w-[18px] h-[18px] cursor-pointer accent-[#1D77BD]"
                />
                <span className="text-[#1D77BD] font-medium">Considering</span>
              </label>
            </div>

            <select
              className="major-select w-[200px] p-2 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-white"
              onChange={handleMajorChange}
            >
              <option value="all">All Majors</option>
              <option value="engineering">Engineering</option>
              <option value="arts">Arts & Sciences</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div className="stats-box bg-[#F8F9FA] rounded-lg p-5">
            <div className="max-w-[250px]">
              <h3 className="text-[#464646] text-base mb-4 leading-[1.4] font-semibold">
                Adjust the filters to see how you rank.
              </h3>
              <div className="ranking-text text-sm text-[#0B6333] font-medium mb-4 text-center p-3 bg-[rgba(11,99,51,0.1)] rounded-md">
                You rank higher than 75% of accepted students shown.
              </div>
              <div className="stat-item flex justify-between mb-3 text-sm text-[#5F5F5F] py-1">
                <span>Your SAT:</span>
                <span className="stat-value font-semibold text-[#089E68]">
                  1554
                </span>
              </div>
              <div className="stat-item flex justify-between mb-3 text-sm text-[#5F5F5F] py-1">
                <span>Your ACT:</span>
                <span className="stat-value font-semibold text-[#089E68]">
                  33
                </span>
              </div>
              <div className="stat-item flex justify-between mb-3 text-sm text-[#5F5F5F] py-1">
                <span>Your GPA:</span>
                <span className="stat-value font-semibold text-[#089E68]">
                  4.0
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="plot-area relative w-full h-[450px] mt-5 border border-[#DFDDDB] rounded-lg p-[20px_40px_40px_60px] bg-white box-border">
          <canvas ref={canvasRef} className="w-full h-full bg-white"></canvas>
          <div
            className="tooltip absolute bg-white border border-[#DFDDDB] rounded-md p-[10px_14px] text-xs pointer-events-none shadow-sm"
            style={{ display: "none" }}
          >
            {/* Tooltip content will be generated dynamically */}
          </div>
          <div className="y-axis-title absolute top-1/2 left-0 transform -rotate-90 translate-x-1/2 origin-left font-semibold text-[#4A4A4A] whitespace-nowrap text-sm">
            High School GPA
          </div>
          <div className="x-axis-title absolute bottom-3 left-1/2 transform -translate-x-1/2 font-semibold text-[#4A4A4A] text-sm">
            SAT Score
          </div>
        </div>

        <div className="data-source text-right text-[#5F5F5F] text-xs mt-5 pt-3 border-t border-[#DFDDDB]">
          Data provided by 16,970 Niche users
          <Image
            height={14}
            width={14}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235F5F5F'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/%3E%3C/svg%3E"
            alt="info"
            className="w-3.5 h-3.5 inline-block align-middle ml-1"
          />
        </div>
      </div>
    </div>
  );
}
