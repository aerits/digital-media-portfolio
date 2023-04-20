(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Untitled_1_atlas_1", frames: [[0,0,1600,838]]}
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



(lib.Bitmap7 = function() {
	this.initialize(ss["Untitled_1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.mouth5 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(5,1,1).p("Anmg7IBAAQAhXAXQAtAVA8AJQDBAeEUhm");
	this.shape.setTransform(48.65,6.0046);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(10,1,1).p("Aj0g/QBqAGAugZQBNgpBUAPQAuAIBDAYQAfAHCVgRQAagDAegEQBkgNBdgPQhGAqhTAqQinBShAAAQgfAAgfAWQgkAdgWAMQhUAvighBQiohEiphRIiIhEAj0g/IAhAUAoihvQBOATBHAMQBUAOBFAD");
	this.shape_1.setTransform(61.125,12.7696);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AilAuQg8gJgtgVIgggTQBpAFAvgYQBMgpBUAPQAvAIBDAYQAeAHCVgRQjWBPijAAQgwAAgrgHg");
	this.shape_2.setTransform(66.975,6.7519);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AiJBaQiohEiphRIiIhEIBAAQQBOATBHAMQBUAOBFADIAhAUQAtAVA8AJQDAAcEUhlIA4gHQBkgNBdgPQhGAqhTAqQinBShAAAQgfAAgfAWQgkAdgWAMQgjAUgwAAQhDAAhegmg");
	this.shape_3.setTransform(61.125,12.7696);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,132.3,35.6);


(lib.mouth4 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(5,1,1).p("Am0i2IAhAXQArAdA2AYQCrBJDPgMQDQgMBjg2QAygcAIgYAmrBAIAxAAQA+ABA7AJQC+AbBmBT");
	this.shape.setTransform(66.975,20.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(10,1,1).p("Aq8jCIBCAHQBTAIBUAIQF8AiDAAAQCIAAClgPQAygEA1gGQBxgNBPgNQgiBIg5BOQh0Cch4AgQiWAojcAFQgKAAgMAAQj/ADheg2QgngWg0gvQhKhDhbhrg");
	this.shape_1.setTransform(70.075,19.5305);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AlQCEQgngWg0gvIAxAAQA+ACA7AIQC+AbBmBTIgXABIgVAAQjtAAhag0gAkyhrQg2gXgrgdIghgYQF8AjDAAAQCIAAClgPQgIAYgyAbQhjA2jQAMQgdACgdAAQitAAiTg/g");
	this.shape_2.setTransform(66.975,20.6805);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AkgBVQg7gJg+gBIgxAAQhKhDhbhrIhNhfIBCAHICnAQIAhAYQArAdA2AXQCrBJDPgMQDQgMBjg2QAygbAIgZIBngKQBxgNBPgNQgiBIg5BPQh0Cch4AgQiWAojcAEQhmhTi+gbg");
	this.shape_3.setTransform(70.075,19.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,150.2,49.1);


(lib.mouth3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("Am2gxIAMAQQAUASAuAPQCQAxFRAAQFRAAgUgpQgHgNgpgQIgogN");
	this.shape.setTransform(74.9337,10.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(10,1,1).p("ArNiaIBPASQBpAUB+ANQC2ATDQAAQFaAAAigDQAHAAALgCQA/gIC8glQBrgWgZAtQgYAph0BCQh8BFiLAsQilA1h8gHQkKgPiQg9QiLg8i+itg");
	this.shape_1.setTransform(71.8445,15.5412);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AloAAQgugOgUgTIgMgPQC2ASDQABQFagBAigCIASgCIAoANQApAQAHANQAUAqlRAAQlRgBiQgxg");
	this.shape_2.setTransform(74.9337,10.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AAWCbQkKgPiQg9QiLg8i+itIBPASQBpAUB+ANIAMAPQAUATAuAPQCQAyFRAAQFRAAgUgqQgHgOgpgQIgogNQA/gIC8glQBrgWgZAtQgYAph0BCQh8BFiLAsQiSAuhyAAIgdAAg");
	this.shape_3.setTransform(71.8445,15.5412);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,153.7,41.1);


(lib.mouth2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("AqYhfIBLAWQBnAXCGANQGuAnJLhXQgKAohNArQibBUlSAMQlRANjwhkQhLgeg4gng");
	this.shape.setTransform(66.5,9.5694);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AnrAHQhMgeg4gnIgpghIBMAWQBmAXCGANQGtAnJMhXQgKAohNArQicBUlRAMIhKACQkhAAjVhZg");
	this.shape_1.setTransform(66.5,9.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,143,29.2);


(lib.mouth1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("AqJgsIBrAgQCKAjCWARQHfA3GpiV");
	this.shape.setTransform(65,5.4878);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,140,21);


(lib.eye = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("AJ2p0IgbgVQgjgYgpgXQiEhGiRgRQnPg3mgH4AJjARIgSgWQgXgdgdgbQhchZhtgqQlciImBFzAh5CbQAAB3BVBUQBTBUB3AAQB3AABUhUQBUhUAAh3QAAh3hUhUQhUhUh3AAQh3AAhTBUQhVBUAAB3gAH9LRIg+AUQhRAVhhANQkzAolchE");
	this.shape.setTransform(63.025,78.9748);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#086165").s().p("AilBKQhFgfAAgrQAAgrBFgfQA7gaBSgEQATAHAXAAQAVAAARgEQA+AGAwAVQBFAfAAArQAAArhFAfQhFAfhhAAQhgAAhFgfg");
	this.shape_1.setTransform(79.1,108.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgrAUIgEgCQgUgHAAgLQAAgKAUgIIACAAQATgIAaAAIAGAAQAYACASAGQAUAIAAAKQAAALgUAHIgLAFQgRADgUAAQgYAAgTgGg");
	this.shape_2.setTransform(80.95,95.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#148AA8").s().p("AjKDLQhUhUgBh3QABh2BUhVQBUhUB2AAQB3AABVBUQBUBVAAB2QAAB3hUBUQhVBUh3ABQh2gBhUhUgAgRi1IgDABQgjABgYAZQgaAaAAAlQAAAkAaAaQAUAVAbAEIgCAAQgTAIAAALQAAAKATAIIAFACQhSADg7AaQhFAfAAAsQAAAsBFAeQBFAfBhAAQBgAABFgfQBFgeAAgsQAAgshFgfQgwgVg+gGIALgEQATgIABgKQgBgLgTgIQgTgGgYgBQAPgGALgMQAMgMAGgNIAQAAQA5AAApgWQAogWAAgeQAAgggogVQgpgWg5AAQg5AAgnAWg");
	this.shape_3.setTransform(79.6,94.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag9A/QgagaAAgkQAAgkAagaQAYgZAigBIADAAQAlAAAZAaQAaAaAAAkQAAAUgIARQgGANgMAMQgLAMgOAGIgGAAQgbAAgSAHQgbgEgUgVg");
	this.shape_4.setTransform(77.85,85.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6691D0").s().p("AgiBKQAIgRAAgUQAAglgagZQgagaglAAIgDAAIADgBQAogWA5ABQA4gBApAWQAoAWAAAeQAAAfgoAWQgpAWg4gBIgQAAg");
	this.shape_5.setTransform(89.4,81.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Al+FuQieiXgBjXQABjWCeiXQCfiXDfAAQDgAACeCXQCgCXAADWQAADXigCXQieCXjgABQjfgBifiXg");
	this.shape_6.setTransform(72.45,108.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,136.1,168);


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {king:5,dra:13,gon:21,sends:26,his:35,re:40,gards:44};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"kingdragonsendshisregardswav",startFrame:0,endFrame:71,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("kingdragonsendshisregardswav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,71,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(72));

	// Layer_1
	this.instance = new lib.mouth1("synched",0);
	this.instance.setTransform(480,443.5,1,1,0,0,0,65,5.5);

	this.instance_1 = new lib.mouth2("synched",0);
	this.instance_1.setTransform(478.5,445.5,1,1,0,0,0,66.5,9.6);

	this.instance_2 = new lib.mouth4("synched",0);
	this.instance_2.setTransform(480.1,455.4,1,1,0,0,0,70,19.5);

	this.instance_3 = new lib.mouth3("synched",0);
	this.instance_3.setTransform(478.45,451.5,1,1,0,0,0,71.9,15.6);

	this.instance_4 = new lib.mouth5("synched",0);
	this.instance_4.setTransform(480,448.7,1,1,0,0,0,61.1,12.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},5).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.45,y:451.5}},{t:this.instance_2,p:{x:480.1}}]},3).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},3).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.45,y:451.5}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.45,y:451.5}},{t:this.instance_2,p:{x:480.1}}]},1).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.45,y:451.5}}]},5).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_4}]},1).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.55,y:445.5}}]},2).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance},{t:this.instance_1,p:{x:481.5}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.55,y:445.5}}]},1).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},4).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.55,y:445.5}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.55,y:445.5}},{t:this.instance_2,p:{x:480.2}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},1).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}},{t:this.instance_3,p:{x:478.55,y:445.5}},{t:this.instance_2,p:{x:480.2}}]},2).to({state:[{t:this.instance},{t:this.instance_1,p:{x:478.5}}]},8).wait(18));

	// eyes
	this.instance_5 = new lib.eye("synched",0);
	this.instance_5.setTransform(569.85,274.7,1,1,0,0,180,63,79);

	this.instance_6 = new lib.eye("synched",0);
	this.instance_6.setTransform(374.35,274.7,1,1,0,0,0,63,79);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5}]}).wait(72));

	// character
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(10,1,1).p("EAqvgriIALDnIAaIbIALD2IgcAsAYd0uIBMgUIEqE4IDiDuEAuVAo/IMMAyADJjZQBFBcgGAtQgGAqhGAFEgrggrsIgbFFIglGwIgYEeIgMCTA3g4oIg7gwA7aB4IA/B7EgwMArfIqUgeEgQUAm9IgMEIMAlHAAoIgOj+");
	this.shape.setTransform(462.475,386.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(20,1,1).p("EAh1gn6IE2hkIEPH/IBPCVEAiBgMaQAHg+AHhEQAun5hmmkQgjiQgziBQiemOk6j+QoJmkuZAAQuYAApKFQQm8D+jpGyQgNAZgNAZQinFPghGRQgRDIARCCIA2AAQBHAABHgHQBBgGA/gMQCHgYB8gyQAggNAggOQAggPAggRQD+iGCzjxQD6lRBWoSIADApQAEA1ALA9QAlDEBaDPQEiKTLUIBQgHkJgpk/QhCn7h4kSQgfhGgjg3QgxhOgCAEQgDADAqBGQAkA9AqBBQBfCVB7CpQD7FWD2D3QE9E/EQB3IjCyhIAHAkQAwDqBSDXQBvEnCYDXQBdCBBrBkQANANAOAMQAjAeAjAcQBJA3BPAsEAqvglGIAsAJQA3ANA8AWQC/BHCfCFQH7GogGN4QgGN2ACY7QABMeADJsEAh1gn6IFoLaIiMLaIEEgKIB+n0IBKkiEAh1gn6Ih0GwEArDgUiIAKgCQANgBAOAGQAtARAlBLQB1DwgGLVUgAKASHgAKAhSEAhbgI1QgVAYgcASQARAKASAJQAHgdAHgggEAiBgMaQAOAkAAAuQAABZg0A6QAWhlAQiAgAaKN9QAXB5AcBHIAKAHQANAGAPgDQAwgIAzhgQClk0CKwrATZ+JQgBgGgBgGQgMhHgMhIAYduSIADD/QAFE3AMEYQAdKHA8E6InMHrIgqAtQgOARgOAWQhNBzggCbQhoHyF2LPEgrgglQQg6gRhXAUQivAmiSC0QjND9h2H0QiTJygEPTQgGb1gHMFQgEGCgDAeEguegaAIB+AlIEcBTIC0KeEgiSgoOIlohuIkBJxIijGLIBmFDICUHTIFeBuEgiSgoOIlyQGEgiSgoOICSGUA+TohQgNilgCiZQg8A2AABfQAABqBLA/gA3gyMIAQDzQAQEsAAEZQgCLUhvF8QgaBaghBHQgyiZg8jwQiPo3gqn+A+itfQgBhvAFhpEgtEgSqIgHAEQgIAGgKAPQgdAugYBsQhOFWAGMyQAHMzgcStQgOJXgPGzA6bKPIBqBtIHRHgIAUAPQAaAWAZAeQALAOALAQIFhFsIYhAUIEVkoAxgTcIBdBhQBABaAnCCQCPHokHNY");
	this.shape_1.setTransform(462.4791,345.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFDF1").s().p("EgRMAroIAMkIQEHtYiPnoQgniCg/haIFgFsIYhAUIEVkoIkVEoI4hgUIlglsIgXgeQgZgegagWIgUgPInRngQBvl8ACrUQAAkZgQksIgQjzIg7gwQD+iGCzjxQD6lRBWoSIADApQAEA1ALA9QAlDEBaDPQEiKTLUIBQgHkJgpk/QhCn7h4kSQBfCVB7CpQD7FWD2D3QE9E/EQB3IjCyhIAHAkQAwDqBSDXQBvEnCZDXIhNAUIADD/QAFE3AMEYQAdKHA8E5InMHsIgqAtQgOARgOAWQhNBzggCbQhoHyF2LPIAOD+gADcgtQgGAqhGAEQBGgEAGgqIABgHQAAgthAhVQBABVAAAtIgBAHg");
	this.shape_2.setTransform(466.8625,383.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#AEFFFF").s().p("Eg6gAxdQADgeAEmCQAHsFAG71QAEvTCTpyQB2n0DNj9QCSi0CvgmQBXgUA6ARIgbFFIijGLIBmFDIgMCTIgHAEQgIAGgKAPQgdAugYBsQhOFWAGMyQAHMzgcStQgOJXgPGzgEAuVAvbUAAKghSAAKgSHQAGrVh1jwQglhLgtgRQgOgGgNABIgKACIAcgsIgMj2IBKkiIhKEiIgZobIgLjnIAsAJQA3ANA8AWQC/BHCfCFQH7GogGN4QgGN2ACY7QABMeADJsgEAsJgfKIhPiVgAbHREIgKgHQgchHgXh6Qg8k5gdqHQgMkYgFk3IgDj/IBMgUQBdCBBrBkIAbAZQAjAeAjAcIDjDuQiKQrilE0QgzBggwAIIgKABQgJAAgJgEgA7aIUIA/B7Ig/h7QiPo3gqn+QgNilgCiaQgBhuAFhpQCHgYB8gyQAggNAggOQAggPAggRQggARggAPQggAOggANQh8AyiHAYQg/AMhBAGQhHAHhHAAIg2AAQgRiCARjIQAhmRCnlPIAagyQDpmyG8j+QJKlQOYAAQOZAAIJGkQE6D+CeGOQAzCBAjCQQBmGkguH5QgHBEgHA+QgQCAgWBlQgVAYgcASQhPgshJg3Ikpk4QiYjXhvknQhSjXgwjqIgHgkIgCgMIgYiPIAYCPIACAMIDCShQkQh3k9k/Qj2j3j7lWQh7iphfiVQgfhGgjg3QgxhOgCAEQgDADAqBGQAkA9AqBBQB4ESBCH7QApE/AHEJQrUoBkiqTQhajPgljEQgLg9gEg1IgDgpQhWISj6FRQizDxj+CGIA7AwIAQDzQAQEsAAEZQgCLUhvF8IhqhtIBqBtQgaBaghBHQgyiZg8jwgA7aIUgAdMqoIgbgZQhrhkhdiBIEpE4QgjgcgjgegAZpumg");
	this.shape_3.setTransform(462.4791,345.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(72));

	// background
	this.instance_7 = new lib.Bitmap7();
	this.instance_7.setTransform(-1010,-32,1.4023,1.4023);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(72));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-530,288,1763.8,855.2);
// library properties:
lib.properties = {
	id: 'FAA3AA5BFB804EECA2C0B42599B5A915',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Untitled_1_atlas_1.png", id:"Untitled_1_atlas_1"},
		{src:"sounds/kingdragonsendshisregardswav.mp3", id:"kingdragonsendshisregardswav"}
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
an.compositions['FAA3AA5BFB804EECA2C0B42599B5A915'] = {
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