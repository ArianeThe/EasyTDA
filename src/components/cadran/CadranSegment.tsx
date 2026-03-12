import React from 'react';
import { Path } from 'react-native-svg';

interface CadranSegmentProps {
  id: string;
  startAngle: number;
  endAngle: number;
  color: string;
  size: number;
  strokeWidth: number;
  label?: string;
  value?: number;
}

// Helper function to convert angle to radians
const toRadians = (angle: number) => (angle * Math.PI) / 180;

// Helper function to describe SVG arc
export const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);

  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  // Determine if arc should be large (> 180 degrees)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
};

export const CadranSegment: React.FC<CadranSegmentProps> = ({
  id,
  startAngle,
  endAngle,
  color,
  size,
  strokeWidth,
  label,
  value,
}) => {
  const radius = size / 2 - strokeWidth - 10;
  const cx = size / 2;
  const cy = size / 2;

  const path = describeArc(cx, cy, radius, startAngle, endAngle);

  return (
    <Path
      key={id}
      d={path}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
    />
  );
};
