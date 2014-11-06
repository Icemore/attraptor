AT.processMouseMove = function(event) {
    var hw = window.innerWidth / 2;
    var hh = window.innerHeight / 2;
    AT.relativeMouseX = (event.clientX - hw) / hw;
    AT.relativeMouseY = (event.clientY - hh) / hh;
};