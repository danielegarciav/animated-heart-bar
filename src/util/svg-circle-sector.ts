// Based on https://codepen.io/mtvv/pen/JjdoPRr

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

/**
 * Returns the SVG path data for a circle sector, where the angle goes in counterclockwise rotation.
 */
export function describeSvgCircleSector(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const angleStart = polarToCartesian(centerX, centerY, radius, startAngle);
  const angleEnd = polarToCartesian(centerX, centerY, radius, -endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    // Move to angle start
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#moveto_path_commands
    'M',
    angleStart.x,
    angleStart.y,

    // Draw arc to angle end
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    angleEnd.x,
    angleEnd.y,

    // Draw line to center...
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#lineto_path_commands
    'L',
    centerX,
    centerY,

    // ...then back to angle start
    'L',
    angleStart.x,
    angleStart.y,

    // Close the path
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#closepath
    'Z',
  ].join(' ');

  return d;
}
