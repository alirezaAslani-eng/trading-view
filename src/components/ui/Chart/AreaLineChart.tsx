"use client";

import { useId, useMemo } from "react";
import { Box } from "@mui/material";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { BoxProps } from "@mui/material";
import blue from "@/packages/mui/theme/shades/blue";
import BulletText from "@/components/ui/BulletItem/BulletText";

type ChartPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type AreaLineChartProps = ReplaceSxWithSxOnlyObject<BoxProps> & {
  data: number[];
  min?: number;
  max?: number;
  yTicks?: number[];
  height?: number;
  lineColor?: string;
};

const defaultPadding: ChartPadding = {
  top: 16,
  right: 16,
  bottom: 8,
  left: 36,
};

function createSmoothPath(
  data: number[],
  width: number,
  height: number,
  padding: ChartPadding,
  min: number,
  max: number,
) {
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x =
      padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y =
      padding.top + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y };
  });

  if (points.length < 2) return { linePath: "", areaPath: "" };

  let linePath = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const bottomY = padding.top + chartHeight;
  const areaPath = `${linePath} L ${lastPoint.x} ${bottomY} L ${firstPoint.x} ${bottomY} Z`;

  return { linePath, areaPath, points, chartHeight, chartWidth };
}

function AreaLineChart({
  data,
  min = 0,
  max = 50,
  yTicks = [0, 10, 20, 30, 40, 50],
  height = 280,
  lineColor = blue[500],
  sx,
  ...boxProps
}: AreaLineChartProps) {
  const gradientId = useId();
  const width = 640;
  const padding = defaultPadding;
  const range = max - min || 1;

  const paths = useMemo(
    () => createSmoothPath(data, width, height, padding, min, max),
    [data, height, max, min],
  );

  return (
    <Box
      {...boxProps}
      sx={{
        width: "100%",
        height,
        position: "relative",
        ...sx,
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        sx={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y =
            padding.top +
            (height - padding.top - padding.bottom) -
            ((tick - min) / range) * (height - padding.top - padding.bottom);

          return (
            <line
              key={tick}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.12}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {paths.areaPath && (
          <path d={paths.areaPath} fill={`url(#${gradientId})`} />
        )}

        {paths.linePath && (
          <path
            d={paths.linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </Box>

      {yTicks.map((tick) => {
        const y =
          padding.top +
          (height - padding.top - padding.bottom) -
          ((tick - min) / range) * (height - padding.top - padding.bottom);

        return (
          <BulletText
            key={`label-${tick}`}
            variant="caption2"
            sx={{
              position: "absolute",
              top: `${(y / height) * 100}%`,
              left: 0,
              transform: "translateY(-50%)",
              color: "text.caption",
              width: `${(padding.left / width) * 100}%`,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {tick.toLocaleString("fa-IR")}
          </BulletText>
        );
      })}
    </Box>
  );
}

export default AreaLineChart;
