import { useEffect, useRef, useState } from "react";
import { WheelParticipant, SpinResult } from "@shared/schema";

interface WheelCanvasProps {
  participants: WheelParticipant[];
  onSpinComplete: (result: SpinResult) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", 
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#6366f1", "#f43f5e"
];

export default function WheelCanvas({ participants, onSpinComplete, isSpinning, onSpinStart }: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [animationId, setAnimationId] = useState<number | null>(null);

  // Calculate segments with weighted sizing
  const segments = participants.map((participant, index) => ({
    ...participant,
    color: COLORS[index % COLORS.length],
    weight: participant.occurrence
  }));

  const totalWeight = segments.reduce((sum, segment) => sum + segment.weight, 0);

  useEffect(() => {
    drawWheel();
  }, [participants, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (segments.length === 0) {
      // Draw empty wheel
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#374151";
      ctx.fill();
      ctx.strokeStyle = "#6b7280";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "18px Inter";
      ctx.textAlign = "center";
      ctx.fillText("Upload data to start", centerX, centerY);
      return;
    }

    let currentAngle = rotation;

    segments.forEach((segment) => {
      const segmentAngle = (segment.weight / totalWeight) * 2 * Math.PI;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      const textAngle = currentAngle + segmentAngle / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px Inter";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      const displayText = segment.weight > 1 ? `${segment.name} (${segment.weight}x)` : segment.name;
      ctx.fillText(displayText, 0, 0);
      ctx.restore();

      currentAngle += segmentAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#fbbf24";
    ctx.fill();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw star in center
    ctx.fillStyle = "#1f2937";
    ctx.font = "20px FontAwesome";
    ctx.textAlign = "center";
    ctx.fillText("★", centerX, centerY + 6);
  };

  const spinWheel = () => {
    if (isSpinning || segments.length === 0) return;

    onSpinStart();

    const spinDuration = 3000;
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const totalRotation = spins * 2 * Math.PI + Math.random() * 2 * Math.PI;

    let startTime: number;
    let startRotation = rotation;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function for realistic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        const id = requestAnimationFrame(animate);
        setAnimationId(id);
      } else {
        setAnimationId(null);
        
        // Calculate winner
        const normalizedRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const pointerAngle = (2 * Math.PI - normalizedRotation) % (2 * Math.PI);
        
        let currentAngle = 0;
        let winner = segments[0];

        for (const segment of segments) {
          const segmentAngle = (segment.weight / totalWeight) * 2 * Math.PI;
          if (pointerAngle >= currentAngle && pointerAngle < currentAngle + segmentAngle) {
            winner = segment;
            break;
          }
          currentAngle += segmentAngle;
        }

        onSpinComplete({
          winner: winner.name,
          angle: currentRotation
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative">
      {/* Wheel pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-primary shadow-lg" />
      </div>
      
      {/* Gradient border */}
      <div className="p-2 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600">
        <div className="rounded-full bg-background">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="rounded-full shadow-2xl"
            data-testid="wheel-canvas"
          />
        </div>
      </div>

      {/* Spin button */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
        <button
          onClick={spinWheel}
          disabled={isSpinning || segments.length === 0}
          className="bg-primary text-primary-foreground py-4 px-8 rounded-full text-xl font-bold shadow-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          data-testid="button-spin"
        >
          {isSpinning ? (
            <>
              <i className="fas fa-spinner animate-spin mr-3" />
              SPINNING...
            </>
          ) : (
            <>
              <i className="fas fa-play mr-3" />
              SPIN THE WHEEL!
            </>
          )}
        </button>
      </div>
    </div>
  );
}
