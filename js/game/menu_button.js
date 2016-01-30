
define(['util', 'jquery'], function(util, $) {
	function RwButton(message, x, y) {

		this.buttonText = document.createElement('div');
		this.buttonText.style.position = 'absolute';
		
		this.buttonText.id = 'button'+message;

		this.buttonText.style.width = '16' + '%';
		this.buttonText.style.height = '16vh';
		this.buttonText.style.backgroundColor = "blue";
		this.buttonText.style.fontSize = "5vh";
		this.buttonText.innerHTML = message;
		this.buttonText.style.top = y + '%';
		this.buttonText.style.left = x + '%';
		this.buttonText.style.textAlign = "center";
		this.buttonText.style.lineHeight = "16vh";
		this.buttonText.style["vertical-align"] = "middle";

		document.getElementById('redwing').appendChild(this.buttonText);

	}

	return RwButton;
});

