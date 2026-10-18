const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  const uuidContainer = document.getElementById("uuid-text");
  const uuid = generateUUID();
  uuidContainer.textContent = uuid;
});
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  const uuidContainer = document.getElementById("uuid-text");
  const uuid = uuidContainer.textContent;
  copyButton.classList.add("clicked");
  navigator.clipboard.writeText(uuid).then(() => {
    copyButton.src = "success.png";
    copyButton.classList.remove("clicked");
    setTimeout(() => {
      copyButton.src = "copy.png";
    }, 1000);
  });
});
class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.5;
        this.vx = vx || (Math.random() - 0.5) * 0.8;
        this.vy = vy || -(Math.random() * 1.5 + 0.5);
        this.alpha = 1;
        this.decay = Math.random() * 0.005 + 0.003;
        const grayValue = Math.floor(Math.random() * 256);
        this.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
    }
    draw() {
        bgCtx.globalAlpha = this.alpha;
        bgCtx.fillStyle = this.color;
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }
}
const bgCanvas = document.getElementById("bg-canvas");
const bgCtx = bgCanvas.getContext("2d");
const particles = [];
const resizeCanvas = () => {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
};
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const animate = () => {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  if (Math.random() < 0.3) {
    const spawnX = Math.random() * bgCanvas.width;
    const spawnY = bgCanvas.height + 10;
    particles.push(new Particle(spawnX, spawnY));
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
};
animate();
