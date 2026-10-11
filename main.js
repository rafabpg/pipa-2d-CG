import vertShaderSrc from "./pipa.vert.js";
import fragShaderSrc from "./pipa.frag.js";
import WebGPU from "./lib/webgpu.js";

class Scene {
  constructor(gpu) {
    this.program = gpu.createProgram(vertShaderSrc, fragShaderSrc, {
      cullMode: "back",
    });
  }

  draw(gpu) {}
}

class Main {
  async init() {
    this.gpu = await WebGPU.createCanvas("#glcanvas", 1024, 768, {
      clearColor: { r: 0.6, g: 0.84, b: 0.98, a: 1 },
      depth: false,
    });
    this.scene = new Scene(this.gpu);
  }

  draw() {
    this.gpu.start();
    this.scene.draw(this.gpu);
    this.gpu.finish();
    requestAnimationFrame(this.draw.bind(this));
  }
}

try {
  const app = new Main();
  await app.init();
  app.draw();
} catch (error) {
  console.error(error);
  document.body.insertAdjacentHTML("beforeend", `<p>${error.message}</p>`);
}
