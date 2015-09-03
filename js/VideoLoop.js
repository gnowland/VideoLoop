//
//	VideoLoop.js - Provides (almost) seamless video looping and overcomes HTML 5 video loop attribute pause
//	By Mark Westguard (http://www.westguardsolutions.com)
//

function VideoLoop(id) {

	var about = {

		Version: 0.1,
		Author: "Mark Westguard",
		Created: "09/01/2015",
		Updated: "09/02/2015"
	};

	if(id) {

		if(window === this) { return new VideoLoop(id); }

		// Configuration
		this.length = 1000;			// Precise (as you can) length of video in milliseconds
		this.zIndex = 10000;		// Z-Index of video (z-index of +1 and -1 this value will also be used)
		this.transitionDelay = 500;	// Video transition delay
		this.paths = [];
		this.types = [];

		// Variables
		this.id = id;
		this.idCurrent = 1;			// Current video playing
		this.step = 0;				// Loading step

		return this;

	} else {

		return about;
	}
}

VideoLoop.prototype = {

	// Initialize
	init: function() {

		// Create 2 videos
		for(var i=1; i<=2; i++) {

			this.create(document.getElementById(this.id), this.id, i);
		}
	},

	// Check if all checks are complete
	check: function(obj, id) {

		// Increment video steps
		obj.step++;

		// When all four conditions are met, start playing video 1
		if(obj.step == 4) { document.getElementById(id + '1').play(); }
	},

	play: function(id) {

		// Work out alternate video object
		this.idCurrent = (((this.idCurrent - 2) * -1) + 1);
		var idCurrentAlt = (((this.idCurrent - 2) * -1) + 1);

		// Work out video objects
		obj1 = document.getElementById(id + this.idCurrent);
		obj2 = document.getElementById(id + idCurrentAlt);

		// Play video (But do not show it yet)
		obj1.play();

		// ... then after transition delay ...
		_self = this;
		setTimeout(function() {

			// Video transition
			obj2.style.zIndex = _self.zIndex - 1;		// Move alt video to position -1 (Behind video 1)
			obj1.style.zIndex = _self.zIndex + 1;		// Move video to position 1
			obj2.style.zIndex = _self.zIndex;			// Move alt video to position 0 ready for next transition

			// Set up video 2 ready to play
			obj2.pause();
			obj2.currentTime = 0;

		}, this.transitionDelay);
	},

	create: function(obj, id, index) {

		// Create video object
		var videoObj = document.createElement('video');
		videoObj.id = id + index;

		// Create video source(s)
		for(var i=0; i<this.paths.length; i++) {

			var videoObjSource = document.createElement('source');
			videoObjSource.src = this.paths[i];
			videoObjSource.type = this.types[i];
			videoObj.appendChild(videoObjSource);
		}

		// On can play through event handler
		videoObj.oncanplaythrough = this.check(this, id);		// Video step

		// Loaded meta data event handler
		videoObj.loadedmetadata = this.check(this, id);		// Video step

		// Video playing event handlers
		videoObj.videoLoopSelf = this;
		videoObj.videoLoopID = id;
		videoObj.addEventListener('playing', function(evt) {

			_self = evt.target.videoLoopSelf;
			id = evt.target.videoLoopID;

			setTimeout(function() {

				_self.play(id);

			}, _self.length);

		}, false);

		// Set initial z-index
		videoObj.style.zIndex = this.zIndex + (2 - index);

		// Append video to videoloop object
		obj.appendChild(videoObj);
	}
};
