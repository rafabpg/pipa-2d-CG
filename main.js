import vertShaderSrc from "./pipa.vert.js";
import fragShaderSrc from "./pipa.frag.js";
import WebGPU from "./lib/webgpu.js";
import { createIdentityMat4, createTranslationMat4 } from "./lib/utils.js";

class Scene {
  constructor(gpu) {
    this.program = gpu.createProgram(vertShaderSrc, fragShaderSrc, {
      cullMode: "back",
    });

    this.kite = gpu.createShape(this.createKite(), 6);

    this.tail1 = gpu.createShape(this.createTail(), 3);
    this.tail2 = gpu.createShape(this.createTail(), 3);

    this.kiteUniform = gpu.createUniform(this.program, createIdentityMat4());
    this.tail1Uniform = gpu.createUniform(this.program, createIdentityMat4());
    this.tail2Uniform = gpu.createUniform(
      this.program,
      createTranslationMat4(0.095, -0.155, 0),
    );
  }

  createKite() {
    const top = [0.0, 0.75, 0.5, 1.0];
    const left = [-0.3, 0.45, 0.5, 1.0];
    const right = [0.3, 0.45, 0.5, 1.0];
    const bottom = [0.0, 0.0, 0.5, 1.0];

    const positions = [...top, ...left, ...bottom, ...top, ...bottom, ...right];

    const red = [0.93, 0.11, 0.14, 1.0];
    const yellow = [1.0, 0.85, 0.18, 1.0];

    const colors = [...red, ...red, ...red, ...yellow, ...yellow, ...yellow];

    return [positions, colors];
  }

  createTail() {
    const positions = [
      0.0, 0.0, 0.5, 1.0, 0.03, -0.19, 0.5, 1.0, 0.16, -0.12, 0.5, 1.0,
    ];

    const orange = [1.0, 0.5, 0.15, 1.0];

    const colors = [...orange, ...orange, ...orange];

    return [positions, colors];
  }

  draw(gpu) {
    gpu.draw(this.program, this.tail2, [this.tail2Uniform.bindGroup]);
    gpu.draw(this.program, this.tail1, [this.tail1Uniform.bindGroup]);
    gpu.draw(this.program, this.kite, [this.kiteUniform.bindGroup]);
  }
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
