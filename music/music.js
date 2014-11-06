AT.Music = {};

AT.Music.audio = new Audio();
AT.Music.audioSrc = "sample.mp3";
AT.Music.audioCtx = null;
AT.Music.analyser = null;
AT.Music.audioBuf = null;
AT.Music.setup = false;
AT.Music.N = 2048;
AT.freq = 0;

AT.Music.init = function() {
    console.log("init music");
    try {
        this.audioCtx = new webkitAudioContext();
        this.loadFile();
        var loopy_loop = function() {
            AT.Music.onTick();
            requestAnimationFrame(loopy_loop)
        };
        requestAnimationFrame(loopy_loop);
    } catch(e) {
        alert('You need web audio support.' + e);
    }
};

AT.Music.onTick = function() {
    if (!AT.Music.setup) {
        return;
    }
    if (!AT.Music.analyser)
    console.log("tick");
    var data = new Uint8Array(1);
    AT.Music.analyser.getByteFrequencyData(data);
    AT.freq = data[0];
    console.log(data[0]);
};

AT.Music.loadFile = function() {
    var req = new XMLHttpRequest();
    req.open("GET",AT.Music.audioSrc,true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        AT.Music.audioCtx.decodeAudioData(req.response, function(buffer) {
            AT.Music.audioBuf = buffer;
            AT.Music.play();
        });
    };
    req.send();
};

AT.Music.play = function() {
    var src = this.audioCtx.createBufferSource();
    src.buffer = this.audioBuf;

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = this.N;

    src.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    console.log(src.noteOn);
    src.start();
    this.setup = true;
};

$(function() {
    AT.Music.init();
});