/**
 * Interactive HTML5 Canvas Bouquet Builder Module
 */
export function initBouquetGenerator() {
  const canvas = document.getElementById('bouquetCanvas');
  const ctx = canvas.getContext('2d');
  const typeButtons = document.querySelectorAll('.btn-type');
  const clearBtn = document.getElementById('clearCanvas');

  let selectedFlower = 'rose';

  // Resize canvas internally for crisp drawing
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawVase();
  }

  function drawVase() {
    const cx = canvas.width / 2;
    const bottom = canvas.height - 20;

    // Draw Glass Vase
    ctx.fillStyle = 'rgba(230, 92, 130, 0.15)';
    ctx.strokeStyle = 'rgba(230, 92, 130, 0.4)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx - 35, bottom - 100);
    ctx.lineTo(cx - 50, bottom);
    ctx.lineTo(cx + 50, bottom);
    ctx.lineTo(cx + 35, bottom - 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Draw procedural flower
  function drawFlower(x, y, type) {
    const cx = canvas.width / 2;
    const vaseTop = canvas.height - 120;

    // Draw Stem connecting to vase center
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo((x + cx) / 2, (y + vaseTop) / 2 + 20, cx, vaseTop);
    ctx.stroke();

    // Draw Flower Head
    if (type === 'rose') {
      ctx.fillStyle = '#e65c82';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(x + Math.cos(i) * 8, y + Math.sin(i) * 8, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#bc3b5e';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'tulip') {
      ctx.fillStyle = '#f8a5c2';
      ctx.beginPath();
      ctx.ellipse(x, y, 12, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e06d88';
      ctx.beginPath();
      ctx.ellipse(x - 4, y, 8, 14, -0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'sunflower') {
      ctx.fillStyle = '#f3a683';
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.arc(x + Math.cos(angle) * 12, y + Math.sin(angle) * 12, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#521d37';
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Handle Flower Selection
  typeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      typeButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selectedFlower = e.target.getAttribute('data-type');
    });
  });

  // Handle Canvas Tap/Click
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only allow planting flowers above the vase neck
    if (y < canvas.height - 110) {
      drawFlower(x, y, selectedFlower);
    }
  });

  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawVase();
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}
