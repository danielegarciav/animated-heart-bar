// This is a slightly modified, type-annotated version of the original `describeArc` found at:
// https://codepen.io/mtvv/pen/JjdoPRr

// This was used as the base for `svg-circle-sector.ts`

export function describeArc(
  x: number,
  y: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
) {
  const radius = innerRadius;
  const spread = outerRadius - innerRadius;
  const innerStart = polarToCartesian(x, y, radius, endAngle);
  const innerEnd = polarToCartesian(x, y, radius, startAngle);
  const outerStart = polarToCartesian(x, y, radius + spread, endAngle);
  const outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M',
    outerStart.x,
    outerStart.y,

    'A',
    radius + spread,
    radius + spread,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,

    'L',
    innerEnd.x,
    innerEnd.y,

    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    innerStart.x,
    innerStart.y,

    'L',
    outerStart.x,
    outerStart.y,

    'Z',
  ].join(' ');

  return d;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
