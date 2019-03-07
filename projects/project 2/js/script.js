'use strict';
/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type);

let app;

window.onload = function() {
  // Create Pixi app and stage
    app = new PIXI.Application({
    width: 800,
    height: 600,
    antialias: true,
    backgroundColor: 0x000000
  });

  document.body.appendChild(app.view);

  // Snap canvas size to window size
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  resize();
  window.onresize = resize;
}

// Resize canvas to window size
function resize() {
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
}
