import React, { useMemo } from "react";
import * as d3 from "d3";
import { motion } from "motion/react";

interface RadarDataItem {
  axis: string;
  value: number;
  fullName: string;
  metrics: string;
}

interface WshRadarChartProps {
  hoveredIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}

export function WshRadarChart({ hoveredIndex, onHoverIndex }: WshRadarChartProps) {
  const radarData: RadarDataItem[] = useMemo(() => [
    { 
      axis: "Compliance", 
      value: 100, 
      fullName: "Workplace Safety & Health (WSH) Compliance", 
      metrics: "Certified WSH Coordinator" 
    },
    { 
      axis: "HIRA", 
      value: 100, 
      fullName: "Hazard Identification & Risk Assessment (HIRA)", 
      metrics: "bizSAFE2 Implementation Specialist" 
    },
    { 
      axis: "Field Audits", 
      value: 97, 
      fullName: "Safety Supervision & Field Audits", 
      metrics: "Active Elevated Site Inspector" 
    },
    { 
      axis: "Investigation", 
      value: 94, 
      fullName: "Incident Investigation & Root Cause Analysis", 
      metrics: "RCA Investigation Specialist" 
    },
    { 
      axis: "Training", 
      value: 98, 
      fullName: "Training & Toolbox Talk Delivery", 
      metrics: "150+ Technical Briefings Conducted" 
    },
  ], []);

  const width = 360;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;
  const r = 125; // max radius for value=100

  // Standard linear scale using d3
  const rScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([0, 100])
      .range([0, r]);
  }, [r]);

  const totalAxes = radarData.length;

  // Calculates coordinate for a given value, axis index and max length
  const getCoordinates = (value: number, index: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2; // -Math.PI / 2 points straight up
    const radius = rScale(value);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Grid ring intervals
  const gridLevels = [20, 40, 60, 80, 100];

  // Radar web coordinates for grid backgrounds
  const gridCoordinates = useMemo(() => {
    return gridLevels.map((level) => {
      const points = [];
      for (let i = 0; i < totalAxes; i++) {
        points.push(getCoordinates(level, i));
      }
      return points;
    });
  }, [totalAxes, rScale]);

  // Main data polygon coordinates
  const mainPolygonPath = useMemo(() => {
    const points = radarData.map((d, i) => {
      const coords = getCoordinates(d.value, i);
      return `${coords.x},${coords.y}`;
    }).join(" ");
    return points;
  }, [radarData, rScale]);

  // Coordinates for the interactive hovered aspect highlight line
  const hoveredLineCoords = useMemo(() => {
    if (hoveredIndex === null) return null;
    const coords = getCoordinates(radarData[hoveredIndex].value, hoveredIndex);
    return { cx, cy, x: coords.x, y: coords.y };
  }, [hoveredIndex, radarData]);

  return (
    <div id="wsh-radar-card" className="bg-black/30 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center relative w-full overflow-hidden blur-none backdrop-blur-md">
      {/* Background radial gradient to isolate typography */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(65,179,163,0.02)_0%,transparent_75%) pointer-events-none" />

      <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-4 self-start leading-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#41B3A3] animate-pulse" />
        <span>D3.JS COMPLIANCE RADAR SPECTRUM</span>
      </div>

      <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible select-none"
        >
          <defs>
            {/* Glow Filter */}
            <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Gradient Fill for Radar Mesh */}
            <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#41B3A3" stopOpacity={0.05} />
              <stop offset="70%" stopColor="#41B3A3" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#41B3A3" stopOpacity={0.3} />
            </radialGradient>
          </defs>

          {/* Grid Level Polygons & Ticks */}
          {gridCoordinates.map((points, lvIdx) => {
            const pointsStr = points.map(p => `${p.x},${p.y}`).join(" ");
            const percent = gridLevels[lvIdx];
            return (
              <g key={`grid-lvl-${percent}`}>
                {/* Outer concentric shapes */}
                <polygon
                  points={pointsStr}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1"
                />
                
                {/* Radial value ticker on the vertical axis (index 0) */}
                {percent > 20 && (
                  <text
                    x={cx + 4}
                    y={cy - rScale(percent) + 3}
                    className="fill-zinc-600 font-mono text-[8px] font-black pointer-events-none"
                  >
                    {percent}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Axis Spoke Lines */}
          {radarData.map((d, i) => {
            const outerCoords = getCoordinates(100, i);
            const isHovered = hoveredIndex === i;
            return (
              <line
                key={`axis-${i}`}
                x1={cx}
                y1={cy}
                x2={outerCoords.x}
                y2={outerCoords.y}
                stroke={isHovered ? "rgba(65, 179, 163, 0.25)" : "rgba(255, 255, 255, 0.04)"}
                strokeWidth={isHovered ? 1.5 : 1}
                className="transition-colors duration-200"
              />
            );
          })}

          {/* Core Radar Area Mesh */}
          <polygon
            points={mainPolygonPath}
            fill="url(#radar-gradient)"
            stroke="#41B3A3"
            strokeWidth="1.5"
            opacity="0.85"
            filter="url(#radar-glow)"
          />

          {/* Highlight Line for Active Hover */}
          {hoveredLineCoords && (
            <line
              x1={hoveredLineCoords.cx}
              y1={hoveredLineCoords.cy}
              x2={hoveredLineCoords.x}
              y2={hoveredLineCoords.y}
              stroke="#41B3A3"
              strokeWidth="2"
              strokeLinecap="round"
              className="pointer-events-none"
            />
          )}

          {/* Interactive Vertex Anchors (Circles on outer limit & values) */}
          {radarData.map((d, i) => {
            const coords = getCoordinates(d.value, i);
            const isHovered = hoveredIndex === i;
            
            return (
              <g 
                key={`nodes-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => onHoverIndex(i)}
                onMouseLeave={() => onHoverIndex(null)}
              >
                {/* Large transparent hover target area */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="16"
                  fill="transparent"
                />

                {/* Inner visible marker dot */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered ? 6 : 4}
                  className="transition-all duration-200"
                  fill={isHovered ? "#fff" : "#41B3A3"}
                  stroke="#000"
                  strokeWidth="1"
                />

                {/* Accent pulse when node active */}
                {isHovered && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="12"
                    fill="none"
                    stroke="#41B3A3"
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.3"
                  />
                )}
              </g>
            );
          })}

          {/* Dynamic Labels around view perimeter */}
          {radarData.map((d, i) => {
            const outerCoords = getCoordinates(100, i);
            const isHovered = hoveredIndex === i;

            // Offset adjustment calculations to prevent label trimming
            let dy = 0;
            let dx = 0;
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            if (Math.abs(cos) < 0.1) {
              // Verticals
              dy = sin > 0 ? 12 : -8;
            } else {
              // Outward positioning
              dx = cos > 0 ? 12 : -12;
              dy = sin > 0 ? 5 : -4;
            }

            return (
              <g 
                key={`axisLabel-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => onHoverIndex(i)}
                onMouseLeave={() => onHoverIndex(null)}
              >
                <text
                  x={outerCoords.x + dx}
                  y={outerCoords.y + dy}
                  textAnchor={Math.abs(cos) < 0.1 ? "middle" : cos > 0 ? "start" : "end"}
                  className={`font-mono transition-all duration-200 text-[9px] font-bold tracking-wider ${
                    isHovered ? "fill-[#41B3A3]" : "fill-zinc-400"
                  }`}
                >
                  {d.axis.toUpperCase()}
                </text>
                
                <text
                  x={outerCoords.x + dx}
                  y={outerCoords.y + dy + 10}
                  textAnchor={Math.abs(cos) < 0.1 ? "middle" : cos > 0 ? "start" : "end"}
                  className={`font-sans font-bold transition-all duration-200 text-[8px] tabular-nums ${
                    isHovered ? "fill-white" : "fill-zinc-600"
                  }`}
                >
                  {d.value}% MAX MATCH
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center label readout block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-[110px] h-[110px] rounded-full bg-black/60 border border-white/5 flex flex-col items-center justify-center text-center p-2 backdrop-blur-md">
            {hoveredIndex !== null ? (
              <>
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">ACTIVE SPEC</span>
                <span className="text-sm font-black text-white leading-none">{radarData[hoveredIndex].value}%</span>
                <span className="text-[6px] font-mono text-[#41B3A3] mt-1 line-clamp-2 uppercase leading-snug px-1 text-center">
                  {radarData[hoveredIndex].axis}
                </span>
              </>
            ) : (
              <>
                <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">OVERALL</span>
                <span className="text-xs font-black text-[#41B3A3]/80 leading-none">97.8%</span>
                <span className="text-[6px] font-mono text-zinc-400 mt-1 uppercase leading-snug">
                  MOM CRITERIA
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active Aspect Context Box below chart */}
      <div className="w-full mt-4 min-h-[50px] border-t border-white/5 pt-3.5 flex flex-col pointer-events-none">
        {hoveredIndex !== null ? (
          <div>
            <div className="text-[8px] font-mono text-zinc-400 font-bold uppercase tracking-wider mb-0.5 flex justify-between">
              <span>{radarData[hoveredIndex].fullName}</span>
              <span className="text-[#41B3A3] font-black">{radarData[hoveredIndex].value}%</span>
            </div>
            <div className="text-[10px] font-sans text-zinc-300 leading-relaxed max-w-sm">
              {radarData[hoveredIndex].metrics}
            </div>
          </div>
        ) : (
          <div className="text-center text-zinc-500 font-sans text-[10px] italic py-1">
            Hover individual radar nodes or axis parameters to inspect granular verification levels.
          </div>
        )}
      </div>
    </div>
  );
}
