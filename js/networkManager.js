"use strict";

// Manages game logic
// apprx 64 tick
// Holy sh!t, the javascript timing functions are kinda screwy
define(['object', 'events', 'util', 'socketio', 'jquery'], function(RwObject, RwEv, util, io, $) {

	function NetworkManager() {
			
		$(window).bind('beforeunload', function(){
	    	util.networkManager.closeSocket();
		});
	}


	NetworkManager.prototype.initSocket = function() {
		this.socket = io.connect('http://localhost:5000');
		/*
   		this.socket.on('connect', function() {
        	this.socket.emit('my event', {data: 'I\'m connected!'});
    	});*/
	}

	NetworkManager.prototype.testSend = function() {
       	console.log("Attempting to send data");
       	this.socket.emit('my event', {data: 'I\'m connected!'});
	}

	NetworkManager.prototype.closeSocket = function() {
		this.socket.close();
	}

	return NetworkManager;
});
