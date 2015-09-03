# VideoLoop

When looping a video embedded using the HTML 5 video tag, the 'loop' attribute will cause a video to momentarily pause during the transport stage (i.e. when the transport of the video is returned to 0). This script *attempts* to overcome that problem by loading two copies of the video and flipping between them using zindexing.

The advantage of this method is that the pause is almost eradicated. High CPU usage may cause the loop transition to be affected. The disadvantage of this method is that the video is downloaded twice.

## Install
Simply add the VideoLoop.js script to your javascript folder and include it in your web page.

## Usage
A demo HTML script is included (demo.html). Example usage for this script is as follows:

```html
<div id="myVideoLoop"></div>

<script>

	window.onload = function() {

		// Initialize video loop
		videoLoopObj = new VideoLoop('myVideoLoop');
		videoLoopObj.length = 7734;
		videoLoopObj.paths = ['videos/homepage.mp4'];
		videoLoopObj.types = ['video/mp4'];
		videoLoopObj.init();
	}

</script>
```

Call init() to render the videos on your page in the object id provided to VideoLoop.

Property | Description
-------- | -----------
length | The length of the video in milliseconds
paths | An array of the video files (MP4 recommended)
types | An array of the video mime types (video/mp4 recommended)
transitionDelay | Set to 500 milliseconds by default. This is the delay between a video loop starting and it actually being show on the page
zIndex | Set to 10000 by default. You can use this to set the zIndex of the videos. The zIndex of the video objects added to the dom will vary between 9999 and 10001 using the default 10000 value.
