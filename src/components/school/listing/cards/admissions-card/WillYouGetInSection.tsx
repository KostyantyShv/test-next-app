import { useEffect, useRef, useState } from "react";

interface DataPoint {
  sat: number;
  gpa: number;
  status: string;
}

export default function WillYouGetInSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStatuses, setActiveStatuses] = useState({
    accepted: true,
    rejected: true,
    considering: true,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data: DataPoint[] = [];
    const userPoint = { sat: 1400, gpa: 3.8 };
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      draw();
    };

    const generateData = () => {
      const statuses = ["accepted", "rejected", "considering"];
      for (let i = 0; i < 300; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        let sat, gpa;
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
        data.push({ sat, gpa, status });
      }
      data.push({ sat: 1400, gpa: 3.8, status: "user" });
    };

    const satToX = (sat: number) => {
      const width = canvas.width / 2;
      const plotWidth = width - padding.left - padding.right;
      return padding.left + ((sat - 800) / 800) * plotWidth;
    };

    const gpaToY = (gpa: number) => {
      const height = canvas.height / 2;
      const plotHeight = height - padding.top - padding.bottom;
      return padding.top + (1 - (gpa - 2.5) / 1.5) * plotHeight;
    };

    const drawAxes = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;

      ctx.beginPath();
      ctx.strokeStyle = "#E5E5E5";
      ctx.moveTo(padding.left, height - padding.bottom);
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.moveTo(padding.left, padding.top);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.stroke();

      const satSteps = [800, 1200, 1600];
      satSteps.forEach((sat) => {
        const x = satToX(sat);
        ctx.fillStyle = "#4A4A4A";
        ctx.font = "10px Inter";
        ctx.textAlign = "center";
        ctx.fillText(sat.toString(), x, height - padding.bottom + 12);
      });

      const gpaSteps = [2.5, 3.0, 3.5, 4.0];
      gpaSteps.forEach((gpa) => {
        const y = gpaToY(gpa);
        ctx.fillStyle = "#4A4A4A";
        ctx.font = "10px Inter";
        ctx.textAlign = "right";
        ctx.fillText(gpa.toFixed(1).toString(), padding.left - 5, y + 3);
      });

      ctx.fillStyle = "#4A4A4A";
      ctx.font = "bold 10px Inter";
      ctx.textAlign = "center";
      ctx.fillText("SAT Score", width / 2, height - 5);

      ctx.save();
      ctx.translate(10, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText("High School GPA", 0, 0);
      ctx.restore();
    };

    const drawDataPoints = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;

      ctx.globalAlpha = 0.7;
      data.forEach((point) => {
        if (
          point.status === "user" ||
          activeStatuses[point.status as keyof typeof activeStatuses]
        ) {
          const x = satToX(point.sat);
          const y = gpaToY(point.gpa);

          if (point.status === "user") {
            const gradient = ctx.createRadialGradient(x, y, 4, x, y, 10);
            gradient.addColorStop(0, "rgba(0, 223, 139, 0.6)");
            gradient.addColorStop(1, "rgba(0, 223, 139, 0)");
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#00DF8B";
            ctx.fill();
            ctx.fillStyle = "#00DF8B";
            ctx.font = "bold 10px Inter";
            ctx.textAlign = "left";
            ctx.fillText("You", x + 8, y - 5);
          } else {
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle =
              point.status === "accepted"
                ? "#0B6333"
                : point.status === "rejected"
                ? "#FF4B4B"
                : "#1D77BD";
            ctx.fill();
          }
        }
      });
      ctx.globalAlpha = 1.0;
    };

    const draw = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      ctx.clearRect(0, 0, width, height);
      drawAxes();
      drawDataPoints();
    };

    generateData();
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [activeStatuses]);

  return (
    <div className="mb-6 pb-6 border-b border-black/10 last:border-b-0 last:mb-0 last:pb-0 px-5 md:mb-10 md:pb-8 md:px-0">
      <h2 className="text-[#016853] text-lg font-semibold mt-5 mb-4 md:text-2xl md:mt-0 md:mb-6">
        Will You Get In?
      </h2>
      <div className="mb-4 md:mb-6 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:gap-8">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer text-[13px]">
            <input
              type="checkbox"
              checked={activeStatuses.accepted}
              onChange={() =>
                setActiveStatuses((prev) => ({
                  ...prev,
                  accepted: !prev.accepted,
                }))
              }
              className="w-4 h-4 cursor-pointer accent-[#0B6333] md:w-[18px] md:h-[18px]"
            />
            <span className="text-[#0B6333]">Accepted</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[13px]">
            <input
              type="checkbox"
              checked={activeStatuses.rejected}
              onChange={() =>
                setActiveStatuses((prev) => ({
                  ...prev,
                  rejected: !prev.rejected,
                }))
              }
              className="w-4 h-4 cursor-pointer accent-[#FF4B4B] md:w-[18px] md:h-[18px]"
            />
            <span className="text-[#FF4B4B]">Rejected</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[13px]">
            <input
              type="checkbox"
              checked={activeStatuses.considering}
              onChange={() =>
                setActiveStatuses((prev) => ({
                  ...prev,
                  considering: !prev.considering,
                }))
              }
              className="w-4 h-4 cursor-pointer accent-[#1D77BD] md:w-[18px] md:h-[18px]"
            />
            <span className="text-[#1D77BD]">Considering</span>
          </label>
        </div>
        <select className="w-full p-2.5 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-white mb-4 md:mb-0">
          <option>All Majors</option>
          <option>Engineering</option>
          <option>Business</option>
          <option>Arts & Sciences</option>
        </select>
      </div>
      <div className="relative w-full h-[220px] border border-[#DFDDDB] rounded-lg p-3.5 bg-white mb-2 md:h-[450px] md:p-5 md:mb-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="text-right text-[#5F5F5F] text-[11px] md:text-xs">
        Data provided by 17,865 Niche users
      </div>
    </div>
  );
}
