"use strict";

// Main program

init();
main();

var plane;


function init() {
    gameManager = new GameManager();
    graphicsManager = new GraphicsManager();

    plane = new Plane();
    new Cuuube(2000, 1000);
    new Cuuube(2000, -1000);
    new Cuuube(-2000, 1000);
    new Cuuube(-2000, -1000);
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

	graphicsManager.updateGraphics();
	
	renderer.render(scene, camera);
};

function resizeRenderer() {
	graphicsManager.resizeRenderer();
}
