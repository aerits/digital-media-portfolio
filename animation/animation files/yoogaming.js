(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"yoogaming_atlas_1", frames: [[0,0,1500,1156]]},
		{name:"yoogaming_atlas_2", frames: [[1031,0,998,1329],[0,0,1029,1302]]},
		{name:"yoogaming_atlas_3", frames: [[0,860,1031,855],[0,0,1100,858]]},
		{name:"yoogaming_atlas_4", frames: [[0,0,1736,474],[1785,1564,174,303],[1511,754,431,342],[1738,0,232,752],[1497,1564,286,286],[1503,1098,379,326],[1972,0,63,54],[842,476,667,580],[0,1334,1102,143],[1511,614,158,136],[1104,1426,873,136],[875,1564,620,136],[0,1058,1501,136],[0,1479,873,136],[0,1617,620,136],[0,1196,1501,136],[1511,476,222,136],[0,1039,304,10],[560,1802,523,98],[622,1702,558,98],[1085,1802,391,98],[0,1755,558,98],[0,1855,391,98],[1478,1869,391,98],[0,476,840,561]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_27 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["yoogaming_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["yoogaming_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["yoogaming_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4001,3459);


(lib.Bitmap3 = function() {
	this.initialize(ss["yoogaming_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,1800);


(lib.Bitmap5 = function() {
	this.initialize(ss["yoogaming_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["yoogaming_atlas_4"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.vventclosed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(12,1,1).p("ATxFPIKtqsMgx/AAAIq8K7MAyCAAA");
	this.shape.setTransform(196.925,106.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(4.2,1,1).p("AAGgHIgLAP");
	this.shape_1.setTransform(322.8,141.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#999999").ss(4.2,1,1).p("AzNiSMArGAAAIAAgqMgrGAAAgA1rAeMArGAAAIAAgpMgrGAAAgA34C9MArGAAAIAAgqMgrGAAAg");
	this.shape_2.setTransform(193.575,108.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("A34C9IAAgqMArGAAAIAAAqgA1rAeIAAgpMArGAAAIAAApgAzNiSIAAgqMArGAAAIAAAqg");
	this.shape_3.setTransform(193.575,108.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("A+dFeIK8q7MAx/AAAIqtKsIgMAPgA4ZDRMArGAAAIAAgqMgrGAAAgA2MAyMArGAAAIAAgrMgrGAAAgAzvh+MArGAAAIAAgrMgrGAAAg");
	this.shape_4.setTransform(196.925,106.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,65.9,401.9,82);


(lib.vent = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(12,1,1).p("AzXgJIq8q8MAyCAAAAzXgJIrQLPMAx/AAAILQrPIqtqtAzXgJMAx/AAA");
	this.shape.setTransform(178.85,-60.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(4.2,1,1).p("AAGAIIgLgP");
	this.shape_1.setTransform(305.7,-131.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#999999").ss(4.2,1,1).p("A1rgdMArGAAAIAAApMgrGAAAgAzNCTMArGAAAIAAAqMgrGAAAgA34i8MArGAAAIAAAqMgrGAAAg");
	this.shape_2.setTransform(176.475,-98.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("A+nFoILQrPMAx+AAAIrPLPg");
	this.shape_3.setTransform(178.85,-25.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AzNC9IAAgqMArGAAAIAAAqgA1rAMIAAgpMArGAAAIAAApgA34iSIAAgqMArGAAAIAAAqg");
	this.shape_4.setTransform(176.475,-98.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AzhFeIq8q7MAyCAAAIAMAPIKtKsgAzvCpMArGAAAIAAgqMgrGAAAgA2MgGMArGAAAIAAgrMgrGAAAgA4ZilMArGAAAIAAgrMgrGAAAg");
	this.shape_5.setTransform(179.825,-96.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.1,-137.9,403.90000000000003,153.9);


(lib.Tween14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(-272.25,-139.25,0.1361,0.0805);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-272.2,-139.2,544.5,278.5);


(lib.Tween13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-434,-118.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-434,-118.5,868,237);


(lib.Tween11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AAAuXQBZAAA/A/QA/A/AABZIAAWBQAABZg/A/Qg/A/hZAAQhYAAg/g/Qg/g/AAhZIAA2BQAAhZA/g/QA/g/BYAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AiXNZQg/g/AAhZIAA2BQAAhZA/g/QA/g/BYAAQBZAAA/A/QA/A/AABZIAAWBQAABZg/A/Qg/A/hZAAQhYAAg/g/g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.5,-102,63,204);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AAAurQBCAAAvAvQAvAvAABCIAAYXQAABCgvAvQgvAvhCAAQhBAAgvgvQgvgvAAhCIAA4XQAAhCAvgvQAvgvBBAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhwN9QgvgvAAhCIAA4XQAAhCAvgvQAvgvBBAAQBCAAAvAvQAvAvAABCIAAYXQAABCgvAvQgvAvhCAAQhBAAgvgvg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26,-104,52,208);


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EAgzAHMIgGgBIgHgBIgIgCIgIgDIgGgDIgHgGIgHgFIgHgGIgPgIIgOgIIgRgJIgQgKIgOgKIgPgJQhygph4gFQg+gCg/AAQh8AAh8gEQh2gDhzAaQhuAYhvAEQh1AFhwgeQhbgYhNgyIgVgNQhlg2hghAQhPg1hWgmQhrgwhwgbQhrgahvgCQhwgChvACQhAABhBAMQh9AWh8AbQh6Abh8ASQhWANhYgDQhvgEhsggQg+gSg/gNQhxgXhbhKQgkgegggiQgggggVgnIgTgVIgOgOIgNgNIgKgMIgJgMIgLgQIgJgLIgKgMIgLgLIgLgNIgKgOIgIgNIgCgHIgCgGIAAgGIABgHIABgGIACgGIACgGIAFgGIADgFIAGgEIAFgEIAHgDIAIgDIAIgBIAIABIAIABIAFACIAGADIAFAEIAFAEIAEAFIAEAFIAEAGIAFAGIAEAFIAFAEIAEAEIAFAGIAEAFIAFAGIADAEIAGAHIAFAHIAGAIIAEAGIAEAHIATAUIAOAOIANAOQAJAJAIALIAJAOIAJAOIAQARIALALIAJALQAIAKAJAJIANANIAKALIALAKIBEApQAlAVAqAIQAuAJAsAPQAmANAoAHQAqAHApAKIAbAFQAWACAXgBIAdAAIAgAAIAhAAIAlAAIAbgBQB4gWB3gaQB1gaB2gXQB0gWB2gBQB0gBB1AJQA8AEA8AMQB5AYB0AsQByAsBlBCQBfA+BiA5IAMAGQAHADAHAEIAPAKIANAJIANAJIANAHIAtAQIAtAOIAoAMQAVAGAXADIAsAHIAQADQB7AGB4gdQB/gfCDACQB6ADB6gCQB4gDB3APQBvAOBmAxIAkASQAhAQAcAXIAHACIAHACIAHADIAHAGIAFAFIAFAGIADAIIACAHIABAIIAAAIIgCAIIgCAGIgCAGIgEAFIgFAFIgEAEIgFAEIgHACIgGADIgGABIgHABIgHgBg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.6,-46,431.2,92.1);


(lib.layschope = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,87,151.5);


(lib.headsideview = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("EgBXhiMQGbjFHtAAQNnAAJoJnQCHCHBpCTQF4INAAKoQAAI/kNHQQiKDvjRDRQkCECkwCWID0CWIGXjEEAB0hJiQBNAsBCBCQDADAAAEPQAAEPjADAQhgBghzAwQhzAwiIAAQkOAAjAjAQjAjAAAkPQAAkPDAjAQCzizD4gLQASgBARAAQCxAACOBRIjL4qIgwlyEgGPhfRIhSqWEgQBg0bQkDnKAAo2QAAtnJnpoQCCiBCMhmEgQBg0bQAbA9AhBmQBCDLAeDJQBfKCksF3IgqgNQg1gPg9gLQjFgljIAOQqAArm4IPQj1EmAmExQAQCKBKChQA+CGB2C6QAwBLC+EZQCkDyBmCpQFDIRCtIGQC9I4g1JiQgrHsjOIjQh9FNkHIGQiAD9gpBYQhQCqggBrQgkB2BbCkQBZCeC8CoQC+CqD8CRQEJCYEdBgQE1BnEaAYQFFAbEghPQEohQDki7QEOjcCwlwQFVrGDP1JQDF0DgD0YQgD1PjfrpQh3mNisigQiKiAioAfQgqAIgsASQA9gGAZgUEgDuhKyIih0fAppyBQjXkXjylTAppyBQBoCiCCFGQEGKLCIMzQDBR8hUUpQhoZzoTckEAGvgkFIgmAPQgqAZgbA6QhUC3BtGuQCHAdCUATQCzAXBegJQgOAGgOAGEAbOgm0QmjDQn6AAQjGAAi8ghQpxhsnbnbQjXjXiNj4AFd4+QBPEzCxGkQBTDFA2CnIAlBjQAvCFAsCqQCNIeA/LCQBZPbhQSTQhjW4lmaFALmn7QBvFYghCdQggCdirg/QizhCkukqQlElCmtorEAAwg3GIaeQS");
	this.shape.setTransform(-7.4989,295.2181);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(23,1,1).p("ACdjdIAALCApFnkISLE5");
	this.shape_1.setTransform(136,-157.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("EgH/BnWQIT8kBo5zQAamNAAl+QAAt3iHsiQiIszkGqMQiClFhoiiQGtIrFEFCQEuEqCzBCQAxASAlAAIAAAAIABAAQBcAAAYhtIAAgCIAAgCQAIgjAAgtQAAiahWkLQBWELAACaQAAAtgIAjIAAACIAAACQgYBthcAAIgBAAIAAAAQglAAgxgSQizhCkukqQlElCmtorQBoCiCCFFQEGKMCIMzQCHMiAAN3QAAF+gaGNQhoZzoTckQkagYk1hnQkdhfkJiZQj8iQi+iqQi8iphZidQhbikAkh3QAghrBQipQAphYCAj9QEHoHB9lNQDOoiArntQA1pii9o3QitoHlDoRQhmioikjzQi+kYgwhMQh2i5g+iHQhKihgQiJQgmkxD1kmQG4oQKAgrQDIgNDFAkQA9ALA1APIAqANQEsl3hfqCQgejIhCjMQghhlgbg+QCND4DXDXQHbHbJxBtIgmAOQgqAagbA5QhUC4BtGtQCHAeCUATQCzAXBegKIgcANIAcgNQA9gGAZgUQCogfCKCBQCsCfB3GOQDfLpADVOQADUYjFUDQjPVJlVLHQiwFvkODcQFm6EBj24QAmoqAAoAQAAo8gvoJQg/rBiNofQgsipgviGIglhjQg2imhTjGQixmjhPk0QBPE0CxGjQBTDGA2CmIAlBjQAvCGAsCpQCNIfA/LBQAvIJAAI8QAAIAgmIqQhjW4lmaEQjkC7koBQQjWA7jsAAQhQAAhTgHgApp0LQjXkXjylUQDyFUDXEXgApp0LIAAAAgEAGvgmPQpxhtnbnbQjXjXiNj4QkDnJAAo2QAAtnJnpoQCCiCCMhlQCWhtCihOQGbjGHtAAQNnAAJoJoQCHCHBpCTQF4IMAAKpQAAI/kNHPQiKDvjRDRQkCEDkwCWI6ewTQBzgwBghgQDAjAAAkOQAAkPjAjAQhChDhNgrIjL4qIDLYqQiOhSixAAIgjABIih0eIChUeQj4AMizCzQjADAAAEOQAAEPDADAQDADAEOAAQCIAABzgwIaeQTQmjDPn6AAQjGAAi8gggEAY3hBWIAArDgEAfghLnIyLk5gEgQBg2mIAAAAgEgKZg7hQjAjAAAkPQAAkODAjAQCzizD4gMIAjgBQCxAACOBSQBNArBCBDQDADAAAEPQAAEOjADAQhgBghzAwQhzAwiIAAQkOAAjAjAgEAAwg5RgEgDuhM9g");
	this.shape_2.setTransform(-7.4989,309.0931);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-309.5,-390.7,604,1371.9);


(lib.headbackview = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AQwAAQAAG8k6E6Qk6E6m8AAQm7AAk6k6Qk6k6AAm8QAAm7E6k6QE6k6G7AAQG8AAE6E6QE6E6AAG7g");
	this.shape.setTransform(107.2,107.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ar1L2Qk6k6AAm8QAAm7E6k6QE6k6G7AAQG8AAE6E6QE6E6AAG7QAAG8k6E6Qk6E6m8AAQm7AAk6k6g");
	this.shape_1.setTransform(107.2,107.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,234.4,234.4);


(lib.hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AFThsQADAagCAaQAAAVgEAVQgDAQgEASQglCIh6BHQh6BGiHglQiJgkhGh6QhGh5AkiJQAFgSAGgQQAHgTAJgTQANgXAPgV");
	this.shape.setTransform(495.3525,331.3255);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhXEEQiJgkhGh6QhGh5AkiJQAFgSAGgQIAQgmQANgXAPgVIJkCkQADAagCAaQAAAVgEAVIgHAiQglCIh6BHQhQAuhWAAQgsAAgvgNg");
	this.shape_1.setTransform(495.3525,331.3255);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(842.75,33.1,0.4547,0.4547);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(20,1,1).p("EgkygMNMA47gLiQEtg9EACpQEACrA9EtICvNgQA9EsiqD/QipEBktA9Mg47ALi");
	this.shape_2.setTransform(721.1054,179.5178);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EghfAWLQkAipg9ktIivtgQg9ksCpkBQCqkAEtg9MA47gLiQEtg9EACpQEACrA9EtICvNgQA9EsiqD/QipEBktA9Mg47ALiQhPAQhNAAQjVAAi8h9g");
	this.shape_3.setTransform(691.3465,180.3233);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(20,1,1).p("EggZgLkMBAzAAAQEzAADZDZQDaDZAAEyQAAEzjaDZQjZDakzAAMhAzAAAQkzAAjajaQjZjZAAkzQAAkyDZjZQDajZEzAAg");
	this.shape_4.setTransform(279.9479,164.9668,1,1.6548,12.2202);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("EggZALlQkzAAjajZQjZjZAAkzQAAkyDZjZQDajZEzAAMBAzAAAQEzAADZDZQDaDZAAEyQAAEzjaDZQjZDZkzAAg");
	this.shape_5.setTransform(279.9479,164.9668,1,1.6548,12.2202);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,1321.6,431.9);


(lib.gun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00FF00").ss(3,1,1).p("Ak6AAIAAjOAnLAAICRAAAk6DoIAAjoAgPmTIAABhIDWAAAEWjfIAADfIC2AAAgPE/IAABVAEWAAIAADYAjnkyIDYAAADkEeIngAA");
	this.shape.setTransform(-155.475,-149.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("ABXhTIAAgZIAvAAIACAZIArAAIAAgaIAzAAIAAAaIA9AAAArhTIAsAAIAxAAACzhTIAzAAAkimhID4AAIFNFOAhtAVIAlAlIAABWIAACeIBzB0ID4AAIAAn1AhtAVIAABXIAlAkAhfAqIAAAxAArhTIAAH1AkimhIAAECIC1C0AArhTIlNlO");
	this.shape_1.setTransform(11.125,1.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00FF00").s().p("AAUANIAAgZIA0AAIAAAZgAhHANIAAgYIAwAAIACAYg");
	this.shape_2.setTransform(26.95,-8.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AArGiIAAn1IAsAAIAxAAIArAAIAzAAIA9AAIAAH1gAArGiIhzh0IAAieIAAhWIglglIi1i0IAAkCIFNFOIAAH1g");
	this.shape_3.setTransform(11.125,1.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#666666").s().p("ADmCnIAAgaIgzAAIAAAaIgrAAIgCgZIgvAAIAAAZIgsAAIlNlNID4AAIFNFNg");
	this.shape_4.setTransform(11.125,-23.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AgRAvQgSgGgJgRQgQgfAYgaQASgUAaAFQAjAHAHAiQAFAXgQARQgRARgUAAQgJAAgKgDg");
	this.shape_5.setTransform(-156.5159,-151.002);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-203,-191.6,244.2,235.6);


(lib.eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AN0hXIAAInAJUgvIMoo4A17m/IWHGQAoLhHIAAKv");
	this.shape.setTransform(140.4,61.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,300.8,143.2);


(lib.desk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(5,1,1).p("EAmmgMzQA2AAAeAYQAbAWABAhQAAAfgYAVQgaAZgqgCQhegFgKgFQgQgHgIg3QgGgwAwggQAZgQAZgHEAnxgETIAAiQIhcAAIAACVIBZAAEAkpgETIAAiQIhcAAIAACVIBZAAEAkpgAfIAAiQIhcAAIAACVIBZAAEAnxgAfIAAiQIhcAAIAACVIBZAAALLLFQAAgFADgHQAGgPANgNQArgoBmgCQBngCArAdQAVAPABAOIALAQQALASgEAPQgLAwiYgCQiZAEgigkQgKgLACgOgAngNIICxAAIhqhQEgm1AL4IhgBQICuAAIDSAAIEQAAIDVAAIDLAAIDcAAIGWAAIDiAAICxAAEgh6AL4IgbBQEghgAKpIgaBPID6AAIgFBQEgjWAKpIB2AAIDlAAIgFBPIDQAAIAABQEgkeAL4IhJBQEgjWAKpIhIBPICkAAEgm1AL4IBghPIB/AAEgm1AL4ICXAAAvLKpIAsBPIC7AAICmAAIBeBQAxYKpIAABPIAAAsAxYKpICNAAICTAAIBUBPIBTBQAxYL4IC5AAIAsBQAqdKpIBfBPIClAAAqdKpICbAAIBpBPAs4KpICbAAA6wKpIAABPIDKAAIABBQA97KpIDLAAIDIAAIACBPIDaAAIADBQA0QKpIAEBPIC0AAA3oKpIDYAAIC4AA");
	this.shape.setTransform(365.0005,182.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(10,1,1).p("EAykgRHMAAAAiPEgyjgRHMAAAAhn");
	this.shape_1.setTransform(395,435.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("EAykgA0IAABpEgyjgA0IAABp");
	this.shape_2.setTransform(395,320.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(20,1,1).p("EAvIAOKIAJAAEA6/AYnIAKAAEAvIAOKIL3FdIAAFAEg7IATnIAAFAILKAAMBlHAAAIF2AAAaGsjIUUAAIAAZ8AWQrmID2g9IAAatIVCAAAzvDhIxXAAIAA8HMA2/AAAIAAcHI3ZAAIAAFUIAAC7AVdI1IAABvIEpDmAVdrhIAAUWAlgI1Ia9AAEg7IATnIYEqyIPVAAIAADLAzvDhIAAFUAzvDhIOPAAA3lMkIUfAAEg7IATnMB2HAAA");
	this.shape_3.setTransform(378.475,157.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,777,559.8);


(lib.chopes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,215.5,171);


(lib.chair = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("A/wYoQgei4gHkXQgPouBvncQCmrDGrmdQIaoIOZgOQODgNH2HlQGRGFCDKwQAQBTALBXQA5GngrHrQgaEogsDGg");
	this.shape.setTransform(207.2026,157.6317);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#660000").s().p("EggVAEdQgPotBvncICLBMQC4BZDgBMQLLDwNHAAQNIAAJsjPQDChBCUhOQBKgnAjgaQA5GmgrHqQgaEogsDGMg+vAAZQgei5gHkXg");
	this.shape_1.setTransform(207.2026,240.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#990000").s().p("A2zM8QjfhMi4haIiMhLQCnrDGqmdQIboIOYgOQODgNH2HlQGSGFCCKvQAQBVAMBXQgkAahJAmQiVBOjCBBQpsDQtIAAQtHAArLjwg");
	this.shape_2.setTransform(210.475,106.8067);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,424.4,325.3);


(lib.armcominoutofventreal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-58,-187.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-187.9,116,376);


(lib.arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AMIBBI2rGFIhZlLAsABqIgHgXArfBJIIOoOID4D5IheBgILcjF");
	this.shape.setTransform(77.6,45.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ar8B7IgLgLIAGgGIgGgXIAogLIINoNID4D5IheBgILdjFIBjFyI2rGFg");
	this.shape_1.setTransform(77.6,45.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,175.2,110.8);


(lib.anotherarm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(23,1,1).p("ACoBFQhCC0hgBsQheBshHgcQhFgdgDiUQgCiUBCizQBBi1BhhsQBfhsBGAcQBGAdACCUQACCUhCC0g");
	this.shape.setTransform(412.1484,575.5239);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AifG1QhFgdgDiUQgCiUBCizQBBi1BhhsQBfhsBGAcQBGAdACCUQACCUhCC0QhCC0hgBsQhLBWg8AAQgPAAgPgGg");
	this.shape_1.setTransform(412.1484,575.5239);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(386.5,519.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAAMYIgCAAIgYgBQjygLitjcQi2joAAlIQAAlHC2joQCujdDzgLIAYAAIAAAAIAZAAQDyALCtDdQC5DoAAFHQAAFIi5DoQitDdjyAKIgZABg");
	this.shape_2.setTransform(70.8,405.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_22();
	this.instance_1.setTransform(-10,-10,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_21();
	this.instance_2.setTransform(1.8,345.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,586,692.8);


(lib.aimbotmouse = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(16.6,1,1).p("ABTAAQAAAigZAYQgYAZgiAAQgiAAgYgZQgYgYAAgiQAAgiAYgYQAJgJALgGQARgJAVAAQAiAAAYAYQAEAEAEAEQARAWAAAcg");
	this.shape.setTransform(115.95,133.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(13.2,1,1).p("ABCAAQAAAcgTATQgTATgcAAQgbAAgTgTQgTgTAAgcQAAgbATgTQATgTAbAAQAcAAATATQATATAAAbg");
	this.shape_1.setTransform(299.4,180.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(20,1,1).p("AUJK0QAtgYA3AAQBYAAA/A+QAJAJAIAKQAuA5AABMQAABYg/A/Qg/A/hYAAQhZAAg/g/Qg+g/AAhYQAAhZA+g/QAYgYAcgOQn+htsNisQn/hvn9hxAoWstQEpAwFUBpQU0GcIbJRQCsC+BEC6QAXA9AIA1QAGAlgDALQgDALqwiRAwvtTQgBgRADgZQAHgyAYgoQBKiBDNAUQDNAUAeCEQAQBCgaA9A8DAQQjjgxjigzQAJguAdhFQA6iLBnh1QFJl3KJgVQD4gIEhAuA8DAQQA0gcBBAAQBnAABIBHQANANALAOQAxBAAABUQAABnhJBIQhIBJhnAAQhmAAhJhJQhIhIAAhnQAAhmBIhJQAbgaAfgRgAxnCkQiwgniwgn");
	this.shape_2.setTransform(224.85,109.5403);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ATVQJQg/g/AAhYQAAhZA/g/QAYgYAbgOQAtgYA3AAQBZAAA/A+IARATIgRgTQg/g+hZAAQg3AAgtAYQn+htsNisIv7jgQARAWAAAdQAAAigZAYQgXAZgjAAQgiAAgZgZQgYgYAAgiQAAgjAYgYQAJgJAMgGQARgJAVAAQAjAAAXAYIAIAIIgIgIQgXgYgjAAQgVAAgRAJIlhhOQAxBAAABUQAABnhIBIQhJBJhnAAQhmAAhIhJQhJhIAAhnQAAhmBJhJQAagaAfgRQA1gcBAAAQBnAABJBHQANANAKAOQgKgOgNgNQhJhHhnAAQhAAAg1AcInFhkQAJguAdhFQA7iLBmh1QFJl3KJgVQgBgRAEgZQAHgyAXgoQBJiBDNAUQDOAUAeCEQAPBCgaA9IgEgBIgGgBIgHgBQjrgkjRAAIgBAAIAAAAIhFABIgCAAIgDAAIADAAIACAAIBFgBIAAAAIABAAQDRAADrAkIAHABIAGABIAEABQEqAwFUBpQU0GcIaJRQCtC+BEC6QAXA9AHA1QAHAlgDALQgEALqviRQAtA5ABBMQAABYg/A/Qg/A/hZAAQhYAAg/g/gAK6L0QgTgTAAgcQAAgbATgUQAUgTAcAAQAbAAATATQAUAUAAAbQAAAcgUATQgTATgbAAQgcAAgUgTg");
	this.shape_3.setTransform(224.85,109.5403);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,469.7,239.1);


(lib.enemy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(20,1,1).p("AroikIXRAAQBEAAAwAwQAxAwAABEQAABEgxAwQgwAxhEAAI3RAAQhEAAgxgxQgwgwAAhEQAAhEAwgwQAxgwBEAAg");
	this.shape.setTransform(2.025,153.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AroClQhEAAgxgwQgwgxAAhEQAAhDAwgxQAxgwBEAAIXRAAQBEAAAwAwQAxAxAABDQAABEgxAxQgwAwhEAAg");
	this.shape_1.setTransform(2.025,153.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(20,1,1).p("AEEE8IAAk3IsuAeIAAleIRVAAIAAJE");
	this.shape_2.setTransform(-110.45,110.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(10));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(20,1,1).p("AIIAAQAADXiYCZQiYCYjYAAQjWAAiZiYQiYiZAAjXQAAjXCYiYQCZiYDWAAQDYAACYCYQCYCYAADXg");
	this.shape_3.setTransform(75.95,52);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AlvFvQiYiXAAjYQAAjXCYiYQCYiYDXAAQDYAACXCYQCZCYAADXQAADYiZCXQiXCZjYAAQjXAAiYiZg");
	this.shape_4.setTransform(75.95,52);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},9).wait(1));

	// Layer_4
	this.instance = new lib.Tween10("synched",0);
	this.instance.setTransform(94.1,284.05,1,1,35.723,0,0,0.1,-75);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-0.1,regY:-74.9,rotation:-44.9988,x:94,y:282.3},4).to({regX:0,regY:-79,rotation:44.9994,x:93.95,y:280},5).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(20,1,1).p("AAAzSQDbAACbCbQCcCcAADbIAAWBQAADbicCbQibCcjbAAQjaAAicicQibibAAjbIAA2BQAAjbCbicQCcibDaAAg");
	this.shape_5.setTransform(74.95,183.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Al2Q3QibibAAjbIAA2BQAAjbCbicQCbibDbAAQDcAACaCbQCcCcAADbIAAWBQAADbicCbQiaCcjcAAQjbAAibicg");
	this.shape_6.setTransform(74.95,183.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5}]}).to({state:[{t:this.shape_6},{t:this.shape_5}]},9).wait(1));

	// Layer_3
	this.instance_1 = new lib.Tween11("synched",0);
	this.instance_1.setTransform(72.55,285.05,1,1,-39.2392,0,0,0,-71.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:0.1,regY:-72,rotation:44.9994,x:72.5,y:285.1},4).to({regX:-0.1,rotation:-45,x:72.45,y:285.05},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175.9,-10,404,471.7);


(lib.characterfrontview = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.eyes("synched",0);
	this.instance.setTransform(308.4,255.2,1,1,0,0,0,140.4,61.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("EgxHAAQMArBgAOMA3OgAR");
	this.shape.setTransform(314.4,645.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(9,1,1).p("EAXvgroIAIAtEAGHgsnIgCA5EgNAgsvIgCA7A84YAQhKCGAtAyQAlArCgAJQBjAGEcAKQA3ADA2AGQDeAVDGAuICBBRQCYBoB4ByQCICCBLB+QApBFAXBBQAnBygLBvQgEAsgMAqA8GGdIH+AAIAAC7IqcAAIAAi7gEgf1AiwQgFA2gKAEQgJAEgLgkQgBgFgBgDQgWhXACiPQADi2Azh5QBAiaCAgTAs6OiQjLA6jmBoQnLDRiCDrEAiJAW6QBKCGgtAyQgkApiXAKEAl1AcSQgNhhgfhKQhAiaiAgTEAgcAa/QjeAVjFAuIiBBRQiZBoh3ByQj5DvguDhQgQBMAHBLASLNcQDLA6DmBoQHLDRCCDrEgjQgHfIHKN8Egl0gIfIHQO8EgBcAn5QJEDjHZjf");
	this.shape_1.setTransform(281.725,367.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(20,1,1).p("Egp/gUWQgJh5Abi1QA3lpBslrQBrlqHwkCQHwkBRbgbQRbgaIKEeQIJEeCFGAQCFF/BMFNQAmClgCBuIBMAzIAAPYIjYAIIAAlkEAjEgUfIiMhdIAAGoIAAFkEASxgkAQAIA4ADA+QAGDGhACvQhZD0jZCiQkPDMnJA/Ig4z4Ab8wYQAEBJAABLQAADhgqDQIFiidAb8wYIE8BEAbWnTQh1I+m5G4QiNCNiZBrQn4FgqJAAQqTAAn9lqQiShoiHiGQpXpXAAtQQAAhNAFhLQACghAEghQBDrFIJoKQJYpXNRAAQNQAAJXJXQIjIjAxLyEgSJgk5QgEBLgJBRQgcEChGDYQhODzh6CgQgdAnghAhQjNDZksADIkDgQEAA/gkzQgEBJgLBOQgjD6hfDQQiEEjjqClQilB1jSAyQgjAJgkAGQiEAYiVAAIACiVIAOyjEgp/gUWIBohOIAAFAIAAIAID4DAEgp/gUWIjgCqIAAPIICkBAICkBAIAAoAEgoXgQkIEjg6A2PMRIAhAuQApA7AlBCQB2DUAqDNQBDFOiaEAQhXCRi8CEQiQBjj+B3QiRBFkzCLIAAABQgSAIgTAJQjuB1idBsQjaCWiBCwAOCMbQgWARgdAiQg5BGgfBaQhlEiC+GLQBiDLF3CHQCCAwDmA+QAKACAKADQFHBZArANQAMADAMAEQHKCJDnCtQFFDzAjGN");
	this.shape_2.setTransform(314.4,323.4628);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EgrsArOQCdhsDuh0IAlgSIAAAAQEyiMCRhEQD/h4CPhjQC9iDBXiSQCakAhDlOQgpjNh3jTQgmhDgog7IghgtQH9FpKTAAQKJAAH4lfQn4FfqJAAQqTAAn9lpQiShoiHiHQpXpXAAtQQAAhNAFhLIEDAQQEsgDDNjYQAhgiAcgmIEsBeIAOyjIgCA7QgEBLgJBRQgcEChGDYQhODzh7ChQgcAmghAiQjNDYksADIkDgQQACghADghQBFrFIIoKQJZpXNQAAQNPAAJYJXIAIAtIgIgtQIjIkAwLxQAFBJAABLQAADhgrDQQh0I/m5G3QiOCNiYBsQgWAQgdAiQg5BGgfBaQhlEiC+GLQBiDLF3CIQCCAvDmA+IAUAGIFyBlIAYAHQHKCJDnCtQFFDzAjGNMg3PAASQADgYAAgZQAAhXgfhaIAGADIACAAIAHADIAEACQEbBrEAAAIAAAAIAAAAQEFAADqhuQgLAzAAA0QAAAYACAYQgCgYAAgYQAAg0ALgzQAujiD5juQB3hzCZhnICBhRQDGgvDdgUQjdAUjGAvIiBBRQiZBnh3BzQj5DuguDiQjqBukFAAIAAAAIAAAAQkAAAkbhrIgEgCIgHgDIgCAAIgGgDQAfBaAABXQAAAZgDAYMgrAAAOQCCiwDZiWgEgRHAh0ICBBRQCYBoB4ByQCICCBLB+QApBEAXBBQgXhBgphEQhLh+iIiCQh4hyiYhoIiBhRQjFgvjfgUQDfAUDFAvgEglMAoWIABAAIAAAAIAAAAQAKgFAFg1QgFA1gKAFIAAAAIAAAAIgBAAIAAAAIgBAAQgHgBgIgXIAAgCIgCgFIgBgBIgCgIIACAIIABABIACAFIAAACQAIAXAHABIABAAIAAAAgAyQzLQCQAACBgYQAkgGAkgIQDRgzCmh1QDpilCGkjQBejQAjj6QALhOAEhIQgEBIgLBOQgjD6heDQQiGEjjpClQimB1jRAzQgkAIgkAGQiBAYiQAAIgBAAIAAAAIgDAAIAAAAIgDAAIACiVIgCCVIADAAIAAAAIADAAIAAAAIABAAgAB40DQHIg/EQjMQDZiiBZj0QA6ieAAiyIgBglQgCg9gJg5QAJA5ACA9IABAlQAACyg6CeQhZD0jZCiQkQDMnIA/Ig4z4gEAA/gnBIABg6gEgjrAOEIAAi7ICeAAIH+AAIAAC7gEASogm8IAAAAg");
	this.shape_3.setTransform(314.4,337.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,-10,648.8,668.7);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"aww eee":9,eeeeee:21,"i am":46,im:50,blank:54,ch:59,trying:62,"to ":77,shoot:82,"this":93,man:99,"who is":119,planting:132,the:141,c4:146,but:170,"i cannot aim":184,what:250,"do":258,i:264,"do":268,kid:321,take:330,"this":337,wow:400,"this mouse":418,"i":445,"no longer":455,have:469,"to aim":476,or:534,"have":541,skill:546};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,719];
	this.streamSoundSymbolsList[0] = [{id:"hahagamingwav",startFrame:0,endFrame:720,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("hahagamingwav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,720,1);
	}
	this.frame_719 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(719).call(this.frame_719).wait(1));

	// even_further_foreground
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(20,1,1).p("EA9gAAAQAAUoyBOlQyAOl5fAAQ5dAAyBulQyBulAA0oQAA0nSBulQSBulZdAAQZfAASAOlQSBOlAAUng");
	this.shape.setTransform(476.65,352.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(20,1,1).p("EA9gAAAQAAUoyBOlQyAOl5fAAQ5dAAyBulQyBulAA0oQAA0nSBulQSBulZdAAQZfAASAOlQSBOlAAUngA32iSQAAHSlcFKQlbFKnrAAQnsAAlclKQlblKAAnSQAAnSFblKQFclKHsAAQHrAAFbFKQFcFKAAHSg");
	this.shape_1.setTransform(476.65,352.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgGChIgGgCIg3gWIg3gWIg3gWIgzgWIg1gYQgNgGgPgEIgIgDIgHgEIgHgFIgHgEIgGgEIgHgEIgFgDIgFgDIgGgEIgEgDIgFgFIgDgFIgDgGIgDgHIgBgGIgBgIIgBgHIAAgIIAAgIIACgIIABgGIACgHIADgGIAGgHIAFgHIAGgFIAGgEQAogTAtgEQAwgDAvgLQA7gOA8AAQBGABBFAHQA6AGA2ASIAJACIAJADIAGACIAGADIAFADIAHAFIAHAEIAHACIAHACIAHACIAGACIAEABIgBAAIACAAIgBAAIANACIARADIARAFIAPAFIAOAGIALAGIAGAEIAEAEIAFAGIAFAGIAEAHIADAHIABAIIABAHIgBAIIgCAIIgCAGIgDAGIgEAJIgEAIIgFAIIgEAGIgGAGIgGAFIgGAFIgFADIgFAEIgGADIgGACIgIACIgJACIgIACIgOAFIgQAEIgSAEIgSAEIgSACIgSABIgRAEIgRADIgTACIgTABIgSAAIgSAAIgTAAIgUAAIABAIIgBAIIgBAIIgCAGIgDAFIgEAGIgEAFIgFAEIgFADIgGADIgGADIgHABIgHABIgGgBgAh6g5IgaAGIgZAFIgaAFIgSACIgJABIAoAUIAtASIAlAPIAlAPIAbALIACgGIADgHIAEgFIAEgGIAFgEIAFgEIAGgDIAHgDIAFgBQARgBARAAIAkAAIAbAAIAaAAIASgBIASgCIARgDIASgCIASgCIAGgBIgHgCIgHgDIgHgDIgHgEIgHgEIgHgEIgIgCIgGgCIgGgCIgGgDIgRgEIgRgEIgRgDIgTgDIgRgDIgIgBQgXgCgWABIgpAAIgeAAIgcAAIgiABg");
	this.shape_2.setTransform(402.9125,193.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ACfE1IgHgBIgGgDIgGgDIgGgEIgHACQg5ADg4gIQgqgHgogQQgygTgtgdIhcg6QgvgdgugeQgTgMgWgRIgFgFIgDgGIgFgHIgFgHIgEgIIgDgIIgDgIIgCgRIAAgQIAAgHIABgIIACgHIABgIIACgIIACgIQABghAMgeQALgZATgVIApgrQAVgWAXgUQAVgSAagIIAmgLQAcgMAcgIQAXgGAXgBQAagBAZADQAaACAZADIAsAHIAbAFQAkABAhANIArASIA3AXIAyAUQAYALAVAQQAOALAMAPIADAFQAQAbAKAeQAKAaAIAbQAIAcAAAdIAAA7QAAAdgGAbIgKAnIgEAGQgKARgPAOQgMAMgNAJQgNAJgPAHQgQAIgQAGIgrAQQgOAGgOAHIgHAGIgHAGIgHAFIgHADIgGADIgHACIgGACIgGABIgHgBgAhPjQIgTAAIgQAFIgPAEIgPAEQgMAEgLAFQgLAFgNACIgTAFIgEADIgEADIgMAKIgLAMIgMALIgMAMIgNAOIgNANIgGAHIgEAGIgDAGIgDAGIgCAGIgBAFIAAAJIgBAIIgBAIIgCAJIgCAIIgCAJIgCAJIAAAEIADAEQAkAcAoAVQAiATAhAVQAtAfAvAbQAkAUAnAOIAoAMIASAAIASAAIAJAAIAQAAIARAAIAIAAIAJAAIAHACIAIAEIAGAEIAUgPQAKgGAKgEIAWgKIAZgKIARgGIARgGIAHgEIAIgEIAHgFIAHgEIAFgEIAEgFIACgDIABgCIACgFIABgFIACgHIACgGIABgGIAAgTIAAgSIAAgTIAAgRIAAgRIgBgPIgCgJIgDgJIgDgJIgDgIIgDgIIgCgIIgDgIIgDgIIgEgIIgEgJIgFgIIgEgEIgFgFIgbgMIgdgOQgPgHgQgFIgagJIgagLQgLgFgKgHIgIgCIgIgCIgIgCQgSgBgRgDQgPgEgPgCIgggEIgjgFQgPgCgPAAIgHABgAlsBhIABAAIAAABIgBgBg");
	this.shape_3.setTransform(403.0518,181.9958);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ai3FsIgHgBIgIgDIgGgEIgHgFIgFgGQgbg8gHhDQgDgggGggQgMhCgEhDQgEhDAKhDQAJhDAZg/QAOglAUgjIAFgGIAGgFIAGgFIAHgEIAGgEIAHgEIAHgDIAfgKQARgFARgBQAQgCARAAIAjABQAPAAAMADQAQAHAQAEIAgAKQASAFAQAIQAQAJAPAKQALAIANAFIAHADIAHACIAGADIAIAGIAHAFIAHAGIAGAGIAFAFIAGAGIAEAGIAFAEIAEADIAEAGIAEAFIAEAFQARAmAJAoQAKAsABAtQAAAigMAfQgNAmgRAlQgQAkgcAbIgYAbIgFAHIgFAHIgFAGIgFAHIgFAGIgEAGIgEAGIgFAGIgFAFIgEAFIgFAFIgGAEIgGAEIgHAEIgGADIgGAEIgGADIgHAGIgHAFIgIAFIgGAEIgGACIgGADIgGACIgFACIgFABIgDACIgHAFIgIAFIgFADIgGACIgHACIgGAAIgHgBIgGgBIgGgCIgGgDIgGgEIgEgEIgFgFIgDgFIgEgHIgCgIIgBgIIAAgIIACgHIACgHIADgFIADgFIAFgFIAEgEIAGgEIAGgFIAHgEIAGgEIAGgEIAIgDIAJgDIAIgDIADgCIAIgFIAIgGIAHgGIAIgEIAHgDIAEgDIAPgSIAOgTIAQgVIARgTIARgSIAJgOIAIgPIAGgPIAGgPIAFgOIAHgRIABgDIABgCIAAAAIAAAAIAAgBIAAAAIABgBIAAgCIAAAAIABgIIAAgIIAAgIIAAgIIAAgIIAAgKIAAgJIgBgKIgCgGIgBgHIgCgHIgCgJIgCgJIgCgGIgCgHIgCgJIgDgIIgGgGIgFgGIgFgHIgGgFIgGgGIgJgEIgQgHIgQgJIgPgJIgMgIIgNgGIgIgDIgIgCIgIgCIgJgCIgJgDIgGgCIgHgDIgHgDIgBgBIgBAAIgBAAIgBAAIgDgBIgIgBIgJAAIgJAAIgIAAIgIAAIgIABIgIAAIgIACIgHACIgIACIgIACIgHACIgEABIgUApQgNAcgFAfQgDAcgFAcQgFAcgBAdIAAA1IABAlQAFAYADAaQADAcAGAbIAIAsQAEAUACAUQADAUAEATIACAIIADAGIADAGIACAHIAAAHIAAAHIgBAGIgCAHIgCAGIgEAGIgFAGIgGAFIgHAEIgHADIgIABIgHABIgIgBgAh3kCIgBABIABgCIAAABg");
	this.shape_4.setTransform(421.6029,179.545);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AA1DnIgIAAIgHgBIgIgBIgIgBIgHgDIgHgDIgHgEIgGgEIgHgBIgGgCIgCAAIgHADIgHADIgHABIgJACIgJABIgBAAIgHABIgGABIgHgBIgGgBIgGgCIgGgDIgFgDIgFgEIgFgFIgDgGIgDgFIgDgHIgBgIIAAgIIgHgDIgCAAIgzgSQgZgIgZgMQgZgLgVgRIgmgdIgCgCIgCgBIAAAAIgBgBIAAAAIAAAAIgCgBIABAAIgEgCIgHgFIgIgGIgHgFIgHgGIgFgFIgEgGIgEgGIgEgHIgCgFIgDgEIgDgHIgEgMIgDgUIgBgaIAAggQAAgMABgLQAAgOADgOIACgFIACgFIADgGIADgHIADgHIAEgHQAygwBGgCQBMgDBLAAQBCAABBgCQBmgDBkARIAPACIAGADIAGACIADABIAHABIAHABIAHABIAHADIAGADIAGAEIAGAFIAFAFIAHAEIAHAFIAHADIAHAEIAGAFIAFAFIAFAFIAFAGIAFAFIAEAEIAEAGIACAGIADAGIACAGIACAHIABAHIAAAJIABAIIgBAJIgBAJIgBAIIgDAHIgEAIIgDAHIgDAGIgEAHIgFAFIgEADIgFAEQgSAXgXATQgcAVgdATIg9AmQgaAQgcALIgRAGIgHAFIgIAEIgIAFIADAGIACAGIACAHIAAAGIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgHAAIgHAAgAkLgNIABAAIACABIABABIAAAAIADADIACABIABABIABABIABAAIAmAcQAUAPAYAJIA2ATQAbAIAZAMQATAJATAIIAIgDIAHgDIAHgCIAIgDIAJgDIAIgDIAJgDIAJgDIANgIIAHgEIAHgEIAHgEIAGgEIAGgDIAHgDIAOgFIAHgDQAUgJASgMIAlgVIAmgZQASgNARgPQAPgOAOgQIACgCIgGgDIgFgEIgFgDIgHgFIgHgFIgGgFIgKgBIgJgCIgHgCIgHgDIgBAAIgJgCIgKgBIgKgBIgIgCIgJgCIgIgBQgpgCgpABIheAAIhUAAIhSAAQgnAAgmABIgCAAIgHAEIgIADIgIADIgIADIAAABIgBAKIgBAJIAAAIIAAAIIAAAJIAAAJIABAJIAAASIAEAHIAGAEIAFAEIAEADIAAAAIAAAAIACABIAAAAIABABIgBAAgAlJA/IAAAAIABAAIgBAAIAAAAgAkCgGIACABIABAAIgBAAIgBgBIgBgBIAAABg");
	this.shape_5.setTransform(417.9667,185.9201);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkB9IgIAAIgJAAIgJgCIgIgBIgIgCIgHgCIgIgCIgJgCIgIgCIgIgCIgJgCIgIgCIgJgBIgIgBIgIgCIgIgCIgIgCIgFgCIgIgBIAAAAIgJgBIgIgBIgHgCIgIgDIgHgDIgGgBIgHgCIgHgDIgFgDIgHgEIgHgFIgGgEIgGgEIgFgEIgEgFIgDgFIgEgGIgFgGIgFgHIgDgHIgCgHIgBgIIAAgGIACgIIACgHIADgHIgUAAIgTAAIgUAAIgKAAIgKAAIgGAAIgHgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgBgGIgBgHIABgGIABgHIACgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAHgBQBWgBBXAAIDGAAQBTAABUACQBgACBfAPIASACIAHABIAFACIAHADIAHAEIAGAEIAHADIAFAEIAEAEIAFAFIAEAEIAGAFIADAGIAEAFIADAFIABAFIACAJIAAAJIgCAJIgBAHIgCAHIgEAFIgDAFIgFAGIgFAEIgGAEIgFAEIgGAGIgIADIgHADIgHADIgKACIgKABIgJABIgIAAIggAJIgjAIIgkAIIghAJQgQAEgRACIgSACIgRAEIgRAFIgRAEIgPADIgQAEIgRAFIgNAFIgNAFIgPACIgNABIgQAAIgQAAgAi5BgIABAAIgCgBIABABgAjXgTIAEAEIAFAEIAHABIAFACIAGADIAEACIAEAAIAIABIAJABIAIABIAGACIAHACIAIACIAQACIAIABIAJACIAJACIAJADIAJACIAJACIAGACIAHACIAGABIAJAAIAKABIAJAAIAJgBIAJAAIAigMQATgGASgEIAmgIQASgFASgCQARgBASgFIAQgEQgugDgtABIhPAAIhWAAIhVAAIhJAAIADAFgAitgBIACAAIgCgBIgBAAIABABg");
	this.shape_6.setTransform(415.4,189.5417);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("ADkBLIgTAAIgUAAIgTAAIgTAAIgKAAIgaAAIgaAAIgcAAIgbgBIgYgCQgKgBgIgDIgHgDQgPAAgOgCQgOgBgNgEQgPgEgPgCQgTgDgRgGQgUgIgVgEIgZgFIgFADIgGAEIgFAFIgFAFIgFAEIgGADIgHADIgHABIgHABIgGgBIgHgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgFIABgHIABgGIADgHIADgGIADgFIAFgEIAFgFIAGgEIAGgFIAHgDIAGgEIAIgEIAIgFIAGgEIAHgCQAQgEAQACIAiAGIAfAIIApALIApAJIARAEIAJAAIAIABIAJAAIAIABIAIACIAGABIAGACIAGADQATABATAAIAuAAIAuAAIA3AAQAagBAaABIAHACIAGACIAGADIAFADIAFAFIAEAEIAEAFIADAFIACAHIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABIgQABIgTAAg");
	this.shape_7.setTransform(416.675,183.5886);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAgC9IgIgCIgIgEIgGgEIgFgEIgEgFIgCgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgGIADgGIADgGIAFgGIAFgGIAFgFIAFgEIAGgFIAGgEIAGgGIAHgFIAEgCIAFgDIAGgFIAGgEIAGgFIADgIIACgJIAAgSIAAgSIAAgRIAAgRIAAgQIgBgCIgDgHIgHgDIgHgDIgIgEIgHgEIgGgDIgGgDIgGgDIgFgCIgDAAIgIgBIgJAAIgIAAIgIAAIgJAAIgIAAIgHAGIgGAFIgGAEIgGAEIgGAEIgFAFIgEAEIgFAFIADAHIAFAIIAGAHIAFAIIAEAGIADAFIADAGIACAFIADAJIACAIIAEAHIAEAGIAFAHIAEAGIADAFIADAGIAFAFIAEAFIADAGIACAHIACAGIAAAHIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgHAAIgHAAIgGgBIgHgCIgGgCIgHgDIgFgEIgFgEIgEgFIgEgFIgCgGIgCgGIgDgIIgJgOIgJgOIgHgPIgFgSIgGgHIgFgIIgBgCIgFgFIgDgFIgDgGIgCgFIgDgGIgCgGIgDgIIgEgIIgDgJIAAgHIgBgGIAAgHIABgGIADgHIALgWQAFgKAHgJIAPgQQAKgJALgIIAOgKIAGgFIAHgFIAGgFIAHgEIAHgEIAHgDQANgDANgBIAaAAIATAAQAPAAAOACIAIACQANAEAMAFIAUAKIASAJIAWAMIAOAIIAFAEIAEAGQAMAUAHAXQAGAVAAAXIABAyQAAAbgGAaQgEATgIARIgEAHIgFAFIgEAFIgEAFIgFAEIgFAEIgIAFIgHAFIgGAFIgHAFIgCABIgBABIgFAFIgGAEIgGADIgEAEIgFAGIgFAFIgGAEIgGAEIgGACIgHABIgHABIgJgBgAA9A8IgBABIgCABIACgBIABgBIABgBIgBABgAgYhdIABAAIABgBIgBAAIgBABg");
	this.shape_8.setTransform(425.0519,178.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AApDhIgGAAIgHAAIgGgCIgGgCIgGgDIgGgCIgIgDIgJgCIgJgDIgJgEIgJgEIgFgCIgEgCIgBAAIgHgBIgIgBIgHgBIgHgCIgHgCIgGgDIgHgCIgIgCIgGgCIgFgDIgFgDIgIgDIgIgEIgJgEIgGgEIgGgFIgFgFIgGgFIgGgCIgGgCIgGgDIgGgEIgGgFIgFgEIgEgDIgFgGIgEgGIgEgGIgFgGIgFgGIgFgHIgEgHIgDgFIgDgGIgDgFIgDgGIgCgGIgBgGIgCgCIgEgIIgDgJIgCgHIgBgIIgBgIIABgHIAAgJIABgGIABgHIABgGIACgFIAEgIIADgIIAEgIIAEgIIADgGIADgGIAFgGIAFgGIADgGIACgHIADgIIADgHIADgIIADgGIADgGIAEgFIAEgFIAFgGIAFgFIAFgFIAFgFIAFgFIAHgFIAGgEIAHgDIAGgEIAGgDIAHgEIAHgDIAIgDIAIgCIAJgCIAGgDIAHgDIAGgDIAIgCQAXgBAXAAIAvAAIAsAAIA3AAQAKAAAKABIAHABIAHACIAGADIAHADIAEACIAFABIAHADIAGADIAFAEIAGAEIAFAEIAFAEIAEAFIAEAFIACAGIADAGIACAGQAEAWAKAUIAVApQALAWAEAZQAFAcAAAbQABAagGAZIgCAHIgIANIgHAMIgEAHIgDAFIgDAGIgEAFIgHAKIgHAKIgIAJIgEAGIgEAGIgFAFIgFAFIgFADIgGADIgHACIgGABIgHABIgHgBIgIgCIgHgDIgHgEIgGgFIgFgGIgEgGIgDgIIgCgHIgBgIIABgIIACgGIACgHIAEgGIAEgGIAFgHIADgFIAEgEIAEgEIAFgHIAEgGIADgGIADgGIADgFIAEgGIACgEIADgEIAAgJIAAgKIAAgJIAAgKIAAgIIAAgKIgCgEIgKgXIgGgPIgIgPIgKgYIgHgRIgDgJIgBAAIgFgCIgFgDIglAAIgbAAIglAAIglAAIglAAIgHADIgHADIgJADIgJACIgHAEIgHAEIgHAEIgEAEIgFADIgDAFIgDAFIgCAIIgCAHIgCAHIgEAHIgEAGIgEAHIgEAHIgFAGIgFAIIgEAJIgBABIAAgBIAAABIgBACIABgCIgCAFIAAABIACACIADAGIADAHIABAIIACACIAEAHIACAFIABABIAAABIABACIABABIACABIgBgBIgBgCIgBgBIgBgBIAEAEIAFAGIAEAHIAIADIAHADIAHAEIAGAEIAFAFIAGAFIAFAEIAJADIAGADIAGADIADABIAIADIAGACIAHADIAEAAIAIABIAHACIAIABIAIADIAIADIAHAEIAIADIAJADIAKACIAGACIAHADIAGACIADAAIAHABIAGABIAHACIAFADIAGAEIAEAEIAFAFIADAFIADAGIACAGIACAHIAAAGIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgHAAIgIAAgAgsDGIACABIgBgBIgCAAIABAAgAg1DEIACAAIgCgBIgCAAIACABg");
	this.shape_9.setTransform(422.0521,177.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("ABwD1IgJAAIgIAAIgIgBIgHgBIgIgBIgIgCIgHgDIgHgDIgIgEIgHgEIgIgBIgIgCIgHgBIgHgDIgFgEIgHgEIgPgEIgQgDIgRgEIgPgDIgNgCIgMgDIgGgCIgHgDIgFgDIgPgFIgQgHIgPgIIgPgIIgPgHIgPgIIgHgEIgLgHIgKgJIgKgJIgKgJIgLgMIgLgNIgEgGQgHgNgEgOIgHggQgDgQAAgQIAAgkQgBgSADgTIABgIIADgIIADgHIACgIIACgIIADgGIADgGIADgFIAFgGIADgFIAFgFIAFgFIAHgFIAFgGIAEgFIAHgFIAGgEIAHgGIAIgFIAIgFIAHgFIAJgFIAHgFIAIgDIA1gKQAggHAhABIBAAAIBFAAQAYAAAWAJIAIACIAIACIAGACIAFADIAFADIAIADIAIAEIAJAEIAFAEIAFAEIAFAEIAFADIAFADIAHACIAHABIAHADIAGADIAFAEIAIAFIAGAFIAEAEIAFAFIADAEIAFAEIACAFIAGANIAEANIAFANIADAOIADAOIAFAOIABAHQAEATABAUIAAAfIAAAsIABAlQAAAWgDAWIgCAIIgCAHIgCAHIgDAIIgCAIIgCAHIgEAGIgEAFIgEAGIgDAEIgDAEIgDAGIgDAFIgDAGIgEAEIgFAFIgFADIgHAEIgIACIgIABIgIAAIgIgCIgGgCIgGgDIgGgEIgEgEIgFgGIgDgFIgEgGIgCgHIAAAHIgDAGIgDAGIgEAFIgDAFIgGAFIgFADIgFADIgHACIgGACIgHAAIgIAAgAhUiPIgKAAIgGABIgHACIgGABIgKACIgKACIgJABIgHAFIgGAEIgGAFIgGAEIgHAEIgEAFIgEAFIgFAFIgFAEIgCAGIgDAGIgCAGIgBAKIAAAKIAAAKIAAAKIABAKIAAAKIAAAJIACAGIADAHIACAHIABAFIABAFIAHAGIAHAHIAGAGIAHAGIAMAHIAGACIAEADIAFACIAGADIAGADIAOAHIAEADIAGADIAFADIAHADIAIACIAHADIAIADIAWAFIAbAFIAYAGIAQAFIAQAGIAGAEIAHABIAHACIAHABIAGADIAHADIAHAEIAGAEIACAAIAIAAIAJAAIAIAAIAHABIAGABIAHACIAFAEIAGADIAFAFIAEAFIAEAFIADAHIACAGIABgHIADgIIACgIIADgHIAFgGIAFgGIAGgGIABgIIACgGIADgGIAAgdIAAgdIAAgmIAAgaIgBgbIgCgIIgCgIIgCgHIgCgHIgCgHIgCgJIgCgJIgDgIIAAgBIgEgBIgJgCIgHgDIgIgEIgGgDIgGgEIgGgEIgFgFIgGgEIgJgDIgGgCIgGgDIgDgCIgHgCIgGgCIgBgBIgFgCIglAAIgmAAIgjAAIgbAAIgdABgABYCPIACABIgCgBIgBgBIABABg");
	this.shape_10.setTransform(412,178.5188);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhWFKIgGgBIgGgDIgGgCIgFgEIgFgEIgEgFIgEgFIgDgFIgCgGIgCgGIgFgQIgFgRIgEgRIgDgRIgDgQIgDgLQgMgXgLgXQgQgigKgkIgThDQgJgggGgiQgFgaABgaQABgMADgMIACgGIADgGIACgIIADgJIACgHIADgGIACgHIACgHIACgGIADgFIADgFIACgEIACgGIADgGIADgEIADgEIAEgGIAEgGIAEgGIAFgFIAFgEIAGgEIAHgEIAIgEIAGgEIAHgDIAGgEIAGgEIAFgEIAHgFIAIgEIAHgDIAHgEIAHgDIAIgCIAJgDIAGgCIAHgDIAIgCIAHgBIAHgBIAHgBIAHAAIAQgEIAOgDIAPgCIAegCIAUAAQAMAAAMACIAHABIAHADIAGADIAGAEIANAJIANAKIALALIAKANQAGAHAEAIQAFAMAHAMIAIANIACAGIACAGIADAFIADAGIACAFIACAIIABAIIABAIIABAIIACAJIACAIIACAJIACAIIACAIIACAJIACAHIACAHQADAPABAPIABAjIAAArIAAAtIgBAeIAAAIIgCAHIgGANIgDAGIgEAHIgEAHIgDAHIgFAHIgJANIgLAMIgEAFIgFAEIgFAFIgFADIgHAEIgGADIgHAEIgHADIgHACIgDACIgGADIgHACIgGACIgHACIgIABIgIAAIgHgBIgIgCIgHgDIgGgEIgFgEIgEgFIgDgFIgDgGIgCgGIgCgIIAAgIIABgIIACgHIAEgIIAEgGIAFgFIAGgFIAHgEIAIgDIADAAIAFgDIAFgDIAGgCIAFgBIAGgCIABgBIAEgEIAFgFIAEgFIAEgFIADgGIADgGIACgEIAAgbIAAgbIAAgZIAAgkIgBgbIgEgQIgFgSIgEgSIgEgTIgCgSIgEgHIgDgIIgDgJIgDgFIgDgFIgDgGIgDgGIgDgGIgEgFIgDgEIgCgEIgEgDIgDgCIgDgBIgJgBIgJAAIgJAAIgJABIgJAAIgIACIgIACIgIACIgHACIgJABIgIABIgJAAIAAAAIgHADIgGADIgHACIgIACIgGADIgGAEIgGAEIgGAEIgHAFIgHAEIgGADIgGADIgGADIgEAHIgBADIgDAGIgDAGIgBADIgDAIIgCAHIgEAHIgCAIIgCAIIgBAGIgDAGIAAAHIAAAIIAAAIIAAAHQAGAQADAQQADARAFARQAHATAEAWQADARAGAPIAOAkIAFAIIAEAIIAFAIIAEAHIAFAIIAEAIIADAJIADAIIADAPIACALIAEATIAEARIAEANIAHAVIABAIIABAHIgBAHIgBAGIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgHAAg");
	this.shape_11.setTransform(419.0077,175.0458);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAVC6IgJgBIgIgCIgIgDIgIgDIgIgCIgIgDIgHgCIgHgDIgTgBIgcAAQgRAAgRgDQgNgCgOgDIgXgHIgOgEIgJgBIgIAAIgIgBIgIgBIgHgCIgHgDIgHgEIgigNIg2gVIgkgNQgSgHgRgJIgdgSIgNgIIgGgFIgFgFIgFgEIgGgFIgDgGIgCgGIgDgHIgDgGIgCgMIgBgOIgBgQQAAgMADgLIAEgPIAGgOIAHgNIAEgGQAIgIAKgHIAVgOIAegPIAWgKIAYgJIATgGQA+gGA/ACIB8ABIB6gBQA9gBA8AFQAsAEAsAMIAJAAIAKAAIAJABIAIAAIAIABIAHABIAIABIAIACIAHACIAHACIAKACIAIACIAHACIAIAEIACAAIAIABIAIAAIAIACIAHABIAHACIAFACIAHADIAIACIAHACIAHADIAGAEIAHAFIAEAEIAEAEIADAFIAEAIIADAJIABAGIAAAHIABAHIgBAKIgBAJIgDAIIgEAJQgDAOgHAMQgKAQgOAPIgWAUQgLAKgNAIIgcARIgaAPIgBAAIgEAFIgGADIgGADIgFACIgIADIgKACIgQAEIgPAFIgXAGIgZAFIgQADIgMADIgTAFIgHADIgHACIgHACIgHAFIgIADIgJACIgJACIgBABIgIAEIgIADIgIACIgHABIgHABIgHAAIgFAAIgFgBIgHAFIgHADIgIACIgJABIgJAAgAjCCSIACAAIgCgBIgBAAgAkphTIgJADIgHACIgIADIgIADIgHADIgHAEIgHADIgHAEIgOAIIgHAFIAAABIAAAGIAAAHIAIAFIAHAFIAJAFIAIAFQANADAMAGQARAHARAGIAaAJIAaAKIARAHIAGACIAGACIAGADIAGACIAIABIAJABIAIABIAIABIAHACIAHADIAJACIAIADIARADIAJACIATABIASAAIAZABIARACIANACIAHADIAHADIAIACIAHACIAGACIAGACIABABIAHAAIAGgEIAHgDIAIgDIAIAAIACgBIAHgDIAHgDIAJgCIAIgBIAHgEIAHgDIAHgCIAHgCIAHgDIAGgCIAHgCIAHgCIAIgBIAHgCIAHgDIAOgCIANgDIAdgHIAOgEIAPgEIAIgDIAIgBIAMgIIANgIIAPgIIAPgIIAIgEIAHgFIAFgFIAEgEIAFgFIAEgFIgGgBIgGgBIgHgCIgHgDIgHgDIgJgCIgKgCIgGgCIgIgCIgFgBQhFgEhFgLQglgGglAAIiCABIiOgBIgbAAIhQABg");
	this.shape_12.setTransform(412.95,178.485);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AEABeIgJgBIgHgDIgIgDIgHgDIgCgBIAAAAIgCAAIgGgBIgJgCIgPgDIgIgCQgbgDgagEIg2gLIgugKIgugJQgUgEgUgFIgNgEIgJgBIgKgBIgJgCIgJgCIgIgCIgHgCIgvgBIgbAAIggAAQgLAAgMgBQgLgBgMgFQgKgFgKgFIgEgFIgFgEIgDgGIgDgGIgCgGIgBgGIgBgHIABgGIABgGIACgHIADgGIAEgFIAEgFIAFgFIAGgDIAFgDIAHgCIAGgBIAGAAIAHAAIAGABIAGACIAGAEIASAAIAiAAIAZAAIAZAAIAYACIAQABIAIADIAFACIAFACIAHABIAIABIAIAAIAOADIAGADIAHACQAZAGAZAEIAsAIIArAJIAqAJQAVAEAVACIAQACIAHACIAHACIAHACIAPADIAHABIAHACIAIAEIAHABIAGACIAGACIAFAEIAFADIAFAGIAEAFIADAGIACAGIABAGIABAHIgBAHIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGACIgGACIgHACIgGABIgHAAgADnBWIABABIgBgBIgCgBIACABg");
	this.shape_13.setTransform(388.725,189.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("ADzDSIgdAAIgeAAIgdAAIgcAAIgKAAIgeAAIgeAAIgdAAIgdAAQgTAAgRgHQgQgFgPgIIgCgBIgGAAIgGgBIgGgBIgJgCIgHgDIgIgEIgHgCIgHgDIgIgDIgHgDIgGgFIgGgDIgHgBIgHgBIgIgCIgJgDIgIgDIgIgDIgHgEIgIgDIgHgFIgIgEIgHgFIgFgCIgFgBIgFgFIgGgEIgHgFIgFgEIgHgFIgFgFIgEgHIgEgHIgFgGIgGgHIgFgIIgDgGIgDgEIgDgFIgCgFIgCgGIgBgHIgBgFIAAgGIAAgJIAAgJIAAgIIABgJIABgIIABgJIACgIIADgGIAEgIIAEgHIADgEIAEgFIADgFIAEgEIAFgFIAFgEIAFgFIAGgEIAIgEIAJgEIAHgDIAIgDIAIgCIAGgCIAFgBIAXgLIAZgMQALgFAMgFIAagHQAMgDAKgEIAfgOIAIgDIAIgCIAIgCIAGgCIAGgBIAHgCIASgIQAJgEAKgCIAagBIAbAAQANAAAOAAQALABALAEIAOAFIAGAFIAFAEIAGAGIAFAGIAGAFIAFAGIAFAEIAFAGIAFAGIAGAHIAGAHIAEAIIAFAHIAUAVQALAKAIALIAWAdQAMAMAJANQAPAVANAXQAHAPAGAQIABAFIACAJIAAAJIgCAJIgCAGIgCAGIgEAFIgFAFIgGAFIgGAFIgIAEIAFAEIAGADIADAGIAFAFIACAFIACAHIACAGIAAAHIAAAHIgCAGIgCAGIgCAGIgFAGIgDAEIgGAFIgEADIgHADIgGACIgGACIgRAAIgJAAgAAahtIgIAEIgHADIgIADIgHADIgIACIgIACIgIACIgHACIgIAEIgJADIgIAEIgIADIgIADIgIAEIgJACIgHACIgPAEIgIADIgIACIgHAEIgGADIgIAEIgIAEIgHAEIgIAEIgPAFIgPAFIgHABIgEACIgDADIgCADIAAAJIAAAJIAEAHIAEAFIAFAGIAEAGIAFADIACABIAJAFIAIAEIAGAEIAHAEIAHADIAIADIAIACIAJABIAIACIAIADIAIADIAHAEIAIAFIAIAEIAGADIAGACIAHACIAEACIAIAAIAHACIAIACIAHACIAHADIAHAEIAHADIAHAEIACAAIAJAAIAJAAIAJAAIAKAAIAJAAIAKAAIAJAAIAdAAIAdAAIAdAAIAbAAIAbAAIAcAAIAJAAIgEgFIgFgEIgEgGIgDgGIgCgFIgCgHIAAgHIgBgDIgBgFIgCgEIgFgIIgFgIIgDgEIgDgFIgFgHIgFgFIgGgGIgEgHIgGgGIgFgFIgEgHIgFgHIgEgFIgGgGIgFgFIgFgGIgGgFIgFgGIgGgGIgGgIIgGgHIgCgFIgDgFIgFgGIgFgGIgFgFIgGgFIgGgGIgHAAIgIAAIgJAAIgJAAIgJAAIgJAAgAAThrIgBACIABgBIABgBIgBAAg");
	this.shape_14.setTransform(397.2,183.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgrC+IgRAAIgSAAIgPAAIgPAAIgQgBIgIgBIgHgEIgHgDIgFgDIgEgCIgHgDIgHgEIgGgDIgHgEIgHgEIgFgDIgFgFIgEgEIgEgGIgFgHIgGgGIgHgGIgDgFIgGgFIgDgFIgEgFIgDgGIgEgIIgEgIIgDgJIgCgIIgCgIIgBgJIAAgCIgDgHIgCgGIgDgPIgBgHIAAgIIAAgGIABgHIAAgHIABgIIABgHIADgHIADgGIACgGIAEgFIAEgFIAFgEIACgHIACgHIAEgHIADgGIADgGIAFgHIAEgHIAGgFIAGgFIAGgFIAFgFIADgEIAFgEIAFgEIAHgEIAHgDIAHgCIAGgCIAHgCIAQgGIAIgDIAJgCIAJgCIAHgCIAIgBIAQgCIAIgBQASgFASgDQAMgCAOAAIAXAAIAWABQAPAAAOAFIAPAFIAPAEIAGADIAHADIAIADIAHAEIAGADIAJAEIAIACIAHAEIAGAFIAFAFIAGAHIADAHIADAHIADAHIACAIQAIATAGATIAKAhQAEAPAHAOQALATAJAWIAKAbIADAIIADAGIADAFIAFAFIADAGIAEAGIACAGIAAAGIABAGIgBAHIgBAGIgCAGIgDAGIgDAGIgFAFIgEAEIgGAEIgGACIgGACIgHACIgGAAIgGAAIgHgCIgGgCIgGgCIgGgEIgEgEIgGgGIgEgGIgFgHIgDgGIgEgFIgDgFIgHADIgGADIgHACIgHABIgEACIgEADIgDAFIgEAGIgEAFIgFAFIgFAEIgFADIgHADIgHAEIgHAEIgIADIgcAGIgTADIgSACIgQACIgNAAIgTAAgAgihWIgQAEIgSADIgPADIgQADIgIACIgIAEIgIADIgIACIgDADIgEAEIgGAFIgFAHIgCAGIgBAFIgCAHIgEAGIgEAFIgDAFIgEAFIAAAGIACAGIADAFIACAJIABAIIABAIIAAACIADAGIAEAEIAEAFIAFAFIAGAEIADAFIAEAGIADACIADACIAEACIAEADIAHADIAGADIATAAIATAAIASAAIASABIASgBIAJAAIAHgCIAIgBIAJgCIAIgCIAJgCIAFgGIAEgHIAGgGIAFgGIAHgEIAGgDIAGgCIAFgFIAHgDIAHgDIAIgCIAFgBIAGgDIAFgDIgEgKIgGgQIgFgQIgFgRIgEgPIgDgIIgDgGIgDgHIgFgCIgIgEIgJgEIgEgBIgGgCIgGgCIgGgCIgGgDIgCAAIgJgBIgJAAIgKAAIgIAAIgKAAIgKAAIgNADg");
	this.shape_15.setTransform(410,180.045);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgCGQQgQAAgPgEQgOgDgNgEQgPgFgOgIQgLgFgLgIIgVgPQgKgIgJgIIgEgFIgEgFIgFgGIgEgEIgFgGIgFgEIgGgFQgdgjgHgtQgFgngBgmQgBg1ALgzIAThYQAGgZAMgXQAHgVAJgWQAHgTALgSIAUgfQAJgQAHgRQAHgQAJgQIAFgPIAGgQQAEgLAGgKIAIgNIAKgQIAFgIIAEgFIAEgGIAFgFIAGgFIAFgEIAIgEIAIgCIAIgBIAHgBIAJgBIAIAAIAQABIAIAAIAIABIAHABIAGACQAQAJANALIAlAeQARANANAQIAWAeQAQAVAGAZIADAJQAGAjAEAiQAFAqAAArIgBBdIABBWQABAggFAgIgDAIIgEAGIgDAHIgCAGIgDAFIgEAHIgGAGIgGAFIgEAGIgEAIIgDAGIgDAGIgEAGIgEAFIgEAFIgDAIIgCAGIgDAGIgEAHIgFAGIgDADIgCAIIgCAHIgDAHIgEAGIgFAGIgGAFIgGAGIgHAEIgHAFIAAAAIgFAFIgFAEIgGACIgHACIgGACIgHABIgHgBIgGgCIgCAGIgDAHIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHACIgHAAIgHAAgAAakpIgFAHIgEAHIgEAGIgEAHQgGAUgIATQgIARgHARQgJAVgMAUQgMARgKASIgIAPIgGAQIgFAQIgGAOIgGAOIgHAPQgEALgBALIgEAcIgGAcIgHAmIgBAQIAAAQIAAARIAAATIABAcIACAJIACAIIACAJIACAIIABAIIAEAGIAGAFIAFAGIAGAGIAGAHIAGAGIAGAIIAIAEIAHAGIAHAEIAIAFIAHAFIAIADIAHACIAIACIAHACIAHAAIAGAAIAHABIAHABIACgGIADgGIAEgFIAEgGIAFgFIAGgFIAFgDIACgFIACgEIACgHIADgGIADgEIAEgGIAFgDIACgHIACgHIAEgFIADgGIAFgGIAEgEIADgIIAEgHIAEgGIAEgIIADgGIAFgGIAEgFIAFgFIACgFIACgFIAAhGIAAhWIABhNQAAgcgCgcIgCgJIgCgIIgBgKIgCgJIgCgJIgCgGIgCgIIgDgHIgCgIIgMgOIgMgNIgKgKIgKgJIgTgQIgGgGIgGgDIgEAAIgBACg");
	this.shape_16.setTransform(416.4535,163.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("ABqFnIgHgBIgGgCIgGgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgIIAAgIIgGAFIgGADIgHADIgHACIgHAAIgHAAIgHgCIgHgCIgHgCIgFgDIgGgBIgFgCIgIgCIgHgDIgHgEIgHgDIgIgDIgHgEQgYgJgYgMQgYgMgVgSQgVgSgPgYIgZgrQgLgVgGgXQgEgKgDgLQgDgNAAgMQABgNAEgLIAGgVIAIgXQADgfAGgeQAFgZAHgYQAIgdANgaQAMgXAOgXIANgWIACgHIACgHIACgHIADgHIAEgHIAEgHIAFgGIAFgGIAFgHIAGgHIAFgGIAGgGIAFgFIAGgFIAFgFIAHgEIAFgDIAFgDIAHgDIAHgEIAHgDQARgFASAAIAYgBQANAAANACIAXAFIAZAGIAIADIAHADIAIACIAHACIAHADIAMAIIAOAJIANAKIAFAGIAFAGIAFAGIADAHIADAHIACAHIADAIQATAnAFAsQAFAlAHAlQAHAogBAoQAAAogEApQgCAQgFAQIgBASIgCARIgDAQIgCAIIgCAHIAAAkIAAAYQAAAPgDAQQgDAOgFANQgGAQgIAOIgDAGIgEAFIgEAFIgFAEIgEAGIgEAEIgGAEIgHAEIgEACIgFABIgEADIgGADIgGADIgHADIgGABIgGABIgHgBgAgFkCIgGADIgFADIgGAHIgHAGIgEAGIgEAFIgEAFQgDAPgGAOQgGANgJANIgIANIgJAPIgIAPIgEAHQgKAagGAcIgIAqIgGAhQgCARgGAQIgHAXIAAAAIADAHIACAGIACAIIADAIIACAHIAJAPIAEAHIAEAHIAFAHIAIANIAFAFIAFAGIAGAFIAFADIAFAEIAFAEIAFACIAFADIAQAGIAIADIAPAGIAPAHIAIAFIAKACIAJADIAHACIAGADIAHACIAGADIAGADIAFAFIAFAEIAEAGIADAGIADAGIABAHIABAHIAAABIAGgDIAGgEIAFgEIAGgDIAGgDIACgEIACgEIADgIIACgIIACgIIAAgiQgBgSACgTIACgQIAEgQIADgPIAAgIIABgKIABgJIABgJIABgGIACgGIACgHIACgHIAAgaIAAgZIAAgaIAAgSIgBgRIgHglIgGgjIgEgaIgFgbIgDgJIgDgGIgDgHIgCgGIgDgGIgCgHIgDgBIgHgFIgIgCIgHgDIgGgDIgJgBIgJgCIgHgCIgHgCIgFgBIgJgBIgKAAIgJAAIgJABgACABsIAAACIABgCIAAgBIgBABg");
	this.shape_17.setTransform(415.1023,173.02);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAREYIgIgCIgHgCIgHgDIgHgEIgJgEIgIgEIgVgHIgQgHQgNgHgLgJQgJgHgIgIQgHgGgGgHIgMgQQgegVgSghQgSgggUgfQgWghgQglQgNgfgSgeQgMgUgKgVIgBgHIgCgGIAAgHIgDgGIgEgGIgBgGIgCgHIgBgIIAAgIIgBgIIABgIIABgJIABgIIADgIIAEgIIADgIIAEgIIAEgFIAEgGIAFgFIAEgFIAGgFIAFgFIAEgFIAGgDIAFgDIAGgCIAHgDIAHgCQAfgDAhABIBJAAQApgBApAIIA8ALIAjAHIAHACIAHACIABABIAIABIAIABIAJABIAGABIAFADIAHACIAJACIAIADIAIADQAUAMASAQQAWAUAQAXQARAZATAXQAOASALAUQAKASAEATIAEAIIADAHIAEAIIADAIIAEAHIACAJIABAKIAAAHIAAAHIgCAHIgCAHIgCAHIgCAHIgDAHIgDAGIgDAGIgDAGIgEAGIgFAFIgGAGIgPAJIgPAJIgYALIgOAFIgHACIgIAEIgJAEIgIAFIgHAFIgHAFIgFACIgHACIgDADIgGADIgFACIgFAEIgHAEIgHACIgHABIgHABIgHgBIgIgCIgIgDIgGgEIgGgFIgFgGIgEgGIgEgIIgBgHIgBgIIABgHIABgGIACgHIADgFIADgGIAFgEIAEgFIAFgEIAEgEIAHgDIAIgDIAFgEIAGgDIAIgCIAHgFIAHgFIANgGIAPgHIAOgGIAPgEIAIgEIAHgEIAHgEQABgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIgDgJIgEgJIgEgHIgDgIIgCgIIgFgOIgCgDIgJgMIgJgNIgKgMIgJgNIgIgNIgFgGIgGgHIgGgHIgHgGIgGgHIgHgGIgIgGIgHgCIgJgDIgJgDQgcgEgcgGQgigJgjgGQgkgGglABIg+AAIgsAAIAAAAIgDAFIgCADIAAABIAAAAIAEAHIADAHIABAHIACAHIABAHIAWArIAbA2QANAcARAZQAOAWAOAXQALATALASIAEAEIADAEIAFADIAEAEIAGAFIAEAEIAFAFIAEAGIAJAKIAFAGIACABIAHAFIAGAFIAGACIAIACIAGACIAGADIAHADIAHADIAHAEIAHADIAGACIAGACIAFADIAFAEIAFAEIAEAFIADAFIADAFIADAGIAAAHIABAGIgBAHIgBAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgHACIgGAAIgIAAgABdj4IABAAIgBAAIgCAAIACAAg");
	this.shape_18.setTransform(420.5,181.0194);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAwC+IgaAAIgJAAIgSAAIgTAAIgTAAIgZAAIgZgBQgKgBgLgCIgFgCIgGgDIgQgEIgRgEIgQgHIgMgFIgLgHIgNgIIgNgIIgFgEIgGgFIgFgEIgFgFIgFgFIgDgHIgEgGQgFgPgCgPIgDgiIgFgnQgDgVAAgUQAAgQADgRIAGgXIABgFIACgGIABgHIADgHIADgFIADgFIAEgFIAFgGIAEgGIAFgEIAFgGIAHgFIAHgFIAGgDIAGgDIAGgCIAFgCIAFgDIAJgCIASgCIAPgBIAPgBIAOAAIAPABIAPACIAYAGIAbADIAbAHQAPAFAQADIAkAIIAlAHIAJACIAGACIAHADIAJACIAIADIAHACIAHADIAHACIAGACIAGACIAFADIAGAEIAEABIAGACIAGADIAFAFIAGAEIAFAEIAFAEIAEAFIAEAEIACAHIADAHIAFAHIAEAGIAEAGIAFAFIAEAFIADAGIAEAGIADAGIAEAHIADAHIADAGIACAHIABAIIABAIIgBAGIgBAGIgBAHIgDAHIgDAHIgFAFIgEAGIgGAGIgGAGIgEAGIgFADIgFAFIgEACIgFADIgGAEIgHADIgHADIgCABQAAAEACAEIACAIIABAJIAAAGIgCAHIgCAGIgDAGIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgHAAIgGAAIgGAAIgOAEIgNAEQgHABgIAAIgaABIgbAAgAiShYIgIAAIgCAAIgEACIAAAAIgBAAIgFAGIgCAJIgCAHIgCAGIgBAFIgBAKIAAAJIABAKIAAAKIACAIIABAIIABAIIACAJIABAHIABAIIABAHIAAAHIABAJIAIAFIAGADIAGAFIAFAEIAIACIAHADIAJACIAIACIAHACIAHADIADABIADABIAIAAIAJABIAJAAIAJgBIAIAAIAJAAIAbAAIAaAAIASAAIATAAIAbAAIASAAIACgBIAHgDIAIgDIAIgCIgCgHIgCgHIAAgIIAAgHIACgIIADgHIAEgHIAFgGIAFgEIAFgDIAHgEIAGgCIAHgBIgGgHIgFgGIgFgHIgDgFIgEgEIgCgGIgGgCIgGgEIgDgBIgHgCIgIgDIgHgEIgIgCIgHgBIgGgCIgHgEIgagEIgQgEIgRgDIgQgEIgNgDIgOgDIgVgGIgHgCIgIAAIgIgBIgIgBIgIgBIgJgDIgIgCIgJgCIgJAAIgIAAIgJAAIgIABg");
	this.shape_19.setTransform(414.4719,187.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("ABVCHIgIgBIgHgBIgFgBIgHgDIgGgCIgBgBIgJgBIgIgBIgGgCIgGgCIgHgDIgDgDIgHgCIgIgDIgNgGIgGgDIgHgDIgCgBIgFAAIgNAAIgIAAIgJAAIgIgBIgHgBIgHgCIgIgCIgHgEIgJgBIgKgBIgHgBIgHgCIgGgEIgLgBQgNgBgOABIgSAAIgYAAIgOgBIgHgCIgGgCIgHgEIgGgDIgEgFIgGgDIgDgEIgGgGIgEgGIgDgFIgCgFIgDgGIgDgGIgCgGIgDgQIgCgQIAAgKIAAgJIAAgOIAAgHIACgHIACgHIADgHIAEgHIAEgGIAHgFIAIgEIAHgEIAHgFIAHgEIAIgDIAGgDIAEgDIAGgCQAmgJAlACIBNACQAgABAgAHIAyAMQAKADAKAFQATACATgBIAvAAIAmAAQAYgBAYACIAOACIAGACIAHADIADACIAHABIAGACIAGADIAFADIAGAFIAEAFIAEAFIADAGIACAGIACAHIAAAHIAAAGIgCAHIgBAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGACIgHACIgGABIgGABIgKgBIgJAAIgJgCIgGgBIgHgCIgFgDIg6AAIgsAAIgnAAQgXAAgWgIIgGgDIgxgMQgbgGgbgBIg3gBIgqABIgJAAIgCACIgFACIgEACIAIACQALACAMAAIAPAAIATAAIARACIAIACIAHADIAHADIAIABIAIABIAIACIAIACIAHAEIAJAAIAJAAIAOAAIAGAAIAHAAIAHABIAHABIAGADIAIADIAEADIgBAAIABABIABAAIACABIACABIADACIAEABIAIADIAFACIAHADIAGACIAGADIAAAAIAGABIAGABIAJADIAJADIAFgDIAHgDIAHgBIAGgCIAGAAIADgBIAHgDIAHgEIAJgCIAIAAIAGAAIAGACIAHACIAGADIAFADIAFAFIAEAEIAEAGIADAFIABAHIACAGIAAAHIAAAHIgBAHIgCAHIgDAGIgEAGIgEAGIgGAFIgGAEIgFADIgHADIgFACIgGABIgJACIgKABIgDAAIgHAEIgIACIgHACIgIABIgMAAIgHAAg");
	this.shape_20.setTransform(414.45,186.4638);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AB8DNIgHAAIgHAAIgZAAIgZAAIgbAAIgbAAIgZAAQgQAAgPgEIgIgCIgGgDIgGgDIgFgDIgFgFIgFgEIgFgGQgWgNgSgPQgVgSgVgQQgTgPgQgTQgSgVgQgYQgMgSgHgUIgGgTIgCgGIgCgFIgCgJIgBgKIgBgIIAAgJIABgIIABgIIABgIIACgHIAEgIIADgIIAEgHIAFgIIADgHIAEgHIAEgFIAEgFIAEgFIAFgGIAEgGIAFgFIAFgGIAGgEIAGgFIAHgDIAGgEIAHgCIAIgBIAHgBIAJABIAIAAIAHABIAHABIAGAAIAGACIAGADIAGADIABAAIAGABIAFABIAIAEIAIADIAHAEIAHAEIgDgBIADABIAFACIARAFIAQAEIAPAFIAOAEIAOAEIARAEIARAEIAaACQAMAAAMADIATAGIAUAEIAUAGQALADALAFIAGACIAFAEIADABIAGADIAGACIAEAEIAFAEIAGADIAGACIAGACIAGADIAGACIAFAEIAGADIAGAEIAFAFIAEAGIAEAGIADAGIABAIIABAHIgBAGIgBAHIgCAHIgDAFIgEAFIgEAEIgFAEIgFAEIgGADIgGACIgHABIgGABIgIgBIgIgBIgHgCIgGgEIgHgEIgIgDIgJgDIgEgCIgFgCIgHgFIgHgEIgCgBIgGgDIgGgCIgEgDIgHgDIgIgCIgHgBIgIgCIgHgCIgHgCIgHgCIgHgCIgHgCIgcgCQgTgBgSgFIgegIIgegJIgkgLQgQgFgQgJIgFgCIgHgBIgGgCIgJgDIgDAEIgDADIgFAJIgEAIIgFAIIAAAHIADAFIABAGIADAJIACAIIADAGIAEAHIADAGIAFAGIAFAHIAEAGIAEAHIAGAGIAHAGIAHAFIAHAFIAHAGIAHAFIAGAFIAFAGIAFAEIAFAFIAFAEIAFAFIAHAEIAHAFIAGAEIAHAEIAGAFIAHAFIAGAEIAZABIAbAAIAbAAIAdAAIAeAAIAKAAIAJgDIAJgCIAFgCIAFgBIAFAAIAFgBIAHgCIAIgCIAHgDIAIgCIAIgBIAIgBIAHAAIAGABIAHADIAGADIAFADIAFAFIAFAGIAEAHIADAHIACAIIAAAHIAAAIIgCAHIgDAIIgEAHIgFAFIgFAFIgGADIgGADIgGACIgGABIgJADIgJADIgIADIgIABIgIABIgJACIgIADIgHACIgIABIgIABIgHABIgHAAg");
	this.shape_21.setTransform(408.525,188.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgJDNIgDAAIgHgBIgHgBIgGgCIgGgDIgGgDIgFgEIgFgEIgNgKIgHgGIgGgFIgHgFIgIgGIgEgEIgDgFIgDgGIgEgFIgEgFIgEgGIgFgGIgFgGIgFgFIgEgHIgFgGIgDgGIgCgHIgCgHIgBgJIgBgJIgCgIIgDgIIgCgHIgBgIIgCgHIgDgHIgCgGIgCgHIgCgIIgBgIIgBgFIgCgHIgDgHIgCgRIgBgRIAAgOIABgMIABgHIABgGIACgGIADgGIAEgGIADgGIAFgFIAFgFIAFgFIAGgEIAFgFIABgBIAEgFIAEgFIAFgEIAGgEIAHgEIAFgDIAGgEIAFgEIAFgDIAGgDIAGgCIAGgCIAHgBQANgBAOAAIAZAAIAVABIAUACQAMABALAEIAHADIAGABIAHABIAHABIAHACIAGACIAGADIAGAFIAFAEIAGAFIAEAGIAFAHIAGAGIAHAHIAFAGQAHAKAEAMIAFANIAEAOIAFAPIAGARIADAHIACAIIABAHIABAHIABAHIAAAJIAAAIIAAAIIgBAHIgBAGIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgHAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIAAgIIAAgIIgDgJIgGgPIgDgHIgCgHIgDgIIgBgIIgCgHIgGgFIgFgFIgGgHIgGgBIgGgBIgHgCIgIgCIgHgCIgSgBIgJAAIgJAAIgKAAIgJAAIgIAFIgGAEIgEAEIgEAEIgFAFIgGAFIAAAHIAAAHIACAHIADAFIABAJIABAIIACAIIAAACIADAHIAEAPIAFAQIADANIADANIACAIIAFAGIAEAGIAFAHIAEAGIAFAGIAEAGIAHAFIAGAFIAHAGIADACIAHAFIAHADIAGAEIAFAFIAFAGIAEAGIADAIIACAHIABAIIgBAIIgCAHIgDAIIgEAGIgFAGIgFAFIgGAEIgHADIgHACIgGABIgDAAg");
	this.shape_22.setTransform(412.0125,193.5417);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag7C3IgJgCIgHgEIgHgFIgHgFIgFgGIgGgFIgEgFIgGgFIgFgGIgFgFIgFgEIgEgFIgFgFIgGgFIgGgHIgFgHIgFgHIgEgIIgDgJIgDgEIgDgGIgCgFIgCgJIgCgJIgEgPIgDgPIgCgQIAAgQIABgOIABgOIABgFIADgGIACgHIADgGIAGgHIACgHIADgGIAEgGIAGgFIAGgFIAEgIIAEgHIADgEIACgFIAEgFIAEgFIAHgFIAHgGIAHgFIAGgDIAGgDIAGgCIAHgDIAGgDIAHgCIAHgBIAHgBIAIAAIAIgBIAIAAIAQgDIAXgEIAXgCIAVAAIAQAAIARACIAHABIAHADIAGAEIAGAEIAGAFIAFAFIAHAFIAFAGIAFAGIAEAHIADAGIADAGIABAHIACAGIADAGIADAFIAEAGIAEAGIADAHIABAGIABAHIAEAGIADAHIACAGIABAHIABAIIgBAGIgBAHIgCAGIgDAGIgEAFIgEAEIgFAEIgFAEIgGADIgGACIgHABIgGABIgIgBIgHgBIgGgDIgHgEIgFgEIgFgEIgEgGIgEgGIgDgFIgDgGIgCgGIgDgIIgBgIIgBgBIgEgHIgEgGIgEgIIgDgIIgCgHIgSAAIgSABIgSADIgRADIgTACIgKAAIgFADIgHADIgDAFIgDAGIgDAGIgDAFIgEAEIgEAFIgEAEIgCADIgDAGIgBADIgBAGIAAAHIAAAHIABAGIACAGIACAJIACAIIACACIADAIIADAIIAFAEIAFAFIAFAFIAFAFIAFAEIAFAGIAFAFIAFAGIAFADIAEAFIAFAEIAEAFIAEAGIADAGIACAGIABAGIABAGIAAAHIgCAGIgCAHIgDAGIgEAGIgEAEIgFAFIgGADIgGADIgGACIgGACIgHAAIgIgBg");
	this.shape_23.setTransform(408.5125,195.4625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhvCgIgJAAIgJAAIgJgBIgJgBIgGgCIgGgDIgGgEIgFgEIgFgEIgHgHIgGgEIgGgEIgGgEIgFgFIgGgGIgEgHIgEgGIgDgHIgDgIIgDgHIgDgHIgCgIIgBgIIAAgIIABgIIABgIIABgJIACgGIACgGIADgGIABgCIABgHIABgIIADgHIACgGIADgGIAFgHIAFgGIAEgFIAFgGIAEgGIAFgFIAFgGIAEgGIADgGQARgYAYgQQAVgNAYgIQAagKAcAAIA8gBQAigBAhAEIAHABIAHACIAGADIAHACIACACIAJACIAIADIAIAEIAHAEIAHAFIAHAFIANALIAGAGIAHAFIAFAEIAGAFIAFAEIAFAFIAFAGIAEAFIADAGIADAHIACAGIABAHIABAHIgBAHIgBAHIgCAGIgDAGIgEAFIgEAFIgFADIgGAEIgFACIgHADIgGABIAEAHIAEAHIACAIIAAAIIAAAHIgBAGIgDAHIgDAFIgDAGIgEAEIgFAFIgGADIgFADIgHACIgGACIgHAAIgEAAIgFAEIgFAGIgGAHIgGAHIgEAEIgFAEIgGADIgHACIgGACIgGABIgHAAIgJAAIgJAAIgJABIgJAAQgMACgMAFIgeAKQgQAGgQADQgRAEgSAAIgmgBgAgog5IgFABIgHACIgHADIgGACIgGACIgCABIgBAAIgDACIgGAFIgFAFIgBADIgFAHIgEAHIgGAGIgFAGIgFAFIgFAGIgFAHIAAAHIgCAGIgCAGIgDAHIgCAGIABADIAAAAIAFADIAGAEIAFAFIABAAIAJAAIAJABIAKgBIAJAAIAJAAIAJAAIASgFIARgGIASgGIAVgHQAMgDAMgBIAYgCIABAAIADgGIAFgFIAEgEIAGgDIAHgFIAHgDIAFgDIAEgBIAHgEIAGgCIAHgBIAIgBIAGgBIAHAAIgDgEIgDgFIgGgFIgHgFIgGgGIgHgFIgGgGIgGgDIgGgCIgHgCIgHgDIgHgDIgRgBIgRAAIgRAAIgTAAIgTAAIgUAAIgFACg");
	this.shape_24.setTransform(402.5125,194.0469);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("ADHBmIgHgBIgHgDIgHgDIgGgFIgFgGIgBAAIgJgEIgIgEIgIgBIgGgCIgHgDIgGgDQgigMgkgGIhIgQIhFgPQgdgFgdgDIg1gIIgHgCIgHgDIgHgCIgGgCIgGgEIgFgEIgFgFIgEgGIgDgGIgCgGIgCgHIAAgHIAAgGIACgHIACgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBIAHgBIAJABIAIACIAIADIAIADIAcACQAWADAXAFIAZAGIAZAFIALABIgFgBQAeADAbAIIApALQAaAHAbAEQAWADAUAIIAQAHIAIABIAHACIAHACIAFADIAFADIAEACIAIADIAGADIAGAEIAGAEIAFAEIAGAGIAEAGIAEAGIAEAFIACAHIABAGIAAAHIAAAHIgBAGIgDAGIgCAGIgEAFIgEAFIgFAEIgFAEIgIAEIgJACIgJABIgGgBg");
	this.shape_25.setTransform(414.525,184.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AExA4IgGgBIgGAAIgHgCIgHgBIgHgDIgHgDIiAAAIhsAAIhrAAIhsAAIhsAAIgQgBIgHgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgFIAAgHIACgGIACgHIADgFIADgGIAFgEIAEgFIAGgDIAFgDIAHgCIAHgCQBEgBBDABIB4AAIB3AAIBzgBQA5gBA3AGQAKABAJAFIAHABIAGACIAGADIAGAEIAEAEIAFAFIAEAFIADAGIADAGIABAHIAAAGIAAAGIgBAHIgCAGIgEAFIgDAGIgEAFIgFAEIgFAEIgFADIgHACIgGABIgGABIgCAAg");
	this.shape_26.setTransform(400.5,187.4933);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AClCLIgGgBIgGgDIgGgDIgHgFIgIgGIgEgFIgEgGIgDgGIgFgJIgDgGIgCgGIgEgFIgEgGIgEgGIgFgFIgCgFIgDgEIgCgFIgDgFIgHgFIgHgFIgGgGIgFgGIgIgEIgFgDIgGgCIgHgFIgEgDIgEgDIgHgBIgHgCIgIgDIgHgEIgJgDIgIgCIgJgEIgIgDIgHgDIgIgDIgPgHIgGgBIgFgCIgUAAIgTAAIgTAAIgaAAIgPAAIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgGIABgHIACgGIADgGIAEgFIAEgFIAFgEIAFgEIAGgDIAGgCIAHgBQAMgBAMAAIAaAAIAgAAQARAAARACIARADIAIADIAHADIAIAEIADABIgFgCIAIAEIAJADIAHAEIAIACIAIADIAIADIAQAGIAHACIAIACIAHADIAHADIAIAEIAGAFIAHAFIAGADIAGADIAGADIAEADIAFACIAFAEIAFAEIAEAFIAEAFIAGAEIAFAEIAGAEIAFAFIAEAFIAEAGIAFAHIAEAIIAFAGIAEAGIAEAGIAEAGIAEAFIADAFIAEAHIADAJIACADIAEAFIAEAFIAEAGIACAHIABAIIABAIIgBAIIgDAHIgDAHIgEAGIgEAFIgFAEIgFADIgGADIgGACIgHACIgHAAIgHAAgABRAnIABABIgBgBIAAAAg");
	this.shape_27.setTransform(406.275,181.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AkECHIgHgCIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgEgHIgDgGIgCgHIgCgIIgBgHIAAgIIAAgHQAKg7AqgsQAngoA1gTQAogOAqgGQAugHAtABIBoAAIA+AAIAHABIAHABIAIABIAJACIAIADIAJACIAHABIAGABIAGACIAIADIAGADIAGAEIAHADIAHAEIAHAEIAFAEIAFAEIAFAFIAFAFIAEAFIAEAFIADAGIACAGIABAHIAAAGIAAAHIgBAGIgCAGIgDAGIgEAFIgEAFIgFAFIgGADIgFADIgHABIgGACIgGAAIgHAAIgGgCIgGgBIgGgCIgGgEIgFgFIgGgGIgCgBIgGgCIgFgDIgEgCIgJgCIgIgBIgHgCIgGgCIgGgCIg5AAIg5AAIg3AAIgrAAIgbABIgRAFIgSAGIgRAGIgRAHIgSAGIgHADIgGAEIgHAGIgGAFIgFAGIgGAGIgGAGIgEAIIgDAJIgDAJIADAGIACAGIABAHIABAHIgBAHIgBAGIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgHAAg");
	this.shape_28.setTransform(404.425,196.5188);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AjqCuIgIgBIgHgEIgHgDIgGgGIgFgFIgFgHIgEgGIgEgFIgCgHIgFgdQgDgSgHgRIgJgaIgIgYQgEgMgGgKQgGgMgEgNIgBgHIgBgHIgBgGIACgJIABgJIADgJIADgIIAFgHIAEgGIAFgFIAGgGIAFgEIAFgGIAEgEIAFgEIAFgEQAagNAagKQAXgJAZgFQAZgFAZAAIAyAAIA2AAQAMABALADQATAHAWAFIArAHIAhAGIAeAGIAbAFQAPACAPAIIAIACIAIACIAHACIAIAEIAGACIAGABIAIADIAGAEIAGAEIAFADIAFADIAEAEIAEAFIAEAEIAEAFIAFADIAFAFIAFAEIAEAGIAFAGIAEAFIAEAHIADAIIAFAEIAEAGIADAGIADAGIABAIIABAHIgBAIIgDAIIgDAHIgEAFIgEAGIgFADIgFAEIgGADIgGACIgGABIgHABIgHgBIgHgBIgGgCIgGgDIgHgGIgIgGIgFgFIgDgGIgEgGIgDgGIgEgHIgGgEIgGgFIgGgGIgFgFIgBAAIgIgEIgHgCIgGgCIgJgDIgIgDIgHgCIgGgCIgmgIIgmgHIgbgGIgagEIghgHIgJgCIgIgDIgHgDIgVgBIgcABIgbAAIgSAAIgSAAIgJABIgJABIgIADIgQAEIgQAHIgPAGIgEABIABAAIgCAAIgBABIgBAAIgBABIgBAAIgEAFIAKAZIAMAgIAJAaIAHAZQADALACAMIABAIIAEAGIACAFIACAHIACAGIAAAGIAAAGIgCAHIgCAGIgCAGIgEAGIgEAEIgHAGIgGADIgIAEIgHABIgIABIgHgBg");
	this.shape_29.setTransform(406.775,188.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AizCbIgIgBIgIgCIgHgEIgIgDIgHgDIgIgDIgIgDIgHgEIgHgFIgHgFIgGgGIgHgFIgFgEIgFgEIgFgEIgFgEIgFgFIgFgFIgEgGIgCgGIgDgHIgDgIIgEgIIgDgJIgDgQIgCgQIgBgMIABgOIABgOIAEgPIADgGIAEgHIAEgFIAEgFIAEgGIAEgEIAGgEIAGgCIAHgDIAGgDIAHgCIAHgCIAWgJQALgEAMgDIAYgEIAcgEIAggHIAIgCIAVgHQALgEAMgCIARgCIASgBIAagBIAQAAIAqgIQAWgDAVAFQAaAGAZABQAYAAAYAFQAUAEASAIIAGADIAIAAIAHACIAHABIAGACIAGADIAEADIAIADIAJAEIAGAFIAHAFIAFAFIAGAFIAEAGIADAGIADAHIACAIIAAAIIgBAIIgDAHIgDAIIgEAFIgEAFIgFAEIgGAEIgFADIgHACIgGABIgGABIgHgBIgGgBIgHgCIgFgEIgHgEIgGgFIgCAAIgFgCIgFgDIgIgBIgHgBIgIgCIgIgEIgIgEIgPgDIgQgDIgOgCIgOAAIgPgCIgYgEIgSgDIgGAAIgGAAIgSAEIgSADIgSACIgPABIgRAAIgPABIgIAAIgjALQgQAGgRACIgbAEQgVADgUAFQgRAEgQAHIABAFIAAAGIAAACIADAGIADAHIACABIAGAGIAHAFIAGAFIAHAFIAFACIAGABIAGACIAGADIAGACIAGACIAGADIAFAEIAFAEIAEAFIAEAFIACAGIACAGIACAGIAAAHIAAAGIgCAHIgCAGIgDAGIgDAFIgFAFIgEAEIgGAEIgFADIgHACIgGABIgHABIgHAAg");
	this.shape_30.setTransform(412.275,192.5529);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("ADuBdIgIgCIgIgEIgEgCQgKgBgKgDIgOgFIgNgHIgQgJIgPgIIgOgJIgDAAIgHgDIgHgCIgGgDIgGgCIgGgBIgJgDIgIgEIgHAAIgIAAIgHgBIgHgBIgGgCIgHgDIgGgCIgSgBIgIgBIgJgCIgIgCIgJgCIgJgCIgIAAIgIgBIgJAAIgIABIgIAAQgMAEgMACIgZAFIgQAEIgSAFIgSAFIgJADIAAACIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABIgGABIgHgBIgGgBIgGgBIgGgDIgGgDIgFgEIgFgEIgFgEIgEgFIgDgGIgDgGIgCgGIgCgMIAAgHIAAgHIABgHIABgFIABgGIADgGIACgFIAEgGIAGgGQAPgNASgJQAOgIAQgGQAPgGAQgDIAxgLQATgDARgGIAHgCIAXgBIARAAIAQAAQAJAAAJACIARADIAPAEIAJABIAIAAIAIAAIAJABIAIADIAGACIAGADIAKABIAJABIAKABIAGACIAGACIAGADIAGABIAGACIAHACIAHADIAHADIADAAIAFACIAFABIAGACIAGADIAFAEIAFADIAFAEIAGADIAGADIAHAEIAGADIAGAEIAGADIAGABIAFAAIAIAAIAHACIAHADIAHADIAGAEIAFAEIAFAFIAFAFIAEAFIADAGIACAGIACAHIAAAGIAAAHIgBAGIgCAHIgEAGIgDAGIgFAFIgFAEIgFAEIgGACIgHACIgGACIgGAAIgJgBgABDAYIAAAAIgBAAIgBAAIACAAg");
	this.shape_31.setTransform(410.725,187.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Ak6BtIgIgBIgHgEIgHgEIgGgFIgFgFIgEgGIgCgHIgCgGIgBgHIAAgHIAAgHIACgGIADgGIADgHIAFgFIADgGIAEgFIAEgFIAGgGIAGgFIAEgGIAFgGQASgRAZgJQAegLAdgMQAegMAggFQAXgDAXgHQAVgHAWgCIABAAIAHgEIAHgCQASgDATgBIAjgBIAiAAIAfAAIAPABIAJACIAIACIAIAEIATADIASADIASAEIAOADIAOADIAOAEIAFABIAFABIAGABIAFACIAIADIAIADIAHAEIAGADIAFACIAHACIAGACIAGADIAGACIAFADIAEACIAGADIAGACIAGAEIAEAEIAFAFIADAFIAEAHIACAIIABAIIAAAHIgCAHIgCAHIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHACIgGAAIgHgBIgGgCIgIgCIgHgCIgIgEIgEgCIgEgCIgHgCIgHgDIgGgDIgHgDIgHgEIgHgDIgVgFIgZgGIgZgGIgXgCIgVgEIgHgCIgGgDIgdAAIgcAAIgaAAIgYABIgCABIgJACIgIAEIgJABIgIAAIgIABIgYAHIgYAGIgXAFQgNABgMADIgSAFIgQAHIgQAHIgQAHIgOAGIgGACIgEAFIgDADIgFAGIgGAFIgEAHIgFAHIgFAFIgHAFIgGAEIgIAEIgHABIgIABIgHgBg");
	this.shape_32.setTransform(404.775,187.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AkfBVIgHgCIgHgCIgFgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgGIABgHIABgGIADgGIADgGIADgEIAEgFIAFgEIAGgEIAFgEIAGgDIAGgEIAAgBIAFgEIAGgDIAFgDIAMgFIANgFIAQgEIASgEIAJgCIADgCIAIgEIAHgDIAHgCIAGgDIAHgBIAIgCIAHgBIAHgCIAHgCIAHgCQAcgFAcAAIBRAAIA+AAIA1ABQAUAAARAIIAEABIAHABIAHABIAIABIAHACIAHACIAHACIACABIACAAIAHAAIAGACIAGACIAGADIAFADIAGADIAEAFIAFADIAEADIgBgBIAEACIgBAAIAIADIAIAEIAIAEIAIAEIABABIAGACIAHADIAFAEIAFAEIAEAFIAEAFIACAFIACAGIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAGIgEAEIgFAFIgFADIgGADIgGACIgGACIgHAAIgHAAIgNgFIgPgGIgNgGIgMgGIgKgEIgFgEIgFgDIgGgEIgEgDIgGgBIgFgBIgHgCIgHgCIgFgCIgFgBIgJgBIgIgBIgJgCIgGgCIgGgDIg3AAIhBAAIg5AAIgsABIgHACIgGACIgHACIgIACIgHABIgIABIgEACIgIAEIgGADIgGADIgHADIgIABIgIACIgIABIgIABIgGADIgHADIgDABIgHAFIgIAFIgFAFIgEAFIgGAEIgGAEIgHACIgHACIgHAAIgGAAgAjUgzIgBAAIgBABIABAAIACgBIABgBIgCABgADYg/IABAAIgBAAIgCAAg");
	this.shape_33.setTransform(404.2,191.5477);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AloBkIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgHIABgHQACgLAGgJQAFgKAIgHQAIgIAKgIQAJgHAKgFQAKgFAKgCIAWgFQAwgcA3gKQA0gJA1gHQAugFAuABIBcAAQAmgBAnADIAHACIAGACIAFADIAFADIAGACIAIADIAHAEIAIAEIAFACIAFACIAHACIAGACIAHADIAHAEIAJAAIATABIASADIARAEIAJACIACAAIAIAAIAHABIAHABIAGACIAGADIAGACIAFAEIAFACIAFAEIAFADIAEAFIAEAFIACAFIACAGIACAGIABAFIAAAGIgBAGIgBAGIgCAFIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgIABIgIAAIgHgBIgIgCIgHgDIgEgCIgIgBIgHgBIgIgBIgJgDIgJgCIgJgCIgIAAIgIAAIgJgBIgIgBIgJgBIgGgBIgHgCIgIgDIgHgEIgHgCIgHgDIgHgDIgGgDIgIgEIgIgEIgGgCIgFgCIgFgCIgFgCIg3AAIguAAIgsAAIgvAAIgdABIgdAFIgcAEIgXAEIgaAFQgSADgQAGIgRAJIgRAIIgRAHIgQAFIgOAEIgFACIgBABIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGACIgGACIgGACIgHAAIgGAAgAECg6IACAAIgCgBIgBAAg");
	this.shape_34.setTransform(393.475,186.0173);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AkOBfIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgHIACgIIACgHIADgGIAEgGIAEgGIAFgGIAFgGIAFgFIAFgFIAGgEIADgDIAFgFIAFgDIAGgDIAGgCIAHgDIAGgBIAFgBIAEAAQALgHANgFQAMgFANgDIAbgGQARgEASgBIAZgBIAygNQAdgIAdABIBAAAQAXgBAWAEIAjAGIAOABIAQACIAQACIARAEIAQAFIARAGIADABIACAAIAIABIAIACIAHADIAGAEIAGAFIAGAGIAEAGIADAIIACAHIAAAIIAAAHIgCAGIgCAFIgDAGIgDAGIgFAEIgEAFIgGAEIgGADIgGACIgGABIgHAAIgJAAIgIgBIgJgCIgIgCIgIgDIgHgDIgJgDIgIgCIgJgCIgJgBIgJgBIgJgBIgJgBIgKgBIgIgCIgIgBIgIgCIgIgCIgRAAIgaAAIgRAAIgRAAIgaAAIgIABIgTAFIgaAGIgVAFIgZADIgZABIgIACIgIACIgJACIgIACIgJACIgIACIgIAEIgHAEIgHADIgHACIgHACIgHACIgEADIgEAGIgDAGIgEAFIgEAFIgFAFIgFADIgGADIgGACIgGACIgHAAIgHAAgAD/hAIACAAIgCgBIgBAAIABABg");
	this.shape_35.setTransform(412.425,182.5197);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AlICSIgGgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgHIAAgHIACgHIABgHIACgGIADgGIAFgHIAEgFIAEgGIAEgGIAFgEIAFgFIAFgEIAFgGIAFgHIAGgGIAGgEIAGgFIAGgFIAGgEIAHgEQAvgxBAgSQA5gQA5gLIBrgUQBFgLBHABQA2AAA1AHIAHADIAIAEIAFACIAGACIAGADIAEADIAEADIAFACIAFADIAFAFIADAEIAEAEIAEAFIAEAFIADAGIADAHIABAIIAAAIIgBAHIgCAIIgDAHIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgHAAIgHgBIgGgDIgGgDIgHgFIgHgFIgDgEIgDgCIgDgBIgGgCIgFgCIgtAAIgtAAIgwAAQgTgBgUABIgKABQgbAEgbAHQgcAHgfAEQgZAEgXAIIgmALIguANIgHADIgGADIgGAEIgGAEIgGAFIgHAGIgGAGIgGAFIgHAFIgHAFIgHAFIgFAEIgFAFIgDAFIgEAFIgHAHIgHAFIAAACIgBAGIgCAHIgDAGIgEAGIgEAFIgFAEIgFAEIgGADIgHADIgGABIgHABIgHgBg");
	this.shape_36.setTransform(399.225,188.3989);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Aj/BfIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgIIABgIIADgIIAEgHIAEgGIAGgGQAsgeAzgSQAxgQAzgJIBngSQAlgGAkABIBtAAIApAAIAJACIAIADIAHAEIAHAEIADACIAFAEIAFAEIAEAEIADAFIADAFIACAGIACAGIABAGIAAAGIgBAGIgBAFIgCAGIgDAGIgEAFIgEAFIgFADIgGAEIgFADIgGACIgHABIgGAAIgGAAIgHgBIgGgDIgGgCQgPgDgQABIgmAAIgmAAIgnAAQgTAAgTABIgJAAIglAJQgYAFgYAHQgSAEgTACQgWADgWAHIgoAOIgPAHIgGADIgGADIgGADIgFAFIgFAFIgFAEIgGAEIgHACIgHACIgHAAIgGAAg");
	this.shape_37.setTransform(409.975,182.5231);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AkoBoIgIgBIgIgDIgGgEIgGgFIgFgFIgDgGIgDgGIgCgGIgCgGIAAgHIAAgGIACgGIACgHIADgGIADgFIAFgFQA2gpBDgQIB/gdIBFgRQAsgLAtgFQA5gGA6ABIBJABIAHABIAHADIAHADIAHADIAIACIAHADIAGAEIAGAFIAGAGIADAGIADAIIADAHIAAAIIAAAIIgDAIIgDAHIgDAGIgGAGIgGAFIgGAEIgHADIgIACIgIAAIgHgBIgGgBIgHgBIgJgCIgIgEIgoAAIgnAAIghAAIgXAAIgZABQgrALgtAIQgnAHgnAKIhEASIg9ARIgaAIIgGAEIgHAEIgFADIgFADIgDABIgGAFIgHAEIgHADIgHABIgIABIgHgBgAkDBeIgBABIABgBIABgBg");
	this.shape_38.setTransform(409,180.5231);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AkvBkIgIgCIgIgDIgGgEIgGgFIgFgFIgDgFIgDgGIgCgHIgCgGIAAgGIAAgHIACgGIACgGIADgGIADgGQATgUAZgOQAUgLAWgHQAUgGASgMQAUgMAYgIQAUgGAUgDIAHgDIAIgCQApgKAqgCQAogCAqAAIBRAAIBMgBQAhgBAgALIAIABIAIAAIAHAAIAHAAIAGACIAHACIAFADIAFADIAGAFIAEAEIADAGIADAFIADAHIAAAGIABAHIgBAGIAAAHIgDAGIgDAGIgDAFIgEAFIgGADIgFAEIgFADIgHACIgGABIgHABIgHAAIgHAAIgIgBIgHAAIgHgBIgIgBIgHgCIgHgCIgHgCIgFgBIhKAAIhBAAIg2AAQgcgBgbABIgTABIgIACIgIADIgIABIgHACIgGABIgIAAIgIACIgIADIgIACIgJACIgIABIgIADIgJACIgUALIgVALIgVAJIgaAKIgJADIgFACIgEADIgGAGIgFAFIgHAFIgHAEIgHADIgIACIgHABIgHgBg");
	this.shape_39.setTransform(408.7,185.9989);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AjwBVIgGgBIgHgCIgFgDIgGgEIgFgEIgEgFIgDgFIgEgGIgCgGIgBgHIAAgGIAAgHIABgHIACgHIAEgHIADgGIAEgFIAFgFIAGgFIAFgEIAHgEIAIgDIAIgDIAIgDIAHgDIAIgDQAmgXArgHIBEgLQA0gJA1ACIBcABQApgBApABIAGABIAGACIAHACIAGADIAEAEIAHACIAHAEIAFAFIAFAGIADAFIAEAHIADAIIAAAIIAAAIIgBAIIgCAGIgDAFIgEAFIgEAFIgFAEIgFAEIgGACIgGADIgJABIgJAAIgIgBIgIgCIgHgDIgGgDIg3AAIgvAAIgvAAIgvAAIgcABIgIABIgIABIgIACIgJABIgPACIgEABIgEAAIgCAAIgBABIgBAAIAAAAIgDAAIAAAAIgBAAIgFABIgRADIgQAEIgHADIgIAEIgIAEIgIAEIgHAEIgIADIgHADIgHADIgHACIgFAGIgFAEIgGAEIgFADIgGADIgIABIgHABIgGgBg");
	this.shape_40.setTransform(404.45,185.4888);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ak5BfIgGgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgIIACgIIADgIIADgHIAEgGIAFgFIAFgEQA6gdA+gXQA1gTA3gNQA4gMA4ABQA+ACA+gBQA5AAA5ACIAIACIAIADIAIADIAIACIAHADIAHADIAIADIAJAAIAHAAIAGACIAGACIAGADIAFADIAFAFIAEAEIAEAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAFIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABIgHABIgIAAIgIAAIgIgBIgJgCIgIgCIgIgDIgIgEIgGgCIgHgCIgGgBIgGgDIhBAAIhCAAIg1AAIg2gBQgdAAgcACQgXAEgVAIIguAQIgeALIghANIghANIgIAEIgDABIgFAFIgGAFIgGAEIgHACIgIACIgHABIgHgBg");
	this.shape_41.setTransform(405.725,175.467);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AlKByIgIgBIgHgDIgGgEIgHgFIgFgFIgDgGIgCgGIgCgGIgCgGIgBgHIABgGIACgGIACgHIACgGIADgFIAFgFQAhgbAngQIBFgfQAmgRAngMIBGgTQAegIAegEQAbgLAgABIA8AAIBAAAIAzAAQAVAAAVAEIAFACIAHADIADAAIAHABIAHAAIAHAAIAFAAIAGAAIAHAAIAIABIAHACIAHADIAHADIAFADIAFAEIAEAFIAEAGIADAGIACAGIABAHIAAAIIgBAIIgCAIIgDAHIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgJACIgIAAIgHgCIgKAAIgKAAIgFAAIgGAAIgIgBIgIgBIgHgBIgHgCIgIgDIgCgBIgCAAQgXgCgYABIg3AAIguAAIgtABIgRAAIgBAAIgHADIgFACQgjAFgjAJIhFAUQghAKgfAPIg0AYIgwAZIgBABIgHAFIgGAEIgHADIgIABIgHABIgIgBg");
	this.shape_42.setTransform(409.35,185.521);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AjyB8IgHgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgGIABgHIABgGIADgHIACgGIAEgFIAFgEQAKgJAMgIQALgIAMgGIAZgLIARgHIAQgFIAIgDIAIgEIAIgEIAJgEIAIgEIAJgDIAJgDQAjgUAngHQAegGAbgMQAcgLAdgFQAegGAfgHQAYgGAZACIARACIAHACIAIAEIAHABIAHAAIAHAAIAGACIAGACIAGADIAFADIAFAFIAEAEIAEAGIADAFIACAHIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABIgHABIgJAAIgIgBIgIAAIgJgCIgIgBIgIgDIgHgDIgHAAIgIAAIgrAMQgPAEgQACQgQADgQAEIghANQgQAGgRADQgPADgOAEIgGAEIgHADIgGADIgHADIgHADIgIADIgHADIgIACIgPAIIgHAEIgHADIgGACIgOAEIgGACIgFACIgIAEIgHADIgIAEIgGAEIgHAEIgGAEIgEAGIgFAFIgGAEIgGADIgHADIgGABIgIABIgGgBg");
	this.shape_43.setTransform(412.675,186.575);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AlXBpIgHgCIgGgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgDgHIgBgGIgBgHIABgGIABgHIADgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAGgCIAHgBIAHgBIAWgKQARgHARgFIAogKIAYgEIARgDIgBAAQARgCAQgFQAQgFARgDIArgJIAagFIAGgDIAGgCQAKgDAKgBIAdgCIAVABIAhAAIARgBIBGgPQAjgHAkgFQAXgDAXAAIAyAAQASgBASAEIAGADIAGADIAGAEIAFACIAFAEIAFAEIAEAFIAEAGIADAGIACAFIABAIIAAAIIgBAIIgBAIIgEAHIgEAFIgEAFIgFAEIgFAEIgGACIgGACIgHABIgGABIgHgBIgHgBIgFgCIgGgCIgNgBIgTgBIgSAAIgTAAIgSABIgJAAQggAEgfAHIg9ANQgWAFgVgBIgpAAIggABQgUAIgVAEQgfAFgeAIQgUAFgVADIg0ALQgcAGgaAJIgPAHIgQAHQgHADgJABQgJACgIAAIgEAAIgDAAg");
	this.shape_44.setTransform(408.75,176.5097);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AkFBtIgIgBIgHgDIgGgFIgHgEIgEgGIgEgFIgCgGIgCgGIgCgHIgBgGIABgHIACgGIACgGIACgGIAEgGQAYgbAggQQAfgQAfgOIA2gYQAcgLAegJIA0gRQATgDAUAAIAxgBIAtAAIAoAAIAgAAIAHABIAGABIAGABIAHADIAFADIACAAIAJABIAJAAIAJAAIAHAAIAGACIAHACIAFADIAGADIAEAFIAFAEIADAGIAEAFIACAHIABAHIAAAGIAAAGIgBAHIgCAHIgEAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGABIgHAAIgIAAIgIAAIgIAAIgJAAIgIAAIgIgBIgHgBIgGgDIgFgCIgFgCIgvAAIgvAAIgkAAIgkABIgtANQgcAJgbALIgpASQgTAKgVAHQgQAFgPAJIgFAFIgGAFIgFAGIgGAFIgHAFIgGAFIgHADIgIABIgHABIgIgBg");
	this.shape_45.setTransform(412.45,180.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AlOB0IgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgHIABgIQAEgOAHgNQAIgOAMgKQAJgJALgFIAZgMIAYgKIAQgFQAsggA1gIQA9gJA7gOQA4gNA8ACQA/ACA/gCQA0gCAzAOIAIAAIAIAAIAIABIAIABIAIADIAIAEIAFADIAFAEIAEAFIAFAFIADAFIADAGIACAGIABAHIABAGIgBAHIgBAGIgCAGIgDAGIgDAFIgFAFIgFAFIgGAEIgHADIgHABIgHABIgHAAIgHgBIgHgBIgHgDIgIgBIgJgBIgIgBIgGgBIgGgCIgHgCIgGgCIg6AAIg5AAIgxAAIgzAAQgSAAgSABIgkAJQgTAEgTACIgjAFIgaAFQgTADgSAFIgWANQgLAHgLAFIgXAJIgXAJIgMAGIgGADIgBADIgCAGIgDAHIgEAFIgEAGIgFAFIgFAEIgGADIgHACIgHACIgHAAIgGAAgAkZBNIABgBIAAgBIgBACgAkTBGIgBABIABgBIACgBIgCABg");
	this.shape_46.setTransform(402.875,180.4175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AlXBkIgGgBIgHgCIgFgDIgGgEIgFgEIgEgFIgDgFIgEgGIgCgGIgBgHIAAgGIAAgHIABgHIACgGIAEgGIAEgFIAEgFIAEgEIAGgEIAGgDIAGgCQBOgQBOgKQBBgJBAgQQBAgRBCgLQAegFAegHQBBgNBCADIA+ABIAHABIAHABIAHABIAGACIAHAEIAFAEIAFACIAFADIAFAEIAFAGIADAFIADAGIACAGIACAIIAAAIIgBAIIgCAHIgEAHIgEAGIgEAFIgFAEIgGACIgFADIgGACIgHABIgHABIgGAAIgGgCIgHgCIgFgDQgPgCgPAAIgjABIglgBIgcABIgSABQg4ARg5AHQgwAFguAOQgtAOgwAHIhhAPQgsAHgrAKIgJACIgJABIgGgBg");
	this.shape_47.setTransform(405.75,181.9798);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AkiA8IgHAAIgHgCIgGgCIgFgDIgGgDIgEgFIgFgEIgEgGIgCgFIgDgHIgBgGIgBgHIABgGIABgGIADgGIACgGIAEgFIAFgFIAEgEIAGgEIAFgDIAGgCIAHgBIAHgBIAIAAIAIAAIAHAAIAIAAQBHgQBIgCICLgCICBAAIB3AAIAbABIAHABIAGACIAFADIAGAEIAEAEIAFAFIADAFIAEAGIACAGIABAHIAAAGIAAAHIgBAFIgCAHIgEAFIgDAGIgFAEIgEAFIgGADIgFADIgGACIgHACQhXABhWgBIiNAAQg5AAg4ACQg2ADg0ALQgWAEgWAAIgLAAg");
	this.shape_48.setTransform(414.15,191.04);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AjqBLIgHAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIACgHIACgGIADgGIADgEIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBQAkAAAkgGIBIgMIBMgOIAmgHIAQgDIAHgCIAHgCQASgDASgBIA5gBIAwAAIA2ABIAHABIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIABAHIAAAGIAAAHIgBAGIgCAHIgDAEIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACQgWABgWgBIgvAAIgxAAIgeABQggAJghAFIhUAPIhAALIgwAHQgRACgRAAIgLAAgABLAaIACAAIABgBIgBAAIgCABg");
	this.shape_49.setTransform(411.525,197.5375);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AkHBLIgGgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgHIACgHIACgGIADgGIAEgEIAEgFIAFgEIAFgEIAGgDIAHgCIAGgBQA+gVBBgJIBmgPQAygHAyABIB0ABQAogBApABIAGACIAGACIAGADIAFADIAFAFIAEAEIAEAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAFIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABQghABggAAIg5AAIgtAAIgoAAQgUgBgUABQghAGghAEQggAEggAHQgWAFgWACQgYACgYAHQgVAHgWAFIgIABIgHgBg");
	this.shape_50.setTransform(409.725,192.4941);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("Ak0BaIgGgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgCgGIAAgHIAAgHIACgIIACgHIADgHIAFgGIAEgFIAFgEIADgFIAFgEIAEgDIAGgEIAEgDIAFgCIAEgDIAHgEIAIgEIAHgDIAIgDIAHgCIAIgCIAJgBIAIgCQAWgJAXAAQAkAAAlgEIA0gFQAZgCAXAAQASABAQgCIAJgCIAKgCIAJgCIAKgDIAJgCIAIgDQAQgEAQAAQAcgBAcAAIAqAAIAeAAQANAAANAEIAIACIAGAEIAHABIAHABIAHACIAGADIAGACIACACIAGABIAFABIAFADIAHADIAFADIAEAFIAFAFIAEAFIACAGIACAGIACAGIAAAHIAAAGIgCAHIgCAFIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABIgHABIgHgBIgGgBIgHgCIgIgBIgHgDIgIgEIgBAAIgHgBIgGAAIgGgCIgIgDIgHgEIgZAAIgZAAIglAAQgTAAgSABIghAJQgXAGgXADQgVACgVAAIgkAAIgKAAIgZAEIgXAEQgPACgQAAIggAAIgQAAIgJADIgIACIgJADIgIABIgJACIgHADIgGADIgGAEIgDAGIgFAFIgEAFIgGAEIgHAEIgGACIgHACIgHAAIgHAAg");
	this.shape_51.setTransform(403.2,186.0417);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AlnCCIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgIIABgHIADgHIADgHIAEgGQAggtAugdQAtgcAzgOQAzgNA0gKQAlgGAlgEQAxgGAzABIAwAAIAtgJIAjgGQAVgEAVgBIAfAAQAQgBAPADIAPACIAFADIAGACIACAAIAIABIAIAAIAIABIAHACIAIACIAHADIAHADIAGAEIAGAEIAEAEIAFAFIADAFIADAGIACAGIACAIIAAAIIgBAIIgCAHIgEAHIgDAGIgFAFIgFAEIgFADIgGADIgGACIgHACIgGAAIgHAAIgGgBIgGgCIgGgEIgCgBIgIgBIgJgBIgHAAIgHgCIgHgBIgGgCIgGgDIgIAAIgIAAIgJAAIgIAAIgKAAIgKABIgJAAIgwAKIgsAHQgcAEgcgBIgtgBIgqABIgJAAIgmAIIgdAHIgoAGQgTACgSAFQgTAFgSAHIgbAJIgPAJIgPAKIgOALIgHAGIgGAGIgGAGIgDAFIgEAFIgCAGIgEAFIgEAFIgFAFIgFADIgGADIgGACIgHACIgHAAIgGAAg");
	this.shape_52.setTransform(404.375,186.0208);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("Aj6BtIgHgBIgIgEIgGgEIgHgFIgEgEIgEgGIgDgGIgBgGIgCgHIAAgGIAAgGIACgHIABgGIADgGIAEgGIAEgEQAdgZAlgMQAcgKAbgLQAggPAigNQAbgKAcgIIA3gTIAQgHIAOgCIAMgBIAOgBIAQAAIAQAAIANAAIAGABIAHABIAIADIAIAEIACABIAGAAIAFAAIAJABIAKABIAKABIAGABIAHADIAHADIABAAIAGABIAGABIAJADIAJAEIABABIAHABIAGACIAGADIAHADIAFACIAFAFIAFAFIADAGIADAGIACAFIACAIIAAAIIgBAIIgCAIIgEAHIgEAEIgEAFIgFAEIgFAEIgGADIgGACIgJABIgJAAIgJgCIgHAAIgGgBIgGgDIgHgDIgHgDIgJgCIgHgCIgGgDIgHgCIgBAAIgIAAIgJAAIgIAAIgIAAIgIgBIgIgDIgHgCIgHgDIgIAAIgJAAIgIAAIgJAAIgIABIgIACIgeAJQggAJggAOQgbALgcAKQgaAJgZANQgWAMgYAJIgIACIgFADIgEACIgGAEIgGAEIgHADIgIABIgHABIgHgBg");
	this.shape_53.setTransform(404.35,196.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AkBB3IgHgBIgGgCIgFgDIgGgEIgEgEIgFgFIgDgFIgEgFIgCgHIgBgHIAAgGIAAgIIABgHIACgIIADgHIADgIIADgGIAEgHIADgFIAGgEIAEgFIAFgFIAEgEQAQgJARgJQAVgLAXgJQAWgHAXgHIAsgOQAVgGAWgCIAIgCIAHgBIAIgDIAIgBIAJgCIAJgBIAIAAIAJgBIAIgCIARgFIAQgEIARgFIARgEIAJAAIAKAAIAJAAIAKAAIAJAAIAIgEIAJgCIAOgCIASgBIANgBIAPAAIAPAAIAGABIAHABIAJACIAHADIAHADIACABIAGACIAGACIAFAEIAFAEIAEAFIAEAFIAEAHIACAJIABAHIAAAIIgCAIIgDAGIgDAGIgDAFIgFAFIgEAEIgGAEIgGADIgFACIgHACIgHAAIgGAAIgGgCIgJgEIgJgDIgJAAIgIAAIgJAAIgIAAIgJABIgHADIgHACIgIADIgIABIgIAAIgJABIgIAAIgJgBIgIAAIgJAAIgQAEIgPAFIgQAEIgRAEIgRACIgQABIgIACIgHACIgIACIgJACIgJABIgJAAIgRAGIgRAEIgQAFIgVAGIgXAHIgIACIgGAEIgIAEIgHAEIgHADIgGADIgGAEIgHACIgBACIgCAHIgCAGIgEAGIgDAFIgEAFIgFAEIgGAEIgFADIgGACIgHABIgHABIgGgBg");
	this.shape_54.setTransform(407.15,196.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("Ak6B8IgIgBIgHgDIgHgEIgGgFIgFgFIgDgGIgDgGIgCgGIgBgGIgBgHIABgGIABgHIACgGIADgGIADgFIAFgFIAygjQAYgQAcgJIA4gVIA0gUQAWgIAXgEQAPgJAPgGQAPgGAPgEIAggHIAXgFQANgDANAAIApgIQAVgEAWABIAkAAIAnAAIAUABIAIACIAHACIAHAEIAHADIAIAEIAHADIAIAEIAFADIAFACIAFAEIAFAEIAFADIAEADIAEADIAHAFIAHAFIAEAFIAFAEIAFAFIAEAGIAEAGIACAHIACAHIAAAIIgBAIIgDAIIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgHACIgGACIgGAAIgHAAIgGgBIgHgDIgFgDIgHgFIgHgFIgGgGIgFgDIgGgEIgEgDIACABIgBgBIgBAAIAAAAIgCgBIgHgEIgHgEIgIgEIgIgEIgdAAIgcAAIgcAAIgTAAIgIACIgJACIgIACIgJACIgJABIgJABIgJABIgMADIgRAEIgRAEIgQACIgIADIgIAEIgHAEIgHAEIgIAEIgIACIgIACIgIACIgIACIgIABIgHACIgIADIgYAKIgYAKQgLAFgMAEIgZAIIgIACIgHAEIgNAIIgNAIIgPAKIgIAFIgFADIgDABIgGAFIgHAEIgHADIgHACIgIAAIgHgBg");
	this.shape_55.setTransform(396.775,180.5219);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AmAB4IgHgCIgIgDIgHgEIgGgFIgEgGIgEgFIgDgGIgCgGIgBgGIAAgHIAAgGIABgGIACgGIAEgGIADgGIAEgFQAcgcAmgMIBKgcIBFgaQAcgLAegIQAggIAigCQA4gLA4gIQAtgHAvgDQAngCAnAAIBQAAQAbAAAbABIAIABIAFACIAHACIAGADIADABIAHACIAHACIAGACIAHADIAGAEIAEACIAFAEIAFAEIAFAFIADAGIADAGIACAFIACAIIAAAIIgBAIIgDAIIgDAHIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABIgHABIgGgBIgGgBIgHgCIgGgDIgFgDIgHgBIgHgBIgIgDIgGgEIhvAAQgvgBgwAEQgpADgoAHIhJALQgWAEgWACIg6APQgeAJgeALIgyASIgvATIgVAJIgIAEIgHAFIgGAFIgFAFIgGAEIgIADIgIACIgHAAIgIAAg");
	this.shape_56.setTransform(400.75,180.0417);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("Aj4BtIgIgCIgHgDIgHgDIgGgGIgFgEIgDgGIgDgGIgCgGIgBgGIgBgHIABgHIABgFIACgHIADgGIADgFIAFgGIAGgEIAGgFIAGgEIAGgDIAGgDIAHgCQAqgZAvgPQArgMArgJQAkgIAigJQAhgHAigHIBAgLIAHgDIAHgBIAFgBIAFgBIAJgCIAKAAIAJgBIAKAAIAHAAIAHAAIAHACIAGACIAGACIAGACIACACIACAAIAHAAIAGACIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIACAGIAAAHIAAAHIgCAGIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABIgHAAIgJAAIgKAAIgJgCIgHgCIgGgCIgGgDIgIAAIgIAAQgoAKgpAGQgjAHgkAJQgcAGgeAGQgjAHgiAKQgeAKgcALIgHADIgHADIgHAFIgHADIgHAEIgHADIgHADIgGAFIgGADIgHACIgHADIgIAAIgHgBg");
	this.shape_57.setTransform(416.175,184.05);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("ABQAyIhZAAIhQAAIg7AAIgKAAIgHgBIgGgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgGIAAgHIAAgGIACgGIACgGIADgGIADgGIAFgEIAEgFIAGgDIAFgDIAHgCIAGgCQAwAAAwAAIBjAAIBPAAQAdAAAcAAIAGACIAGACIAGADIAGADIAEAFIAFAEIADAGIADAGIACAGIACAGIAAAGIAAAHIgCAGIgCAGIgDAGIgDAFIgFAFIgEAEIgGAEIgGADIgGACIgGABIg6ABIgcAAg");
	this.shape_58.setTransform(411.925,187.05);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AlqBaIgGgBIgHgCIgGgDIgFgEIgFgEIgEgFIgEgFIgCgGIgCgGIgCgHIgBgGIABgHIACgGIACgHIACgFIAEgGIAEgEIAFgFIAFgCIAGgDIAHgCIAGgCIAHAAQBDgaBGgUQAqgLArgJQA4gMA4gBIBzgDQA6gCA4AKIARADIAXACIASADIAZADIAiAHIAUAFIAGAAIAFABIAHAAIAHACIAGACIAFADIAGAEIAEAEIAFAEIAEAGIACAFIADAGIABAHIABAHIgBAGIgBAGIgDAGIgCAGIgEAFIgFAFIgEAEIgGAEIgFADIgGACIgHACQgVAAgVgFIgkgIQgagEgZgDQgRgBgQgDIgagGIiHgBQgxgBgzAFQgvAEgrAOQgvAQgwALQgbAHgbAJIgGAEIgHACIgHADIgGADIgHABIgIACIgIAAIgHABIgHgBg");
	this.shape_59.setTransform(395.65,188.9576);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("Aj6BaIgHAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIACgHIACgGIADgGIADgFIAFgFIAEgEIAGgDIAFgDIAHgCIAGgBIAHgBIACAAIACAAIAHgDIAHgCIAHgCIAKgBIAKgBIAJgBIAKgCIAJgCIAJgCIAHgBIAHgBIAIgBIAHAAIAHgDIAOgEIAPgFIATgEIATgDIATgCIATgEIATgDIAPgEIANgDIANgDIAOgCIAJgCIAIgCIAJgCIAIgCIAJgCIAAAAIAGgDIAGgCQAPgEAPgBQARgBARAAIAlAAIAnAAIAQABIAGABIAGACIAGADIAGAEIAEAEIAFAFIADAFIADAGIACAGIACAHIAAAGIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAEIgGADIgGADIgGACIgGACQgNABgNgBIgcAAIgbAAIgbAAIgSABIgIADIgNAEIgRAFIgRADIgRADIgIACIgaAGIgaAGIgYAEIgYADIgIABIgHABIgGACIgHACIgIACIgHACIgIACIgIADIgJADIgJABIgJABIgJABIgIACIgHABIgIACIgIABIgKACIgJABIgKABIgIACIgJADIgFABIgGACIgIABIgJAAIgCAAg");
	this.shape_60.setTransform(406.125,188.0438);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AjyBLIgHgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgHIADgFIADgFIAFgEIAEgFIAGgDIAFgDIAHgCIAHgCIAGAAIAGAAIAGAAQA5gSA7gJIA0gIIBcgLQAwgGAwABQArABArgBIAaABIAGACIAGACIAGADIAFADIAFAFIAEAEIAEAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAFIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABQhAABg/gBQg1gBg0AGQgxAHgxAKQgnAIgoALQgeAJggAAIgPAAg");
	this.shape_61.setTransform(418.7,187.4729);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("Ak0BBIgDAAIgGAAIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgGIABgHIACgFIADgGIAEgFIAEgFIAFgEIAFgEIAGgDIAGgCIAHgBIAGgBQBJgXBMgEQBEgDBFAAICPAAIB+AAQAlAAAmABIAGABIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIABAHIABAGIgBAHIgBAGIgCAGIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgGACQhHABhIgBIiGAAIhlAAQg3AAg4ABIgJAAIgRAEIgQADIgOADIgPAEIgSAEIgJACIgHADIgGACIgHACIgHACIgHAAIgGAAg");
	this.shape_62.setTransform(409.175,189.5417);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AkiBKIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgHIADgFIAEgFIAEgEIAFgFIAFgDIAGgDIAGgCIAHgCIAGAAIADgBIAEgBIAFgCIAHgDIAHgDIAGgDIAHgDIAKgBIAKgCIAIAAIATgFIANgEIAWgGIAQgEIAQgCIAJAAQAogMAqABIBWABIBRAAIBJgBQAUAAAVAEIAHACIAGADIACABIAEABIAIAAIAJACIAGACIAHADIAFAEIAGAFIAFAEIAFAFIADAFIADAFIACAGIABAGIABAGIAAAGIgBAFIgCAGIgCAFIgCAGIgEAFIgEAEIgGAFIgGAEIgIADIgHACIgIABIgIgBIgIgCIgHgDIgIgBIgHgBIgIgCIgHgDIgHgDIhOAAIhSAAIg2gBIg9ABIgJABIgIACIgIACIgIACIgIABIgIABIgJABIgIAAIgRAFIgQAFIgPAEIgQAEIgRACIgIABIgDABIAAAAIAAAAIgCABIABgBIgFADIgQAHQgIADgIABQgHACgIABIgPAAIgHgBg");
	this.shape_63.setTransform(404.775,189.4712);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("Ak+BLIgHgCIgGgCIgFgDIgGgDIgFgEIgEgFIgDgFIgDgGIgCgGIgBgFIgBgGIAAgHIABgGIABgFIACgGIADgEIAEgFIAEgFIAEgEIAGgDIAIgEIAJgEIAJgDIAHgCIA4gHIA/gKIAygIIApgKIAOgEQAhgGAiABIBTAAIBBAAQAZAAAZABIAPACIAIACIAHAEIAGAEIAFADIAGADIAGADIAHAEIAGADIAIABIAIABIAIABIAHABIAHACIAHAEIACABIAFABIAGABIAGACIAGACIAGADIAHAFIACABIAFAEIAFAEIAEAEIADAFIADAEIACAGIACAGIABAGIAAAGIgBAGIgBAGIgCAFIgDAGIgEAFIgEAFIgFAFIgGADIgFADIgGACIgHABIgGAAIgGAAIgHgBIgGgCIgGgDIgEgDIgKgBIgHgCIgHgDIgGgEIgQgCQgIgBgIgCIgOgGIgMgGIgFgCIgFgDIgEgDIgHgEIhBAAIhAAAIg4AAQgUAAgUABQgZAIgZAFQgeAGgeAFIg2AIIgtAGIgTACIgFACIgCAAIgIAEIgJACIgJABIgGAAg");
	this.shape_64.setTransform(392.225,191.5229);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AlwBuIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgHIgBgGIgBgHIABgHIABgIIACgHIAEgHIAEgGIAFgGIAEgEIAEgFIAFgEIAFgEIAGgEIAcgPQASgJATgHIAfgMIAigNQAQgGASgDIAIgCQAmgMAmgHQAqgIAqgBQAngCAmAAIA9ABIAygBQAPgEAQgDQAXgEAYABIAvAAIAxAAQAWgBAWADIAJACIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgGAEIgFADIgGACIgHACIgGAAIgHAAIgGgCIgbAAIgjAAIglAAIgbAAIgZABQgWAGgWACQgbACgcgBIg4gBIg1AAQgXAAgWABIgaAFIgcAFIgWAEQgNACgNAEIgQAFIgUAFIgXAHIgXAJIgXAJIgPAFIgIADIgHAEIgIAEIgGADIgGAEIgGADIgDAGIgEAFIgFAFIgGAEIgGAEIgHACIgHACIgHAAIgGAAg");
	this.shape_65.setTransform(406.275,192.0125);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AkvBfIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIACgHIACgGIACgGIAEgFIAEgFIAFgEIAFgDIAGgDIAGgCIAGgBIAHgBIBUgYQAkgKAlgIIBGgOIBRgOQAfgFAdgLQAVgEAVAAIAyAAIAvAAIAtAAQAPAAAPABIAHABIAHADIAGADIAHADIAHADIAGAEIAFAEIAFAFIAEAFIADAGIADAGIACAHIAAAHIAAAHIgCAHIgCAGIgDAGIgDAGIgFAEIgFAEIgFADIgGADIgGADIgGABIgHAAIgHAAIgGgCIgGgCIgGgCIgGgDIgrAAIgtAAIgkAAIgjAAIgJABQgwARgyAFQgkADgkAJQgiAJgjAGQgkAFgjAOQgUAHgVAEIgIAEIgIADIgJACIgJABIgJAAIgHAAg");
	this.shape_66.setTransform(402.725,191.5417);

	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(153,478.9,0.5,0.5);

	this.instance_1 = new lib.Bitmap7();
	this.instance_1.setTransform(46,472,0.116,0.116);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(153,367.85,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_2();
	this.instance_3.setTransform(153,478.9,0.5,0.5);

	this.instance_4 = new lib.Bitmap7();
	this.instance_4.setTransform(46,472,0.116,0.116);

	this.instance_5 = new lib.CachedBmp_6();
	this.instance_5.setTransform(153,286.8,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_5();
	this.instance_6.setTransform(153,367.85,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_4();
	this.instance_7.setTransform(153,478.9,0.5,0.5);

	this.instance_8 = new lib.Bitmap7();
	this.instance_8.setTransform(46,472,0.116,0.116);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},93).to({state:[{t:this.shape_1}]},39).to({state:[]},38).to({state:[{t:this.shape_2}]},80).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[]},1).to({state:[{t:this.instance_1,p:{y:472}},{t:this.instance}]},260).to({state:[{t:this.instance_4,p:{y:472}},{t:this.instance_3},{t:this.instance_1,p:{y:361}},{t:this.instance_2}]},15).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_4,p:{y:361}},{t:this.instance_6},{t:this.instance_1,p:{y:280}},{t:this.instance_5}]},24).wait(106));

	// foreground
	this.instance_9 = new lib.chair("synched",0);
	this.instance_9.setTransform(436.05,494.4,1,1,0,0,0,207.2,157.6);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhPFUQgQgBgMgLIhWhRQgsgpgtgoQgrglgWgzQgJgWgBgYQgBg6AOg6QAKgqAOgoQAFgPAJgNQAkgxA0ggIASgLQAcgPAfgDIAUgGQAKgFAMgCIAYgEQALgCALgEQALgEALgCIASgCIAEgBIAEgBQAQgEARABQAWAAAVAEIArAHQAUAEASAHQATAIAUACQATABASAJIAEADIADADIAFACIAEABIAEACIAFADIADACIAEACIAEACIADADIAEADIADACIADADQAaANASAVQAUAYAIAdQAJAhgBAhIABBDQAAAggGAfQgEAUgLARIgNAQIgQAPIgQAOIgSAPQgKAIgMAHIgWAMIgGAFIgKAJIgKAKIgJAIIgKAHIgKAGIgLAIIgGAEIgDADIgCACIgDADIgCACIgDADIgDADIgEACIgEADIgDACIgDACIgDACIgEADIgFACIgEABIgEACIgEACIgEACIgEACIgEACIgEACIgEACIgEACIgDABIgDADIgDAEIgCACIgDACIgDACIgDACIgDABIgDACIgDABIgDABIgEABIgCABIgEABQgHACgHgBQgIgBgHgDQgHgCgEgFQgGgFgFgGQgEgHgCgIQgCgHAAgIQABgIADgIIADgHIADgDIACgEIADgDIADgDIADgCIACgCIAEgCIAKgJIAKgHIAKgFIALgFIALgGIAKgFIAIgDIABgBIADgCIADgDIAEgEIADgDIADgDIADgCIADgDIADgCIADgCIADgBIACgCIAEgDIAEgCIAEgDIADgDIAEgCIAEgDIASgRQAJgJALgHQALgHAMgHQALgFAKgJIAVgRQAJgIAIgHIAAgEIABgEIAAgDIABgFIACgEIAAgTIAAgUIAAgTIAAgTIAAgTIAAgTIgBgFIAAgEIgBgEIgBgDIgBgEIgCgDIgCgEIgCgDIgCgDIgDgEIgEgCIgEgDIgEgCIgEgCIgDgCIgEgDIgDgDIgEgCIgCgCIgDgCIgDgCIgEgBIgEgCIgEgBIgDgCIgEgCIgDgCIgCgCIgBgBIgZgEQgNgCgLgEQgNgGgOgDQgOgEgJgBIgbgFQgOgCgPABIgEAAIgEABIgDAAIgDABIgFABIgEABIgDAAIgEABIgEAAIgTAFIgRAFIgRADIgSADIgSAGIgLAFIgEAAIgEABIgEABIgEAAIgFABIgEABIgFABIgEABIgDACIgEACIgDABIgKAIIgKAGIgLAIIgMAIIgKAJIgJAKIgJAKIgCAEIgCAEIgCAFIgDAPIgDASIgEAQIgFASIgDASIgEASIgDAOIAAAEIgBAEIAAAEIAAAFIAAAEIAAAFIAAAFIAAAFIAAAEIABAFIABAEIABAEIACAEIACADIACAEQAcAfAgAdIBBA8QAhAfAiAcQATARALAXQAHAPgGARQgMAighAAIgJgBgACwjUIAAAAIgBAAIABAAg");
	this.shape_67.setTransform(381.0233,215.9506);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgVFNIgEgBIgEgBIgEgCIgEgCIgEgDIgGgFIgHgFIgGgFIgHgGIgDgDIgKgHQgIgEgHgFIgKgIIgKgJIgLgJIgIgGQgdgRgegPQgagNgTgVQgSgTgMgYQgNgagIgdIgNgvQgDgLAAgLIgEgaIgBgXIAAgXQAAgLABgMIAEgTIAAgDQABgJACgJIAEgSIAGgQIAGgPIAFgLIACgDQACgJAEgJIAJgUIAJgOIAKgMIALgLIAKgKIADgDIAEgDIACgCIAFgFIAHgFIAIgFIAHgFIAIgDIAEgCIAKgGIAMgGIAMgFIANgEIAPgEQAXgMAaABIAuAAIArAAIApABQARABAPAJIAIACIAHACIAGADIAHADIAHAFIAEACIAIADIAMAEIAOAFIAHAEIAHADIAEABIAEADIAEADIADACIAEABIAEACIADADIAGAEIACADIAHAEIAHAEIALAIIAGAGIAHAHIACAEIALAJIAKAMIAIANIAIAQIAGANIADALQAGAKAAAMIABASQAAAMgCAMIgEAWQgCAMgEALIgCAIQgBAWgFAVIgIAmQgEATgHASQgHAUgDAUQgDAUgJASIgEAHIgCAKIgCAJIgDALIgDAIIgDAIIgCADIgCACIgCAEIgCADIgDADIgDADIgCAEIgDADIgBACIgBADQgGAJgKAGQgIAEgJACQgKACgJgCQgKgCgIgGQgIgGgGgIQgEgGgCgIIgBgEIAAgFIgBgEIAAgFIABgEIABgEIADgIIAEgIIACgDIADgEIACgEIACgDIADgDIACgDIACgDIACgHIACgMQABgHACgFIAEgIIAEgIIADgIIACgDIAAgEQACgQAEgPIAIgZQAEgMACgMIAGgbIAFgWIABgRIADgPIAEgPIADgMIACgMIACgMIAAgEIAAgEIgBgDIgBgEIgCgEIgCgEIgCgDIgCgEIgCgEIgDgDIgDgEIgDgCIgCgDIgGgGIgDgEIgCgCIgEgCIgEgCIgDgCIgEgCIgHgGIgDgBIgEgCIgDgCIgDgCIgDgCIgDgDIgOgFIgMgFIgLgEIgMgFIgKgGIgCAAIgEgBIgEgBIgEgBIgEgCIgEgCIgDgCIgeAAIgYAAIgYAAIgYAAIgUAAIgJAEIgJADIgJADIgKADIgEABIgEACIgDACIgEACIgEACIgGAEIgEABIgDABIgEADIgCACIgCACIgDADIgDACIgDADIgDADIgEADIgDADIgCADIgFAGIgDACIgCAEIgCADIgCAJIgDAIIgCAHIgEAHIgDAHIgCAEIgCADIgBADIgBADIgBAEIgCAHIgBAEIgBAEIgBAEIAAAFIgBAEIAAAFIgCAHIgBADIAAAKIAAAKIAAAOIAAAJIAAAJIABAFIABAEIABAEIABAJIABAJIAAADIABADIAEAMIAEAMIAEANIAEANIAEANIACAEIACAEIACAEIACADIADAEIACADIADADIACACIADADIACADIADADIACADIAcAPIAXAMQALAFALAIIAVAQIAVARIADADIAIAFIAMAHIALAIIAGAGIAFAFIAEADQANAEAKAKQAIAJAEAMQAEAMgDAMQgDAMgHAJQgHAIgJAFQgKAGgMAAQgJAAgIgCg");
	this.shape_68.setTransform(375.8438,216.749);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("Ag4GoIgEgBQgUgCgRgKIgigSQgRgJgPgKIgegTIgggRIgIgGIABAAIgBAAIAAgBIgBAAIABABIgDgCQgvgjgjgwQgOgTgKgUQgcg/AFhFIADgsQADgyAMgxIAKgsQAKgqAOgoQAJgXANgVQAgguAjgsQAfgoArgaIABgBIAAAAIAAAAIAAAAIABgBIAIgGIALgGIANgGQAGgDAHgBIANgCIAJAAIAEgCIAEgBQAhgEAhABIBBAAQAggBAfADQAlADAjAJQAWAFATAJIADACIACABIALAHIALAIIAJAHIAJAJIAIAKIACADIACADIABADIADADIACADIACACIADADIACACIADADQAgAlARAtIAEAQQAIAzgCA1IgDA9QgFAwgRAsIgiBVQgDAIgFAHIgBAFIgBAEIgBAFIgBAEIgFAMIgFALIgGAJIgIALIgJAKIgIAJQgGAWgNAUQgLARgSAIQgPAGgPgEQgQgEgKgMQgNgQABgUQACgUAOgNIAEgNIAEgMIAGgLIAHgKIAJgKIAJgKIACgDIACgDIACgDIACgJIACgJIADgIIAEgHIAEgIIADgHIANggIAMgbQAGgMAEgNIAHgaIAFgYQABgOAAgOIAAgdIAAgdIAAgXIAAgZIgBgEIgBgFIgBgFIgBgFIgBgEIgGgIIgFgHIgFgHIgEgGIgEgGIgBgCIgGgGIgFgGIgGgHIgFgHIgGgHIgCgEIgDgCIgCgDIgEgCIgEgDIgEgCIgDgCQgYgJgZgCIgxgDQgWgBgXAAIguAAQgXAAgXABIgEABIgEABIgFAAIgEABIgFABIgEAAIgFAAIgDACIgDACIgEACIgDACIgBABIAAAAIgDADIgEACIgDACQgPALgNAOIgVAXIgSAZIgRAZIgVAbIgBADIgBACIgYBFQgJAcgFAdIgKA+QgFAYABAYIAABAIADAJIACAJIADAIIADAJIAEAIIAFAIIAMAPIAMAOIALANIAIAKIAJAKIADADIAEACIAEACIACACIADACIADACIADACIAEACQAMAFAKAHIAWAOIAXAPIAVALIATAKIAKAGIAEAAIADABQATgHASAHQANAFAJANQAKANAAAQQAAARgMANQgMAPgSAGQgLAEgLAAQgJAAgKgDg");
	this.shape_69.setTransform(383.2557,208.542);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgvEiIgDAAIgDgBIgEAAIgDgBIgDgBIgEgCIgCgBIgCgBQghgRgggRQgggSgdgWQgegVgYgcQgRgTgKgZQgGgRgBgRQgBglAHgjQgEgtAVgnQATgkAWgkQAWgmAdghQATgXAegJQAqgPArgMQAWgHAVgBIAVgEQANgCAOAAIAZAAQAPABANADQAOACAMAGIAOAGIACACIACABQALAGAKAHIASALIASANIATANQAJAHAIAIQAFAFAEAGIAKANIAHAOIAFALIADAOIACANIAAAOQAEANABANIAAAVIAAAXIAAAUQABAMgDAMIgDAJIgEALIgFAMIgEAHIgFAHIgFAHIgGAHIgEAEIgCACIgBAEIgCAEIgCACIgCAEIgCACIgCAEIgCAEIgDADIgCADIgCAEIgDACIgCACIgCACIgJAKIgKAHIgKAHIgKAIIgKAFIgKADQgKAGgLACQgKACgKgCQgJgCgJgGQgIgFgFgJQgFgHgCgKQgCgJABgKIADgKIACgDIAEgGIAHgJIAFgEIAGgFIAIgDIAIgEIAHgDIADgBIABAAIADgCIADgCIADgDIACgCIACgCIABgDIABgDIADgDIADgEIADgEIABgCIABgDIADgEIABgCIACgEIACgCIACgDIACgDIADgCIADgCIADgCIACgEIABgDIABgDIABgDIAAgCIAAgIIAAgJIAAgJIAAgKIAAgJIAAgJIAAgFIgBgDIgBgEIgBgJIgBgIIgBgFIAAgEIAAgDIAAgDIgBgEIgBAAIgCgDIgBgCIgCgDIgDgDIgCgCIgMgIIgMgIIgMgIIgKgGIgJgGIgGgEIgDgDIgEgBIgDgDIgEgBIAAAAIgEgBIgEgBIgKAAIgKAAIgKAAIgKAAIgFAAIgEABIgEABIgFABIgEAAIgEAAIgEABIgEAAIgEAAIgEABIgEABIgEABIgFACIgBABIACgBIgLAEIgMADIgIADIgMADIgNACIgIADIgDABIgDACIgEABIgEACIgEACIgEACIgEACIgTAbIgRAbIgOAWIgMAYIgNAZIgFAJIAAAFIgBAIIAAAIIAAAJIgCAJIgBAJIgCAIIAAAFIAAAKIAAAJIAAAKIAAAEIAAAFIAGAHIAIAKIAGAGIAFAGIAHAGIAGAGIAGAFIAUAMIAUAMIAUALIAUAMIAUALIADgBIACgCIADgBIAEgBIAFgCIAEgBIAEgCIAEgCQAPgHAQADQAQADALALQAJAJADANQADALgCALQgCANgJALQgKALgPAFIgNAEIgCABIgDABIgEADIgDABIgDACIgEABIgDABIgEACIgFACIgEABIgEABIgFAAIgEABIgFAAIgCAAIgDAAg");
	this.shape_70.setTransform(378.3475,217.55);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhvFnQgRgCgPgFIgggJQgQgFgPgIQgNgHgLgLIgJgJQghgbgTgoIgOgcQgagvgSgyQgWg+AOhAQADgPAFgPQASg3ApgrQAsgsA1giQAQgJASgHQATgMAUgLIAogWQAUgMAWgKQAYgMAXgJQAYgKAagHIAIgCQAJgHAKgDQALgEALgBIASAAIASABQALABALADIAOAFIADABIADACIAEADIAEACIAEADIAEACIADACIADADIAEADIADACIADADIACADIACACIAPAJIALAHIALAHIALAIIALAIIAKAJIADADQAMAHAGAMQAHALAEAMIAKAcQAEAPAGAOQAGAOADAPIAEAXQAFAMABAOIABAZQAAANgCANIgFAgQgCANgGAMIgHAPIgDAJIgCAEIgCAEIgCAEIgCAEIgCAEIgCADIgCADIgBACIgCADIgDADIgDADIgDACIgDACIgCACIgCADIgDADIgCADIgDADIgDADIgDADIgDADIgFAIIgCAEIgCADIgFAGIgCAEIgDADIgDADIgCADIgDADIgDACIgDADIgDACIgKAJIgKAIIgJAGQgHADgGAEIgJAHIgKAIIgEADIgHAGIgGAGIgGAHIgGAGIgFAGIgGAGIgFAGIgHAJIgGAHIgGAGIgFAEIgFAFIgHAFIgHAFIgDACIgEADIgEADIgEACIgEADIgDACIgDACIgHACIgEABIgDAAIgEAAIgEAAIgEAAIgDgBIgDgBIgEgBIgEgCIgEgBQACAGgBAGIgCAKIgEAKQgCAEgDAEIgHAHQgEAEgFACIgIAEIgKACIgEABIgNACIgIABIgIABIgIAAIgIAAIgJAAIgIAAIgEAAIgIAAIgXgBgAgJD/IAIACIAHADIAEABIgBgEIAAgFIAAgEIABgFIABgEIABgEIACgEIACgEIAEgGIAFgFIAGgFIAFgEIAHgFIAIgFIACgDIADgCIADgCIARgVIAXgZQAMgNAOgLIAdgVQALgJANgHIADgDIAEgDIADgDIAEgDIAFgJIAFgIIAFgGIAEgGIAIgJIAJgJIADgDIADgEIACgDIADgCIACgCIADgDIABgBIABgEIACgEIACgEIACgEIABgEIACgDIACgEIABgFIABgFIABgFIABgEIAAgEIABgEIABgDIAAgFIAAgFIAAgFIAAgFIAAgFIAAgFQgEgJgBgKIgEgUQgDgNgFgMIgIgVIgJgZIgLgLIgHgGIgBAAIAAgBIAAAAIgCgBIgBgBIgCgBIgTgLIgSgKIgPgMIgIgIIgCgCIgCgBIgCAAIgEgCIgDgBIgEAAIgEAAIgEAAQgbANgdAIQghAJgfAPQgbAOgbARQgYAPgZANIgoAUIgHAGIgHAGIgHAFIgLAIIgMAIIgHAFIgJAIIgJAKIgLANIgKAOIgMAOIgCADIgCAEIgCADIgBAEIgBADIgBAEIgBAEIgBADIgBAEIgBAHIgBAJIgCANIAAANIAAANIAAALIABAEIABADIAGANIAHAOIAFANIAEANIAEANIAJAQIAJARIAMAUIALATIAKAQIADACIADADIADACIAEADIADADIADADIADADIAEACIADACIADABIADACIAIACIAIACIAIADIAJACIAJACIAEACIAKAAIAJAAIAKAAIAJAAIANAAIAJAAIAIgDIAHgBIAIgBIAEAAIAFAAgADMjVIACABIgBAAIgBgBIAAAAgACSj8IABAAIAAAAIgBgBg");
	this.shape_71.setTransform(388.0683,204.4813);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhWEWQgOAAgNgCQgOgCgNgGQgNgFgMgIQgLgHgKgJQgKgKgMgJIgIgHQgdgdgIgpQgCgKgEgKQgQgqgFgtQgGgrABgtQABgqAMgoQAIgXANgWQAGgUAMgQQALgQARgJQATgKAUgGQAXgHAXgFQAVgEAVABIALAAQAWgGAXAAIA5AAQAdAAAcAGQAaAFAZAIQATAFAOAMQANAIANAJQALAIAJAKQAKALAIAMQAIAOAGAOQAIAQADASIABAEIAEAJIAEAIIADAJIADAJIADAJQADARABARQAAAWgCAUQgDAUgFAUQgGASgIARQgIARgOAOIgCADQgIAMgKAJIgXAUIgcAVIgaATQgOAKgQAFIgIADIgIAEIgIAEIgJAFIgIAEIgIAEIgJADQgQAJgSACQgSACgNgKQgNgKgFgOQgHgUAJgTQAIgRARgHQAPgIAQgFIAIgFIAJgFIAIgEIAIgDIAIgEIAIgDIAPgJIANgKIAPgJIANgKIAMgLIAGgFIACgEIADgEIADgEIADgDIACgDIADgDIACgEIACgEIACgEIACgFIADgEIABgEIABgEIAAgEIABgFIABgDIABgEIAAgFIAAgEIAAgEIAAgEIAAgEIAAgEIAAgJIAAgIIgBgDIgBgCIgBgEIgBgDIgBgDIgEgIIgDgIIgDgIIgCgIIgCgJIgCgIIgDgEIgCgEIgCgEIgCgEIgCgEIgCgDIgCgEIgEgCIgDgCIgEgDIgDgCIgDgCIgDgCIgGgEIgGgEIgDgCIgJgCIgIgDIgIgCIgJgDIgJgCIgKgCIgSAAIgTAAIgUAAIgRgBIgTABIgFAAIgIACIgIABIgJABIgJABIgIAAIgOAAIgFAAIgFABIgIACIgIACIgJADIgJADIgJADIgEABIgDABIgCABIgBACIgCAEIgBAEIgCAEIgBAEIgCAEIgEAHIgEAHIgDAGIgBAFIgBAFIgBAEIgBAFIgBAEIgBAEIgCAEIgBAEIgBAEIAAAOIAAAOIAAAOIAAAUIAAATIADAOIADAOIACAOIACAOIADAOIACAEIAEAJIAEAJIADAJIADAIIADAIIACAIIAAADIACADIACACIACACIADADIADADIAEACIADADIADADIAEADIADADIAEADIADAEIAEACIAEACIAEACIAEABIAEABQAOgBANAEQAOADAJAKQAKAKADAOQADAOgFANQgGAPgMAJQgMAIgOABIgJAAg");
	this.shape_72.setTransform(385.547,218.2981);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("Ag+DGIgEAAIgEgBIgFAAIgEgBIgEAAQgLgFgLgGQgKgHgKgIIgWgRQgJgGgIgJQgJgMgIgOIgEgIIgDgGIgDgGIgDgHIgCgHIgCgJIgEgMIgCgJQgDgSAAgRIgBgjQAAgQAEgQQADgRAIgPIAMgaIAEgHIACgDIADgEIABgCIACgDIACgEIADgCIACgEIACgEIADgCIACgEIACgDIAHgFIAHgFIAHgFIAHgDIAHgEIAIgDIAEgBIAEgCIADgCIAEgCIAEgCIAEgCIAEgBIAEgBIAEgCQALgDAMAAQAOgBAOABQAPABANADIAXAEIAXAFIAIACIAEAAIAEABIAFABIAEAAIAEACIADACQAIABAHADIAQAHIAQAFIAPAHQAIADAGAFIAMAJIADACIADADIADACQAPAQAIAVQAJAWgDAXQgDAagNAVQgNAUgOATQgPARgTANIgLAIIgEACIgEADIgEADIgDACIgDADIgDAEIgEACIgDADIgDADIgHAEIgHAEIgDACIgDADIgDADIgDADIgDACQgQAJgRgBQgTgBgMgOQgMgMgCgQQgCgTALgPQAJgOAOgJQAHgGAIgDIACgEIADgDIADgCIAEgEIADgCIADgCIAEgCIADgCIACgBIAEgCIADgCIADgDIAEgCIADgCIADgBIADgEIAEgEIACgDIADgEIADgDIACgEIADgDIADgDIADgEIAEgDIAAgBIACgEIABgEIAAgBIgEgCIgDgEIgEgBIgJgEIgDgBIgIgDIgJgDIgIgDIgDgBIgEgBIgDgBIgDgBIgEgBIgEgBIgEgBIgFAAIgDgBIgEgCIgIgBIgJgCIgIgBIgIgCIgIgCIgJgCIgEAAIgFAAIgEAAIgFAAIgEAAIgDABIgCACIgDACIgDABIgDABIgEACIgEADIgEABIgEABIgDACIgBABIgCADIgCAEIgBABIgCADIgDADIAAABIgBABIgBADIgCAEIgBADIgCAEIgCAEIgCAEIgCAEIgCAEIAAACIAAAKIAAAJIAAAKIAAAIIAAAKIAAAKIABACIABAEIABADIABAEIABAEIABADIABAFIABAEIACAFIACADIACAEIADAEIADADIADAEIAEACIAEADIAEADIADADIAEADIADADIAEADIAEACQANAAALAFQANAGAIALQAHAJACAMQABAOgFANQgFAMgJAHQgMAKgQABIgLAAIgFAAg");
	this.shape_73.setTransform(385.0375,225.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgbCjIgYAAIgJAAQgbgDgbgFQgbgFgYgLIgygUQgbgJgTgUQgWgVgBgdIgBgJQgEgQAAgQIgBggQAAgOACgOQADgPAFgPQADgNAIgMQAHgKALgGIADgDIAEgCIADgCIAFgBIADgCIADgBQAdgSAjAAIBKAAIBTAAQArAAAsgCQAhgBAgAJIADABIAFABIADABIAEACIAEACIAEADIAEACIAEADIAEABIADACIAEABIADACIADADIAFACIADADIALAEQAGADAGAEIAKAIIAKAIIAJAGIAKAHIAKAIIACADIADAEIACADIABAEIADAGIAEAHIACAIIABAIIABAJQABAHgBAHIgDAMIgCAEQgCAKgFAKQgGAIgGAIIgRATQgJAIgKAGIgYANQgLAFgKADIgFABIgIAEIgHADIgHAEIgIADIgIADIgIADIgIADIgCABIgJAIQgGAEgFACIgMAEIgMAAIgMgCIgMgFIgCgCQgDAIgGAHQgFAHgHAFQgIAFgIACQgLACgJAAIgYgBgAAGA/IADABIAFAAIAEABIADABIAEABIADACIAEACIADACIABgDIADgHIAFgGIAEgGIAGgEIAGgEIAGgFIAHgFIAIgEIAIgDIAMgFIAJgDIAIgEIAIgDIAIgEIAIgDIAHgDIAGgBIAEgBIADgCIAFgCIADgCIAEgCIAEgCIADgEIAEgDIgEgDIgDgCIgFgDIgDgDIgDgDIgFgCIgJgEIgIgEIgHgEIgHgFIgFgCIgEgCIgDgBIgDgDIAAAAIgEgBIgEgBIg+AAIhAAAIg9AAIhAAAIgbAAIgCABIgDABIgEACIgCACIgEACIgBABIgCADIgBADIAAAEIAAAKIAAAKIAAAJIAAAJIAAAEIAAADIABAEIABAFIABADIAAAEIABAEIAFACIAKAEIAOAGIANAFIAMAGIAgAKQAPAEAPACQAPACARAAIAcgBIAPAAg");
	this.shape_74.setTransform(383,223.62);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAfBpIgLgCIgLgFIgJgHIgBgCIgCgDIgNAAIgOAAIgIAAIgMAAIgNgCIgIgCIgLgEIgHgEIgHgDIgGgFIgLgIIgGgGIgDgCIgCgDIgCgDIgGgNIgDgKIgBgRQAAgIABgIQABgIADgHIAIgRIABgDQAGgIAHgGQAGgGAHgDIAPgHIARgHQAKgDALgBIAJgBIAcgGIAbgGQANgDANgBIAZAAQANABAKAFIAEACIADACIADACIADADIADACIADACIACADIADACIACADIABADIACAEIABADIADADQAFAJABAKIACATIABAUIAAASIgCAQQgBAHgDAHIgEAFIgEAGIgFAGIgCADIgDACIgFAFIgHAFIgDACIgDADIgDACIgEACIgDACIgEACIgDACIgDACIgEADIgDABIgEACIgKAGIgLADIgIABIgEgBg");
	this.shape_75.setTransform(386.1167,221.0583);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("ACTA4IgFAAIgEgBIgFAAIgEgBIgJgCIgIgDIgEgCIgCgBIgDAAIgsAAIgtAAIgmAAIgngBIgmABIgJAAIgDABIgCAAIgEABIgDABIgEABQgLAGgNAAQgOAAgNgIQgKgGgFgJQgGgJgCgLQgBgKADgKQADgKAHgIQAIgIAJgHIADgCIADgBIAEgBIAEgBIAEgBIAEgBIAEAAIADgBIAEgBIADgBQAdgFAeABIA1ABIA2AAIA1gCQAdgBAcAKIAIADQAMAAAKAFQALAFAIAJQAGAIADAJQADAKgCAKQgBALgGAJQgGAJgIAGQgJAGgLACIgIAAIgEAAg");
	this.shape_76.setTransform(381.215,226.6952);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("ABjBBIgEAAIgEgBIgEAAIgEgBIgEgBIgEgBIgBAAIgDgBIgJgBIgJgCIgJgCIgHgCIgEgBIgDgBIgEgBIgFAAIgIgBIgJAAIgHgBIgEgBIgDgBIgDgBIgEAAIgXAAIgRAAIgSgBQgKgBgKgDIgUgFIgEgCQgPgIgKgOQgHgKAAgMQgCgQAJgOQAIgNAOgGQAMgFANABQALABAKAGIAEABIADABIADABIATAAIAOAAIANAAIAOABIAQADIAEABIAOAAIAMABIAIABIAIACIAHACIAIADIAFABIAEAAIAFABIAEABIAFAAIADABIADABIAEABQAMABAKAGQAJAFAGAHQAJALACAMQABAMgEAMQgEALgIAIQgJAJgLADQgHACgIAAIgDAAg");
	this.shape_77.setTransform(386.1097,224.7417);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgqA4IgBAAQgSAAgQgIQgQgJgIgQQgJgRAFgRQAFgRAOgLQAPgLATACIANADIAEgBIADAAIAEgBIAEAAIAEgBIAEAAIAEAAIAEAAQAagHAcAAQAPAAAOAGQAaAJAGAbQAFAWgPASQgOARgVABIgmABIgEABIgDAAIgEABIgEABIgEABIgEAAIgHABIgIAAIgDABIgCABIgFABIgEABIgFAAIgEABIgFAAg");
	this.shape_78.setTransform(386.7449,225.6733);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AARCqQgJgCgHgGQgFgEgFgGQglgGgkgIIhLgPIhJgOQglgHgjgNQgjgNgigRIgJgFIgDgCIgDgDIgEgDIgCgDIgDgDIgCgDIgCgDQgdg4Ahg3QAPgZAbgKQA3gWA7gLQBCgNBCgGIABAAQBDgHBCABQBDACBDgCQAsgBArAJIBFAOIACABIADABIAEACIAEACIAEABIADACIAEACIAEACIADACIAEADIADACIADADIACADIADADIACADIACAFIAIAMIAFAJIAFAKIAHAPIAGAJQADAFACAGIADAJIABADIACAEIABADIABAFIABAEIABAFIAAAEIABAFIgDAQQgBAIgDAHQgCAHgEAHIgKAOIgJAMQgHAJgKAGIgGAFIgGAFIgGAEIgIAEIgJAEIgJADIgHACIgEACIgEACIgEACIgEADIgDABIgEACIgEACIgEACIgEABIgEABIgEAAIgFABIgEAAIgLAEIgRAEIgQADIgSAEIgSACIgJAAIgEABIgEACIgEABIgEABIgFABIgEABIgFABIgFABIgJAAIgDABIgEABIgEABIgEABIgFAAIgEABIgEAAIgFAAIgFABIgFAAIgKACIgPAEQgIADgIAAIgQABIgMgBgAhehCIglADIgnAHIggAFQgQACgQAEIgeAJIgfAJIgIADIgEACIgDACIA/AVQAeALAgAFIBEANIBBANQAiAHAhAGIAEAAIAFAAIAFAAIAEAAIAFAAIAEAAIAFAAIAEAAIAEAAIAEAAIAEABIAEABIADACIAEABIAEAAIAEAAIAFAAIAEAAIAFAAIAFgBIAEgBIAFgBIAFgBIAFAAIAFgBIAIgDIANgDIAJgCIAJgBIAJgBIAJAAIAOgDIAOgDIAMgDIAIgDIAIgCIAJgBIAEgBIAHgEIAHgDIAIgEIAJgEIAJgDIAFgBIAEgDIADgDIAEgCIACgDIADgDIgBgBIgBgEIgEgHIgEgHIgEgIIgEgIIgEgIIgCgEIgCgCIgDgBIgDgCIgMgCIgMgCIgIgCIgJgCIgJgDIgKgCIhOAAIhMAAIhQgBIgJAAQgkAAgjADg");
	this.shape_79.setTransform(383.5342,219.7934);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAECoQgLgBgMgCIgXgEIgXgEIgYgFIgYgGIgNgDQgcgCgbgHQgSgEgRgHIgzgRQgdgJgagQIgwgdQgLgHgJgJIgDgDIgDgDIgCgEIgCgDIgBgDQgGgJgFgKQgEgJgBgKIgEgTQgCgKAAgKQAAgLABgLQAAgJAEgJIABgDIACgCIACgDIACgDIADgEIACgDIADgDIACgDIADgDIADgDQAwgcA4gHQBAgHBBABQBBACBAAAICWAAQBOAABNgCQAUAAASAHIAFABIAEACIAEABIADABIADACIAEACIADABIAEABIADABIAEABIAEACIAEABIADABIAEACIAEACIAEABIADADIADACIAEACIADACIADADIACACIADADIADADIACADIADADIADACIACADIADADIADADIACADQAHAJADALQACALAAALIgEAUIgGATQgFALgIAJIgMAQIgFAGIgGAEIgGAEIgHADIgHADIgIACIgIADIgFABIgJAEIgJAFIgHADIgJAEIgIACIgIADIgIACIgEABIgEACIgDACIgDACIgEACIgEABIgDACIgEACIgEABIgEACIgEACIgEABIgEABIgEABIgDABIgEABIgEABIgEABIgEACIgDABIgEACIgDABIgEAAIgDABIgEABIgFAAIgDAAIgDACIgEACIgFACQAEAOgFAOQgFANgLAJQgMAKgQAAIgmABIgnABIgogBgAkBhBIgOABIgDABIgCAAIABAAIgCAAIgDAAIgFABIgFABIgFABIgEABIgFABIgFABIgEACIgEACIgFACIABACIABAEIABAEIAAAEIACACIABACIAKAGIALAIIAQAIIAQAKIAPAIIAEACIAXAHIAbAJQAMAGAOACQAOACAOAEIAOAEIAJABIANACQAIABAIACIAQAFIASAEIAJABIAGABIAJACIAJABIAJACIAIACIAEAAIAEABIAFAAIAEAAIAFAAIAFAAIAKAAIAJAAIAFAAIAEAAIAFAAIAEAAIAFAAIAEAAIAEAAIABgHIABgHIACgHIAFgJIAHgIIAJgHIAFgEIAEgCIAEgBIAEgBIADgBIAEgBIAEgBIAEAAIAEAAIABAAIACgBIAEgCIAEgCIADgBIAEgBIAHgCIAIgBIAEAAIABAAIAEgCIADAAIAEgCIAEgBIAEgBIAEgBIADgBIADgBIADgBIADgBIAEgCIADgBIAFgDIAHgDIAIgEQAFgDAGgBIAMgEIAMgDIAEgBIAIgEIAIgEIAIgEIAJgDIAIgEIgEgBIgEgBIgEgBIgEgCIgDgCIgEgCIgEgBIgDgBIgDgBIgDgBIiPAAIidAAIh/gBQg2AAg2ACg");
	this.shape_80.setTransform(380.9708,220.5625);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgfCPIgZAAIgMAAQgdgDgdgFQgcgFgbgKQgRgHgRgFIg3gUQgcgLgZgQQgPgKgKgOIgCgEIgBgEIgCgEIgCgEIAAgEIgBgDQgGgLgDgMQgDgNAAgOQAAgOABgOQABgNAFgNQAEgKAHgJIAHgJIADgDIAEgCIADgCQA5gWA+AGQARABASAAICOAAICMAAICOgBQAeAAAdAFQAiAHAMAiIAEANIACADIACAEIACAEIABAEIACAEIAAAEIABADIADAHIACAIIAAAIIAAAHIgBAIIgDAHIgBADQgDAJgFAIQgGAKgHAIQgGAHgHAFIgSAPQgIAHgKAFIgLAGIgDADIgDADIgDACIgEACIgDACIgEACQgFAEgGACIgMAEIgMAEIgNAFIgIADIgMAFIgHAEIgDACIgEACIgDACIgHAEIgEABIgEABIgEABIgDABIgHADIgHADIgIACIgIACIgIAAIgJgCIgHgDIgIgDIgEAAIgEAAIgFAAIgEAAIgFAAQgLAEgMABIgaADQgNACgNAAIgcAAgAgZArIAFAAIAFAAIAEAAIAFABIAFgBIADAAIAFAAIAFAAIARgDIARgDQAJgCAKgBIARgBQAIAAAHACQAIACAHAEIAEgBIADgCIAEgBIACgBIADgBIADAAIAMgIIALgFIANgFIARgHIANgFIAOgEIABgBIAFgBIADgDIAEgDIAEgDIAEgDIAEgCIADgCIAEgCIADgCIAEgDIAEgCIADgCIADgDIADgDIADgCIgCgEIh1AAIiEAAIh3AAIhoAAIg8AAIAAAEIAAAEIACADIACAEIABAFIACAEIAMAFIAIADIAIADIAMAFIANAEIAMAGIAgAJIAdAKQAPAGARADQARADASABQATACAUgBIAEAAg");
	this.shape_81.setTransform(384.6938,214.869);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AB2DFIgIgCIgIgDIgEgCQgjAAgkgBQgigCgjgHIhFgMIhGgNQghgGgggLIgJgEIgDgCIgCgDIgDgDIgJgJIgHgJIgIgKIgHgKIgGgLIgHgKIgCgEIgHgHIgGgHIgHgHIgGgGIgFgHIgFgHIgCgDIgBgDIgCgEIgBgDIgBgCIAAgDQgDgFgCgGIgCgOIAAgNIAAgNIAAgMIABgNIADgMIABgEIACgDIACgEIADgDIADgDIACgDIADgDIADgDIADgDIAEgHIAFgGIAFgGIAGgGIADgCIADgDIADgCIADgCIADgDIADgDIADgDIAEgCIADgDIADgCIAEgBIAEgCQAsgXA0gEQA8gFA9ABIB7ACQBCAABAAOQAuAKAsAOQANAFALAGIAFAFIAGAGIAEAGIAEAHIACADIACAEIACAEIACAEIACACIACADIABACIACADIABAEIABADIACAEIABAEIACADIABAEIAAADQAIATAAAVQgBAXgDAWQgDAWgLASIgWAmQgKASgQAOQgOAOgSAHIgEACIgDACIgEABIgEABIgCABIgDABIgOAHIgOAGIgNAGIgNAFIgMAFIgQAGIgGADIgHADIgHADIgHABIgHABIgIgBgAimheIgIACIgIABIgIABIgJACIgIACIgHACIgEABIgDACIgEADIgDACIgDABIgDADIgDACIgEADIgCACIgDABIgCAFIgCADIgDAEIgDADIgDADIAAABIAAAEIAAAFIAAAFIABACIABADIAJAJIAJAJIAJAJIAIAMIAGALIAGAKIACAEIADAEIADADIADAEQAVADAUAFQAcAHAdAFIA+ALQAdAFAcADQAcACAbAAIAFAAIAFAAIAFAAIAFAAIAFAAIAFAAIAFgBIAJgCIAKgCIAJgCIAKgBIAJgCIAFAAIAEgCIAEgBIADgCIADgBIABAAIAHgEIAIgDIAHgEIAIgEIAIgDIAEgBIADgBIAFgDIACgCIACgCIADgEIACgFIACgEIADgEIACgEIADgEIACgDIADgEIACgDIADgEIABgEIABgEIAAgDIABgEIABgFIABgFIAAgFIAAgFIAAgFIAAgFIgBgFIgCgEIgBgFIgBgCIgCgDIgCgEIgCgDIgCgEQgKgDgKgBQgLgBgLgEIgXgFIgcgFIgdgGIgOgDIgxgBIg0AAIg6AAIg7AAIgxAAIgJACg");
	this.shape_82.setTransform(381.2515,210.2159);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AAbCnQgHgBgGgDQgGgDgFgFIgIgLQgDgEgBgFIgkgGQgVgDgTgIQgSgHgTgCQgSgCgRgHIghgPIgPgIIgJgHIgGgJQgEgFgDgFIgHgMIgGgKIgFgKIgEgMIgBgBIgBgCIgCgEIgCgDIgCgEIgCgJIgBgKIAAgKIAAgJIABgJIABgIIADgIIADgKIAFgJIAHgJIAHgJQAEgEAFgDQAGgEAGgCIANgEQAIgFAJgDQAIgEAJgDIARgEIATgFQAKgDAKgCIAJgCIADgBIAEgBIADgCIAkgDIADAAIAAgBIABAAIABAAIARgBQAggEAfABIBAAAIBIAAQAdAAATAUIADADIADADIADADIACACIADADIACADIACAEIACADIACAFIACAEIABAEIABACIACADIABADIACAEIACADIABAEQAGAMAEAOQAEAPgDAPIgGAhQgEAOgGAPQgFAOgIANIgKANIgCADIgEAKIgHAKIgIAJIgIAHQgEADgFACIgOAGQgGACgHABIgMAHIgMAHIgMAFIgNAGIgPAFIgOAGIgEABIgPAHQgJADgJABIgEAAIgKgBgAhEg8IgDABIgDAAIgEABIgEABIgFABIgHACIgIADIgIACIgIACIgIACIgIACIgJACIgDACIgEACIgEACIgCABIgCABIACAEIABAEIACAEIAAADIADADIACAEIADAEIACAEIAEACIAEABIAEACIAEACIAEACIAEACQAOAEAPACQAQACAQAGQAQAGASADIAhAGIAZADIAFACIAEABIAEABIAEACIAEABIAEACIADADIAEACIALgFIAMgFIALgHIAKgGIALgFIAKgDIABgCIACgEIACgDIADgDIACgDIADgDIACgEIACgDIACgEIACgDIABgEIABgEIACgEIABgEIABgEIABgDIAAgEIABgEIAAgDIgCgEIgBgEIgCgEIgBgDIAAgCIgCgEIgBgDIgnAAIgnAAIgqAAIglAAIgUABIgEAAIgFABIgFABIgEAAIgFABIgEABIgEAAIgEAAIgEAAIgDACg");
	this.shape_83.setTransform(390.3725,212.4052);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("ABGCoIgIAAIgJAAIgKAAIgIAAQgUgBgUgEIgkgHIgngIQgTgFgRgKQgRgJgMgPIgKgJIgDgCIgCgDIgDgDIgCgEIgDgDIgWgjQgOgVgHgYQgIgYgBgaQgCgaAKgZQAHgVAPgQQAIgIAKgGIADgCIAEgBIADgCIAEgBIADgBIAqgJQAZgFAZABIBAABIA/gBQAbgBAaAHIAMABIANAEIAIAEIALAFIAIAGIAIAIIAKAMIAFAGIACADIADADIACADIADADIACAEIADAEIACAEIABAEIACACQAHANABAQIACAgQAAARgGAPQgHARgIAQIgQAbQgHALgJAJIgBADIgCADIgCAEIgBADIgDADIgCAEIgDADIgCADIgDAEIgCAEIgCADIgCAEIgDAEIgCAEIgBADIgFAGIgFAFIgFAFIgHAEIgIACIgIACIgEABIgIACIgKABIgIAAgAhbhCIgFABIgEACIgFAAIgEABIgEABIgFABIgBAEIgBAEIgCAEIABAFIABAFIABAEIABAEIADAJIADAJIADAIIAFAHIABABIADAEIADAEIAGAHIAFAIIACADIAEADIADADIADADIACADIACACIACACIADACIACABIAFABIAEABIAEABIADABIAPACIAOADIANACIANADIASAEIAFABIAJAAIAFAAIAEABIAFAAIAFgBIAEAAIACgCIABgCIACgEIADgEIADgDIADgEIACgDIADgHIACgEIACgDIADgEIACgDIAFgGIADgDIACgCIAEgIIACgEIACgDIACgEIAEgJIAEgGIACgDIAAgDIAAgEIAAgEIAAgEIAAgEIgBgCIgCgDIgCgEIgDgDIgDgEIgCgCIgBgCIgCAAIgDgBIgEAAIgEgBIgEgBIgDgBIgDAAIgoAAIgmAAIggAAIgqAAIgLAAIgMAAg");
	this.shape_84.setTransform(385.4417,209.8227);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgWCcQgPgDgOgHIgcgMIgbgQIgYgRIgbgTIgKgIIgIgJIgHgIIgHgHIgEgIIgEgIIgEgLIgBgIQgGgTACgWIAEgkQADgSAHgRIAOgaQAJgNAOgHIAMgFQAXgMAagEQAZgDAaAAIAuABQAdgBAdACQAVAAAUAKQAJACAJAFIANAIIAOAHQAGAEAGAFQAGAGAEAIIAKANIABADIACADIABAEIABAEIABADIACADIABAEIABADIABAEIABAEIABAFIAAAFIABAEIABAEIABADIAAAEIABADIABAEIABAEIABADIABAEIABAEIAAADIAAABIABADIAAAAIAAADIAEAKIACAOQAAAHgBAGIgCAMIgEAMIgFAMIgCAEIgDADIgCADIgIAMIgHAJIgIAHIgIAGIgKAHIgLAIIgCACQgOAIgQgCQgMgBgKgGQgKgGgGgKQgFgJgCgKQgBgJABgJQACgJAFgIIACgDIACgDIAGgEIAEgDIADgDIADgCIAEgCIADgDIADgCIAEgCIACgEIABgDIACgCIgBgEIAAgEIgBgEIAAgDIgCgHIgCgHIgCgHIgCgHIgBgIIgBgIIgBgEIgBgEIgBgDIgBgCIAAAAIgEgCIgDgCIgDgBIgDgCIgDgCIgCgBIgEgBIgEgCIgEgCIgDAAIgDgBIgeAAIgdAAIgdAAIgUAAIgXAAIgEABIgFABIgEABIgEACIgEACIgCAEIgCAFIgBACIgBADIAAAEIgBAEIAAAFIgBAEIgBAEIgBAEIABAEIABAEIABAEIABAEIADADIADADIASAMIASANIATAMQAHAFAJADIASAIIAEACIAFABIADABIAFABIAFABIADAAQAOAFALALQAKAKAFAOQAFAOgDAOQgCAMgJAKQgKAMgQADIgMACQgRAAgOgMgABhgvIAAAAIgBAAIAAAAIABAAgABegwIABAAIgBAAg");
	this.shape_85.setTransform(394.8348,209.3172);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AAnB9IgngBIgyAAIgSAAIgEAAIgEAAIgEgBIgEAAIgEgBIgEgCIgEgBQgbgFgZgHIgvgNQgXgHgNgUQgMgSgCgVQgEgeAOgcIAGgMIACgEIADgEQARglAlgSQAogVAsADQA2ACA2ABQAwAAAvAFQAeADAeAHIAEABIAEABIADACIAEACIAFACIAEACIADABIAGAFIAGAGIAFAGIAEAHIAEAIIADAIIADAIQAGAJADALQACAIABAJIAAARQAAAJgDAJIgFAPIgFALIgCADIgDAEIgDADIgDADIgCADIgJAIIgLAGIgGADIgMAGIgLAEQgGACgHABIgJADIgKABIgKgBQgFAAgEgCIgJgFIgIgGIgHgIIgDgGQAAAOgIAMQgHAMgMAGQgNAHgNAAIgCAAgAhpgXIgDABIgEABIgDABIgEACIgEADIgEACIgEACIgDADIgCAEIgCAEIgBACIgCADIANADIALAEIANADIAMADQAIACAJABIAHACIADABIAFAAIAJAAIAJAAIAKAAIAJAAIAKAAIAEAAIATAAIATAAIASABQALAAAJAFQAKAFAGAJIAGAJIABgLIADgLIAGgJIAIgIQAGgGAIgDQAHgDAIgCIAIAAIACgBIAAAAIgBgDIgCgDIgBgEQgVgFgWgBQgggDggABQgeABgcgDQgagDgbAAIgdABgAg8AaIAAAAIgBgBgACYgIIABAAIgBAAIAAAAg");
	this.shape_86.setTransform(393.4943,213.7381);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AAbB3IgEAAIgFAAIgEAAIgEgBIgFAAIgEgBIgDgCIgEgBIgEgCQgUgHgUgKQgRgIgPgKQgPgJgMgMQgQgRgBgXQAAgVAEgWIACgIQAGgYATgQQASgPAVgMQAYgOAcgCQAbgCAcAGQAaAGAVASQAMAJAIANIACAEIACAEIACAEIABAEIABADIABAHIAAAIIAAAIIAAAIIgBAJIgCAIIgCAHIAAANIgCAMIgEALIgGAJIgIAJIgJAGIgHADIgBALQgBAGgEAGQgCAFgDAEIgHAHQgEADgFACIgJAEIgKACIgNAAgAAAgRIgDABIgDACIgCABIgDACIgDABIgDACIgDABIgBABIgCACIAGAEIAGADIADABIAEACIADACIAFADIAEABIADACIADABIADABIADABIAAgDIABgDIABgDIAAgDIABgEIAAgCIAAgEIABgDIAAgDIABgDIAAgDIgDAAIgDgBIgDAAIgEAAIgEAAIgEAAIgDAAIgBAAIAAABg");
	this.shape_87.setTransform(398.3472,214.2153);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("Ah/BzIgSgCIgGgCIgHgDIgGgDIgGgDIgGgDIgGgCIgFgEIgFgDIgEgEIgFgDIgFgDIgHgEIgIgEIgMgHIgFgFIgFgFIgEgFIgCgEIgEgIIgDgHIgCgIIAAgIIAAgHIABgHQACgJAGgJQAFgJAHgIQAJgHAKgGQAMgGALgEIARgGIAGgCIABgBIABAAIABgBIAFgCIAFgEIAIgDIAIgEIAGgDIAGgDIAGgCIAIgCIAHgBIAIgCIAJgCIAIgCIAJgCIAFgBIAFgBIAIgCIAHgDIAGgCIAGgDIAJgBIAKgBIAFAAIAGgBIAFAAIAFAAIAIABIAJACIAIADIAHADIAKABIAQACIAQAEIAXAFIANAEIAMAEIAEABIAJABIAJACIAGABIAGADIAGACIACABIAJABIAIABIAHACIAFACIAGADIAEADIAIADIAHADIAIADIAHAEIAFAEIAGAFIADAFIAFAGIACAGIACAGIABAHIACAGIgBAGIgBAHIgCAHIgDAHIgEAGIgEAFIgFAFIgFAFIgGAEIgIADIgGACIgIABIgIABIgGADIgGACIgKACIgJABIgJABIgKABIAAAAIgHADIgGACIgHACIgHABIgHABIgHABIgHAAIgCACIgGAGIgIAEIgDAHIgGAHIgFAEIgHAEIgHADIgGACIgHABIgHAAIgHgBIgHgCIgGgDIgGgEIgHAAIgFAAIgHAAIgJAAIgSAAIgTABIgSAEIgRADIgSACIgKAAIgKAAgACcBAIAAAAIACgBIgBAAIgBABgAgPgNIgOAFIgHACIgIACIgHACIgGABIgGABIgHACIgIACIgPACIgCAAIgEACIgGADIgIAEIAIAAIAYgGIAbgDQANgBANAAIAXAAIAcABIAGAAIAGgGIAGgEIgIgBIgHAAIgHgBIgIgBIgGgCIgFgCIgGgDIgJABg");
	this.shape_88.setTransform(397.1,213.5375);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AB2A1IifgBIhJAAIgEAAIgFAAIgFAAIgEAAIgFgBIgEgBIgEgBIgHgCIgCgBQgNgCgKgIQgOgLgEgSQgEgQAJgQQAIgQAQgGQASgIATAEIAMAEICbgBQA+AAA+AFQAGAAAGAEQAjAZgSAnQgJATgVAFQgTAEgUAAIgEAAg");
	this.shape_89.setTransform(403.3667,216.3213);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("ADbA7IgFgBIgCgBIAAAAIgBAAIgBgBIgMgBIgPgDIgOgDIgNgDIgOgCIgNgCIhAgBIhFAAIhBAAIhBgBQgfAAgeAHIgHABQgrAWgbgnQgKgOADgQQAGgkAmgLQA2gPA6ABQBEACBDgBQBJgCBHAJIA/AJQANACANAFQAtASgNAtQgFASgQAKQgLAGgMAAQgHAAgHgCg");
	this.shape_90.setTransform(399.4511,217.941);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("ACeBCIgEgBIgFgBIgNgDIgOgDIgOgDIgOgDIgRgDIgNgDIgFgBIgEAAIgDAAIgEgBIgDAAIgDgBIgFgCIgEgBIgEgBIgFAAIgEgBIgEgBIgDgBIgCgBQg4AAg5ACQgpABgngJQgKgCgGgIQgcghAdghQAPgSAZAAQBLABBLgBQAZAAAaAHIACAAIAEAAIAEABIAEAAIAEABIADABIADABIADACIAQACIATAEIARADIAVAFIAXAFIANADIADABQAIAEAFAFQAGAFAEAHQAEAHACAHQACAKgCAKQgCAJgGAIQgFAJgIAFIgDACIgEACIgEACIgEABIgFABIgEABIgEAAIgFAAg");
	this.shape_91.setTransform(401.9248,217.4993);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("ACYBEIgEgCIgDgCIgEgCIgEgCIgDgCIgEgBIgDgBIgEgCIgDgCIgYgEIgUgDIgTgEIgRgDIgRgEIgEgBIgEgBIgFAAIgDgBIgEgBIgDAAIgFgCIgOAAIgMAAIgOAAIgJAAIgKAAIgJAAIgFABQgaABgZAJQgXAHgYgDQgVgCgOgQQgMgQABgSQACgTAOgNQAQgPAWAAIAJAAQASgGATgDIAigEQARgCARAAIAnAAQARAAASAEIAHABQANABANAEQALADALACIAXAEIAYAEIAWAFIAIABIADABIADABIADACQARAHARAJQALAGAIALQAJALAAAPQAAATgLAOQgKAMgQAEQgHACgHAAQgLAAgJgEg");
	this.shape_92.setTransform(397.792,215.65);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("ACJBOIgFAAIgEgBIgFAAIgEgBIgEgCIgEgBIgFAAIgEgBIgEgBIgEAAIgEgCIgFgBIgEgCIgFgCIgEgCIgDAAIgEgBIgDgBIgDgCIgDgBIgEgCIgDgBIgEgCIgDgCIgEgCIgDgBIgDgBIgCgCIgEgCIgCgCIgDgBIgDgCIgEgBIgFAAIgFgBIgEgBIgCgCIgEgBIgDgCIgEgBIgEgBIgFgBIgEAAIgEgBIgEgCIgCAAIgPAAIgOAAIgPAAIgTAAIgPAAQgdAMgYgTQgYgTAHgfQAHgcAcgJQAYgHAYABIBJACQALAAAMAEIAFAAIAEABIAFABIAEABIAEACIAEABIAEACIAEABIAEABIAEAAIAEAAIAEABIADABIAEABIAEABIAEACIADACIAEACIAEACIADADIAEADIADACIADACIACAAIADABIAEABIADACIAEACIADACIAEABIAEACIAEABIAEACIAEAAIAFAAIAEABIAEABIAFABIAEABIAEACQAIACAGAEQAHAEAFAGQAHAIADAMQADAKgCAJQgCAMgHAKIgFAGIgDACIgEADIgDADIgEACIgEABIgEACIgFABIgEAAIgEAAg");
	this.shape_93.setTransform(401.8491,219.2732);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("ACqBkQgIgBgGgDIgDgCIgCgCIgDgBIgVgIIgRgGIgUgIIgQgFQgJgCgJgFIgLgGQgWgDgWgHQgWgIgYgCQgWgDgWgGQgTgFgUgDQgTgCgRgJIgEgBIgEAAIgDgBIgDgBQgQAAgMgJQgLgIgGgMQgGgPADgQQADgNAJgKQAKgKANgEQANgEAOACQAKABAJAEIAEABIAEABIADABIAEABIAEACIADABIAEACIAjAHQAQACAPAEQATAFATADQATACASAGIAbAHIADABIAMABIAIABIAIADIAHADIAHAEIAHAFQAMADAMAFIAWAJIAWAHQAMAEALAEQAMAGAJAIQAKAKADAMQAEAMgDAMQgDAMgHAJQgJALgNAEQgJAEgKAAIgGgBg");
	this.shape_94.setTransform(398.2719,220.5324);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("ADYA+IgIgCIgIgEIgIAAIgHAAIgJgBIgJgCIgIgBIgJgCIgKgDQghABgigCIhOgCIhFgCIhFgDIhGgCIgRgBIgGgBIgGgCIgGgDIgFgDIgFgFIgEgFIgEgFIgDgFIgCgHIgBgFIgBgHIABgGIABgHIACgGIADgGIAEgGIAEgEIAFgFIAFgDIAGgEIAGgCIAGgBIBVACIBOADIBDACIBFACIAxABIAHAAIAHAAIAGAAIAKAAIAJABIAIADIARAEIAIABIAIAAIAHABIAHAAIAHAAIAHACIAIACIAGACIAFACIAFAEIAFAEIAFAFIAEAEIAEAGIACAGIACAFIABAHIABAGIgBAGIgBAHIgCAGIgCAFIgEAGIgEAFIgHAFIgHAEIgHAEIgHABIgIAAIgIAAg");
	this.shape_95.setTransform(377.5,222.35);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AC1BFIgHgBIgFgCIgHgDIgGgEIgGgBIgHgBIgHgCIgGgEIgKAAIgPAAIgIAAIgJgBIgJgBIgJgBIgGgBIgGgCIgGgCIgHgCIgIAAIgJgBIgIgBIgHgBIgHgCIgGgCIgGgDIgpAAIgkAAIgmAAIgvAAQgNABgMgBIgGgCIgHgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgBgGIgCgGIAAgHIAAgGIACgHIABgGIADgGIAEgFIAEgFIAFgEIAFgEIAGgDIAHgCIAGgBQAXgBAWAAIAoAAIAtAAIAoAAQAVgBATAEIAJADIAJADIABAAIAJABIAKABIAJABIAIACIAHACIAHACIAHACIAJAAIAJAAIAJAAIAJAAIAIAAIAIABIAHABIAIACIAHACIAHAEIAIACIAIACIAHACIAFADIAGAEIAFACIAFAEIAFAEIAEAFIAEAGIADAFIACAFIABAIIAAAIIgBAIIgBAIIgEAHIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGABIgHABIgHgBg");
	this.shape_96.setTransform(382.9,219.9469);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("ABiA3IgJAAIgKAAIgkAAIgkAAIgnAAIgmAAIgogBQgNAAgNgDIgIgCIgIgEIgIgDIgHgEIgFgDIgFgEIgFgFIgCgEIgEgGIgCgGIgBgFIAAgFIAAgHIAAgFIABgGIACgGIADgFIADgGIAEgEIAGgFIAFgDIAFgDIAHgCIAIgCIAIAAIAIABIAHADIAHADIAFACQAVACAXgBIAiAAIAiAAIAsAAIAtAAIAcAAIAAAAIAGgDIAHgCIAGgBIAGgBIAHABIAGABIAGACIAGACIAFAEIAFAEIAFAFIAEAFIADAHIACAGIABAGIABAHIgBAGIgBAFIgDAGIgCAHIgDAEIgFAGIgEAEIgGAEIgIAEIgHAEIgIACIgJACIgJABIgJAAIgKABIgKAAg");
	this.shape_97.setTransform(385.45,222.55);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("Aj3A2IgGgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgGIAAgHIAAgGIACgGIACgGIADgGIADgGIAFgEIAEgFIAGgDIAFgDIAHgCIAGgCQAcAAAbAAIA7AAIA5AAIA4AAIA+AAIATgBIAggFQASgEARAAIAkAAIAdAAIAdAAIAaAAIAGACIAHACIAFADIAGADIAFAFIAEAEIADAGIADAGIADAGIABAGIAAAHIAAAFIgBAHIgDAHIgDAFIgDAFIgEAFIgFAEIgGAEIgFADIgHACIgGABIgZABIgTAAIgSAAIgUAAIgRAAIgSAAIgSABIgIACIgIABIgIACIgIABIgIABIgIABIgHAAIgIABIgHAAIgHAAIgHAAIg0AAIguAAIgwAAIgvAAIgwAAIgLAAIgYgBg");
	this.shape_98.setTransform(387.275,222.55);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AB8A3IgGAAIgHAAIgGgBIgFgBIgGgDIgFgCIgGgDIgaAAIgaAAIgSAAIgSAAIgSABIgJAAIgWAFQgMADgOABIgTAAIgQAAIgOAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgFIACgHIACgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBIAHgBIAIAAIAJAAIAIAAIAJAAIAIAAQAYgHAZgCIAfgBIAkAAIAkAAQARAAAQACIAHABIAHADIAHADIACABIAGACIAHACIAGACIAGAEIAFAEIAEAFIAEAFIADAGIADAGIABAHIAAAGIAAAHIgBAGIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgFADIgGACIgHACIgGAAIgBAAg");
	this.shape_99.setTransform(394.475,213.525);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AECBLIgSAAIgSAAIgOAAIgGAAIgHAAIgGAAIgKgBIgJgBIgJgCIgGgBIgGgCIgHgBIgGgCQgcAAgcgCQgXgCgXgDQgWgDgUAAIgqAAQgWAAgVgDIgIgCIgHgCIgHgEIgQgBQgLgBgMgCIgPgEIgRgDIgSgDIgOgEIgGgBIgJAAIgIAAIgIAAIgIAAIgJAAIgHgBIgGgBIgGgCIgGgDIgGgEIgEgEIgFgFIgDgFIgDgEIgCgHIgCgHIAAgGIAAgHIACgGIACgGIADgGIADgGIAFgEIAEgFIAGgDIAGgDIAGgCIAGgCIAQAAIASAAIAQAAIAQACIARAEIARADIAIABIAJABIAIACIAJACIAJACIAJACIAIABIAIABIAIABIAIACIAIACIAIADIA1AAQAXAAAWADIAyAFQAWAEAYgBQAUgBAUAEIAIACIAHACIAHADIABAAIAJAAIASAAIATAAIASAAIAJAAIAKAAIAHABIAGABIAGACIAGADIAFAEIAFAEIAEAFIAEAEIADAFIACAHIACAHIAAAGIAAAGIgCAHIgCAGIgDAGIgEAGIgEAEIgFAFIgFADIgGADIgGACIgGACIgHAAIgJAAg");
	this.shape_100.setTransform(387.8,215.55);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("ABFAyIhXAAIhPAAIgwAAIgHAAIgHgCIgGgCIgGgDIgFgEIgEgEIgFgFIgDgFIgDgGIgDgGIgBgGIgBgHIABgGIABgGIADgGIADgGIADgFIAFgFIAEgEIAFgEIAGgDIAGgCIAHgBQAqgCAqABIBXAAIBPAAQAcgBAbACIAHABIAFACIAGADIAGAEIAEAEIAFAFIADAFIADAGIADAGIABAGIABAGIgBAHIgBAGIgDAGIgDAGIgDAFIgFAFIgEAEIgGAEIgGADIgFACIgHACIg4AAIgcAAg");
	this.shape_101.setTransform(393.8,216.05);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AjfBVIgIgCIgHgDIgHgEIgGgFIgFgFIgDgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgGIADgGIADgGIAFgFIAGgEIAGgEIAGgFIAGgDIAGgCIAHgDQAagRAbgNQAegPAfgKQAZgJAbABIAzACQAdABAcAHIAOABIAXADIAYAEIAcAGIAJABIAHADIAHACIAFABIAOADIARADIAPAEIAPADIAGAEIAHAFIAFAGIAEAGIAEAHIACAIIABAHIAAAIIgCAIIgCAGIgDAFIgDAGIgFAFIgEAEIgGADIgHAEIgIACIgHABQgRgBgRgEIgjgIIgigIIgVgEIgXgEIgIgBIgIgBIgIAAIgIgCIgIgBIgHgBIgIgCIgHgBIgQgBIgRAAIgRAAIgQAAIgPAAIgPAGIgYALIgYANIgWANQgJAGgLAFIgHACIgGAFIgGAEIgHACIgHACIgIABIgHgBg");
	this.shape_102.setTransform(389.825,211.4986);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AB7A0IgTAAIgTAAIgcAAIgeAAIgJAAIgdAAIgdAAIgdAAIgZAAIggAAIgRAAIgIAAIgGAAIgHgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgGIgCgGIgCgHIAAgGIAAgDIAAgIIACgHIADgHIAEgGIAEgGIAFgFIAHgEIAHgEIAHgCIAIgBIAIAAIAIABIAIADIAtAAIA3AAIBAAAIBPAAQAXAAAXABIAGABIAGACIAGADIAGAEIAEAEIAFAFIADAFIADAFIADAHIABAHIAAAFIAAAGIgBAHIgDAGIgDAGIgDAGIgFAEIgEAFIgGADIgGADIgGACIgGACIgRAAIgTAAg");
	this.shape_103.setTransform(387.35,217.85);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgYBLIgdAAIgTAAIgTAAIgTAAIgUAAIgHgBIgHgBIgHgDIgHgEIgEgEIgGgDIgDgFIgEgGIgDgFIgCgHIgCgGIgBgGIAAgGIAAgIIACgHIACgFIADgHIAFgGIAEgGIAGgGIAGgGIAGgFIAHgFIAHgDIAHgDIAHgCIAGgCIAGgCIAGgCIAIgDQASgCASgGQASgFARgBIAiAAIAvAAIBEAAIARAAIAHACIAGADIAHADIAGAFIAFAFIAEAHIAEAHIACAIIACAIIAAAIIgCAJIgCAGIgCAGIgCAGIgFAFIgDAFIgEAFIgCADIgCAFIgDAFIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgGADIgHABIgIABIgIAAIgEACIgGACIgIACIgHABIgIACIgIAAIgIABIgGAAIgGAAIgFAAIgHAAIgIgBIgIgCIgHACIgRABIgKAAg");
	this.shape_104.setTransform(359.6,411.6083);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AgIFoIgbAAIgcAAIgYAAQgMAAgLgCIgHgCIgIgDQgPgGgOgJIgZgTQgKgIgKgKQgJgJgIgKQgKgMgHgOIgKgSIgEgFIgEgFIgEgFIgEgHIgDgHIgDgHIgCgHQgDghACghQACgmAJglQAMguAPgrQANgmARgjIAcg/IADgGIAEgFIADgEIAHgaQAEgNAFgLQAFgMAGgLQAHgKAJgIIASgQIAGgGIAEgFIAFgFIAEgEIAGgEIAQgIIAQgIIAQgJIALgGIAFgDIANgFIAJgCIAIgBIAJABIAJAAIAJABIAFACIAbAMQAOAGANAIIAcASIAfASIAjAUIAGAEIAGAFIAFAGIAFAGIAEAGIAGAHIAGAHIADAFIADAGIACAFIADAIIACARIABARIAAARIAAASIAAASIAAASIABAJIACAJIACAJIACAJIABAIIABAIIAAAIIABAHIAAAIIAFAOQADAKABAJIABAaIAAAYIAAAZIAAAkIAAAHIgCAIIgBAHIgDAGIgCAHIgBAEIgCAKIgBAJIgCAIIgDAHIgEAHIgFAHIgGAIIgLAPIgMAOIgGAGIgGAGIgFAHIgGAIIgGAHIgEAGIgDAGIgEAEIgFAEIgEAFIgFAFIgGAFIgHADIgHADIgFADIgFADIgIAEIgFAEIgGADIgGACIgHACIgHABIgHgBIgGgBIgHgCIgGgDIgEgDIgEgDIgDAGIgDAGIgDAFIgEAEIgFAFIgGADIgFADIgGACIgHABIgQABIgIAAgAgaEEIAbAAIAJAAIAHAAIAHACIAHADIAGADIAGAFIACgGIADgGIAEgFIAEgFIAEgFIAFgFIAHgEIAGgDIAHgCIAGgEIAEgDIAFgCIAAAAIAEgGIAFgGIAEgFIAFgGIAEgGIAEgFIAEgGIAFgFIALgLIAKgNIAFgHIACgIIABgIIACgIIABgGIADgGIAAgTIAAgTIAAgTIAAgUIAAgUIgBgDIgDgHIgCgHIgCgIIgBgIIgBgIIAAgJIgBgIIgFgaQgDgSgBgSIAAgiIAAgYIAAgQIgFgGIgEgFIgUgLIgggSIgUgNIgXgOQgKgGgLgFIgGAEIgGADIgGAEIgHADIgGAEIgHADIgHADIgFAGIgFAFIgFAFIgFAEIgFAEIgFAFIgDAHIgEAHIgFASIgGASIgHAQIgIAOIgEAHIgGARIgKAZIgJAXQgFALgGAKIgIAOQgHASgFARIgHAhQgDAQgFAQIgJAiIgCAJIAAAJIgBAJIAAAJIABAKIAAAJIAGAHIAFAIIAFAIIADAGIADAGIAEAGIAEAHIAGAGIAGAGIAGAGIAGAFIAHAGIAMAIIAGAEIASAAIASAAIAcAAgAAVkCIgBABIABAAIABgBIgBAAg");
	this.shape_105.setTransform(357.1386,391.1333);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgpEpIgbAAIgSAAIgSAAIgTAAIgTgBIgGgBIgHgBIgHgBIgGgBIgHgCIgGgCQgbgCgZgGQgWgFgVgGIgegLIgkgOQgUgIgUgLIgLgGIgGgDIgFgFQgMgPgNgOQgLgMgHgNQgIgMgEgOQgEgQgBgQIABgtQAAgOADgNIACgHQAwhPBJg5QBJg5BSgpQBYgsBfgUQBigUBjACQAzABAyAHQAqAGAiAZIAGADIAGAEIAGAEIAHAEIAFAFIAFAGIAFAGIAEAFIAEAFIAFAFIADAFIADAFIADAFIACAGIACAGIAEAFIADAGIACAGIABAGIACAHIABAGIABAEIADAHIACAHIACAIIABAIIABAIIABAIIAAAHIAAAIIgBAHIgBAHIgDAJIgDAIIgBAEIgBAGIgBAHIgCAJIgCAGIgDAGIgEAFIgDAGIgEAFIgDAGIgEAGIgDAGIgFAFIgGAFIgGAFIgGAEIgIAFIgFAGIgEAFIgFAFIgFAGIgGAGIgGAGIgGAGIgFAGIgEAFIgEAGIgEAEIgFAGIgEAFIgFAEIgGAEIgGAEIgGAEIgGAEIgHADIgHADIgDADIgIAEIgIADIgGADIgGADIgHADIgFADIgFADIgEAEIgFADIgIAEIgIADIgGAEIgHAFIgEACIgFADIgFACIgHAEIgCACIAAgBIgBABIgBABIABAAIgDABIgGAFIgGAEIgGADIgGADIgGACIgGACIgGABIgGACIgHAAIgGAAIgHgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgHIgCgGIAAgHIAAgGIACgHIACgGIADgFIADgGIAEgEIAFgFIAGgDIAFgEIAHgCIAIgCIAFgFIAGgEIAFgEIAGgDIAHgDIAGgEIAGgDIAFgEIAEgDIAHgEIAIgDIAGgEIAHgEIAGgDIAGgDIAHgDIAFgDIAEgDIAGgCIAFgCIAIgFIAFgDIAFgCIAFgDIAGgDIAKgNIAKgMIAMgMIAMgMIAKgLIAHgIIAFgGIAGgEIAGgEIAIgFIAEgJIAFgIIABgHIACgGIABgHIACgGIACgGIAAgHIAAgBIgDgHIgCgGIgCgJIgCgIIgDgFIgCgGIgCgFIgDgHIgEgGIgFgFIgGgEIgHgEIgGgFIgGgEIgFgDIgIgCIgIgCIgIgCIgIgCIgHgBIgwAAIgmAAIgjAAIgaAAIgaABQgbAFgbAEQgZAEgYAHIg0AOQggAJgeAPQgVALgXAJQADgBgOAJQgMAGgLAIIgMAKIgOAJIgNAIIgOAIIgNAIIgGAFIgFAFIgFAFIgGAFIgFAFIgGAEIgFAFIgGAEIgMAMIgLANIgKAOIgFAHIgFAHIgLAPIAAAJIAAAIIAAAJIAAAJIABAJIADAGIAEAGIAGAHIAHAHIAGAHIAFADIAEACIAHADIAHAEIAGAEIAkAOIAWAIQAKAEALACIAVAFQALADAMABIAWACIAHABIAHACIAGACIAHACIAbAAIAbAAIASAAIAUAAIAUAAIAHAAIAGACIAHACIAEADIAGADIAEAFIAFAEIADAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAGIgDAFIgFAFIgEAEIgGAEIgEADIgHACIgGABIgQABIgIAAg");
	this.shape_106.setTransform(357.5917,399.4242);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AArBuIgJAAIgLAAIgJAAIgKAAIgIAAIgJgBIgJgCIgHgBIgGgDIgIgDIgFgDIgFgCIgIgEIgIgEIgFgCIgFgDIgGgDIgIgGIgGgFIgHgFIgGgDIgEgEIgFgFIgDgGIgDgGIgEgGIgDgFIgEgGIgDgFIgDgHIgFgHIgCgGIgDgHIgCgHIgBgIIABgIIACgIIADgHIADgHIAFgHIADgGIAEgGIAEgFIAFgFIAEgFIAFgEIAFgEIAGgDIAGgDIAFgCIATgDIATgBIASAAQANAAAMACIAXAFIAIADIAHABIAIABIAIACIAIACIAIADIAIAEIAHAEIAGADIAHAGIAFAFIAFAEIAFAGIAFAEIAFAFIADAGIAEAFIAEAFIACAGIAEAGIACAGIADAFIAEAFIABACIAFADIAFAFIADAFIAEAFIADAGIABAGIABAGIAAAGIAAAHIgBAGIgCAGIgDAGIgEAFIgEAFIgGAEIgEAEIgGADIgHACIgGABIgGAAIgHAAIgGgBIgEAFIgGAFIgFAFIgGADIgHADIgHACIgHAAIgKAAgAgEAIIAEACIAAAAIAEAAIAFAAIADAAIAJAAIAFAAIgDgDIgCgCIgDgDIgCgBIgFgBIgLgBIgNgDIgJgCIgJgCIgGgBIAEADIAIAEIAHADIADACIAEACIAEABIADACIgDgBIADABg");
	this.shape_107.setTransform(363.9,408.095);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AkJCgIgHgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgHIACgHIACgGIAEgGIADgFIAFgFIAFgFIgBgCIgDgHIgDgHIgDgIIgBgHIgCgEIgDgFIgEgEIgCgFIgEgIIgDgJIgBgGIgBgHIAAgHIABgIIABgJIACgIIADgGIADgFIADgGIAEgFIAHgFIAEgFIAEgEIAFgDIAGgEIADgDIAEgDIAIgEIAIgDIAFgDIAFgDIAGgCIAIgCIAEAAIAFgBIAHgEIAHgDIAHgBIAHgCIAIgBIACAAIAHgDIAGgCIAIgCIAIgCIAIgBIAFgBIAHgCIAHgDIAHgBIAHgCIAIAAIAKAAIAJgBIAKAAQArgKArgGQAngFAoABQArABArgBQAngBAoAEIAIADIAJAEIAGAFIAHAGIAFAFQAGAIAEAKIAJAUIAHAZIADARIABASIAAAGIgBAHIgBAGIgDAGIgDAGIgCAFIgEAFIgEAEIgGAEIgFAFIgHAEIgGADIgIADIgGABIgHABIgIAAIgGAAIgFAAIgFADIgDADIgDADIgFAFIgEAEIgFADIgJAEIgIADIgGABIgHABIgQAFIgQAEIgQAEIgQAEIgQAEIgJADIgJAEQghAIgiAGIhMANIhTAPQgoAIgmAOIgOAFIgJACIgJAAIgIABIgGgBgAAfg5QgbACgYAHQgfAIggABIgRABIgHACIgFADIgIABIgJABIgIACIgBAAIgIADIgGACIgHACIgHABIgHABIgHAEIgHACIgHACIgIACIgBABIgHADIAEAIIAEAJIABAFIAAAEIADAGIAEAFIACAGQASABAZgFIAqgLQAXgGAWgCIAvgHQAVgDAUgEIAigHIAHgEIANgDIAHgCIARgFIATgEIAJgDIAHgBIAHgDIAHgCIAJgCIADgDIAHgFIAHgFIAGgEIAIgFQgagBgeABIgzgBIgJAAQgXAAgXACgADoAgIgBABIABgBIACgBIgCABg");
	this.shape_108.setTransform(367.1,400.0409);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AFxDnIgIAAIgJAAIibAAQhOAAhOgCQhMgBhLgTQhKgShLgKQhNgKhFgiQgLgFgKgHIgHgDIgGgDIgGgEIgFgEIgEgGIgFgFIgEgFQgJgOgIgPQgIgSgEgTQgDgQAAgPIACgrQABgUAIgSQAHgRANgNIAFgFIAFgGIAGgEIAFgFIAFgFIAFgEIAGgEIAGgFIAGgFIAHgGIAGgEIAIgEIAHgDIAIgDIANgJIAOgHIAOgHIAPgFIAQgFIARgEIARgEIAKgCIAHgCIAHgCQAygIAyABQA6ACA6gCQA0gCA0ANIBoAcQA1APAtAeQATANASAOIAFAFIADAGIAGAEIAFAEIAEAFIAEAGIABAAIAFAGIAIAEIAPAJIAOAKIANAKIAMALIALAMIAKANIAIALIAEAEIACAEIAGAGIAGAGIAFAGIAGAGIAEAHIAFAHIADAEIADAEIACAGIADAGIACAFIAEAIIADAIIACAIIABAJIABAJIAAAJIAAAKIAAAKIgBAJIgBAKIgBAJIgCAHIgDAGIgEAGIgEAFIgEAFIgGAFIgGAEIgGAFIgHAFIgIADIgIABIgIACIgIADIgIADIgIACIgIABIgJABIgIAAIgJAAgAjaiAIgIACIgHACIgIACIgJACIgIACIgKACIgJACIgJADIgJACIgGADIgGACIgFADIgGADIAAABIgFAEIgFADIgGADIgGACIgJAEIgEADIgEADIgGAGIgGAFIgHAEIgEAEIgEADIgDAEIgEAEIgCADIgBAJIAAAJIAAAJIAAAJIAAAJIAAAJIABACIADAGIADAIIAEAHIAJAEIAEADIAFAEIAIAFIAIAFIA+ATQAeAJAfADQAhACAgAHIBBAMQAhAGAhAIIAgAIIAIAAIAJABIAJAAIAJAAIAJAAIAJAAIBAAAIA6AAIA6AAIA7AAIA6AAIAdAAIAFgDIAGgBIAEgCIAAgFIAAgGIgDgGIgCgGIgEgFIgEgIIgEgEIgHgEIgHgGIgEgFIgEgFIgDgGIgCgGIgFgHIgDgFIgEgFIgFgGIgGgFIgEgCIgGgEIgFgFIgFgDIgFgDIgGgDIgFgCIgGgDIgFgDIgFgFIgFgFIgCgCIgGgFIgGgGIgFgGIgDgDIgFgEIgEgFIgEgGIgGgEIgFgEIgFgFQgOgJgPgHIgegOQgNgFgPgEQgSgGgTgCQgPgCgPgEIghgJIgIgDIgsgBIguABIgvAAIgjAAIgkgBIgkABg");
	this.shape_109.setTransform(360.575,400.0172);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AhGC0IgSAAIgPAAIgXAAIgRAAIgRgDIgRgDIgQgEIgRgEIgQgFIgHgCIgIgBIgHgBIgIgCIgGgCIgGgDIgHAAIgGgBIgHAAIgHAAIgHgBIgGgCIgIgCIgHgDIgIgEIgFgEIgFgEIgFgFIgEgCIgFgDIgFgEIgFgEIgEgGIgHgFIgGgEIgGgDIgFgFIgFgEIgFgFIgFgGIgEgGIgDgHIgCgGIgDgIIgDgGIgCgHIgDgHIgBgHIAAgIIAAgHIABgGIABgHIABgGIACgHIADgGIAEgGIAFgFIAGgFIAGgFIAGgEIAIgDIAGgCIAHgCQAKgFALgCIAWgFIAXgFIAagEIAbgGIAJgDIAGgDIAFgEIAGgDIAGgEIAHgCIAHgBIAIgBIAJgBIAHgEIAGgDIAHgEIAGgDIAHgCIAGgCIAHgBIAHgBIAHgBIAGgDIAGgCIAIgCIAJgBIAJgBIAHgDIAGgCIAGgCIAIgBIAHgBIAHgBIAIAAIAJAAIAJAAIAJAAIAXgFIAYgEIAdgFQATgDATgCIAjgCIAIAAQAYgGAYgCQAcgBAcAAQAeAAAdADQAcADAaAKIAmAQIAGADIAFAFIAEAFIAEAEIAEAFIAEAFIADAGIACAGIACAGIABAHIAAAGIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgHAAIgHAAIgIgCIgHgDIAEAHIADAHIACAIIABAHIgBAIIgCAHIgDAHIgEAHIgFAGIgFAFIgGAFIgHAEIgIADIgGABIgHACIgEACIgFADIgGADIgHADIgHADIgHADIgHACIgHACIgHACIgIADIgIAEIgJADIgJADIgJACIgJADIgQAIIgXAMIgOAGIgQAIIgUAJQgKAEgKABIgFABIgCAAIgCABIgFADIgGACIgHAGIgIAEIgHACIgIADIgHADIgGADIgHADIgIADIgIADIgJADIgIACIgIADIgHADIgQACIgPABIgRAAgABRCFIAAAAIABAAIABgBIAAAAIABAAIgBAAIgCABgACQhHIg1AEQghAEggAIQgZAFgXABIgcAAIgIADIgIAEIgHABIgIABIgIABIgHADIgGACIgJACIgJABIgJACIgHADIgHAEIgHADIgIAEIgJADIgIABIgJABQgKAGgKAEQgLAFgLADQgLADgMACIggAGIgdAGIABAAIAGAHIAHAGIAIAGIAHAFIAIABIAHAAIAIABIAIABIAHACIAIACIAIADIADABIAKABIAJACIAHACIAHACIAQAFIARAEIARAEIAKAAIAKAAIAKAAIAKAAIAJAAIAJAAIAJAAIAJAAIAIAAIAJAAIAGgCIAGgCIAJgDIAIgCIAGgDIAGgCIAFgDIAEgCIAGgDIAGgCIAHgCIADgDIAIgEIAIgEIAGgDIAHgDIAGgCIAHgBIAHgCIAKgCIAIgDIAGgDIgEACIgCABIgEABIARgIIANgHIAUgKIAZgLQAPgHAQgEIAJgCIAIgDIAIgEIAIgDIAIgDIAIgCIAIgCIAGgDIAGgFIAHgEIAIgDIAHgCIAGgBIAGgEIAHgDIAIgBIAHAAIAIAAIAHACIAHADIgCgEIgHgDIgHgDIgHgCIgIgDIgHgCIgIgCIgSgBIgSAAIgRAAIgPAAIgTAAIgSAAQgWAGgXACg");
	this.shape_110.setTransform(354.125,398.075);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AlqBAIgHgCIgGgCIgGgCIgFgEIgFgEIgEgFIgEgFIgDgGIgCgHIgBgGIgBgGIABgIIABgHIADgFIADgGIAEgFIAFgFIAFgFIAGgDIAGgCIAHgCIAGgEIAHgCQBFgJBHACQBDABBDAAIB1AAIB3AAIBuAAIAFgBIAGgCIAGgBIAGgCIAJgCIAIgBIAJAAIAJgBIAJgDIAJgEIAGgBIAHgBIAGABIAHABIAGADIAFACIAGAEIAFAFIAEAEIAEAFIADAHIACAFIABAHIABAHIgBAHIgBAFIgCAGIgDAGIgDAEIgFAGIgEADIgGAFIgGADIgGACIgDABIgIADIgHADIgJABIgJABIgKABIgJABQhGAPhJgCQhEgDhEgBIh/AAIhxAAQg2AAg2ABIgJAAIgBABIgGACIgHACIgHACIgGACIgIABIgGgBg");
	this.shape_111.setTransform(370.775,402.65);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AE/A8IiLAAIiyAAIieAAIgeAAIg4AAIg1AAQgbAAgbgCIg1gEQgdgDgcgLQgNgFgLgKIgEgFIgEgFIgCgGIgCgHIgCgFIAAgGIAAgHIACgGIACgGIACgGIAEgGIAEgFIAGgEIAGgEIAGgDIAHgCIAHgBIAHAAIAHABIAHACIAGADIAGADQBXAOBXgBQBngCBmAAIDZAAIC6AAQAugBAtABIAHACIAGACIAFADIAGADIAFAFIAEAEIADAGIADAFIADAHIABAFIAAAHIAAAGIgBAHIgDAGIgDAGIgDAFIgEAFIgFAEIgGAEIgFADIgGACIgHABIhaABIguAAg");
	this.shape_112.setTransform(363.925,408.1333);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AnjBPIgIgCIgIgDIgGgEIgGgFIgFgFIgDgFIgDgGIgCgHIgCgGIAAgGIAAgHIACgGIACgGIADgGIADgFIAFgFIAFgFIAGgEIAHgFIAHgDIAGgDIAHgCIAGgDIAHgCQBUgMBVADQA9ACA+AAIBzAAIB6AAQAuAAAsgBIAagFIAagFIAbgGIAYgFIAOgEQAOgCAPgBIAbgBIAmAAIAcAAIAdAAIAGgDIAHgCIAGgCIAHgBIAIgBIAJgBIAHAAIAHAAIAGABIAHADIAFADIAFADIAGAFIADAFIAEAFIADAGIACAGIABAGIABAHIgBAHIgBAGIgCAGIgDAGIgEAEIgDAFIgGAEIgFAEIgFADIgHACIgGABIgHABIgIAAIgGADIgFACIgGADIgHABIgZABIggAAIglgBIgcABIgTABQhWAYhYACQhIADhFAAIiSAAIiSgBQg+AAg/ACIgDABIgGACIgFACIgGAFIgHAEIgHACIgGACIgIABIgHgBgAm2BAIgBABIgCABIABgBIACAAIABgBIgBAAg");
	this.shape_113.setTransform(363.8,409.125);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AGNBAIgHgBIgIgBIgIgDIgIgEIgJgBIgKAAIgJgCIgHgCIgGgCIgHgDIgHAAIgHAAIgIAAIgHAAIgHgBIgHgBIgGgBIgHgCIgHgCIgGgDIieAAIiIAAIiAAAIiAAAQg3ABg2gBIgHgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgFIgCgGIgBgGIgBgHIABgGIABgHIACgGIADgGIAEgFIAEgFIAFgEIAFgEIAGgDIAGgCIAHgBQBTgBBTAAICMAAICBAAICCAAIByABIAHABIAFACIAGADIAFADIAJAAIAIAAIAJABIAJAAIAIABIAIACIAHACIAIADIACAAIAIABIAIABIAIABIAHABIAHACIAGADIAHADIAGABIAGACIAGADIAGADIAFAFIAFAGIAEAGIADAHIACAHIABAIIgBAIIgCAHIgDAIIgEAGIgFAGIgFAFIgGAEIgHADIgHACIgIABIgCAAIgIgBg");
	this.shape_114.setTransform(361.575,404.575);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("An0BAIgHgBIgHgCIgFgEIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgBgGIgBgGIABgHIABgHIACgFIADgFIADgGIAFgEIAEgFIAGgDIAFgEIAHgCIAHgBQBSgBBSABICpAAICnAAICpAAIDQAAIATgEIAUgEIASgDIASgGIANgEIAMgGIAHgCIAIgBIAIAAIAIACIAGABIAGADIAGAEIAEAEIAFAFIADAFIAEAIIACAHIABAIIAAAIIgCAIIgCAFIgDAGIgDAGIgFAEIgEAFIgGADIgeAOQgPAGgQACIgfAGQgRAEgRADQgPABgPAAIgnAAIgnAAIiVAAIiTAAIiTAAIiVAAIiUABIgugBg");
	this.shape_115.setTransform(362.6,416.65);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgqBGIgmAAIhBAAIhBAAIhCAAIg/AAQghAAgggCIgSgCIgIgDIgGgDIgFgCIgGgDIgEgEIgFgFIgDgFIgEgFIgDgFIgDgGIgEgHIgCgIIgBgIIAAgGIACgJIACgGIADgFIADgGIAFgFIAEgEIAGgDIAFgDIAGgCIAGgBIAGgBIAGAAIAGABIAGABIAGADIAFACIAFAEIAFAEIADAFICbAAICnAAQBqAABqgSQBKgNBLgGQAkgDAkAAQAggBAgABIAHACIAHACIAFADIAGADIAEAFIAFAEIADAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAFIgDAFIgFAFIgEAEIgGAEIgFADIgHACIgHABQgMABgNAAIgdAAIgcAAIgagBIgbABIgRAAIgJACIgJACIgKACIgJACIgJABIgJABQgaAHgcAEIg1AHIg3AFIg2AFQgVACgWAAIgJAAg");
	this.shape_116.setTransform(356.8,397.1208);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("AhoC0IgGAAIgGAAIgeAAIgYAAQgOAAgPgDIgbgGIgZgFIgXgFIgJAAIgIgBIgIgBIgIgBIgJgBIgIgCIgIgCIgGgCIgGgCIgGgBIgFgBIgFgDIgHgFIgGgFIgEgFIgEgDIgEgFIgEgGIgDgFIgCgGIgCgIIgCgIIgBgHIgBgIIAAgIIAAgJIAAgIIAAgJIgDgGIgCgGIgCgKIgBgJIgEgHIgDgGIgCgIIgBgHIAAgIIABgIIADgHIADgHIAFgGIAFgFIAHgFIgEgHIgCgIIAAgIIAAgGIACgHIACgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBIAHgBIAGAAIAGAAIBRgRQAxgJAxgCQBAgCBAAAIB8AAIA6AAQANgGAPgBQAWgDAWAAIAjAAIAuAAIAuAAIAZABIAHABIAGACIAFADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIACAHIABAIIAAAJIAAAIIAAARIAAASIAAAPIAAANIAAAIIgCAIIgDAIIgDAHIgFAIIgEAFIgEAFIgFAFIgFAEIgFAEIgFAEIgHADIgGADIgGABIgGACIgHAGIgHAGIgHAFIgFAEIgGADIgGAEIgFAEIgFAEIgGAEIgEAGIgFAGIgFAFIgGAGIgHAGIgHAFIgGADIgHACIgGABIgHABIgHADIgHADIgIACIgIABIgIABIgBABIgHADIgHACIgoAGIgnAGIgnAIIgiAIQgVAGgVADQgWADgWAFIgHADIgHACIgHACIgHABIgJABIgHABIgIAAgAhzhEQhMAAhKAPIg4ANIAEAGIAEAIIABAJIACAIIABAIIADAFIACAGIABAIIACAIIAAAIIABAIIAAAIIAAAJIAHABIARABIAPACIAXAEIARADIAbAGIATAEIAHAAIAIAAIAIAAIAHAAIAKAAIAKAAIAKAAIAJAAIAKAAIADgBIAGgDIAHgCIAIgCIAJgCIAHgBIAHgCIAOgCIAQgDIAIgBIAIgBIAVgGIAlgIIAkgHIAggGIAigEIAGgDIAGgCIAIgCIAIgBIAIgBIABAAIAGgDIAGgDIAGgBIAFgCIAAAAIAEgGIAFgFIAEgEIAFgEIAFgDIAGgEIAFgEIAFgEIAFgEIAGgEIAFgDIAFgDIAGgFIAGgFIAGgFIAHgFIAFgDIAGgDIAGgCIAAgHIAAgHIgPAAIgPAAIgdAAIgeAAIgdABIgKAAQgsAOgwgCQg4gDg2AAIhoABgAFeAeIgBABIgBAAIACgBIABgBIgBABg");
	this.shape_117.setTransform(368.225,405.0917);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AjzClIgGAAIgHAAIgJAAIgIAAIgHAAIgGAAIgHgCIgIgDIgJgDIgFgEIgEgDIgEgEIgDgDIgEgDIgGgGIgGgGIgGgEIgGgFIgGgEIgFgFIgEgFIgDgGIgDgEIgDgEIgEgIIgDgIIgEgGIgEgGIgEgGIgEgHIgEgFIgDgFIgEgFIgDgGIgCgGIgCgGIAAgHIAAgIIACgGIADgIIAEgGIAFgGIAGgFIAHgFIAHgDIAIgBIAIgBIAGAAIAHACIAGACIAGACIAGAEIAEAFIAFAGIAGAGIAFAGIAEAGIADAGIADAFIAEAGIADAEIAEAFIADAGIADAHIAEAFIAHAFIAGAGIAGAFIAFAFIAJAAIAJAAIAJAAIAHgDIAHgDIAHgCIAIgBIAIgBIAIAAIAJAAIAJAAQAJgEALgDQALgDAMAAIAfAAIAbAAIAdAAIABgBIAHgDIAGgCIAKgCIAKgCIAJgBIAHgDIAHgCIAIgCIAIgBIAJgBIAIAAIABAAIAHgEIAHgCIAHgCIAHgBIAHgBIABAAIAGgDIAHgDIAGgCIAGgBIAHgCIAHgCIAGgCIAGgBIAGgBIAKgBIAJgBIAHgDIAIgCIAHgCIAIgCIAHgCIAHgDIAGgCIAJgCIAJgBIAJgCIAGgDIAHgEIAHgDIAHgDIACgDIADgEIAFgHIAFgGIAGgFIiNgDQhMgBhLAJQhKAJhKAOQhDAOhFgDIgPAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIACgHIACgGIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBIAHgBIAJAAIATABIAJAAIAKAAIAJgBIAJAAQBHgOBHgKQBQgLBPgCQBNgDBMAAQBJgBBJADIAHACIAHADIAGADIAGAEIAGAEIAFAFIAGAGIADAHIADAGIACAFIABAFIABAGIABAHIAAAIIgBAIIgCAIIgDAIIgDAIIgEAIIgCAFIgDAFIgEAGIgEAGIgEAFIgFAGIgGAFIgGAFIgGAFIgHAFIgDADIgGAGIgGAHIgFAHIgFAGIgFAFIgGAFIgGAEIgGADIgHADIgHAEIgHADIgHAEIgIAEIgIADIgJACIgGACIgHABIgGABIgHADIgGACIgJACIgIACIgJACIgGACIgGACIgGADIgHABIgIABIgIAAIgGACIgFABIgGACIgHACIgGACIgHADIgIADIgIACIgGABIgGABIgGAEIgHADIgHACIgJABIgIABIgJAAIgIAAIgCAAIgGADIgGACIgHABIgIACIgHABIgGABQgKAFgKACQgMADgNAAIgeAAIgUAAIgaAAIgJAAIAAAAIgIADIgHADIgJACIgJABIgJABIgKAAIgJAAIgIADIgHADIgIACIgHABIgIABIgHAAIgGAAgAELgoIAAABIACgBIgCAAg");
	this.shape_118.setTransform(370.125,406.5639);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AjDDOIgJAAIgJAAIgJAAIgJAAIgKAAIgJAAIgJAAIgGgBIgHgBIgGgCIgFgDIgFgDIgFgEIgEgFIgEgFIgDgGIgCgGIgCgGIgGABIgHAAIgGAAIgGgBIgGgCIgGgDIgGgDIgEgFIgFgEIgLgWIgMgZIgRggIgQggIgOgYIgFgGIgFgFIgFgEIgFgFIgFgFIgDgFIgDgGIgDgHIgCgGIgBgGIgBgIIgBgJIgBgGIAAgHIABgHIABgFIACgIIADgHIAEgHIAFgGIAHgGIAGgFIAGgFIAGgEIAGgFIAGgEIAGgEIAGgCQALgDALgBIAVgCQARgBARgDIAjgHIAjgIIAGgCIAGgDIAHgBIAHgCIAIgBIAHAAIAHgBQBGgWBKABICdABICBAAIChAAIARAAIAHACIAHACIAGACIAGADIAGADIAHAEIAHAEIAGAFIAFAGIAEAGIADAGQAEAKACAKIACAWIAAAoIABAxQAAAWgFAUIgCAGIgDAGIgEAGIgFAHIgFAIIgFAGIgFAHIgMALIgNALIgGAEIgGADIgHACIgHADIgHACIgHADIgIADIgHADIgIADIgHADIgHACIgHABIgHABIgHABIgHAAIgGABIgHAAIgGAAIgIACIgIACIgIADIgIADIgIADIgJADIgHABIgHABIgHABIgHAAIgCABIgHADIgGABIgsAIIgzAKIg/AQQgbAHgbADIgZACIgHABIgHACIgIACIgJACIgIABIgIABIgIAAIgPABIgBAAIgGACIgHADIgGABIgHACIgHAAIgOABIgRABIgTAAgAh3hmIgNADIgQAEIgRAFIgSADIgQADIgRACIgPAFIgTAFIgPADIgQADIgQADIgSADIgQADIgYADIAEAFIAEAFIANAXIANAXIAOAbIANAaIANAbIAIARIACAIIAGgBIAPAAIATAAIASAAIARAAIARAAIARgBIAIAAIACAAIAGgDIAGgCIAIgCIAJgBIAIgBIAIAAIAIgBIAJAAIAHgCIAIgCIAHgCIAJgBIAJgBIAJgBIAJAAIAJgBIAegIIAhgIIAWgFIAVgFQAQgCAPgEQARgEASgCIATgDIABAAIAGgDIAHgCIAHgBIAJgBIAKgCIAJgBIAIgDIAOgFIAPgFIAKgCIAJgCIAJgBIAKAAIAJgBIAKAAIAIgDIAHgCIAIgEIAIgEIAIgCIAIgCIADgEIAEgEIAFgHIAAgJIAAgJIAAgJIAAgJIAAgJIAAgIIAAgJIAAgIIAAgIIAAgIIhkAAIhjAAIhoAAIh5gBIgNAAQgaAAgaACg");
	this.shape_119.setTransform(372.1771,400.5479);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AmZC6IgGgBIgHgCIgFgDIgGgEIgFgEIgEgFIgDgFIgEgGIgCgGIgBgHIAAgGIAAgHIABgGIACgHIAEgFIADgGIAEgEIAFgFIAGgDIAFgDIAHgCIAGgCQAQgBARABIAkAAIAlAAIAmAAIAtAAIAKgBIAQgDIAPgDIAQgCIATgBIAQAAIATAAIAUgBQAngIAmgLIBEgTQAzgMAzgOQAzgNAwgaQASgJAUgGIAIgEIAHgFIAGgFIAHgFIAHgFIAFgFIAGgEIAGgEIAEgEIiJABIi7gBQhMAAhNAFQg7AEg7AJQgxAIgxAGIgIACIgHACIgHADIgGADIgGADIgGACIgEAHIgEAHIgFAGIgBAHIgBAGIAAAGIgDAGIgDAGIAAACIAAAGIgCAHIgBAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgHACIgGABIgGABIgHgBIgHgBIgGgCIgFgDIgGgEIgEgEIgFgFIgEgFIgCgGIgDgGIgBgHIgBgGIABgJIABgIIABgIIADgJIADgIIABgHIABgIIACgIIACgHIAEgGIAEgGIAEgHIAEgGIADgEIADgIIAFgFIAEgFIAFgFIAEgGIAFgEIAGgEIAGgDIAIgDIAIgDIAJgEIAHgDIAIgDIAHgDIAHgCIAHgDQBMgIBMgOQBsgTBuAEQBUADBVAAQBTAABTgCQA8gBA4AXIAGABIAGADIAFACIAGAEIAFAEIAFAEIAEAFIAFAFIADAFIAEAGIACAGIAAAGIABAHIAAAIIAAAIIgCAIIgEAHIgEAHIgEAHIgFAHIgFAHIgFAGIgHAFIgGAFIgFAEIgGADIgGAEIgHADIgHADIgGADQgLAFgKAHIgUAOIgPALIgQALIgMAHIgMAFIgPAFIgHACQgqAVgrAQQguARgxANIh5AgQgnALgoAEQgqAFgqAAIgSAEIgRADIgRACIgIABIgHAAIgHAAIgIAAIgHAAIgaAAIgaAAIgcAAIgdAAIgcAAIgZgBg");
	this.shape_120.setTransform(375.45,409.441);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AhLDfIgTAAIgHgBIgGgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgCgHIAAgGIAAgHIACgGIACgHIADgFIAEgGIAEgEIAFgFIAFgDIAGgDIAGgCIAGgCIARAAIATAAIASAAIATAAIASgBIAIgCIAHgCIAIgBIAHgCIAGgBIAHgBIABAAIABAAIAFgBIACgCIAEgBIAGgDIAFgCIAFgDIAIgDIAIgDIAIgCIAIgEIAJgEIAIgEIAIgDIAGgCIAHgBIAIgBIAGgBIAGgBIAHAAIAGgDIAFgCIAIgDIAHgDIAIgDIAHgDIAJgBIAJgBIAKAAIAJgBIAJAAIAZgHIAZgGIAZgEIAbgDIAIAAIAQgDIAPgEIAOgDIAOgEIANgFIALgGIAIgBIAIgBIAIgCIAIgBIAIgCIAIgBIAHgCIAGgDIAGgFIAGgFIAHgEIAQgFIAOgFIAPgGIAPgFIANgEIAHgCIAIgEIAHgEIAEgGIAGgGIAGgHIAEgGIAAgIIAAgIIAAgJIAAgIIgIgDIkEAAIj1AAIjngBQhhAAhiACIgUAFIgaAHQgNADgNACIgYADIgDAAIgGADIgOAEIgOAEIgRAEIgTADIgJACIgGADIgHACIgIACIgJACIgGAEIgUARIgSAOIgUAPIgUAQIgOAKIgEAIIgDAHIgFAHIgCAGIAEAEIAFAEIAHACIAGACIAGADIAJAAIAJABIAJABIAIABIAHABIAGABIAGACIAHADQAoAIApABIBUABIBOAAIA5AAIAHAAIAHACIAGACIAGADIAFADIAFAFIAEAEIAEAGIACAFIACAHIACAGIABAHIgBAGIgCAHIgCAGIgCAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABQguABgwAAIheAAQglABgkgEQghgEghgFIgKgCIgFgCIgHgDIgJgBIgJAAIgJgBIgKgBIgHgCIgIgCIgHgDIgIgCIgHgCIgHgDIgGgDIgFgEIgGgEIgFgEIgFgFIgEgEIgGgFIgFgFIgEgEIgFgEIgFgFIgHgGIgEgHIgEgHIgCgHIgBgIIAAgHIABgIQAGgfAPgbQAPgdAZgUQAagWAbgVIAkgdQAKgIALgGIAGgDIAGgDIAGgCIAJgCIAJgDIABAAIAGgCIAFgDIAQgDIAQgDIASgEIASgFIAHgCIAGgDIAHgBIAIgCIAHgBIAHAAIAHgBQCCgfCHAHQBIAEBIAAIEMAAQB/AAB/gCQA9gBA7AHIAHADIAHADIADAAIAFACIAFABIAHACIAGADIAFAEIAFAEIACADIAEADIAEADIAFAGIAFAGIADAHIADAHQACAMABAMIAAAYIAAAUIgBAWIgCAQIgDAGIgDAGIgDAFIgFAHIgEAHIgFAGIgFAGIgFAGIgDAFIgFAGIgMAKQgKAIgLAGIgUAJQgMAFgNADIgJADIgIADIgIADIgIAEIgHACIgIACQgHAHgKAEIgVAKQgMAFgNADIgaAEIgJACQgZAMgbAGQgdAGgdADQgeACgdAJQgYAIgZACIgZABIgCABIgIADIgJADIgIAEIgJADIgIACIgJACIgIAAIgIABIgJADIgGACIgGADIgGADIgHADIgIADIgIACIgGADIgGADIgHADIgHADIgHADIgGACIggAHQgTAFgSABQgRACgSAAIgkAAgACjBGIgCABIACAAIACgBIgCAAgApMA3IgBgBIAAAAIABABg");
	this.shape_121.setTransform(356.75,402.8364);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("Ah3FGIgHgBIgGgBIgHgCIgFgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgGIADgGIADgFIAEgEIAFgFIAFgDIAFgDIAGgDIAGgBIAGgBIADgCIAIgDIAJgDIAGgCIAGAAIAHgBIADgBIAHgCIAHgDIAHgBIAHgCQAVgBAUABIAsAAIAqAAIAsgBIAJAAIAGgDIAGgDIAJgCIAIgCQAQgIARgFIAlgLQATgFARgHIAjgMIAHgCIAHgDIAGgDIAFgDIAFgDIAGgDIAGgDIAMgKIANgJIAQgJIAQgJIACgFIACgFIAGgHIASgwQALgbAFgeIAHgxQADgYgBgYIgBgBIgDgGIgCgHIgCgFIgEgFIgEgGIgFgGIgGgGIgFgGIgFgGIgFgDIgGgBIgFgCIgGgCIgFgCQgZAAgZgDQgegDgegFIg2gIIgmgHIgMgEIgRAAIgSAAIgQAAIgSAAIgRABQg4AMg4AJQgwAHgwALIhSARQgmAHgkAPQgVAIgWAGIgDACIgHAFIgIAGIgIAGIgFADIgFACIgHAEIABAAIgCABIAAAAIgBABIgBABIgDACIgBACIgBABIgBABIAAABIgBAAIgGAIIgLAMIgOAMIgOALIgDADIgBAGIgBAGIgDAGIgDAGIgBAFIgBAHIgBAIIgCAEIgDAGIgCAGIgCAIIgDAJIgCAJIgCAJIAAAHIAAAGIACADIACACIAEAFIAEAFIADAGIACAGIAGAEIANAHIAOAIIAMAIIANAIIAcAQQAOAHAOAFQAVAJAUAKIAYAMIAHADIAJAAIAJAAIAJAAIAGAAIAHACIAGACIAGADIAFADIAFAFIAEAEIAEAGIADAFIACAHIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABIgGABIgJAAIgIAAIgJAAIgKAAIgHgBIgHgBIgHgCIgGgCIgGgDIgEgDIgEgCIABAAIgFgCIgBAAIAAAAIgZgMIgngSIgbgMQgSgJgQgKIgNgJIgHgEIgHgEIgHgDIgHgEIgHgEIgIgDIgFgEIgFgEIgFgEIgFgEIgEgEIgEgEIgEgFIgEgFIgDgGIgCgGIgCgGIgFgFIgEgEIgEgGIgCgGIgDgGIgDgGIgBgHIgCgYQAAgLABgLIAFgbQADgQAGgQIAFgPIABgHIABgHIACgHIADgHIADgGIABgHIACgGIADgHIADgGIAEgGIAFgHIAFgHIAFgHIAGgFIAGgEIAGgEIAHgEIAJgJIAJgKIAJgKIAKgJIANgLIAIgFIAGgDIAGgDIABgBIAEgDIAEgDIAFgEIAFgEIAGgEQBDgbBGgRQA7gPA9gJQA8gIA6gPQA5gPA8gBQAogCAoAHIAFACIAGACIATADIAmAGIAhAGIAbAEIAJACIASAAIASABIARAAIASABIAJACIAIADIAHAEIADABIAHADIAGACIAGADIAGADIAFADIAFADIAFADIAFAEIAFAHIAFAGIAGAIIAHAHIAFAGIAFAGIAFAHIACACIAEAFIAEAFIADAGIACAGIACAFIACAGIAEAIIADAIQAIAmgEAmIgJBHQgEAdgKAbIgSAtQgHATgIASIgFAGIgBACIgCAGIgDAGIgEAGIgFAGIgEAFIgEAFIgEAEIgFADIgHADIgHADIgHACIgIAFIgIAFIgIAFIgSAOQgJAGgJAFIgQAJIgRAHIgPAFIgIACIgYAKQgNAEgNADIgZAHIgeAKIgJADIgGADIgGADIgGACIgIACIgHACIgIAEIgHACQgaAGgaAAIgwAAIgsAAIg2AAIgGADIgHACIgHACIgGABIgHABIgGADIgHADIgHACIgIACIgJAAIgIABgAkqEPIABAAIgBAAIgBgBg");
	this.shape_122.setTransform(379.1466,393.5359);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("Ah2HlIgIAAIgJAAIgJAAIgIAAIgIgBIgIgBIgIgCIgHgCIgIgDIgGgEIgGgFIgGgEIgGgFIgGgFIgFgFQgugagnglQgigggXgrQgZgugJg0QgKg6AAg7QAAgyANgwQAEgoARgmQARglAZggIAyg/QAfglAhgjIA2g6IAOgUQAJgPAMgNQAMgMANgLIASgPIAPgPIAPgOIAGgHIAFgEIAGgEIAGgDIAHgDIAGgCIAIgBIAHgBIAHgBIANACIAOACIAQADIAOADIAQADIARAEIAIACIARABIAQACIARAEQAIACAHADIAPAHIAMAHIAFACIALAIIAKAJIALAKIAJALIAIAMIAIAOIAIAOIAIAJIALAOIAKANIAIANIAIAOIAEAGIAYAbQAKAMAIAOIAPAbIAJAVQAGAQABARIABARIACAIIABAJIADAIIACAJIACAIIAFARIAEARQANAegBAhIgBBJQAAAmgHAlIgQBNQgFAZgKAYIgDADIgBAHIgBAIIgCAFIgDAGIgDAEIgDAIIgDAIIgDAHIgEAHIgDAHIgEAGIgFAFIgFAGIgGAGIgEAGIgEAHIgEAGIgFAGIgFAFIgGAFIgGAFIgHAEIgGAFIgGAEIgFAFIgGAFIgFAGIgFAFIgHAEIgGAEIgGAFIgGADIgHAFIgGAEIgGADIgGACIgEADIgEACIgGADIgHACIgGABIgGABIgHgBIgGgBIgGgCIgGgDIgFgDIgFgEIgFgFIgEgGIgCgFIgCgGIgCgGIAAgGIAAgGIABgGIABgGIACgFIADgFIADgFIAEgFIAFgEIAFgDIABgBIAEgDIAFgDIAGgDIAHgDIAGgEIAFgDIAFgDIgBABIABAAIAFgEIADgEIAEgDIAFgEIAFgFIAGgFIAGgFIAGgFIAGgEIAHgEIAEgHIAEgHIAEgGIAFgGIAEgEIAFgEIAEgJIACgGIACgFIACgGIADgGIABgCIACgIIACgIIACgGIADgGIADgEQAGgSAEgTIAKgzQAEgWABgWIABgyIgBg2IAAgJQgDgHgCgIIgHgXIgGgWIgGgXQgDgMgBgNIgCgaIgEgIIgDgHIgEgHIgEgHIgEgHIgEgHIgMgMIgLgNIgKgOIgKgQIgJgOIgHgLIgGgGIgGgHIgFgGIgFgGIgFgHIgEgHIgEgIIgEgHIgEgIIgFgFIgFgFIgGgDIgHgDIgHgEIgHgFIgLAAIgRgCIgRgCIgZgGIgagFIgSgDIgJAJIgKAKIgKAKIgMAKIgMALIgNAMIgGAGQgUAhgaAdIg3A7Ig1A7QgeAigUAoIgYAwIgCAFIgBAGIgBAHIgBAIIgCAIIgCAJIgCAJIgBAIIgBAaIAAAbIAAAbIAAAcIABAcIACAHIACAIIACAHIADAJIACAJIADAJIAEAIIAFAJIAEAIIAFAIIADAGIAEAFIADAGIAEAHIAEAHIAGAGIAGAGIAGAFIAGAGIAHAGIAHAGIAHAGIANAIIANAIIAOAJIANALIANALIAKAAIAJAAIAKAAIAJAAIAHAAIAGACIAHACIAFADIAGADIAEAFIAFAEIADAGIADAFIACAHIACAGIAAAHIAAAGIgCAHIgCAGIgDAGIgDAFIgFAFIgEAEIgGAEIgFADIgHACIgGABIgHABIgJAAgAEWigIAAACIABAAIAAAAIgBgBIAAgCIgBAAg");
	this.shape_123.setTransform(361.0536,378.625);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AibEYIgQgCIgIgCIgIgCIgIgCQgXAAgYgFQgVgEgTgKIgggSQgTgLgVgJQgVgJgRgOQgHgHgJgFIgIgDIgIgEIgIgEIgHgEIgGgFIgGgGIgGgFIgFgDIgFgCIgFgDIgFgEIgEgEIgEgEIgFgGIgEgGIgDgHIgDgHIgCgJIgBgIIgCgJIgCgJIgCgIIgCgJIgCgIIgBgJQgFgUgEgTQgCgQACgQQAEgWAJgVQALgWAMgUQALgRANgPIALgLIAKgOIAGgHIAFgGIAHgHIAGgGIAGgGIAGgGIAHgFIAGgEQBJgfBPgHIA6gGQBhgLBhACQBXABBXgCQBVgDBTAOIAlAGIAGACIAGADIAGACIAGADIAGADIAHABIAGACIAGACIAIACIAIADIAIAEIAGACIAGADQAWAOANAXQAOAYABAcQABAigBAjQAAAhgIAhQgJAdgOAbQgEAJgGAIIgFAFIgGAFIgFAEIgGAGIgHAGIgGAFIgFAFIgGAEIgFAEIgIAEIgIAFIgIAEIgFAEIgFADIgFAEIgUAPIgNAJIgOAIIgQAIIgPAIIgOAHIgTALIgFADIgHAEIgHAEIgHAEIgHAEIgHADIgHADIgHADIgIAEIgEABIAAABIgBAAIAAgBIgDACIABAAIgDABQgIAIgKAFQgKAGgLAEIgXAGQgNADgOABQgOACgOAAIgTAAIgHAEIgHAEIgIACQgWABgXgBIgkAAIgsAAIgyABQgQAAgRgCgAh2ivQhFAEhEAKQgsAGgqAOIgGAHIgHAGIgGAHIgGAGIgEAHIgFAGIgFAGIgGAGIgGAGIgEAGIgEAHIgEAGIgFAIIgFAIIgFAHIgCAHIgCAHIgCAHIABABIACAIIACAJIACAHIACAJIABAIIABAJIACAIIACAIIACAJIACAIIAEADIAGAEIAFAFIAGAFIAFAEQARAGAPAKQAKAGAKAIQAKAHALAGIAVAKQALAEAKAGIATALQAIAGAKAEIAIADIAIAAIAJABIAIAAIAJABIAJACIAJABIAJACIAJACIAJABIAIAAIAJAAIAJAAIAJAAIAJAAIAIAAIAJAAIAJAAIAIAAIAHgEIAHgDIAIgCQAOgBAOAAIAdAAIAdAAIAdAAQAPABAPgBIAJgBIAIgCIAIgBIAHgCIAIgCIADgCIAKgIIALgGIAOgHIAQgHIAQgJIAOgHIAFgDIAQgKIAUgLIAPgHIAPgIIAPgJIAOgKIAPgLIAMgKIAFgCIAEgCIAIgFIAIgEIAHgGIAGgFIAGgGIAGgFIAEgGIAEgIIADgHIADgIIACgJIACgIIACgJIAAgRIAAgSIAAgSIAAgJIAAgJIgBgKIAAgJIgCgEIgFgCIgHgCIgGgBIgHgBIgGgDIgGgCIgHgDIgFgDIgFgCIgJgCIgKgCIgJgCIgJgCIgIgBIgIgCIgIgCIh/AAIiPAAIgSAAQhEAAhFADgACLClIgCABIACAAIABgBIgBAAgAmogcIAAACIAAgCIAAgCIAAACgAGtiOIAAAAIgBAAIABAAgAlSiOIACgBIAAAAIAAAAIgCABg");
	this.shape_124.setTransform(360.6958,381.9805);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AA7FEIgHgCIgGgCIgFgDIgGgDIgFgEIgEgFIgDgGIgEgHIgCgHIgBgIIAAgIIACgIIACgGIACgGIAEgFIAEgFIAFgFIAFgDIAJgEIAIgDIAJgDQAMgDAMAAIAWAAIARAAIARAAIAdAAIAJAAIAEgCIAGgEIAHgEIAGgEIAGgEIAFgFIAMgFIAMgFIAOgGIAPgGIAQgHIAIgDIAHgCIAGgCIAHgCIAHgDIAIgDIAHgEIAHgDQANgMAPgKQALgHAJgJIASgSIASgUIAMgNIgEAFIgEAFIALgPIAMgOIALgOIAGgGIAFgGIAGgGIAEgGIAEgHIABgHIACgGIACgHIABgHIACgGIABgHIAAgQIAAgPIAAgTIAAgJIgBgKIAAAAIgDgGIgCgHIgCgIIgBgJIgDgDIgDgHIgDgHIgFgGIgHgEIgPgIIgHgEIgGgFIgHgEIgGgFIgGgFIgDgCIgBAAIgBAAIgBgBIABAAIgHgDIgGgBIgHgCIgGgDIgFgBIgFgCIhuAAIhsAAIhiAAIhsABIgTAAQglALgmAFQgnAGglAKIhAASQggAJgeALQgdAMgeAHIgGAEIgGAEIgGAEIgEADIgFAFIgFAFIgFAEIgGAEIgGAEIgGAEIgGAEIgGAGIgGAGIgFAIIgGAIIgBAIIgCAHIgCAGIgDAGIgDAHIgCAFIgCAFIgCAFIgBAFIAAAHIAAAIIAAAIIAAAIIAAAJIAAAJIABAKIAAAAIADAHIACAGIACAIIACAHIAFAIIAEAIIAGAHIAFAHIAZAQIAbAUQANALAOAHQANAHALAJIARAMIAFADIATAEIATAFIASAGIAFACIADABIAFACIAjABIAjgBIAmAAQAUABATgBIAKgBIAQgDIAQgEIAPgFIAIgDIAIgCIAIgBIAIgBIAGABIAHABIAGACIAGADIAFAEIAFAEIAEAFIADAFIADAGIACAGIABAHIABAGIgBAHIgBAHIgCAGIgDAGIgDAFIgFAFIgFAEIgFAEIgGADIgGACQgmALgmAGQgpAFgqAAIhHAAQgbAAgZgJQgggMghgEIgHgDQgTgIgQgNQgOgLgQgJQgSgKgQgNQgRgOgSgLQgNgIgLgJIgEgFIgFgGIgEgHIgFgGIgFgGIgEgGIgEgGIgDgHIgEgHIgEgHIgCgHIgDgIIgCgHIgDgIIgDgHQgEgRgBgSIgBghQAAgRACgSQACgRAHgQIAHgQIACgHIACgIIACgHIACgHIAEgHIANgUQAFgKAIgIIAKgKIALgKQAKgIALgHIAHgFIAMgKIANgLIAOgKIAIgFIAHgEQAXgJAYgHQAVgFAVgIQAZgLAbgIQARgGATgDIASgDQAMgFAMgDIAXgEIARgDIATgDIAWgDIgGAAQBIgWBLACQBDABBEAAQBLAABLgCQBEgCBBANQAcAGAbANIAQAMQAHAGAJAFIANAHIANAIQAJAFAIAJIAJALIAEAEIAEAFIAEAFIADAGIADAHIAEAGIADAGIACAGIADAIIABAGIAAAGIACADIADAIIACAGQAHArgBAsQgCAsgPAoQgPAmgbAfIg+BDQgbAdggAVIgGAFIgFAFIgGAFIgMAHIgPAHIgQAIIgSAGIgQAGIgIACIgIAEIgIADIgIADIgIAEIgIADIgIADIgDACIgIAGIgHAGIgHAEIgIAFIgHAEIgHAEIgHADQgLADgMABQgLABgMgBIgXAAIgZAAIgZAAIgJAAIgIADIgIACIgIABIgGAAg");
	this.shape_125.setTransform(362.1375,399.2617);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AgGEUIgHAAIgIAAIgEAAIgIAAIgHgBIgIAAIgfgEIgdgEIgcgDIgbgFIgcgFQgMgCgJgFIgHgCIgHgCIgHgDIgGgDIgGgEIgGgDIgGgDIgIgEIgHgFIgHgFIgHgGIgHgFIgPgIIgQgHIgIgDIgIgEIgIgDIgIgDIgIgEIgJgDIgIgDIgIgCIgHgCIgGgEIgGgDIgGgEIgFgEIgGgEIgHgEIgFgFIgFgFIgEgGIgFgGIgEgGIgFgGIgDgHIgCgHQgFgQAAgRIABgZQABgNACgNQADgMAEgMQAHgQAHgPIANgaIAFgGIAEgGIAFgGIADgGIAEgGIADgFIAEgFIAEgEIAEgGIAEgHIAFgGQAOgPARgMIAdgWIACgBIAdgWQAUgPAWgJQAYgJAXgGIAIgCIAHgDIAHgDIAHgBIAHgCIAIgBIAIAAIAIgBQAegHAfgCIAugBIBKAAIBHgBQAdgBAbAGIAGACIAHADQAfAEAeAKQAYAHAXAKQAgANAgAJQAhAIAcATQAWAQAQAWIAIALIACAHIACAHIACAHIAEAHIACAHIADAQIACAQIABARIAAAQIgBAQIgCAQIgCAGIgDAIIgDAHIgDAFIgCAGIgCAGIgFAGIgFAGIgFAHIgFAFIgXAQIgUAMQgLAFgKAHIgXAOQgKAGgLAFIgYAIIgKAKIgPAKIgQAKIgOAJIgOAIIgNAHQgLAEgMADIgIACIgIAEIgIADIgJAEIgJADIgIADIgHADIgGADIgGACIgHACIgHACIgHADIgGADIgGACIgIABIgHACIgHACIgHACIgHACIgIACIgCABIgEAFIgDAGIgEAFIgFAEIgGAEIgFADIgHADIgHABIgGABIgHAAgAk9hDIgFAIIgEAHIgEAHIgGAHIgGAIIgBACIgEAHIgEAHIgDAHIgDAHIgEAGIgDAHIgCAIIgDAIIAAAKIgBAKIABAJIAAABIAHAEIAHAFIAIACIAIACIAIAEIAHAEIAVAIIAWAJIAcAMQALAGAIAHQAKAIALAGIAGAFIAHADIAHADIADACIAHACIAHACIAHADIAaAGIAaAEIAkAFIAYADIAFgFIAFgFIAHgDIAHgDIAHgCIAHAAIAGAAIACgBIAHgDIAFgCIAHgCIAHgBIAIgBIAHgBIAHgCIAIgCIAGgCIAHgCIAHgBIAIgDIAHgDIAJgDIAIgCIAQgHIAPgGIAPgGQAMgGAMgDIAOgEIAHgEIAHgFIAHgEIAIgFIAIgFIAJgEIAFgGIAGgFIAHgFIAHgFIAHgDIAOgGIAOgFIAQgJIAPgJIAOgJIAVgKIAMgIIABgDIACgGIADgFIAAgIIAAgIIAAgIIgBgJIAAgIIAAgBIgEgGIgCgHIgCgJIgFgEIgEgEIgHgEIgHgEIgHgDIgHgCIgIgCIgHgCIgegMQgVgGgUgIIgfgMQgQgFgRgDIgfgGIgGgBIgGgDIg3AAIg/AAIg1AAIgsAAIgIABIgIABIgIACIgIACIgHABIgJABIgQACIgIABIgCAAIgHADIgGACIgGACIgIACIgIADIgIACIgFADIgGACIgHADIgGADIgGACIgOAJIgNAKIgPALIgTAPIgNAKIgGAFIgBAAIgGAIgAEwCDIABgBIAAAAIgBABg");
	this.shape_126.setTransform(368.1,397.5479);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("ABKCsQgcgFgcgBIg0gBIg4ABQgcAAgcgCQgOgBgOgDIgVgHQgKgEgMgCIgYgEIgZgEIgagFIgbgGIgIgCIgIgBIgIgBIgHgBIgIgCIgGgCIgHgDIgHgDIgHgDIgFgDIgFgEIgFgEIgFgEIgFgEIgFgHIgGgIIgDgFIgCgGIgBgGIgBgHIgBgGIAAgHIAAgIIAAgIIABgIIACgHIACgIQAHgOAKgOIAOgYQAHgKAJgIQAMgLANgJQAOgKAQgHIAYgJIAIgDIAGgCIAGgCIAHgBQAxgWA1gKQAzgIA0gFQA2gFA2AAIB+AAIB1AAIAIABIAHABIAHABIAHACIAIACIAHACIAFACIAGABIAGACIAGADIAGADIAFAEIAGAEIAFACIADADIAHADIAFACIAHAGIAIAFIAHAGIAFAHIAFAHIADAHIADAHIACAOIABAQIAAARIAAAOIgCAPIgDANIgEANIgFAOIgDAJIgEAIIgEAIIgDAHIgEAHIgDAIIgDAIIgFAFIgDAGIgFAFIgGAFIgHAFIgHAEIgIACIgIACIgHABIgHADIgIADIgGACIgEABIgGADIgGAEIgEAEIgHADIgHAEIgIABIgJABIgJABIgJAAIgHAAIgHgCIgGgCIgGgDIgFgEIgFgEIgCAGIgCAHIgCAGIgEAFIgEAGIgFAEIgFAEIgGADIgHACIgGACIgHAAIgIAAIgIAAIgIAAIgIAAIgGAAQgYAAgYgDgACnBMIAGABIAHACIAGAEIAFADIAFAFIABgHIACgGIADgGIADgGIAFgFIAFgFIAFgDIAGgDIAGgDIAHgBIAHgBIAGgDIAOgHIAOgGIAPgFIAPgFIAEgIIADgIIAEgGIACgHIACgGIACgHIACgFIABgFIAAgKIABgKIgHgCIgFgEIgFgFIgGgDIgGgBIgHgCIgGgCIgGgCIhfAAIhgAAIhUAAQglAAgmABQgXAEgVAHQgTAGgUACIgtAIQgSAEgQAHIgPAHIgHACIgHABIgEACIgFABIAAAAIgBAAIgBABIAAAAIgBAAIgBABIgCABIgHADIgHADIgHAEIgGAEIgGAFIgBAAIgFAGIgDAGIgDAGIgGAJQAVACAVAEIAtAJIAmAHQAQADAPAFQAMAFAMADQAmABAoAAIBSAAQAfAAAgAFQAkAGAkgBIAQAAg");
	this.shape_127.setTransform(351.15,396.5778);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AAXC0Ig1AAIhQAAIhPAAIhQAAIhPAAIhQAAIgQgBIgHgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgHIABgHIADgGIADgGIAEgGIgHgCIgGgDIgFgDIgGgFIgFgGIgEgHIgDgHIgCgHIAAgIIAAgGIABgHIACgHIADgGIAEgFIAEgFIAegWIAegXIAegWIAcgUIAdgRQAOgIAQgFQAvgeA3gLQBBgNBCgKQBFgMBFAAIDGgBQBKAABKACQALAAAKADIAFACIAGACIAFABIAHABIAHACIAHABIAGACIAFADIAFADIAIADIAHADIAHAEIAFAFIAGAGIAFAHIAEAIIADAJIABAGIAAAHIABAHIAAAIIgBAHIgBAIIgBAHIgDAIIgCAHIgHAYQgDALgFAKQgFAIgGAIIgPAQIgPAQIgPASIgLALIgEAGIgEAEIgGAEIgGAEQgbAXgjAIQgmAJglANQgkAOgmAHQgnAHgnADQgqAFgqAAIgJgBgAgKhOIgIABIgIABIgIACIgJABIgHABIgIABIgIABIgHABIgJAAIgIABIgbAGIgaAGIgXAFIgaAFIgbAGQgNADgNAFIgHAEIgHAEIgIAEIgGAEIgIADIgHADIgHADIgXALIgVANIgXAQIgWARIgXASIgPAMIAoAAIAnAAIAoAAIAoAAIAnAAIAoAAIBpAAIBgABQA0ABAzgFQAxgFAugPQAvgRAxgOIAYgGIAEgDIAGgEIAGgFIAFgGIAGgFIAGgGIAFgGIAEgGIAFgGIAFgFIAGgGIAFgFIAFgGIABgCIACgIIACgIIACgFIgCAAIgIgDIgHgCIgDgBIgCgBIhDgBIhPABIhNAAIhJAAIhLAAIgbABgAGghdIAAABIABgBIAAgCIgBACg");
	this.shape_128.setTransform(369.625,396.1025);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AjgC5IgHgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgHIABgGIACgHIADgFIAEgGIAEgEIAFgFIAFgDIAGgDIAGgCIAHgCQAXgBAXABIAxAAIAwAAIA1AAQAlABAmgCIAOgEIAPgDIAOgDIAPgCIAQgEIARgDIAQgFQAVgLAVgJIAngQQATgJAQgMQATgNATgMQAcgQAXgWIASgSIAEgGIiUAAIjMgBQhKgBhLAFQhHAFhEAUQgiAKgjAGQgZAEgWAKIAGAGIAFAFIADAGIADAGIACAFIABAGIABAHIgBAGIgBAGIgCAHIgDAGIgDAFIgFAFIgFAFIgGADIgGADIgGACIgGABIgHABIgGgBIgHgBIgGgCIgGgDIgFgEIgIgCIgHgDIgGgDIgGgDIgGgDIgGgDIgGgEIgFgEIgFgFIgEgHIgDgGIgCgHIgCgHIgCgHIgBgHIAAgIIAAgIIABgIIABgIIADgHIADgHIAGgIIAGgIIAEgEQAIgHAIgFQAKgHAMgFIAXgIIAVgIIAWgJQAQgGARgCIAtgGQA9gVA/gIQBagNBaACQBSACBSAAICfAAQA4gBA4ABIAHABIAGACIAGADIAGACIAFAEIAEADIAEAEIADADIAEADIAFAGIAFAGIADAHIADAHIABAJIABAIIABAJIgBAJIgCAJIgCAHIgCAHIgDAGIgEAHIgDAGIgFAGIgFAHIgFAFIgFAGIgFAFQgWAegdAXQgdAYggAVQgsAegwAVQgxAXgzAPQgjAKgkAHIgPADIgOACIgQACIgQABIgOAAIgPAAIgQAAIgPAAIgHAAIgeAAIgeAAIgdAAIgeAAIgdAAIgMAAIgYgBgAAmBWIACAAIACAAIgCAAIgCAAg");
	this.shape_129.setTransform(379.625,398.5195);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AmvA8IgHAAIgIgCIgGgEIgHgEIgFgEIgFgGIgEgHIgDgHIgCgIIgBgIIABgIIACgGIADgHIAEgHIAFgGIAFgFIAFgDIAGgDIAGgCQBigJBigIQBOgFBOAAIC9AAICpAAICiAAIAGABIAHABIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIABAHIABAGIgBAHIgBAFIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACQhlABhlgBIinAAIi+ACQhUABhTAGIiLALIgCAAg");
	this.shape_130.setTransform(366.075,393.075);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AksC9IgQgEIgIAAIgJgBIgEAAIgGAAIgHAAIgGgCIgGgBIgGgDIgGgCIgFgDIgGgDIgFgDIgFgEIgFgEIgEgFIgDgFIgDgGIgCgGIgBgHIAAgGIAAgGIACgGIACgGIADgGIADgGIAEgEIAFgFIAGgDIAHgEIAHgCIAIgBIAIAAIAIACIAHACIAGACIAGADIAGAAIAOACIARACIAPADIAOADIBPABIBYgBIBQAAQAYABAagCIAOgFIATgFQAQgDAPgEIAjgJQANgDAOgBIAYgMIAZgNQALgFAMgEIAUgFIANgEIAHgEIAPgHIAOgIIARgIIALgGIAFgEIAGgCIAEgDIAHgFIAGgFIAEgHIADgHIACgFIABgDIAAgGIAAgGQgNAAgNgEIgYgFIgggIIgZgHIgRgEIiogDQhQgBhPALQg9AIg7AQQg1AOgwAYQgTAKgRANIgDAEIgDAFIgEAGIgFAFIgEAGIgFAGIgEAGIgGAFIgGAFIgHADIgIADIgIACIgIAAIgHAAIgGgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgCgGIAAgHIAAgGIACgIIADgGIADgHIAFgFIAFgFIAGgEIAEgFIAEgFIADgFIAEgHIAFgGIAEgHIAGgFQBOg7BjgZQBZgWBcgIQA4gEA4AAQBWAABVADQA1ACAzAPIAfAJIAJABIAKABIAJABIAIACIAIACIAHADIAIAEIAHAEIAHAEIAHAFIAEAFIAEAFIADAGIADAHIACAHIACAPIABAaIgBASIgCATIgBAHIgDAHIgDAHIgFALIgDAGIgDAGIgEAHIgDAGIgEAFQgQAPgRAMQgUANgVAMIgrAWQgXALgYAHIgQAEIgPAHIgUAKIgSAKQgKAFgKACIgVACIgRAFIgWAFIgQAEIgTAEIgKADIgGADIgHACQguAIgugBQg0gCg1AAQgtAAgsACIgMAAQggAAgggHg");
	this.shape_131.setTransform(370.625,394.6613);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AAnC/IgnAAIgcAAIgHgBIgGgBIgHgDIgGgDIgFgEIgFgFIgFgFIgDgGIgDgGIgGAFIgFAEIgHAEIgGADIgHADIgHACIgHABIgIABIgJAAIgJgBIgIgBIgFgBIgFgCIgIgDIgHgEIgGgCIgHgDIgTgOQgNgJgNgHIgUgKIgVgLIgTgLIgRgLIgFgFIgEgFIgEgFIgDgGIgEgHIgCgHIgBgIIgBgHIgBgIIAAgHIABgHIABgIIABgHIACgGIACgHIACgHIACgIIABgIIACgHIADgHIADgGIADgHIAPgdQAJgQAOgKQAQgLARgJIAcgOQARgJASgFIAOgFIAJgDIAIgEIAJgDIAJgDIAGgDQAngGAoABIBNABIBOgBQAmAAAnADIAQACIAGACIAHADIAHACIAHACIAIADIAHAEIAIABIAHACIAHACIAGAEIAGAEIAHAFIAHAEIAHAFIAGAGIAGAGIAFAFIAEAGIAEAHIACAHIADAIIACAIIADAGIADAHIACAHQACALABAMIAAAXIAAAaIgBAaIgCAQIgCAHIgDAGIgDAEIgCAGIgDAHIgEAHIgEAGIgFAHIgFAHIgFAHIgGAHIgFAEIgFAFIgFADIgHAEIgIAEIgEACIgFADIgFAEIgFADIgGADIgMAFIgOAFIgQAFIgTADIgJAAIgHAEIgGABIgJACIgKACIgJACQgNAFgOADQgQACgPAAIggAAgAhmBIIAIABIAHADIAHAEIAGAFIAFAGIAEAHIADAHIAGgFIAGgEIAHgDIAIgCQAMgBANABIAYAAIAaAAIASAAIASAAIAJgBIACAAIAHgDIAGgCIAKgCIAKgCIAJgCIAJgDIAIgDIAHgBIAIgBIAHgBIAIAAIABAAIAGgDIAHgDIAFgCIAGgEIAHgEIAIgEIAIgEIADgDIAEgIIADgDIACgIIAEgIIABgIIAAgIIAAgJIAAgIIgBgJIAAgJIAAgIIgDgIIgDgHIgCgHIgDgCIgGgDIgIgCIgJgCIgGgDIgGgDIgCgBIgJgDIgGgCIgGgCIhDgBIg6ABIg3AAIg2AAQgRgBgSACIgIACIgIADIgHADIgGACIgGADIgGACIgIACIgIACIgHAEIgHAEIgIADIgHADIgHAEIgHADIgHAEIgGADIgGAEIAAABIgDAFIgEAIIgDAHIABgEIABgCIACgEIgDAGIgEAJIgBAGIgBAGIgCAGIgBAGIgCAGIANAHIAOAIIAPAHIAOAIIAOAIIAMAIIAKAIIACACIACABIAEABIgBAAIABAAIABABIAGgEIAHgCIAHgCIAHAAIAHABg");
	this.shape_132.setTransform(355.125,394.0433);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AnJBBIgHgCIgHgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgFIgCgHIgBgGIgBgHIABgGIABgHIACgFIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAHgBIAGgBIAHAAIAIAAIAIAAQBkgcBngBIC7gBICvAAICwAAQBJAABJABIAGABIAGACIAHADIAEAEIAGAEIADAFIAFAFIACAGIACAGIACAHIAAAGIAAAHIgCAGIgCAGIgCAFIgFAGIgDAEIgGAFIgEADIgHADIgGACIgGACQhwABhwgBIjQAAQhZAAhYgCQhSgChQAOIhNAPQgaAFgbAAIgPAAg");
	this.shape_133.setTransform(376.3,396.5889);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("AkDA4IgIAAIgJAAIgKAAIgKAAIgKAAIgGgBIgHgBIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgGIACgGIACgHIADgFIADgGIAFgEIAEgFIAGgDIAFgDIAHgCIAHgCIAGAAIAJAAIAIAAIAJAAIAUAAIAUAAIAJgBQA6gMA6ABQBHACBGAAIBtAAIBlAAQAVgBAUABIAIACIAHABIAIADIAHADIADABIAIABIAGACIAGACIAHAEIAGAFIAEAGIAFAHIADAHIABAHIABAHIgBAIIgBAIIgDAHIgFAHIgEAGIgFAEIgFAEIgGADIgHACIgHABIgGAAIgHgBIgIgBIgIgBIgHgBIgFgCIgHgDIhsAAIh+AAIhcAAIhRAAIglABIgJACIgJABIgKACIgTACIgQACIgRAAg");
	this.shape_134.setTransform(362.8,395.517);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("Ak1CEIgHgBIgGgBIgFgCIgIgDIgHgDIgGgFIgGgFIgEgEIgDgDIgIgGIgFgCIgFgDIgGgEIgEgEIgFgFIgFgGIgEgGIgDABIgGACIgGAAIgHAAIgHgCIgHgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgIIAAgIIABgIIACgHIAEgGIADgGIAFgFIAEgEQBrguBuglQBigiBoAEQBYADBbAAQBYAABXgCQAwgBAwAGIAGADIAHADIAGAFIAFAFIAGAFIAGAFIAEAGIAEAGIADAGIACAHIABAGIABAHIgBAFIgBAHIgCAGIgCAGIgDAFIgEAHIgEAGIgEAHIgGAFIgFAFIgHAEIgGAEIgGAEIgGACIgHAEIgFAEIgGAFIgEADIgFADQgjARgmAJIhWAVIhLARQghAHghgBIgbAAIgHAEIgIACIgJABIgJABIgJABIgJABIgIAAIgHAAIgIAAIgGACIgGADIgGACIgFACQgXABgXAAIgzAAIg5gBIg7ABIgIACIgJACIgIACIgIACIgIABIgJABIgIAAgAh1gXQggACgeAJQg3AQg3AWQgDABgDADQAUgHAWgBIAtAAIAtAAIAqAAIAsAAIARAAIADgCIAGgDIAGgCIARgCIAJgBIAKAAIAIAAIAHAAIAIgBIAFgDIAGgCIAGgCIAHgCIAPAAIAQAAIARAAIARAAIAIAAIAIAAIAJgBIAYgFIAVgFIAOgEIAPgDIAPgEIAQgEIALgDIh4AAIhugBIgMAAQg7AAg8AFg");
	this.shape_135.setTransform(365.1,395.9334);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AgHDKIgHgBIgIgDIgGgEIgHgGIgEgFIgDgFIgDgGIgCgGIgCgGIAAgHIAAgGIACgHIACgGIACgGIAEgFIAFgFIAEgFIAFgEIAFgDIAHgEIAHgCIAHgCIAIgBIAFAAIAIgDIAHgEIAHgDIAHgDIAHgDIAGgBIAFgBIAIgBIAHgBIAHAAIAKAAIADgCIABgCIACgGIADgGIADgEIAEgFIADgGIACgFIADgJIADgIIAAgHIAAgHIAAgHIgGgFIgIgLIgIgMIgHgOIgHgPIgIgRIgDgJIgEgGIgGgFIgEgDIgEgEIgIgEIgSAAIgSAAIgRAAIgTAAIgTABIgFACIgFADIgFAFIgEAFIgEAHIgEAIIgEAHIgEAIIgFAHIgDAGIgEAFIgCAHIgCAGIgCAHIgDAIIgEAJIgDAHIgCAIIgCAHIgCAIIgCAIIgCAIIgBAHIgBAIIAAAIIAAAIIABAHIAAACIADAGIAGADIAHADIADAAIAGABIAHABIAGACIAGADIAFAEIAFAEIAEAFIAEAFIADAGIACAGIABAHIABAGIgBAHIgBAGIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgIAAIgHAAIgIgCIgOgFIgOgFIgOgHIgOgIIgGgEIgGgFIgEgFQgMgUgHgXQgHgaABgbQABgaAGgZQAFgUAIgVQAJgXAHgYIAEgHIAEgHIAFgGIAEgGIADgGIADgGIAEgHIACgFIADgFIADgFIAEgGIAEgFIAFgGIAGgGIAFgGIAGgEIAFgFIAGgEIAIgEIAHgEIAIgEIAIgDQARgFARgBIAmAAIAhAAIAbAAIAHABIAHABIAHACIAGABIAFADIAFADIAJAEIAIADIAGAFIAGAGIAFAGIABABIACABIAGAFIAGAFIAEAGIAFAGIAEAGIAEAHIAFAMIAFALIAHAPIAIAPIAEAHIAFAGIAFAGIAFAGIAFAHIAEAIIADAIIAEASIABARIAAAQIgBARIgDAPIgCAIIgEAHIgDAHIgCAHIgDAHIgDAEIgCAFIgEAHIgFAHIgBACIgCAGIgDAGIgFAHIgGAHIgFAHIgGAEIgGAFIgHAEIgHAEIgIAEIgIAEIgJACIgJABIgJABIgJAAIgJAAIgDABIgGADIgHADIgHADIgHADIgHADIgIACIgJABIgIAEIgJACIgIABIgHgBgABjBMIAAAAIABgBIgBABg");
	this.shape_136.setTransform(357.1438,390.375);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AiSEXIgIgBIgIgDIgGgEIgGgFIgHgHIgGgHIgFgHIgGgHQgLgagJgaQgLgegMgeQgMgdgDggQgEgeAAgfQABgaAFgaIAEgQIADgSIACgSIAEgRIAFgQIAEgNIAFgNIAEgPIAFgHIABgHIADgHIAEgGIAEgHIAGgHIAGgFIAFgFIAGgFIAFgFIAGgEIAGgEIAFgEIAGgDIAHgDIAFgCIAHgDIANgFIAOgFIAIgCIAIgCIAHgCIAVgDIAWgCIAXAAIAZABIAcADIAYAFIAQADIASADIARAEIAPAEIANAEIAMAEIARAKIAGACIAHADIAFADIAGAEIAHAFIAHAFIAFAEIAGADIAFAEIAFAFIAEAGIADAGIADAGIADAHIACAJIABAJIAFAOIAEAOIABAPIAAAQIAAAQIABAQIAAABIABACIAAACIADAHIADAIIAAAIIABAIIABAIIAAAIIgBAGIgBAJIgBAJIgDAGIgDAHIAAADIgCAJIgBAKIgBAHIgEAGIgDAHIgCAHIgDAFIgDAGIgCAEIgCAFIgEAGIgEAGIgFAGIgEAFIgGAFIgEAFIgFAGIgEAEIgGAEIgGAEIgFAEIgGAEIgGAFIgNAHIgOAIIgPAIIgQAIIgHAFIgFAFIgHAEIgFAFIgFADIgGADIgGACIgGACIgGACIgHADIgEAEIgFAEIgFADIgHACIgIACIgIACIgIACIgFADIgHACIgHABIgIACIgHABIgHABIgGAAIgHgBIgHgDIgFgDIgGgEIgEgEIgGgGIgDgGIgEgIIgCgHIAAgIIAAgIIACgIIAEgHIADgHIAGgGIAEgDIAGgEIAHgEIAHgCIAHgBIADgBIAHgDIAGgCIAJgCIAIgCIAEgDIAHgEIAHgEIAGgDIAGgCIAGgCIAGgEIAEgCIAGgFIAFgEIAGgEIAPgIIAPgIIAPgIIAOgIIAFgEIAGgEIAFgEIAFgFIAEgEIAFgGIACgFIADgGIAEgGIgCAFIADgJIABgFIACgIIABgIIACgIIACgFIACgGIAAgHIgBgEIgCgGIgDgHIgBgHIgCgKIAAgJIgBgKIAAgJIAAgTIAAgJIAAgCIgDgGIgDgHIgCgIIgHgFIgJgDIgFgDIgHgCIgEgEIgFgDIgDgCIgFgBIgHgCIgHgBIgHgCIgIgDIgIgBIgJgBIgJgBIgJgBIgJgCIgJgCIgJgCIgIgBIgJAAIgIAAIgJAAIgIAAIgHAAIgHABIgIAAIgHACIgIADIgHACIgIACIgHABIgFADIgFACIgGADIgGAEIgGAGIgCAFIgDAGIgCAGIgCADIgBAEIgBAGIgCAHIgDAGIgDAIIgDAJIgCAIIgCAJIAAAIIgCAIIgBAIIgBAIIgCAIIgBAIIgCAJIAAAIIgBAIIAAAIIAAAJIAAAIIAAAIIAAAHIABAIIAAAIQADAMAEALIAJAYIAIAWQAEAKACALQACAKAFAKIAGAPIADAFIAEAFIAFAEIAEAFIAEAFIACAGIACAHIABAGIABAGIgBAHIgBAGIgCAGIgCAGIgEAGIgEAFIgHAFIgHAEIgHADIgHABIgIABIgHgBgAhyC3IABABIAAgBIgCgBIABABgAD5hHIABABIAAgBIgBgCIAAACg");
	this.shape_137.setTransform(375.1,392.0917);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("Ag5EiIgHgBIgHgBIgGgDIgGgDIgFgDIgFgFIgEgFIgEgGIgCgGIgCgGIgHAEIgGACIgIACIgHABIgJgBIgJgCIgIgDIgIgDIgIgEIgIgFIgGgEIgFgEIgFgGIgEgGIgEgFIgFgIIgEgHIgEgIIgMgOIgLgPIgFgHIgEgIIgEgHIgDgIIgDgIIgEgIIgFgJIgDgGIgCgHIgDgGQgDgOgBgOIgBgZIAAgbQgBgRADgSIAGgZIACgIIAAgHIAAgHIABgHIABgHIABgHIABgHIACgFIADgGIACgHIACgHIACgHIADgHIAFgHIAGgGIAGgGIAEgGIAEgFIAEgGIAFgFIAFgEIAGgEIAHgFIAIgEIAHgEIAFgEIAFgEIAHgDIAHgDIAGgEIAFgDIAHgCIAGgCIAGgCQASgLATgIQARgIASgDIArgHIAhgGIAkgHIAJgCIAGgDIAHgCIAHgCIAHgBIAHgBIAGgBIAIAAIAIABIAIACIAIABIAHADIAGAEIAHAFIAGAEIAGAFIAEAGIAFAFIAEAGIADAGIADAFIAGAHIAGAGIAGAHIAGAGIAFAGIAEAGIADAGIADAFIACADIADAEIAFAGIAFAGIADAGIACAHIACAHIAFAHIAEAGIAEAGIADAHIACAGIACAIIABAHIABAIIACAHIADAIIACAIIACAGIACAHIACAHIACAGIACAHIACAKIABAIIABAHIAAAIIAAAHIAAAIIgBAIIgCAIIgBAIIgCAHIgCAHIgBAIIgBAOIgBAGIgBAGIgBAHIgDAGIgCAGIgEAFIgKAPIgCAFIgDAFIgMAPIgJAIIgKAIIgNAHIgPAJIgQAIIgIAFIgGAFIgHAFIgHAFIgGAFIgHAFIgHAEIgHAFIgHAEIgHAGIgIAFIgIAFIgGAEIgHADIgGACIgHACIgHACIgJAEIgJADIgJAEIgJADIgJADIgMAGIgNAEIgHABIgHABIgJABIgJAAIgKABgAithJIgBABIAAABIAAAIIgBAJIgBAIIgBAJIgDAQIgCAIIgBAIIgBAIIAAAIIAAAJIAAAJIAAAIIABARIAAAIIADAGIADAHIADAGIADAHIADAGIACAHIAEAFIAEAGIAEAFIAFAIIAGAHIALAPIADAFIACAGIACACIAAAAIAHACIAGACIAFAEIAGADIAEAFIAEAFIAEAFIACAGIACAGIAHgDIAGgDIAIgCIAHAAIAKgBIAJAAIAJgEIAQgGIAHgDIAPgGIARgGIANgEIAGgEIATgOIATgMIAYgTQAJgHAKgFIAVgMIAPgIIACgBIADgGIADgFIADgFIADgEIAAgDIABgJIABgKIABgJIABgGIACgGIACgGIACgHIAAgEIgBgGIgEgOIgEgPIgCgIIgFgOIgCgJIgCgIIgBgIIgFgHIgFgHIgEgHIgCgHIgDgIIgEgGIgFgFIgEgIIgFgHIgGgHIgGgGIgHgHIgFgHIgFgGIgFgIQgPAGgRAEIgfAFIgXADIgVAEQgQACgQAEIgQAFIgGAEIgGADIgHADIgGAEIgIADIgHAEIgIACIgFAEIgGADIgHADIgHAFIgEACIgFADIgFACIgFADIgFAHIgFAIIgFAFIgDAHIgBADIAAgBIAAABIgBACIABgBIgBABIAAAAIAAABgAETA5IAAACIAAgCIAAgBIAAABgAichnIgBAAIABAAIAAgBg");
	this.shape_138.setTransform(378.5839,392.125);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AlBDEIgHgBIgGgBIgGgCIgGgDIgFgEIgFgEIgEgFIgEgFIgCgGIgDgGIgBgHIAAgGQgLgRgSgOIgjgfQgRgPgSgOIglgaQgUgOgOgUIgIgMIgCgIIgDgHIgBgIIAAgJIABgIIACgIIAEgIIADgFIAFgFIAFgFIAGgEIAGgDIAGgCIAKgBIAJgCIAJABQAegLAfgFQAegFAegJQAngLApgGIBPgNIBMgOQAMgDALgEIAFgCIAFgDIAHgDIAHgCQA1gFA0ABIB8ABICIAAICBgBQAngBAmAGIAHACIAHAEIAHADIAGADIAGAEIAFAEIAFADIAFADIAEAEIAEAFIAEAGIADAGIADAGIABAHIABAIIABAIIAAAIIAAAIIgCAIQgFARgHAPQgHAQgKANQgJAPgNANQgLAMgOALIgZAUQgPALgRAJIgTAPIgNAKQgKAIgMAFIgXAMIgUANQgJAGgJAEIgIAEIgJACIgEABIgCACIgHACIgGADIgHACIgJACIgKABIgGAAIgFABIgJAAIgJAAIgJAAIgHACIgFADQgaADgZAGIgyALQgZAFgaAAIgxABQgfAAgegHIgQgDIgTgBIgUAAIgSAAIgRAAIgTAAIgTAAIgFABIgHACIgIADIgHABIgIABIgIAAIgIABIgJAAIgIABIgHABIgHACIgHACIgIACIgJABIgIABIgJABIgBAAgAhzhLQgfAGgfAHQgjAHgjAEQggACgfAIIhJAUIgRAEIAHAGIAHAGIAGAFIAHAGIAOANIAOAMIAOANIAOAMIAOANIAPAMIAHAHIAIgBIAIgBIAIgBIAIAAIAHAAQAPgFAPgCQAQgDARABIAlAAIAhAAQATAAAUACQARADARAEIARABIASAAIAQAAIAMAAIAQAAIAQgBIAIAAIAQgEIAQgDIAQgEIARgEIATgDIAJgCIAEgBIAJgDIAIgDIAJgBIAJgBIAJAAIAJAAIAJAAIAJAAIAGgEIAIgDIAHgCIAHgCIAHgEIAHgEIAHgFIAHgEIAHgEIAIgFIAIgEIAJgEIAHgEIAIgFIAGgEIAFgFIAGgFIAGgEIAGgFIAIgEIAHgFIAIgFIAHgEIAHgFIAGgFIAHgGIAGgGIAGgHIAGgGIAEgGIAEgHIAEgGIhhgBIhxABIhrAAIh5AAIhEAAQgaANgeAFgAj7BWIACAAIACAAIgCAAIgCAAg");
	this.shape_139.setTransform(367.575,408.5417);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AkHC0IgHAAIgHgCIgGgCIgFgDIgGgDIgEgFIgFgEIgDgGIgDgGIgCgGIgCgGIAAgHIABgIIgYgPIgVgQIgVgRQgLgJgLgHIgWgOIgTgOIgHgBIgHgEIgIgDIgGgEIgFgEIgEgFIgDgFIgDgFIgCgHIgBgGIgBgGIAAgIIABgHIACgGIADgGIADgGIAFgFIAFgFIAGgFIAGgDIAGgDIAHgCQA3gcA5gWQBSgfBXAFQBRAFBQgHIBXgJQA8gHA9ABIARAAQAVgFAVgCQASgDASAAIAkAAIArAAIAxAAQAKAAAKACIAGACIAFADIAGAFIAGAEIAGAHIAEAGIACAIIADAPQABAIAAAIIABAPIAAAQIAAAQIgBASIgBAIIgCAIIgCAHIgEAGIgEAGIgGAGIgGAEIgGAEIgGAEIgHAEIgoANQgWAHgWAEIgtAIIg4AJIg2AIIAFAAIgHABIgHACIgIAEIgIAFIgIAEIgHAEIgHADIgIADIgHABIgIABIgGAEIgHADIgIACIgHABIgHABIgIABIgIAAIgHAAIgCABIgIADIgJADIgIAEIgHACIgHADIgIABIgHABIgHABIgIACIgHACIgIACIgIACIgJAFIgIADIgHABIgGACIgHABIgGADIgHACIgHACIgGACIgHABIgEABIgHACIgHADIgGABIgIACIgIABIgHABIgIAAIgGADIgHADIgHACIgFABIgFAAIgJABIgFAAIgFAAIgGAAIgHAEIgIACIgIABIgIACIgIAAIgJABIgJAAIgJAAgAjugwIgZAHIgRAFIgQAGIgXAJIgOAFIATAPIAOAKIAHAGIAPAKQALAIANAGIAGADIAHACIAHADIAGADIAHAEIAHAEIAHAEIAGACIAHABIAFACIAFADIAHgDIAGgDIAHgCIAKgBIAKgBIAIAAIADgBIAGgDIAGgCIAJgCIAJgBIAHgEIAHgDIAHgCIAHgBIAHgBIAFgBIAPgGIAQgGIAHgCIAIgCIAIgBIAQgCIARgGIAQgGIAGgCIAHgCIAHgCIAQgBIAIgBIADAAIAHgDIAIgDIAGgBIAHgBIAHgBQAWgOAZgIQAagIAcgEIBDgJIAzgJQAYgFAYgJQgEgHgOACIgRABIgSAAIgaAAIgSAAIgSABQgWAGgXACQgRACgRgBIghAAIglAAQgOAAgOABIhGANQggAGghAAIhDAAIhGAAIgQAAIgvABg");
	this.shape_140.setTransform(366.275,397.075);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AliC+IgDAAIgDAAIgHgBIgGgBIgGgCQgbgSgagWIgjgfIgjgeQgPgOgMgQQgOgTgJgWIgHgWIgDgIIgCgGIgCgIIgDgDIgDgGIgCgHIgDgHIgBgGIgBgHIABgHIAAgHIACgGIACgGIADgHIAFgGIAEgFIAGgFIAFgEIAIgDIAJgEIAIgCQAPgIAQgGIAXgIIAQgEIAQgDIAQgBIAQgBIAJAAIAJgDIAJgDQBMgGBNAAICxACIDGAAICyAAIAvAAQANgGAOgCIAVgCIAPAAIASAAIASAAIARAAIAIAAIAGgDIAGgCIAHgDIAHgCIAHAAIAHABIAHACIAHADIAGADIAGAFIAFAFIAEAGIADAHIADAHQACALAAALIAAAbIAAATIAAASIAAAOIAAAHIgBAIIgDAHIgDAIIgDAHIgCAFIgDAGIgCAFIgGAGIgEAGIgGAFIgEAEIgFAEIgGAGIgGAHIgFAEIgGAEQgrAYgxAMQgdAHgdAEQg0AIg1ADQhAADhCAAIhxAAIgGADIgHACIgGABIgJACIgKACIgJAAIgKACIgJACIgJACIgKADIgIAEIgHABIgJACIgJACIgJACIgGACIgGACIgIADIgIACIgHADIgHACIgPAEIgIABIgIAAIgIAAIgHABIgHAAQgLAGgNACIgOAEIgNAFIgJABIgJABIgIAAIgJABIgHABIgGADIgIACIgIACIgIABIgIAAIgJABIgIAAgAm2g4IgIACIgIADIgHACIgFADIADAHIABAHIACAHIADAHIAEAHIAFAHIAEAGIAHAGIAGAHIAGAGIAHAFIAHAHIAHAGIANALIAHAFIAHAGIAHAGIAGAGIAIAFIAHAHIAGAFIADgBIAHgBIAHgDIAJgCIAIgBIAJgBIAJgBIAJgBIAJgCIAJgDIAHgCIAGgCIAGgDIAHgDIAIgCIAIgBIAHgBIAIAAIAHAAIAIAAIAIgBIABAAIAHgDIAGgDIAJgCIAIgCIAGgDIAHgCIAJgCIAJgBIAKgCIAMgFIATgFIATgFIATgCIASgDIAIgDIAIgDIAIgDIAygBIA+ABIA1AAIBAAAIAugBIAVgEIAYgEIAjgDQAMgDAMgEQAMgEAMgDQARgCAPgEIAHgDIAJgEIAHgEIAHgGIAFgFIAEgDIAEgFIADgFIAAgIIAAgHIAAgHIgIAAIgIAAIgHAAIgJAAIgIAAIgIAAIgRAAIgHAEIgGACIgJACQhNAEhOgBIi+gBIieAAIingBQgoAAgnACIgHACIgHACIgGACIgIABIgIABIgJABIgSABIgKAAIgJACgAlihEIACgBIgBAAIgBABgAlehFIACgBIgBAAIgBABg");
	this.shape_141.setTransform(359.2,393.1);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AiAEnIgHgBIgHgBIgGgCIgFgDIgGgEIgEgEIgFgFIgDgFIgDgGIgCgGIgCgGIAAgHIAAgHIACgHIACgFIgGAEIgHAFIgGADIgHACIgHACIgKACIgJABIgHAAIgHAAIgJgBIgKgBIgHgDIgHgDIgHgEIgHgEIgIgGIgGgEIgHgDIgFgGIgGgHIgFgHIgFgHIgFgHIgEgGIgEgFIgDgGIgDgHIgCgHQgEgVAAgWQgBgXAFgWIAJgkQAEgSAJgOQAKgSAMgQIARgUQAKgRAIgTQAJgSAOgQIAcgdIAcgdQALgLAMgKIANgJIADgFIAFgFIAFgFIAFgFIAFgEIAEgEIAFgEIAFgEIAGgDIAGgBIAGgDIAGgCIAHgEIAHgFIAHgEIAHgEIAIgCIAIgCIAIgBQALgEALgDQAQgDAQAAIAfAAIAYAAQATAAASADIAUAGIARABIARADIAQAEIASAFIAJADIATAEIAHABIAHABIAHABIAHACIAHADIAGADIAGAEIAGAEIAGAFIAHAEIAHAFIAFAEIAFAHIAEAGIAFAHIAFAHIAAABIAFAFIADAFIADAGIACAGIADAHIACAGIADAHIADAIIADAHIADAHIADAIIACAHQAEAVABAWIAAAxIAAAtQAAAVgFAUQgFATgHARIgKATIgDAIIgCAJIgDAIIgDAHIgFAHIgGAFIgGAHIgEAHIgEAHIgEAHIgEAGIgFAFIgEAGIgFAEIgFAFIgFAGIgFAEIgFADIgGAEIgOAEIgQAHIgPAFIgNADIgIACIgIAEIgGADIgGACIgHACIgIACIgHACIgIABIgJAAIgJABIgJAAIgJAAIgIACIgIABIgHADIgIACIgIABQgKAFgLADQgMADgMAAIgVAAIgZAAIgZAAIgQAAIgJADIgIADIgIACIgIABIgJABIgIAAgAjECIIAHACIAIACIAGAFIAHAEIAEAGIAEAFIADAGIACAHIABAHIAAAGIgBAHIgBAGIgCAGIAHgEIAHgDIAIgCIAIgBIAFAAQAOgHAPgCQASgCASAAIAbABIAaAAIAQgBIAQgFIAXgGQANgEANgCIASgCIAbAAIAJgFIAPgFIAPgFIAOgEIAPgFIAHgDIAFgDIAEgGIAFgJIAEgIIAEgGIAEgFIAEgFIAFgEIABgGIACgFIADgHIAEgIIADgHIAEgHIADgJIADgIIACgIIAAgaIAAgaIAAgeIgBgdIAAgKIgDgIIgCgHIgDgHIgDgHIgDgIIgDgHIgFgHIgEgFIgEgHIgFgEIgFgEIgHgBIgOgCIgNgEIgNgDIgNgDIgIgDIgFgCIgFgBIgIgBIgIAAIgHgBIgIgBIgIgBIgHgDIgGgCIgHgBIgUAAIgTAAIgTAAIgUAAIAAABIgHACIgGADIgIACIgIABIgFAEIgGADIgGADIgHADIgHAEIgHACIgGAFIgEAEIgDAGIgEAEIgUAQQgLAIgJAKIgTATIgRARIgQASQgIAMgFANIgMAWQgFAJgHAHIgNARQgIAKgGAKIgEAIIgCAJIgCAIIgDAIIgCAJIgBAIIAAAIIAAAJIAAAHIABAHIAFAIIAFAIIAFADIAFAEIAGgFIAIgCIAHgCIAIgBIAIABg");
	this.shape_142.setTransform(371.5977,382.6);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AhZDgIgIgCIgHgEIgggUIgfgUIgfgUIgfgUQgPgKgOgMIgMgLIgEgGIgEgGIgEgHIgDgGIgEgHIgDgHIgEgIIgEgHQgEgLgCgLIgDgYIAAgXQAAgLACgMQABgMAFgLIAJgUIAEgFIAEgFIAFgFIAFgFIAEgGIAFgDIAEgEIAFgGIAFgFIAGgEIAHgDIAGgDIAGgDIAJgCIAIgDQAggRAjgJIBOgUQArgKArgIQArgHArgEQAogFApAEIAHABIAHADIAHADIAGABIAHACIAGACIAHACIAGADIAHADIAGADIAGADIAFAEIAFAEIAEAEIAGAEIAEAFIAEAFIAEAHIAEAGIAEAHIADAIIACAIIACAIIABAJIABAIIAAAIIAAAHIAAAIIAAAIIAAAJIAAAIIgCAJIgCAIIgDAHIgEAHIgFAGIgFAFIgGADIgGAEIgFAFIgFAGIgFAFIgFAFIgEAGIgEAFIgEAFIgFAHIgFAHIgFAGIgHAGIgHAFIgGADIgGACIgGABIgGAEIgHAEIgGAEIgIAEIgHAEIgHADIgHADIgGAEIgFAEIgGAEIgGAEIgFAFIgHAFIgGADIgIAEIgIACIgIABIgJAAIgHAAIgGgBIgGgCIgGgDIgFgEIgFgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgGIAAgHIACgHIACgHIADgFIAEgGIAFgEIAFgFIAGgDIAGgDIAGgCIAHgEIAGgFIAHgFIAGgFIAHgEIAFgDIAFgBIAFgDIAIgEIAHgDIAIgFIAHgEIAIgGIAGgDIAGgCIAEgGIAEgFIAFgGIAFgGIAFgGIAGgGIAFgGIAFgGIAEgFIAEgFIAAgKIgBgKIgBgCIgCgCIgFgDIgJgCIgJgCIgJgCIgIgDIgHAAIgIAAIgHAAIgJAAIgIAAIgJAAIgJABIgvAKQgXAFgYADQgWACgWAGIgqAJIgyAOIgRAFIgHADIgGADIgHAEIgIADIgIADIgIADIgIADIgEAEIgFAEIgEAFIgFAFIgBACIAAAKIAAAJIAAAJIABAJIAAABIADAGIADAGIACAEIADAFIACAFIADAEIAEAEIAYAQIAYAPIAYAQIAXAPIAYAOIAUAPIAFAEIAEAFIAEAFIADAGIACAGIABAGIABAHIgBAGIgBAHIgCAGIgDAGIgEAFIgEAFIgFAFIgGADIgGADIgGACIgHABIgGABIgJgBg");
	this.shape_143.setTransform(362.125,393.6309);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AiPD5IgRgCQgRgDgOgIIgegPIgcgNIgXgNQgNgJgKgLIgJgMIgDgHIgDgHIgCgHIgEgHIgDgIIgCgIIgCgHIgDgIIgDgHQgEgSgBgSIAAgkIAAgjIgBghQAAgOADgNIADgNIADgGIAFgGIAFgGIAGgFQAKgLAMgJQALgJAOgGQAGgDAOgJIAUgOQANgKAPgIQAOgHAPgFQAdgMAggHIBLgQQAogIApgFQAkgEAkAAIBKAAQAMAAALABIAHABIAGACIAGACIAGADIAEADIAEADIAFADIAFADIAEACIAIAEIAGAFIAFAEIAHAFIAHAGIAGAGIAFAGIAEAGIADAGIACAIIACAFIACAFQAKAVABAXQACAfgFAeQgGAggQAbQgOAZgRAYQgNATgSAOIgQANIgEAGIgFAGIgGAGIgGAGIgHAFIgFAGIgHAFIgHAEIgHAEIgHAEIgIADIgIAFIgHAFIgHADIgGADIgJAEIgIADIgHABIgIACIgIAEIgHACIAFgBIACgBIAEgCIgHADIgGADIgGADIgEAEIgFAEIgGADIgGACIgIACIgJACIgIACIgHADIgHACIgIACIgFABIgGABIgCAGIgDAFIgFAFIgFAEIgFAEIgGADIgGACIgGACIgRAAIgTAAIgTAAIgZAAIgGAAIgUgBgABGiUIgKAAQgVAGgXAEIgoAHQgWAEgWAGIgtALIgJACIgHADIgHADIgIADQgLAGgKAHIgVAPQgKAIgLAFIgPAIIgEACIgEADIgDAEQgCAKAAAKIABAcIAAAaIAAAaIABAJIADAGIACAGIACAIIADAJIACAGIADAHIAMAHIALAGIANAGIAOAGIANAHIANAHIAKABIAJAAIAJAAIAJAAIAIAAIAJAAIAJAAIAFAAIADgFIAEgGIAEgEIAFgEIAFgEIAGgDIAGgCIAHgBIAGgBIAHAAIAHAAIAHAAIAHgEIAFgCIAIgCIAIgCIAFgDIAMgGIARgIIAOgGIAPgFIAJgCIAHgEIAGgEIAHgEIAFgCIAFgDIAFgCIAFgDIADgDIAFgFIAHgFIAFgGIAJgKIAJgJIAKgJIALgJIAFgEIAFgHIAFgIIAEgGIAGgIIAFgIIAFgIIACgHIACgIIACgHIACgIIAAgJIAAgKIAAgJIAAgJIgBgDIgDgHIgDgHIgEgEIgEgDIgFgDIgFgDIgGgDQgOgDgPABIgkAAIgnAAIgeABgAiTCTIACABIgCgBIgCAAIACAAg");
	this.shape_144.setTransform(362.6137,393.0813);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("ABXE2IgTAAIgTAAIgRAAIgJAAQgpgEgpgOIhTgdQgogPgmgTQgngUgkgYQgjgYgQgnQgFgLgCgLIgBgIIAAgJIAAgIIABgKIACgJIABgGIACgGIADgGIAGgdIAGgXIAIgWQAEgKAHgJIAQgTIAHgNIAHgNIAHgOIAIgOIAKgQIALgPIAGgHIAEgHIAEgIIADgGIAEgHIAEgGIAEgGIAEgHIAEgGIAFgGIAFgFIAGgEIAGgFIAHgDQARgOAUgIQAagKAbgGQAXgFAWgJQAYgJAYgDQAYgDAYAAQAMABALADIAHADIAHAEIAIACIAHACIAGACIAGACIAGABIAIACIAIACIAHADIAHADIAGAEIAHAFIAFAEIAGAFIAGAFIAFAEIAYARQANAJAOAHIAeARQAOAIAMAMIAPASIAJANIAFAGIAGAHIAFAHIAFAHIAEAFIAEAFIAEAIIADAHQADANABAOIAAAbIAAAWIAAAXQABAPgCAPIgCARIgDAIIgDAIIgDAHIgEAIIgDAHIgIANIgIALIgFAGIgTARIgUASQgIAKgLAHQgKAIgLAFIgPAHIgGAEIgBABIgBAAIgFAEIgFADIgFADIgGACIgIACIgHADIgIADIgHADIgIACIgJACIAAAAIAEAFIAFAFIAEAFIADAGIACAHIACAGIAAAHIAAAHIgCAGIgCAHIgDAFIgDAGIgFAEIgEAFIgGADIgFADIgHACIgGACIgQAAIgTAAgAAPjQQgOADgMAFQgPAHgQAEIgeAHQgRADgQAHIgIADIgHAEIgBABIgGAEIgGAEIgCAFIgFAHIgEAHQgHANgIAMQgNAQgKARQgLASgIASQgHAOgJAMIgQASIgBACIgFARIgEAQIgDAOIgDAOIgFAOIAAAAIAAAGIADAGIAEAGIAFAGIAGAFIARAIIAWAKIAWAMIAYANIAIAEIARAGIARAHIASAGIASAHIASAIIAPAFIAPAFIAPAEIANAEIANADIAGABIAIAAIAIABIAIAAIgDgJIgBgHIgBgGIABgHIABgGIACgGIADgGIADgFIAFgFIAEgEIAGgEIAGgDIAGgCIACgBIAGgDIAGgDIAPgGIAQgGIAJgDIAGgDIAHgCIAGgCIAGgCIAFgEIAGgEIAFgDIAHgDIAGgDIAHgCIACgCIAGgFIAMgMIANgLIANgMIABgBIABgBIABgBIAAAAIABAAIAFgIIAEgJIACgFIABgMIAAgRIAAgSIAAgRIAAgRIAAgIIgCgDIgDgGIgFgGIgFgHIgFgGIgFgGIgFgHIgEgEIgDgEIgUgLIgbgQQgOgIgOgJIgbgVIgOgLIgJgCIgHgCIgHgCIgGgCIgIgCIgIgDIgIgDIgHgDIgJAAIgJAAIgJABgAD4AoIgBABIABAAIABgCIAAAAIgBABgAjtAKIgBABIABgBIABgCIgBACgAiJiYIgBABIABgBIABgBIgBABgABpi9IABACIgBgCIgBAAg");
	this.shape_145.setTransform(359.6313,386.0964);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("Ag9DIQgZgGgWgPIgrgdIgpgdQgWgRgUgSIgPgQIgEgGIgDgGIgDgHIgEgGIgDgHIgCgGQgDgMgBgMIgBgOIgBgWIAAgaQgBgNADgOIACgKIACgGIADgFIADgFIADgGIAEgGIAEgHIADgFIACgFIAIgLIAIgKIAFgFIAMgIIALgIIAOgHIAIgDIAHgCIAIgBIAIgBIAHgDIAIgCIAHgDQAegFAfAAQAiAAAiAEQAcAEAdAFQAaAEAZAGQAaAHAZAIIAIADIAGABIAGACIAGADIAGACIAHAGIAHAEIAIAEIAEADIAEACIAGAEIAFAFIAFAEIAFAFIAFAEIADAGIADAGIADAGIADAGIADAHIADAHIAEAFIAEAGIADAGIACAHIACAIIABAIIAAAIIAAAIIAAAJIgBAGIgBAGIgBAFIgDAIIgFAIIgEAHIgEAFIgDAEIgDAGIgDAGIgEAIIgEAIIgEAFIgFAFIgEAFIgFAGIgFAEIgGAEIgGADIgGADIgGACIgGABIgJADIgIADIgIACIgIACIgJABIgIABIgHADIgGACIgIACIgIABIgIABIgJABIgFAAIAFAHIADAHIACAIIABAIIgBAHIgBAGIgCAHIgDAFIgEAGIgEAEIgFAFIgFADIgGADIgGACIgHACIgGAAIgJAAIgJAAIgIAAIgJAAIgJAAIgIAAIgKABQgXAAgWgGgAiqAIIABABIAFAGQAPAOAQANIAmAaIAZARIAcASIAGACIAIAAIAJAAIAJAAIAJAAIAHAAIgDgIIgBgGIAAgHIAAgHIABgGIACgGIADgGIAEgFIAEgFIAFgEIAFgEIAGgDIAGgCIAEgBIAHgDIAHgDIAIgCIAIgBIAIgBIAFAAIAGAAIACgBIAHgDIAGgCIAJgCIAJgBIAKgBIAHgCIAHgDIAIgCIADgFIADgFIAEgHIAEgIIAEgGIgBgBIgDgHIgCgEIAAgBIAAAAIAAgBIAAAAIgBgCIgBgCIgBgDIgEgIIgCgBIgEgDIgFgDIgGgDIgEgDIgEgDQgQgGgQgEIgkgJQgRgEgQgDIgjgGIgSgDIgSgBIgSAAIgTAAIgSABIgSAAIgHADIgIACIgIADIgIABIgIABIgFACIgEADIgBABIgFAIIgEAIIgDAGIgEAFIAAAKIAAAKIAAAKIAAAIIAAAIIABAIIAAAHIAAAAIADAGIAAAAg");
	this.shape_146.setTransform(365.5833,387.5641);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AhQExIgGgCIgGgCIgGgDIgFgDIgFgFIgEgEIgEgGIgDgGIgCgGIgBgGIgBgHIABgIIACgIIADgHIAEgHIgHgBIgGgCIgHgCIgHgEIgdgUIgmgbIgUgQIgTgSIgXgXIgKgLIgFgEIgGgFIgOgTIgOgUIgPgWIgJgNIgIgOIgGgNIgDgGIgDgGIgEgPIgCgRIgBgRIAAgQIACgQIADgOIADgGIAGgLIAIgMIAIgNIAHgNIAJgNIALgNIAGgGIAFgHIAFgGIAMgNIALgJIAKgHIAHgEIAFgCIAFgDIAAgBIAFgEIAGgDIAFgDQAygTA0gGIBagKQA7gHA9AGQA5AFA5AMQA0AMAuAcIAFAFIAFAGIAFAGIAFAHIAEAGIADAHIAEAGIADAGIADAGIAFAGIAFAHIAFAGIADAHIAGAQIACAHIABAIIABAIQAJAVABAYIACA5QAAAXgHAXQgHAWgMAVQgQAbgXAWQgMAMgPAKIgKAMIgQARQgIAJgJAIIgMAKIgNAKIgNAKIgGAEQgXAKgVAPQgTAPgXAIIgsAOIguAMQgcAHgcAEQgNACgOAAIgNAAgAgdjLIgKAAIgJACIgKACIgQACIgQACIgQACIgOABIgHACIgIABIgHACIgPAEIgRAEIgJADIgHAFIgFADIgEACIgIAEIgHAEIgEAEIgEAEIgFAHIgEAFIgDAFIgEADIgEAEIgFAIIgFAIIgEAIIgFAIIgFAHIgEAHIAAAHIABAHIAAAHIAEAJIAGANQAFAJAGAIQAHAJAGAJIAGAKIAKANIAVAUIAYAZQAPAPAQAMIAaATIAYAOIACABIAHACIAHADIAIADIAHADIAIAEIAFADIAFAEIAEAFIAEAFIACAGIACAFIACAGIAAAHIAAAGIAAAGIgCAGIANgDIAWgFIAXgGIAYgHIAVgIIAHgDIABAAIAHgEIAHgEIANgJIAOgJIAPgJIAPgIIALgJIALgKQAIgHAIgJIAOgRQAHgIAIgGIAGgEIAFgFIAGgGIAGgGIAFgFIAFgFIAFgFIAEgHIAEgIIADgGIAEgGIAAgJIAAgIIAAgRIAAgRIgBgRIAAgJIAAgBIgDgHIgCgGIgCgIIgBgIIgBgJIgFgFIgFgFIgDgFIgEgGIgDgHIgCgEIgDgFIgCgFIgDgEIgIgEIgGgDIgFgCIgHgEIgIgEIAEACIACABIAFABIgHgCIgIgEIgIgCIgIgCIgIgCIgIgCIgIgCQgXAAgWgCIg1gGQgWgCgWAAIgnABg");
	this.shape_147.setTransform(377.1892,382.599);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AnoAxIgGgBIgHgCIgFgDIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgBgHIgBgGIABgGIABgGIACgHIADgFIAEgGIAEgEIAFgFIAFgDIAFgDIAHgCIAGgCQBdgBBdABIDmAAIDvAAIC9AAQBDgBBCABIAHACIAFACIAGADIAGADIAEAFIAFAEIADAGIADAFIADAHIABAGIAAAGIAAAGIgBAHIgDAGIgDAGIgDAFIgFAFIgEAEIgGAEIgGADIgFACIgHABQg/ABg/AAIiBAAIigAAIioAAIhFAAIg7AAIg8AAIg8AAIg8AAIg7AAIgbgBg");
	this.shape_148.setTransform(368.3,399.1167);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AlkBaIgIgDIgIgDIgFgEIgGgEIgDgFIgEgFIgDgGIgCgGIgBgIIgBgIIABgIIADgIIADgHIAEgGIAFgGIAHgEIAHgEIAHgBIBegRIBWgQIBLgLIBDgLQAggGAegKIAJAAQAWgIAWgBIArgDQAVAAAUADIAlAHIAhAIIAJACIAHAAIAHABIAIAAIAHABIAGABIAHABIAGADIAFACIAGACIABAAIAJAAIAHACIAHAEIAGADIAGAFIAIADIAGAEIAFAFIAHAEIAFAFIAHADIAGAEIAEADIAFAGIADAEIAEAHIACAIIABAIIAAAIIgBAIIgCAFIgEAGIgDAFIgFAFIgEAEIgGAEIgFADIgGACIgIACIgGABIgHgBIgGgCIgHgCIgFgCIgGgDIgFgEIgEgDIgHgFIgGgEIgGgFIgHgDIgIgCIgIgBIgGgDIgBgBIACABIgCgBIgCgBIACABIgEgBIgSgBIgZgEIgOgEIgRgDIgTgEIgSgEIgJAAIgIgBIgJAAIgIABIgJAAIgJAAIgIAAIgIACIgIACIgGADIgIABIgIABQgrANgsAGIhUANIhNANIhLAOQgjAHgkAEIgIAAg");
	this.shape_149.setTransform(371.9,392.05);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("Ak0BLIgHAAIgIgBIgHgBIgHgBIgHgDIgGgCIgGgDIgEgDIgGgCIgFgEIgFgEIgFgFIgDgFIgDgGIgCgGIgCgHIAAgHIAAgGIACgHIACgFIADgGIADgFIAFgFIAEgEIAGgEIAFgDIAHgCIAGgBIAHgBIAIABIAHABIAIACIAHADIAFADQBJgFBIgNQBHgNBHgLQAygHA1gBIBfAAQAbgBAbAGIAHACIAHACIACABIAHAAIAIAAIAEAAIAJAAIAIACIAIADIAHADIAHADIAGADIANAHIAMAHIAIAFIAGADIAGACIAEADIAEADIACABIAFAEIAEAEIAEAEIAEAFIADAEIACAGIABAGIABAGIAAAGIAAAGIgCAGIgCAFIgCAGIgEAFIgFAFIgFAFIgFADIgGADIgGACIgGABIgHAAIgGAAIgGgBIgHgCIgGgDIgFgEIgFgDIgCgBIgGgDIgGgCIgGgEIgFgFIgIgEIgGgDIgHgDIgFAAIgFAAIgIgBIgHgBIgIgBIgHgBIgHgCIgHgCIgFgBQhCgBhDACQhFADhCAOQgzAKgzAGQgzAGgzAIQgNABgOAAIgLAAg");
	this.shape_150.setTransform(372.325,383.5874);

	this.instance_10 = new lib.anotherarm("synched",0);
	this.instance_10.setTransform(371.35,342.75,0.5559,0.4919,0,36.706,-143.2937,282.6,336.4);
	this.instance_10._off = true;

	this.instance_11 = new lib.Bitmap5();
	this.instance_11.setTransform(498,488,0.1777,0.1777);
	this.instance_11._off = true;

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#000000").ss(14,1,1).p("EgnMAAAMBOZAAA");
	this.shape_151.setTransform(437.1,547.4);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#CCCCCC").s().p("EgnMAHPIAAudMBOZAAAIAAOdg");
	this.shape_152.setTransform(437.1,593.7);

	this.instance_12 = new lib.layschope("synched",0);
	this.instance_12.setTransform(528.15,519.95,0.4034,0.4034,45,0,0,-430.7,549.9);
	this.instance_12._off = true;

	this.instance_13 = new lib.gun("synched",0);
	this.instance_13.setTransform(660.85,363.15,1.5911,1.5911,0,0,0,-81,-73.9);
	this.instance_13._off = true;

	this.instance_14 = new lib.CachedBmp_8();
	this.instance_14.setTransform(65,11.05,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_7();
	this.instance_15.setTransform(46.5,73.55,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_11();
	this.instance_16.setTransform(206.75,547.15,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_10();
	this.instance_17.setTransform(575.05,478.9,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_9();
	this.instance_18.setTransform(164.45,98.05,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_14();
	this.instance_19.setTransform(206.75,547.15,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_13();
	this.instance_20.setTransform(575.05,478.9,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_12();
	this.instance_21.setTransform(164.45,98.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).to({state:[{t:this.shape_67}]},9).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},10).to({state:[{t:this.instance_10}]},5).to({state:[]},1).to({state:[{t:this.instance_11}]},89).to({state:[]},2).to({state:[{t:this.instance_11}]},8).to({state:[]},2).to({state:[{t:this.instance_11}]},8).to({state:[]},2).to({state:[{t:this.instance_11}]},8).to({state:[]},2).to({state:[{t:this.instance_11}]},8).to({state:[]},2).to({state:[{t:this.instance_11}]},8).to({state:[]},2).to({state:[{t:this.shape_152},{t:this.shape_151}]},19).to({state:[]},22).to({state:[{t:this.instance_12}]},66).to({state:[{t:this.instance_12}]},15).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},15).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},15).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},3).to({state:[{t:this.instance_13}]},21).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_13}]},3).to({state:[]},17).to({state:[{t:this.instance_15},{t:this.instance_14}]},1).to({state:[{t:this.instance_18},{t:this.instance_17},{t:this.instance_16}]},52).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]},144).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(93).to({_off:false},0).wait(1).to({regX:63.5,regY:60.4,x:550.15,y:306.7},0).to({regY:60.3,skewX:81.707,skewY:-98.2936},10).to({regY:60.4,skewX:36.706,skewY:-143.2937},10).to({regY:60.3,skewX:81.707,skewY:-98.2936},10).to({regY:60.4,skewX:36.706,skewY:-143.2937},10).to({regY:60.3,skewX:81.707,skewY:-98.2936},10).to({regY:60.4,skewX:36.706,skewY:-143.2937},10).to({regY:60.3,skewX:66.7057,skewY:-113.2942,x:550.2,y:306.75},10).to({regY:60.4,skewX:36.706,skewY:-143.2937,x:550.15,y:306.7},5).to({_off:true},1).wait(550));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(259).to({_off:false},0).to({_off:true},2).wait(8).to({_off:false,x:497,y:487},0).to({_off:true},2).wait(8).to({_off:false,x:531,y:488},0).to({_off:true},2).wait(8).to({_off:false,x:479},0).to({_off:true},2).wait(8).to({_off:false,x:485},0).to({_off:true},2).wait(8).to({_off:false,x:483,y:487},0).to({_off:true},2).wait(409));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(418).to({_off:false},0).to({rotation:-45},15,cjs.Ease.cubicIn).to({rotation:45},1).to({rotation:-45},15,cjs.Ease.cubicIn).to({rotation:45},1).to({rotation:-45},15,cjs.Ease.cubicIn).to({_off:true,regX:-81,regY:-73.9,scaleX:1.5911,scaleY:1.5911,rotation:0,x:660.85,y:363.15},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(465).to({_off:false},1).to({x:646.85,y:397.15},2).to({x:660.85,y:363.15},2).to({x:1041.85,y:291.15},3).to({scaleX:1.591,scaleY:1.591,x:600.75,y:291.1},21).to({x:590.1,y:351},2).to({regY:-73.8,x:419.9,y:426.45},2).to({x:559.25,y:424.8},2).to({scaleX:1.5909,scaleY:1.5909,x:463.95,y:403.15},2).to({x:315.15,y:390.5},3).to({_off:true},17).wait(198));

	// layer_
	this.instance_22 = new lib.anotherarm("synched",0);
	this.instance_22.setTransform(126.85,402.7,0.7729,0.7729,-26.7305,0,0,65.8,68.7);
	this.instance_22._off = true;

	this.instance_23 = new lib.characterfrontview("synched",0);
	this.instance_23.setTransform(343.15,357.35,1,1,0,0,0,314.4,324.3);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("ADQA8IgTAAIgTAAIgTAAIgKAAIgUAAIgUAAIgUAAIgPgBIgPgBIgPgCIgHgDIgHgCIgEgBIgugBIgzABIg6AAIg3AAQgUABgVgDIgNgCIgHgDIgGgEIgFgEIgFgEIgEgFIgEgFIgDgGIgCgGIgCgGIgBgGIAAgGIAAgGIACgHIACgHIADgFIADgGIAFgEIAEgFIAGgDIAFgDIAHgCIAGgBIAHgBIAIABIAIABIAHAEIAHAEIAwAAIA7AAIA2AAIA0AAQAVABAVAFIAQADIAcABIAeAAIAnAAIAuAAIAbAAIAHAAIAHACIAGACIAGADIAFADIAFAFIAEAEIAEAGIACAFIADAHIABAGIAAAGIAAAGIgBAHIgDAHIgCAFIgEAFIgEAFIgFAEIgFAEIgGADIgGACIgHABIgQABIgTAAgAAMAxIgBAAIgBAAIACAAg");
	this.shape_153.setTransform(396.775,314.1);

	this.instance_24 = new lib.CachedBmp_16();
	this.instance_24.setTransform(167.1,279.1,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_15();
	this.instance_25.setTransform(121.1,76.55,0.5,0.5);

	this.instance_26 = new lib.aimbotmouse("synched",0);
	this.instance_26.setTransform(457.55,583.1,0.4195,0.4195,-10.9388,0,0,224.8,109.8);
	this.instance_26._off = true;

	this.instance_27 = new lib.Tween1("synched",0);
	this.instance_27.setTransform(935.15,475.95);
	this.instance_27._off = true;

	this.instance_28 = new lib.Tween2("synched",0);
	this.instance_28.setTransform(935.15,475.95);
	this.instance_28._off = true;

	this.instance_29 = new lib.Tween3("synched",0);
	this.instance_29.setTransform(1271,475.95);
	this.instance_29._off = true;

	this.instance_30 = new lib.Tween4("synched",0);
	this.instance_30.setTransform(759.2,475.95);
	this.instance_30._off = true;

	this.instance_31 = new lib.Tween5("synched",0);
	this.instance_31.setTransform(1106.75,607.2,1.3251,1.3251);
	this.instance_31._off = true;

	this.instance_32 = new lib.Tween6("synched",0);
	this.instance_32.setTransform(935.15,475.95);
	this.instance_32._off = true;

	this.instance_33 = new lib.Tween7("synched",0);
	this.instance_33.setTransform(601.8,381.1,0.5123,0.5123);
	this.instance_33._off = true;

	this.instance_34 = new lib.Tween8("synched",0);
	this.instance_34.setTransform(1145.1,505.95);
	this.instance_34._off = true;

	this.instance_35 = new lib.Tween9("synched",0);
	this.instance_35.setTransform(935.15,475.95);
	this.instance_35._off = true;

	this.instance_36 = new lib.chair("synched",0);
	this.instance_36.setTransform(427,486.6,1.0565,1.0565,0,0,0,207.2,157.7);

	this.instance_37 = new lib.enemy("synched",0);
	this.instance_37.setTransform(1008.9,202.55,0.3616,0.3616,0,0,0,63.9,153.5);
	this.instance_37._off = true;

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("rgba(255,255,255,0.749)").ss(5,1,1).p("AwPnkMAgfAAAIAAPJMggfAAAg");
	this.shape_154.setTransform(132,59.55);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#FFFFFF").ss(5,1,1).p("EhgcgJwMDA5AAAIAAThMjA5AAAg");
	this.shape_155.setTransform(466.45,580.5);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("rgba(255,255,255,0.749)").s().p("AwPHlIAAvJMAgfAAAIAAPJg");
	this.shape_156.setTransform(132,59.55);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("EhgcAJxIAAzhMDA4AAAIAAThg");
	this.shape_157.setTransform(466.45,580.5);

	this.instance_38 = new lib.Tween14("synched",0);
	this.instance_38.setTransform(706.25,496.25);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},9).to({state:[{t:this.instance_22}]},12).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_22}]},7).to({state:[{t:this.instance_22}]},7).to({state:[{t:this.shape_153},{t:this.instance_23}]},9).to({state:[{t:this.instance_25},{t:this.instance_24}]},47).to({state:[]},77).to({state:[{t:this.instance_22}]},80).to({state:[{t:this.instance_22}]},4).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_22}]},5).to({state:[]},1).to({state:[{t:this.instance_26}]},15).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},2).to({state:[{t:this.instance_29}]},10).to({state:[{t:this.instance_30}]},10).to({state:[{t:this.instance_31}]},10).to({state:[{t:this.instance_32}]},10).to({state:[{t:this.instance_33}]},10).to({state:[{t:this.instance_34}]},10).to({state:[{t:this.instance_35}]},3).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},48).to({state:[{t:this.instance_37}]},28).to({state:[{t:this.instance_37}]},2).to({state:[{t:this.instance_37}]},6).to({state:[]},20).to({state:[{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.instance_38}]},52).to({state:[{t:this.instance_38}]},41).to({state:[{t:this.instance_38}]},9).to({state:[{t:this.instance_38}]},10).to({state:[{t:this.instance_38}]},5).to({state:[{t:this.instance_38}]},6).to({state:[{t:this.instance_38}]},6).to({state:[{t:this.instance_38}]},7).to({state:[{t:this.instance_38}]},3).to({state:[{t:this.instance_38}]},6).to({state:[{t:this.instance_38}]},6).to({state:[{t:this.instance_38}]},8).to({state:[{t:this.instance_38}]},19).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(9).to({_off:false},0).to({regY:68.8,rotation:-60.7087,x:127,y:402.75},12,cjs.Ease.cubicIn).to({startPosition:0},1).to({startPosition:0},1).to({regX:65.7,regY:68.9,rotation:-26.2757,x:126.95,y:402.85},7,cjs.Ease.quintOut).to({regX:65.8,regY:68.7,rotation:-26.7305,x:126.85,y:402.7},7).to({_off:true},9).wait(204).to({_off:false,x:146.1,y:372.4},0).to({regY:68.8,rotation:-88.7092,x:146.2},4,cjs.Ease.cubicIn).to({rotation:-22.4938,x:146.1,y:372.55},5,cjs.Ease.cubicOut).to({regY:68.7,rotation:-83.9015,y:372.5},5,cjs.Ease.cubicIn).to({rotation:-26.7305,y:372.4},5,cjs.Ease.cubicOut).to({regY:68.8,rotation:-76.9616,x:146.15},5,cjs.Ease.cubicIn).to({rotation:-23.2684,x:146.1,y:372.45},5,cjs.Ease.cubicOut).to({rotation:-82.4535,x:146.15,y:372.5},5,cjs.Ease.cubicIn).to({regY:68.7,rotation:-26.7305,x:146.1,y:372.4},5,cjs.Ease.quadOut).to({regY:68.8,rotation:-91.189,x:146.2},5,cjs.Ease.cubicIn).to({regY:68.9,rotation:-23.735,x:146.15,y:372.55},5,cjs.Ease.cubicOut).to({rotation:-91.4175,x:146.25,y:372.4},5,cjs.Ease.cubicIn).to({regY:68.7,rotation:-26.7305,x:146.1},5,cjs.Ease.cubicOut).to({rotation:-91.4458},5,cjs.Ease.cubicIn).to({_off:true},1).wait(405));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(330).to({_off:false},0).wait(1).to({regY:109.5,x:463.7,y:475},0).wait(1).to({x:468.95,y:383.95},0).wait(1).to({x:472.9,y:315.6},0).wait(1).to({x:475.55,y:269.1},0).wait(1).to({x:477.3,y:239.1},0).wait(1).to({x:478.4,y:220.2},0).wait(1).to({regY:109.8,x:479.15,y:208.45},0).wait(1).to({regY:109.5,x:479.05,y:208.3},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regY:109.8,x:479.15,y:208.45},0).wait(1).to({regY:109.5,x:247.45,y:191.25},0).wait(1).to({x:97.05,y:180.15},0).wait(1).to({x:1.35,y:173.1},0).wait(1).to({x:-57.55,y:168.75},0).wait(1).to({x:-91.8,y:166.2},0).wait(1).to({x:-110.05,y:164.85},0).wait(1).to({x:-118.4,y:164.25},0).wait(1).to({x:-121.1,y:164.05},0).wait(1).to({regY:109.8,x:-121.45,y:164.15},0).to({_off:true,regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:935.15,y:475.95},1).wait(368));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(351).to({_off:false},1).to({_off:true},2).wait(366));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(352).to({_off:false},2).to({_off:true,x:1271},10).wait(356));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(354).to({_off:false},10).to({_off:true,x:759.2},10).wait(346));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(364).to({_off:false},10).to({_off:true,scaleX:1.3251,scaleY:1.3251,x:1106.75,y:607.2},10).wait(336));
	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(374).to({_off:false},10).to({_off:true,scaleX:1,scaleY:1,x:935.15,y:475.95},10).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(384).to({_off:false},10).to({_off:true,scaleX:0.5123,scaleY:0.5123,x:601.8,y:381.1},10).wait(316));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(394).to({_off:false},10).to({_off:true,scaleX:1,scaleY:1,x:1145.1,y:505.95},10).wait(306));
	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(404).to({_off:false},10).to({_off:true,x:935.15,y:475.95},3).wait(303));
	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(414).to({_off:false},3).to({_off:true,regX:207.2,regY:157.7,scaleX:1.0565,scaleY:1.0565,x:427,y:486.6},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(466).to({_off:false},0).to({x:477.95,startPosition:3},28).to({regX:64,regY:153.8,scaleX:0.3615,scaleY:0.3615,rotation:-111.0075,x:429.05,y:223.5,startPosition:1},2).to({regX:63.8,regY:153.7,rotation:-95.1484,x:436,y:261.6,startPosition:2},6).to({_off:true},20).wait(198));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(575).to({_off:false},0).to({startPosition:0},41).to({regX:0.2,scaleX:0.2688,rotation:71.4987,x:706.2,y:496.3},9).to({regX:0.4,regY:-0.1,scaleX:0.5043,scaleY:2.8108,rotation:101.4968,x:706.5,y:496.15},10).to({regX:0.1,regY:-0.4,scaleX:0.2695,scaleY:1.6556,rotation:170.4828,x:706.95,y:496.45},5).to({regX:0.5,scaleX:1.3329,rotation:85.5068,x:707.05,y:496.65},6).to({regX:0.6,scaleX:0.624,scaleY:0.9723,rotation:0,skewX:-133.7182,skewY:46.283,x:707.25,y:496.55},6).to({regX:0.7,regY:-0.3,scaleX:0.6241,scaleY:1.8657,skewX:-95.7525,skewY:84.2477,x:707.45},7).to({regY:-0.4,scaleX:0.5588,scaleY:1.8309,skewX:-275.7522,skewY:-95.7519,x:707.9},3).to({scaleX:0.5638,rotation:84.2478,skewX:-360,skewY:0,y:496.65},6).to({regX:0.8,regY:-0.5,scaleX:0.3684,scaleY:1.4729,rotation:242.5026,x:708.05},6).to({regX:0.6,regY:-0.4,scaleX:0.8177,scaleY:1.6367,rotation:360,skewX:-477.497,skewY:62.5044,y:496.5},8).to({startPosition:0},19).wait(19));

	// another_layer
	this.instance_39 = new lib.headsideview("synched",0);
	this.instance_39.setTransform(303.65,440.1,0.6647,0.6647,0,0,0,91.3,309.1);

	this.instance_40 = new lib.Bitmap4();
	this.instance_40.setTransform(1001.3,200.25,0.138,0.138,162.3104);

	this.instance_41 = new lib.Bitmap4();
	this.instance_41.setTransform(1001.3,200.25,0.138,0.138,162.3104);

	this.instance_42 = new lib.Bitmap4();
	this.instance_42.setTransform(1001.3,200.25,0.138,0.138,162.3104);

	this.instance_43 = new lib.Bitmap4();
	this.instance_43.setTransform(1001.3,200.25,0.138,0.138,162.3104);

	this.instance_44 = new lib.gun("synched",0);
	this.instance_44.setTransform(656.35,404.05,2.2146,2.2146,0,0,0,-81.2,-74);
	this.instance_44._off = true;

	this.instance_45 = new lib.armcominoutofventreal("synched",0);
	this.instance_45.setTransform(459,735.35);
	this.instance_45._off = true;

	this.instance_46 = new lib.hand("synched",0);
	this.instance_46.setTransform(216.85,149.45,0.8299,0.8299,0,0,0,666,174.5);
	this.instance_46._off = true;

	this.instance_47 = new lib.anotherarm("synched",0);
	this.instance_47.setTransform(609.8,388.75,0.3297,0.3297,0,-91.1803,88.8197,75.6,76.2);
	this.instance_47._off = true;

	this.instance_48 = new lib.enemy();
	this.instance_48.setTransform(-208.95,381.1,1.0597,0.6782,0,0,180,15.5,217.3);
	this.instance_48._off = true;

	this.instance_49 = new lib.Tween13("synched",0);
	this.instance_49.setTransform(462,636.5);
	this.instance_49._off = true;

	this.instance_50 = new lib.CachedBmp_17();
	this.instance_50.setTransform(244.05,19.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_39,p:{x:303.65,y:440.1}}]},9).to({state:[]},37).to({state:[{t:this.instance_40,p:{scaleX:0.138,scaleY:0.138,rotation:162.3104,x:1001.3,y:200.25}}]},53).to({state:[{t:this.instance_41,p:{scaleX:0.138,scaleY:0.138,rotation:162.3104,x:1001.3,y:200.25}},{t:this.instance_40,p:{scaleX:0.0443,scaleY:0.0443,rotation:132.3082,x:390.2,y:165.35}}]},33).to({state:[{t:this.instance_42,p:{scaleX:0.138,scaleY:0.138,rotation:162.3104,x:1001.3,y:200.25}},{t:this.instance_41,p:{scaleX:0.0443,scaleY:0.0443,rotation:132.3082,x:390.2,y:165.35}},{t:this.instance_40,p:{scaleX:0.0443,scaleY:0.0443,rotation:171.5297,x:461.4,y:324.35}}]},9).to({state:[{t:this.instance_43},{t:this.instance_42,p:{scaleX:0.0443,scaleY:0.0443,rotation:132.3082,x:390.2,y:165.35}},{t:this.instance_41,p:{scaleX:0.0443,scaleY:0.0443,rotation:171.5297,x:461.4,y:324.35}},{t:this.instance_40,p:{scaleX:0.0443,scaleY:0.0443,rotation:108.0857,x:294.65,y:98.85}}]},5).to({state:[{t:this.instance_44}]},24).to({state:[{t:this.instance_44}]},14).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_44}]},5).to({state:[{t:this.instance_39,p:{x:330.35,y:421.3}}]},1).to({state:[]},65).to({state:[{t:this.instance_45}]},15).to({state:[{t:this.instance_45}]},2).to({state:[{t:this.instance_45}]},5).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_46}]},2).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},10).to({state:[{t:this.instance_46}]},3).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_47}]},11).to({state:[{t:this.instance_47}]},5).to({state:[{t:this.instance_47}]},10).to({state:[{t:this.instance_47}]},6).to({state:[{t:this.instance_47}]},10).to({state:[{t:this.instance_47}]},5).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_48}]},17).to({state:[{t:this.instance_48}]},16).to({state:[{t:this.instance_48}]},3).to({state:[]},20).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_49}]},3).to({state:[{t:this.instance_49}]},6).to({state:[{t:this.instance_49}]},7).to({state:[{t:this.instance_49}]},5).to({state:[{t:this.instance_49}]},8).to({state:[{t:this.instance_49}]},4).to({state:[{t:this.instance_49}]},10).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_49}]},1).to({state:[]},6).to({state:[{t:this.instance_50}]},126).to({state:[]},18).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(170).to({_off:false},0).wait(14).to({startPosition:0},0).to({x:415.5,y:257.1},10).to({x:922.65,y:296.25},10).to({x:377.7,y:565.95},10).to({x:631.4,y:263.55},10).to({x:1100.25,y:491.6},10).to({x:181.1,y:347.75},10).to({x:656.35,y:404.05},5).to({_off:true,regX:91.3,regY:309.1,scaleX:0.6647,scaleY:0.6647,x:330.35,y:421.3},1).wait(470));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(330).to({_off:false},0).to({regY:188,y:923.35},2).to({y:580.6},5,cjs.Ease.quintOut).wait(1).to({regY:0,y:392.6},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regY:188,y:580.6},0).wait(1).to({regY:0,rotation:-27.4971,x:372.207,y:400.2531},0).wait(1).to({rotation:-44.4583,x:327.3385,y:424.4491},0).wait(1).to({rotation:-54.7803,x:305.4287,y:445.1144},0).wait(1).to({rotation:-60.8922,x:294.7596,y:459.0635},0).wait(1).to({rotation:-64.3385,x:289.56,y:467.4003},0).wait(1).to({rotation:-66.1244,x:287.1057,y:471.8385},0).wait(1).to({rotation:-66.9188,x:286.0674,y:473.8367},0).wait(1).to({rotation:-67.1758,x:285.7386,y:474.4863},0).wait(1).to({regY:188.1,rotation:-67.2087,x:459.05,y:547.4},0).to({_off:true,regX:666,regY:174.5,scaleX:0.8299,scaleY:0.8299,rotation:-720,x:216.85,y:149.45},1).wait(368));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(351).to({_off:false,rotation:-1080},1).to({startPosition:0},2).to({x:552.7},10).to({x:40.9},10).to({regY:174.4,scaleX:1.0997,scaleY:1.0997,x:154.9,y:174.5},10).to({regY:174.5,scaleX:0.8299,scaleY:0.8299,x:216.85,y:149.45},10).to({regX:666.1,regY:174.6,scaleX:0.4251,scaleY:0.4251,x:233.8,y:213.85},10).to({regX:666,regY:174.5,scaleX:0.8299,scaleY:0.8299,x:426.8,y:179.45},10).to({x:216.85,y:149.45},3).to({_off:true,regX:75.6,regY:76.2,scaleX:0.3297,scaleY:0.3297,skewX:-91.1803,skewY:88.8197,x:609.8,y:388.75},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(417).to({_off:false},1).to({regX:75.8,scaleX:0.3296,scaleY:0.3296,skewX:-173.3892,skewY:6.6108,x:609.9,y:388.8},11,cjs.Ease.cubicIn).to({regX:75.6,scaleX:0.3297,scaleY:0.3297,skewX:-91.1803,skewY:88.8197,x:609.8,y:388.75},5).to({regX:75.7,scaleX:0.3296,scaleY:0.3296,skewX:-176.1275,skewY:3.8725,x:609.85},10,cjs.Ease.cubicIn).to({regX:75.6,scaleX:0.3297,scaleY:0.3297,skewX:-91.1803,skewY:88.8197,x:609.8},6).to({regX:75.7,scaleX:0.3296,scaleY:0.3296,skewX:-176.1275,skewY:3.8725,x:609.85},10,cjs.Ease.cubicIn).to({regX:75.6,scaleX:0.3297,scaleY:0.3297,skewX:-91.1803,skewY:88.8197,x:609.8},5).to({_off:true,regX:15.5,regY:217.3,scaleX:1.0597,scaleY:0.6782,skewX:0,skewY:180,x:-208.95,y:381.1,mode:"independent"},1).wait(254));
	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(465).to({_off:false},1).wait(17).to({regY:217.4,x:400.65,y:381.15},16).to({skewX:90,skewY:270,x:403.75,y:514.1},3).to({_off:true},20).wait(198));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(523).to({_off:false},0).to({startPosition:0},3).to({y:583.5},6,cjs.Ease.cubicIn).to({startPosition:0},7).to({y:537.5},5,cjs.Ease.quintIn).to({startPosition:0},8).to({y:451.5},4,cjs.Ease.quintIn).to({startPosition:0},10).wait(1).to({y:442.9748},0).wait(1).to({y:429.8981},0).wait(1).to({y:399.5},0).to({_off:true},6).wait(145));

	// focus
	this.instance_51 = new lib.headbackview("synched",0);
	this.instance_51.setTransform(414.4,245.6,1,1,0,0,0,107.2,107.2);

	this.instance_52 = new lib.arm("synched",0);
	this.instance_52.setTransform(258.45,398.2,1,1,0,0,0,77.6,45.4);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(20,1,1).p("Ar8DWIgLgKAKljVIBjFy");
	this.shape_158.setTransform(258.45,389.0375);

	this.instance_53 = new lib.anotherarm("synched",0);
	this.instance_53.setTransform(345.85,401.05,0.5778,0.5778,-26.7288,0,0,65.8,68.8);
	this.instance_53._off = true;

	this.instance_54 = new lib.CachedBmp_19();
	this.instance_54.setTransform(414.4,240.6,0.5,0.5);

	this.instance_55 = new lib.Bitmap4();
	this.instance_55.setTransform(465.2,168.85,0.0176,0.0176,108.0431);

	this.instance_56 = new lib.Bitmap4();
	this.instance_56.setTransform(531.55,258.6,0.0176,0.0176,171.5403);

	this.instance_57 = new lib.Bitmap4();
	this.instance_57.setTransform(503.2,195.35,0.0176,0.0176,132.3004);

	this.instance_58 = new lib.Bitmap4();
	this.instance_58.setTransform(746.4,209.2,0.0549,0.0549,162.3154);

	this.instance_59 = new lib.CachedBmp_18();
	this.instance_59.setTransform(371,133.1,0.5,0.5);

	this.instance_60 = new lib.vventclosed("synched",0);
	this.instance_60.setTransform(186.35,541.3,1.578,1.578,0,0,0,2,142.3);

	this.instance_61 = new lib.vent("synched",0);
	this.instance_61.setTransform(633.85,360.25,1.57,1.5767,0,0,0,268,-104.9);

	this.instance_62 = new lib.aimbotmouse("synched",0);
	this.instance_62.setTransform(508.1,405.85,1,1,0,11.5609,-168.4391,224.8,109.5);
	this.instance_62._off = true;

	this.instance_63 = new lib.chopes("synched",0);
	this.instance_63.setTransform(816.3,592.25,1,1,0,0,0,107.8,85.4);

	this.instance_64 = new lib.enemy();
	this.instance_64.setTransform(966.05,378.95,0.3096,0.3096,0,0,0,15.5,217.2);
	this.instance_64._off = true;

	this.instance_65 = new lib.Bitmap3();
	this.instance_65.setTransform(0,212,0.177,0.3911);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#FFFFFF").ss(1,1,1).p("EgcHgoYMBV7AAAIAAJYMhznAAAIAApYIGaAAIXSAAIAAE2I3SAAIAAk2Eg30AdSMBHKAAAIAALIMhHKAAAg");
	this.shape_159.setTransform(544.975,356.6);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("Eg30AoZIAArHMBHKAAAIAALHgEg5zgfBIAApYIGaAAIAAE3IXSAAIAAk3MBV7AAAIAAJYgEgcHgjiI3SAAIAAk3IXSAAIAAE3gEgzZgoZg");
	this.shape_160.setTransform(544.975,356.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_158},{t:this.instance_52},{t:this.instance_51}]}).to({state:[{t:this.shape_158},{t:this.instance_52},{t:this.instance_51}]},3).to({state:[{t:this.instance_53}]},6).to({state:[]},37).to({state:[{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53}]},124).to({state:[{t:this.instance_53}]},80).to({state:[{t:this.instance_53}]},4).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_53}]},10).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},15).to({state:[{t:this.instance_62}]},22).to({state:[{t:this.instance_62}]},2).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},10).to({state:[{t:this.instance_62}]},3).to({state:[{t:this.instance_63}]},1).to({state:[]},48).to({state:[{t:this.instance_64}]},23).to({state:[{t:this.instance_64}]},16).to({state:[{t:this.instance_64}]},2).to({state:[]},15).to({state:[{t:this.shape_160},{t:this.shape_159},{t:this.instance_62},{t:this.instance_65}]},53).wait(145));
	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(9).to({_off:false},0).to({_off:true},37).wait(124).to({_off:false,regX:282.4,regY:336.4,scaleX:0.2212,scaleY:0.1958,rotation:0,skewX:36.7038,skewY:-143.2921,x:495.75,y:265.95},0).wait(80).to({regX:65.8,regY:68.8,scaleX:0.5778,scaleY:0.5778,rotation:-26.7288,skewX:0,skewY:0,x:350.1,y:381.85},0).to({rotation:-53.1761,y:381.9},4,cjs.Ease.cubicIn).to({rotation:-26.7288,y:381.85},10,cjs.Ease.backOut).to({regY:68.9,rotation:-56.7275,x:350.15,y:381.9},10,cjs.Ease.backIn).to({regY:68.8,rotation:-26.7288,x:350.1,y:381.85},10,cjs.Ease.bounceOut).to({regY:68.9,rotation:-55.1919,x:350.15,y:381.9},10,cjs.Ease.circIn).to({regY:68.8,rotation:-26.7288,x:350.1,y:381.85},10,cjs.Ease.bounceOut).to({regY:68.9,rotation:-82.6995,x:350.2},10,cjs.Ease.cubicIn).to({_off:true,regX:2,regY:142.3,scaleX:1.578,scaleY:1.578,rotation:0,x:186.35,y:541.3},1).wait(405));
	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(352).to({_off:false},0).to({startPosition:0},2).to({x:843.95},10).to({x:332.15},10).to({regY:109.6,scaleX:1.3251,scaleY:1.3251,skewX:11.5607,skewY:-168.4393,x:540.85,y:514.4},10).to({regY:109.5,scaleX:1,scaleY:1,skewX:11.5609,skewY:-168.4391,x:508.1,y:405.85},10).to({regY:109.7,scaleX:0.5123,scaleY:0.5123,skewX:11.5606,skewY:-168.4394,x:383.05,y:345.3},10).to({regY:109.5,scaleX:1,scaleY:1,skewX:11.5609,skewY:-168.4391,x:718.05,y:435.85},10).to({x:508.1,y:405.85},3).to({_off:true,regX:107.8,regY:85.4,skewX:0,skewY:0,x:816.3,y:592.25},1).wait(157).to({_off:false,regX:331.6,regY:176.1,x:591.1,y:361.35},0).wait(145));
	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(489).to({_off:false},0).to({x:175.1,y:320.95},16).to({regY:217.6,scaleX:0.3095,scaleY:0.3095,rotation:-104.9995,x:198.15,y:376.6},2).to({_off:true},15).wait(198));

	// Layer_3
	this.instance_66 = new lib.chair("synched",0);
	this.instance_66.setTransform(-12,428.75,1,2.1228,0,0,0,207.2,157.7);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#000000").ss(20,1,1).p("AafizMAAAgsYImui0MAAAA2NIEej1IB8hoAYPVQIIqAAAYPVQIAAEEEgg4AyAIe88wIaLAAEgMkAqCIKovUIMpAAIqKRMAYPAZIAAU3");
	this.shape_161.setTransform(749.525,358.675);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#000000").ss(11,1,1).p("AEUidQAAAXgRAQQgPARgYAAQgWAAgRgRQgQgQAAgXQAAgXAQgQQARgQAWAAQAYAAAPAQQARAQAAAXgAiliIQAAAXgQAQQgQAQgXAAQgXAAgQgQQgQgQAAgXQAAgXAQgQQAQgQAXAAQAXAAAQAQQAQAQAAAXgAAnCcQAAAYgQAQQgRARgXAAQgYAAgRgRQgRgQAAgYQAAgYARgRQARgRAYAAQAXAAARARQAQARAAAYg");
	this.shape_162.setTransform(865.35,145.525);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#000000").ss(14,1,1).p("EAx2gvaIQuAAIAAWWIwuAAgEhWFgFYMCsLAAAMAAAA0zMisLAAAg");
	this.shape_163.setTransform(495.975,396.525);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#CCCCCC").s().p("EhWFAvbMAAAg0zMCsLAAAMAAAA0zgEAx2gZEIAA2WIQuAAIAAWWgEA4igkxQAAAYARAQQARARAYAAQAYAAAQgRQARgQAAgYQAAgYgRgRQgQgRgYAAQgYAAgRARQgRARAAAYIAAAAgEA1agpWQAAAXAQAQQAQAQAXAAQAXAAAQgQQAQgQAAgXQAAgXgQgQQgQgQgXAAQgXAAgQAQQgQAQAAAXIAAAAgEA8TgprQAAAXAQAQQAQARAXAAQAXAAAQgRQARgQAAgXQAAgXgRgQQgQgQgXAAQgXAAgQAQQgQAQAAAXIAAAAgEA4zgkJQgRgQAAgYQAAgYARgRQARgRAYAAQAYAAAQARQARARAAAYQAAAYgRAQQgQARgYAAQgYAAgRgRgEA6VgkxIAAAAgEA1qgovQgQgQAAgXQAAgXAQgQQAQgQAXAAQAXAAAQAQQAQAQAAAXQAAAXgQAQQgQAQgXAAQgXAAgQgQgEA8jgpEQgQgQAAgXQAAgXAQgQQAQgQAXAAQAXAAAQAQQARAQAAAXQAAAXgRAQQgQARgXAAQgXAAgQgRgEA3IgpWIAAAAgEA+CgprIAAAAg");
	this.shape_164.setTransform(495.975,396.525);

	this.instance_67 = new lib.headbackview("synched",0);
	this.instance_67.setTransform(412.95,226.45,1.0565,1.0565,0,0,0,107.3,107.3);

	this.instance_68 = new lib.arm("synched",0);
	this.instance_68.setTransform(248.15,387.7,1.0565,1.0565,0,0,0,77.6,45.5);

	this.instance_69 = new lib.desk("synched",0);
	this.instance_69.setTransform(471.1,357.75,1.0565,1.0565,0,0,0,378.5,269.9);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#000000").ss(20,1,1).p("AsnDjIgMgMALKjiIBqGH");
	this.shape_165.setTransform(248.25,378.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_66}]},9).to({state:[]},37).to({state:[{t:this.shape_161}]},204).to({state:[{t:this.shape_164},{t:this.shape_163},{t:this.shape_162}]},65).to({state:[]},37).to({state:[{t:this.shape_165},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67}]},66).to({state:[]},48).wait(254));

	// Layer_1
	this.instance_70 = new lib.desk("synched",0);
	this.instance_70.setTransform(469.4,369.95,1,1,0,0,0,378.4,269.9);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").ss(20,1,1).p("AafizMAAAgsYImui0MAAAA2NIEej1IAAU3IAAEEEgg4AyAIe88wIaLAAIIqAAEgMkAqCIKovUIMpAAIqKRMAYPAZIB8ho");
	this.shape_166.setTransform(765.475,395.025);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").ss(20,1,1).p("EhNWgzfMCatAAAMAAABm/MiatAAAg");
	this.shape_167.setTransform(478.15,323.6);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#00FF00").s().p("EhNWAzgMAAAhm/MCatAAAMAAABm/g");
	this.shape_168.setTransform(478.15,323.6);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").ss(20,1,1).p("EAxQgLbIL8EqIAAU2EAxQgLbIAAZHAZOVLIDcleMAvHAAAEAahAjcMAwoAAAEA9MgGxIQ+AAEAxQgLbIbRAAEgP8ggqMAAAAv/InLJDEhL4AQNIGylJMArWAAAIARB2EgYvggiMgAwAtcIAoEkIAANcMg1SAAgEhL4AReMAzBAAAEAZAAiTIAOtIMAybAAAEgl0gjbMAAAAsm");
	this.shape_169.setTransform(486.5,215.525);

	this.instance_71 = new lib.chair("synched",0);
	this.instance_71.setTransform(0.05,390.15,1,2.1228,0,0,0,207.2,157.7);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").ss(1,1,1).p("EhLsgyxMCXZAAAMAAABljMiXZAAAg");
	this.shape_170.setTransform(484.475,324.975);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.lf(["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#FF0000"],[0,0.165,0.365,0.498,0.667,0.831,1],-484.4,0,484.5,0).s().p("EhLsAyyMAAAhljMCXZAAAMAAABljg");
	this.shape_171.setTransform(484.475,324.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_70}]}).to({state:[{t:this.shape_166}]},9).to({state:[{t:this.shape_168},{t:this.shape_167}]},37).to({state:[]},47).to({state:[{t:this.shape_169}]},77).to({state:[{t:this.instance_71}]},80).to({state:[]},65).to({state:[{t:this.shape_171},{t:this.shape_170}]},260).wait(145));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-108.5,0,1595.1,1017.4);
// library properties:
lib.properties = {
	id: '0768D51568B641FB8B8E13D0CBA23F8E',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap4.png", id:"Bitmap4"},
		{src:"images/yoogaming_atlas_1.png", id:"yoogaming_atlas_1"},
		{src:"images/yoogaming_atlas_2.png", id:"yoogaming_atlas_2"},
		{src:"images/yoogaming_atlas_3.png", id:"yoogaming_atlas_3"},
		{src:"images/yoogaming_atlas_4.png", id:"yoogaming_atlas_4"},
		{src:"sounds/hahagamingwav.mp3", id:"hahagamingwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['0768D51568B641FB8B8E13D0CBA23F8E'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;