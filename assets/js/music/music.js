AT.Music = {};

AT.Music.source = null;
AT.Music.context = null;
AT.Music.analyser = null;
AT.Music.buffer = null;
AT.Music.setup = false;
AT.Music.N = 64;
AT.freq = 0.1;

AT.Music.init = function() {
    console.log("init music");
    try {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
        this.context = new webkitAudioContext();
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
    var data = new Uint8Array(1);
    AT.Music.analyser.getByteFrequencyData(data);
    AT.freq = data[0];
};

AT.Music.play = function(arraybuffer) {
    AT.Music.context.decodeAudioData(arraybuffer, function (buf) {
        AT.Music.source = AT.Music.context.createBufferSource();
        AT.Music.source.connect(AT.Music.context.destination);
        AT.Music.source.buffer = buf;

        AT.Music.analyser = AT.Music.context.createAnalyser();
        AT.Music.source.connect(AT.Music.analyser);

        AT.Music.source.start(0);
        AT.Music.setup = true;
    });
};

AT.Music.loadAndPlay = function(file) {
    var freader = new FileReader();

    freader.onload = function (e) {
        AT.Music.play(e.target.result);
    };
    freader.readAsArrayBuffer(file);
};

function handleFileSelect(evt) {
    var files = evt.target.files;
    if (AT.Music.source) {
        AT.Music.source.stop();
    }
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }

    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    if (files[0].type.indexOf("audio") == 0) {
        AT.Music.loadAndPlay(files[0]);
    } else {
        alert(files[0].name + " is not an audio=(")
    }
}

$(function() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    AT.Music.init();
});