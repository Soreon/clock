/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

import * as µ from './canveas.js';

Math.TAU = Math.PI * 2;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.translate(0, 0);

const clockCanvas = document.createElement('canvas');
clockCanvas.width = canvas.width;
clockCanvas.height = canvas.height;
const clockContext = clockCanvas.getContext('2d');

const baseAngle = Math.PI / 2;
const clock = {
  x: 300,
  y: 300,
  radius: 250,
  hourTickLength: 30,
  minuteTickLength: 20,
  mainUnit: 60,
  visualSubdivision: 5,
  subdivision: 5,
  hand1: { length: 165, width: 10 },
  hand2: { length: 240, width: 8 },
  hand3: { length: 240, width: 2 },
};

function drawClockBase({
  x,
  y,
  radius,
  hourTickLength,
  minuteTickLength,
  mainUnit,
  visualSubdivision,
  subdivision,
}) {
  µ.circle({ context: clockContext, x, y, radius });
  for (let i = 0; i < mainUnit; i += 1) {
    const tickLength = i % visualSubdivision === 0 ? hourTickLength : minuteTickLength;
    const angle = i * Math.PI / (mainUnit / 2);
    const x1 = x + (radius - tickLength) * Math.cos(angle - baseAngle);
    const y1 = y + (radius - tickLength) * Math.sin(angle - baseAngle);
    const x2 = x + radius * Math.cos(angle - baseAngle);
    const y2 = y + radius * Math.sin(angle - baseAngle);
    µ.line({ context: clockContext, x1, y1, x2, y2, lineWidth: i % visualSubdivision === 0 ? 5 : 2 });

    if (i % visualSubdivision === 0) {
      const x3 = x + (radius - tickLength - 22) * Math.cos(angle - baseAngle);
      const y3 = y + (radius - tickLength - 22) * Math.sin(angle - baseAngle);
      µ.text({ context: clockContext, x: x3, y: y3, t: i === 0 ? mainUnit / subdivision : i / subdivision, font: '25px Arial', textAlign: 'center', textBaseline: 'middle' });
    }
  }
}

function drawClockHands({
  x,
  y,
  hand1,
  hand2,
  hand3,
}) {
  const currentDate = new Date();
  const currentMilliseconds = currentDate.getMilliseconds() + (currentDate.getSeconds() + (60 * currentDate.getMinutes()) + (60 * 60 * currentDate.getHours())) * 1000;
  const angle1 = ((currentMilliseconds % 43200000) / 43200000) * Math.TAU;
  const angle2 = ((currentMilliseconds % 3600000) / 3600000) * Math.TAU;
  const angle3 = ((currentMilliseconds % 60000) / 60000) * Math.TAU;
  const angle4 = ((currentMilliseconds % 1000) / 1000) * Math.TAU;
  const px1 = x + hand1.length * Math.cos(angle1 - baseAngle);
  const py1 = y + hand1.length * Math.sin(angle1 - baseAngle);
  const px1p = x - 20 * Math.cos(angle1 - baseAngle);
  const py1p = y - 20 * Math.sin(angle1 - baseAngle);
  const px2 = x + hand2.length * Math.cos(angle2 - baseAngle);
  const py2 = y + hand2.length * Math.sin(angle2 - baseAngle);
  const px2p = x - 30 * Math.cos(angle2 - baseAngle);
  const py2p = y - 30 * Math.sin(angle2 - baseAngle);
  const px3 = x + hand3.length * Math.cos(angle3 - baseAngle);
  const py3 = y + hand3.length * Math.sin(angle3 - baseAngle);
  const px3p = x - 40 * Math.cos(angle3 - baseAngle);
  const py3p = y - 40 * Math.sin(angle3 - baseAngle);
  const px4 = x + hand3.length * Math.cos(angle4 - baseAngle);
  const py4 = y + hand3.length * Math.sin(angle4 - baseAngle);
  const px4p = x + (hand3.length + 10) * Math.cos(angle4 - baseAngle);
  const py4p = y + (hand3.length + 10) * Math.sin(angle4 - baseAngle);
  µ.line({ context, x1: px1p, y1: py1p, x2: px1, y2: py1, lineWidth: hand1.width, color: '#0005' });
  µ.line({ context, x1: px2p, y1: py2p, x2: px2, y2: py2, lineWidth: hand2.width, color: '#0005' });
  µ.line({ context, x1: px3p, y1: py3p, x2: px3, y2: py3, lineWidth: hand3.width, color: '#0005' });
  µ.line({ context, x1: px4, y1: py4, x2: px4p, y2: py4p, lineWidth: 25, color: '#F00' });
}

function draw() {
  context.drawImage(clockCanvas, 0, 0);
  drawClockHands(clock);
}

function animate() {
  µ.clear(canvas, context);
  draw();
  requestAnimationFrame(animate);
}

drawClockBase(clock);
animate();
