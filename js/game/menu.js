
define(
	['util', 'js/game/menu_button.js', 'game/plane', 'game/Cuuube', 'game/playerController'], 
	function(util, RwButton, Plane, Cuuube, PlayerController) {
	function Menu(name) {
		this.buttonList = {};
		if (name == "main") {
			this.buttonList["b1"] = new RwButton("Play", -2.5, 20);

			$('#'+this.buttonList["b1"].buttonText.id).click(function () {
				console.log('Clicked on button test');
				$('#'+this.id).remove();

			    PlayerController.playerController(new Plane());
			    new Cuuube(2000, 1000);
			    new Cuuube(-2000, 1000);
			    new Cuuube(-2000, -1000);
			    new Cuuube(2000, -1000);
			});
		}

	}

	return Menu;
});



