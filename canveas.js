/* eslint-disable no-param-reassign */
function requiredParam(param) {
  throw new Error(`Required parameter, "${param}" is missing.`);
}

export function clear(canvas, context) {
  context.clearRect(-1, -1, canvas.width + 1, canvas.height + 1);
}

export function circle({
  context = requiredParam('context'),
  x = requiredParam('x'),
  y = requiredParam('y'),
  radius = requiredParam('radius'),
} = {}) {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.stroke();
  context.restore();
}

export function disk({
  context = requiredParam('context'),
  x = requiredParam('x'),
  y = requiredParam('y'),
  radius = requiredParam('radius'),
} = {}) {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.fill();
  context.restore();
}

export function line({
  context = requiredParam('context'),
  x1 = requiredParam('x1'),
  y1 = requiredParam('y1'),
  x2 = requiredParam('x2'),
  y2 = requiredParam('y2'),
  color = '#000',
  lineWidth = 1,
} = {}) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
}

export function dashedLine({
  context = requiredParam('context'),
  x1 = requiredParam('x1'),
  y1 = requiredParam('y1'),
  x2 = requiredParam('x2'),
  y2 = requiredParam('y2'),
  color = '#000',
} = {}) {
  context.save();
  context.setLineDash([2, 3]);
  line({
    context, x1, y1, x2, y2, color,
  });
  context.restore();
}

export function rectangle({
  context = requiredParam('context'),
  x = requiredParam('x'),
  y = requiredParam('y'),
  width = requiredParam('width'),
  height = requiredParam('height'),
  color = '#F00',
} = {}) {
  context.save();
  context.beginPath();
  context.fillStyle = color;
  context.rect(x, y, width, height);
  context.fill();
  context.restore();
}

export function text({
  context = requiredParam('context'),
  x = requiredParam('x'),
  y = requiredParam('y'),
  t = requiredParam('t'),
  font = '30px Arial',
  textAlign = 'left',
  textBaseline = 'alphabetic',
} = {}) {
  context.save();
  context.font = font;
  context.textAlign = textAlign;
  context.textBaseline = textBaseline;
  context.fillText(t, x, y);
  context.restore();
}
