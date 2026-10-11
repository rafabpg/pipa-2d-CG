# Pipa 2D — Trabalho 1 de Computação Gráfica

## Como rodar

O WebGPU só funciona em contexto seguro (`https://` ou `http://localhost`), então o `main.html` **não** pode ser aberto direto pelo arquivo (`file://`). É preciso servir a pasta por um servidor local.

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/main.html`.

## Navegador

É necessário um navegador com WebGPU habilitado:

- **Chrome / Edge** (versão 113 ou superior): já vem habilitado no Windows e no macOS.
- **Linux (Chrome / Chromium)**: ative `chrome://flags/#enable-unsafe-webgpu` e `chrome://flags/#enable-vulkan` e reinicie o navegador.
- **Firefox**: use uma versão recente ou ative `dom.webgpu.enabled` em `about:config`.

## Estrutura

```
main.html       página com o <canvas>
main.css        posição e tamanho do canvas
main.js         cena: geometria, animação, hierarquia, câmera e projeção
pipa.vert.js    vertex shader (WGSL): aplica a matriz modelViewProjection
pipa.frag.js    fragment shader (WGSL): devolve a cor do vértice
lib/            utilitários de WebGPU e de matrizes da disciplina
```
