import { cn } from "@/components/utils";

export function SparklineChart({
  values,
  positive = true,
  className,
}: {
  values: number[];
  positive?: boolean;
  className?: string;
}) {
  const width = 180;
  const height = 54;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className={cn("h-14 w-full overflow-visible", className)} viewBox={`0 0 ${width} ${height}`} role="img">
      <polyline
        fill="none"
        points={points}
        stroke={positive ? "#1fbf75" : "#f26b6b"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <polyline
        fill="none"
        opacity="0.16"
        points={`${points} ${width},${height} 0,${height}`}
        stroke={positive ? "#1fbf75" : "#f26b6b"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </svg>
  );
}
