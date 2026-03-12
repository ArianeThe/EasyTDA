import React from 'react';
import { Circle } from 'react-native-svg';

interface CadranProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color?: string;
  innerRadius?: number;
}

export const CadranProgress: React.FC<CadranProgressProps> = ({
  percentage,
  size,
  strokeWidth,
  color = '#45B7D1',
  innerRadius = 80,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const radius = innerRadius;

  // Calculate stroke-dasharray and stroke-dashoffset for progress
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, percentage / 100)));

  return (
    <Circle
      cx={cx}
      cy={cy}
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="round"
      opacity={0.3}
    />
  );
};
