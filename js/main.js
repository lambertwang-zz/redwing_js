
require.config({
    baseUrl: 'js',
    paths: {
    	jquery: '../lib/jquery.min',
    	three: '../lib/three.min',
        socketio: 'https://cdn.socket.io/socket.io-1.4.5'
    }, 
    shim: {
        three: {
            exports: 'THREE'
        },
        socketio: {
            exports: 'io'
        }
    }

});

require(['redwing'], function(rw) {
	console.log("Yay?");
	rw.init();
	rw.main();
});
