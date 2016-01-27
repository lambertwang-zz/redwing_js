"use strict";

// Main program

// var scene, camera, renderer;
// var geometry, material, mesh;
var scene, camera, renderer
var mesh, geometry, material;

var gameManager;
var graphicsManager;

init();
main();

function init() {

    gameManager = new GameManager();
    graphicsManager = new GraphicsManager();
}

function main() {
	graphicsLoop();
	gameLoop3();
}

function gameLoop() {
	gameManager.mainLoop();
}

function gameLoop2() {
	gameManager.mainLoop2();
}

function gameLoop3() {
	gameManager.mainLoop3();
}

function graphicsLoop() {
	requestAnimationFrame(graphicsLoop);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	
	renderer.render(scene, camera);
};

function resizeRenderer() {
	graphicsManager.resizeRenderer();
}
