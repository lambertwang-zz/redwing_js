"use strict";

/**
 *  All engine-defined events
 *	Event ids 0-127 reserved for engine events
 *  All other ids available to the game programmer
 */

const eventStepId = 0;


function EventStep() {
	this.label = "step";
	this.id = eventStepId;
}
