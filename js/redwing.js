"use strict";

define(
	['gameManager', 'graphicsManager', 'networkManager', 'util', 'game/plane', 'game/Cuuube', 'game/menu'], 
	function(GameManager, GraphicsManager, NetworkManager, util, Plane, Cuuube, Menu) {
	var main_module = {
		init: function() {
		    util.gameManager = new GameManager();
		    util.graphicsManager = new GraphicsManager();
		    util.networkManager = new NetworkManager();

		    util.networkManager.initSocket();
		    util.networkManager.testSend();

		    new Menu("main");
		},

		main: function() {
			this.graphicsLoop();
			this.gameLoop();
		},

		gameLoop: function() {
			util.gameManager.mainLoop();
		},

		graphicsLoop: null,

	};
	
	window.addEventListener( 'resize', resizeRenderer, false );
	function resizeRenderer() {
		util.graphicsManager.resizeRenderer();
	};

	main_module.graphicsLoop = function() {
		requestAnimationFrame(main_module.graphicsLoop);
		util.graphicsManager.updateGraphics();
		util.renderer.render(util.scene, util.camera);
	};

	return main_module;
});
