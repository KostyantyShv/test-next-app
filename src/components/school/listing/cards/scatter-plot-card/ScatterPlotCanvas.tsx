"use client";

import { useEffect, useRef } from "react";
import { DataPoint, UserPoint, Padding, generateMockData } from "./mock";

class ScatterPlot {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: DataPoint[];
  userPoint: UserPoint;
  tooltipEl: HTMLElement | null;
  padding: Padding;
  pixelRatio: number;
  isMobile: boolean;
  activeFilters: string[];

  constructor(
    canvas: HTMLCanvasElement,
    userPoint: UserPoint,
    activeFilters: string[]
  ) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get canvas context");
    this.ctx = context;
    this.data = generateMockData();
    this.userPoint = userPoint;
    this.activeFilters = activeFilters;
    this.tooltipEl = document.querySelector(".tooltip");
    this.pixelRatio = window.devicePixelRatio || 1;
    this.isMobile = window.innerWidth <= 768;
    this.padding = this.isMobile
      ? { top: 16, right: 16, bottom: 30, left: 30 }
      : { top: 24, right: 30, bottom: 40, left: 46 };

    this.setupCanvas();
    this.setupInteractions();
    this.draw();
  }

  // Add method to update filters and redraw
  updateFilters = (newFilters: string[]) => {
    this.activeFilters = newFilters;
    this.draw();
  };

  setupCanvas = (): void => {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const width = rect.width - (this.padding.left + this.padding.right);
    const height = rect.height - (this.padding.top + this.padding.bottom);

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = Math.floor(width * this.pixelRatio);
    this.canvas.height = Math.floor(height * this.pixelRatio);
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.translate(this.padding.left, this.padding.top);
  };

  resize = (): void => {
    this.isMobile = window.innerWidth <= 768;
    this.padding = this.isMobile
      ? { top: 16, right: 16, bottom: 30, left: 30 }
      : { top: 24, right: 30, bottom: 40, left: 46 };
    this.setupCanvas();
    this.draw();
  };

  setupInteractions = (): void => {
    this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
    this.canvas.addEventListener("mouseleave", () => this.hideTooltip());
    this.canvas.addEventListener("touchstart", this.handleTouch.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("touchmove", this.handleTouch.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("touchend", () => this.hideTooltip());
    this.canvas.style.touchAction = "none";
  };

  handleMouse = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * this.pixelRatio - this.padding.left;
    const y = (e.clientY - rect.top) * this.pixelRatio - this.padding.top;
    const hoveredPoint = this.findClosestPoint(
      x / this.pixelRatio,
      y / this.pixelRatio
    );
    if (hoveredPoint) this.showTooltip(hoveredPoint, e.clientX, e.clientY);
    else this.hideTooltip();
  };

  handleTouch = (e: TouchEvent): void => {
    e.preventDefault();
    if (e.touches.length !== 1) {
      this.hideTooltip();
      return;
    }
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = (touch.clientX - rect.left) * this.pixelRatio - this.padding.left;
    const y = (touch.clientY - rect.top) * this.pixelRatio - this.padding.top;
    const touchedPoint = this.findClosestPoint(
      x / this.pixelRatio,
      y / this.pixelRatio
    );
    if (touchedPoint) {
      let posX = touch.clientX;
      let posY = touch.clientY - 70;
      if (posX > window.innerWidth - 150) posX = window.innerWidth - 150;
      if (posY < 70) posY = touch.clientY + 30;
      this.showTooltip(touchedPoint, posX, posY);
    } else {
      this.hideTooltip();
    }
  };

  findClosestPoint = (x: number, y: number): DataPoint | null => {
    const threshold = this.isMobile ? 10 : 15;
    let closest: DataPoint | null = null;
    let minDist = Infinity;

    const plotWidth =
      this.canvas.width / this.pixelRatio -
      this.padding.left -
      this.padding.right;
    const plotHeight =
      this.canvas.height / this.pixelRatio -
      this.padding.top -
      this.padding.bottom;

    if (x < 0 || x > plotWidth || y < 0 || y > plotHeight) return null;

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
  };

  showTooltip = (point: DataPoint, clientX: number, clientY: number): void => {
    if (!this.tooltipEl) return;
    this.tooltipEl.style.display = "block";
    const windowWidth = window.innerWidth;
    let leftPos = clientX + 10;
    if (leftPos + 150 > windowWidth) leftPos = Math.max(10, clientX - 160);
    this.tooltipEl.style.left = `${leftPos}px`;
    this.tooltipEl.style.top = `${clientY + 10}px`;
    const satToAct = (sat: number): number =>
      Math.round((sat - 720) * (24 / 880) + 12);
    this.tooltipEl.innerHTML = `
      <div class="flex justify-between gap-3 mb-1">
        <span class="text-[#5F5F5F]">SAT:</span>
        <span class="font-semibold text-[#464646]">${Math.round(
          point.sat
        )}</span>
      </div>
      <div class="flex justify-between gap-3 mb-1">
        <span class="text-[#5F5F5F]">ACT:</span>
        <span class="font-semibold text-[#464646]">${satToAct(point.sat)}</span>
      </div>
      <div class="flex justify-between gap-3 mb-1">
        <span class="text-[#5F5F5F]">GPA:</span>
        <span class="font-semibold text-[#464646]">${point.gpa.toFixed(
          2
        )}</span>
      </div>
      <div class="mt-1.5 pt-1.5 border-t border-[#DFDDDB] text-center font-semibold text-[#464646]">
        ${point.status.charAt(0).toUpperCase() + point.status.slice(1)}
      </div>
    `;
  };

  hideTooltip = (): void => {
    if (!this.tooltipEl) return;
    this.tooltipEl.style.display = "none";
  };

  satToX = (sat: number): number => {
    const width =
      this.canvas.width / this.pixelRatio -
      this.padding.left -
      this.padding.right;
    return ((sat - 720) / (1600 - 720)) * width;
  };

  gpaToY = (gpa: number): number => {
    const height =
      this.canvas.height / this.pixelRatio -
      this.padding.top -
      this.padding.bottom;
    return (1 - (gpa - 2.0) / 2.0) * height;
  };

  draw = (): void => {
    const width =
      this.canvas.width / this.pixelRatio -
      this.padding.left -
      this.padding.right;
    const height =
      this.canvas.height / this.pixelRatio -
      this.padding.top -
      this.padding.bottom;
    this.ctx.clearRect(
      -this.padding.left,
      -this.padding.top,
      this.canvas.width,
      this.canvas.height
    );
    this.drawGPAAxis(width);
    this.drawSATAxis(width, height);
    this.drawDataPoints();
    this.drawUserPoint();
  };

  drawGPAAxis = (width: number): void => {
    const gpaSteps = [2.0, 2.5, 3.0, 3.5, 4.0];
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "right";
    gpaSteps.forEach((gpa) => {
      const y = this.gpaToY(gpa);
      this.ctx.fillStyle = "#4A4A4A";
      this.ctx.font = this.isMobile
        ? "600 10px sans-serif"
        : "600 11px sans-serif";
      this.ctx.fillText(gpa.toFixed(1), -8, y);
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#E5E5E5";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    });
  };

  drawSATAxis = (width: number, height: number): void => {
    const satSteps = this.isMobile
      ? [720, 1050, 1380, 1600]
      : [720, 940, 1160, 1380, 1600];
    const actSteps = this.isMobile ? [12, 22, 30, 36] : [12, 18, 24, 30, 36];

    satSteps.forEach((sat, index) => {
      const x = this.satToX(sat);
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#E5E5E5";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
      this.ctx.fillStyle = "#4A4A4A";
      this.ctx.font = this.isMobile
        ? "600 9px sans-serif"
        : "600 10px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(sat.toString(), x, height + (this.isMobile ? 12 : 14));
      this.ctx.fillStyle = "#666666";
      this.ctx.font = this.isMobile
        ? "500 8px sans-serif"
        : "500 9px sans-serif";
      this.ctx.fillText(
        actSteps[index].toString(),
        x,
        height + (this.isMobile ? 22 : 26)
      );
    });
  };

  drawDataPoints = (): void => {
    if (this.activeFilters.length === 0) return;

    this.ctx.globalAlpha = 0.6;
    this.data.forEach((point) => {
      if (this.activeFilters.includes(point.status)) {
        const x = this.satToX(point.sat);
        const y = this.gpaToY(point.gpa);
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.isMobile ? 2 : 2.5, 0, Math.PI * 2);
        this.ctx.fillStyle =
          point.status === "accepted"
            ? "#0B6333"
            : point.status === "rejected"
            ? "#FF4B4B"
            : "#1D77BD";
        this.ctx.fill();
      }
    });
    this.ctx.globalAlpha = 1.0;
  };

  drawUserPoint = (): void => {
    const userX = this.satToX(this.userPoint.sat);
    const userY = this.gpaToY(this.userPoint.gpa);
    const gradient = this.ctx.createRadialGradient(
      userX,
      userY,
      this.isMobile ? 3 : 4,
      userX,
      userY,
      this.isMobile ? 10 : 12
    );
    gradient.addColorStop(0, "rgba(0, 223, 139, 0.3)");
    gradient.addColorStop(1, "rgba(0, 223, 139, 0)");
    this.ctx.beginPath();
    this.ctx.arc(userX, userY, this.isMobile ? 10 : 12, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(userX, userY, this.isMobile ? 5 : 6, 0, Math.PI * 2);
    this.ctx.strokeStyle = "#00DF8B";
    this.ctx.lineWidth = this.isMobile ? 1.5 : 2;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(userX, userY, this.isMobile ? 3 : 4, 0, Math.PI * 2);
    this.ctx.fillStyle = "#00DF8B";
    this.ctx.fill();
    this.ctx.fillStyle = "#00DF8B";
    this.ctx.font = this.isMobile
      ? "bold 10px sans-serif"
      : "bold 11px sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      "You",
      userX + (this.isMobile ? 6 : 8),
      userY - (this.isMobile ? 4 : 5)
    );
  };
}

export default function ScatterPlotCanvas({
  userPoint,
  activeFilters,
}: {
  userPoint: UserPoint;
  activeFilters: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plotRef = useRef<ScatterPlot | null>(null);

  // Initialize the ScatterPlot instance
  useEffect(() => {
    if (canvasRef.current && !plotRef.current) {
      plotRef.current = new ScatterPlot(
        canvasRef.current,
        userPoint,
        activeFilters
      );
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => plotRef.current?.resize(), 250);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [userPoint]); // Only re-run if userPoint changes

  // Update filters when activeFilters changes
  useEffect(() => {
    if (plotRef.current) {
      plotRef.current.updateFilters(activeFilters);
    }
  }, [activeFilters]); // Re-run when activeFilters changes

  return (
    <div className="relative w-full h-[250px] md:h-[450px] mt-3 md:mt-5 border border-[#DFDDDB] rounded-lg bg-white overflow-hidden">
      <div className="w-full h-full p-[16px_16px_30px_30px] md:p-[20px_40px_40px_60px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-white block mx-auto"
        />
      </div>
      <div className="tooltip absolute bg-white border border-[#DFDDDB] rounded-md p-[8px_12px] md:p-[10px_14px] text-xs pointer-events-none shadow-sm z-10 hidden" />
      <div className="absolute top-1/2 left-0 -rotate-90 translate-x-[10px] origin-left font-semibold text-[#4A4A4A] whitespace-nowrap text-[10px] md:text-sm">
        High School GPA
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-semibold text-[#4A4A4A] text-[10px] md:text-sm mb-1">
        SAT Score
      </div>
    </div>
  );
}
