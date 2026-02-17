// Custom drawing functions compatible with tasks-vision
export function drawCustomConnectors(ctx: CanvasRenderingContext2D, landmarks: any[], connections: any[], style: {color: string, lineWidth: number}) {
  ctx.strokeStyle = style.color;
  ctx.lineWidth = style.lineWidth;
  
  for (const connection of connections) {
    const from = landmarks[connection[0]];
    const to = landmarks[connection[1]];
    
    if (from && to) {
      const fromX = from.x * ctx.canvas.width;
      const fromY = from.y * ctx.canvas.height;
      const toX = to.x * ctx.canvas.width;
      const toY = to.y * ctx.canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    }
  }
}
  
export function drawCustomLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[], style: {color: string, lineWidth: number, radius?: number}) {
  ctx.fillStyle = style.color;
  const radius = style.radius || style.lineWidth * 2;

  for (const landmark of landmarks) {
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
  }
}