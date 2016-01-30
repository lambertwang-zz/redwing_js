"use strict";

/**
 *  All engine-defined events
 *	Event ids 0-127 reserved for engine events
 *  All other ids available to the game programmer
 */

define(['three', 'util'], function(THREE, util) {
	const eventStepId = 0;

	function RwEv(label, parameters) {
		this.label = label;
		if (parameters) {
			this.parameters = parameters;
		}
	}

	return RwEv;
});
