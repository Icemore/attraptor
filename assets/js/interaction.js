var AT = AT || {};

AT.processMouseMove = function(event) {
    var hw = window.innerWidth / 2;
    var hh = window.innerHeight / 2;
    AT.relativeMouseX = (event.clientX - hw) / hw;
    AT.relativeMouseY = (event.clientY - hh) / hh;
};

AT.processKeyDown = function(event) {
    AT.leftRight -= event.keyCode === 37;
    AT.leftRight += event.keyCode === 39;
    AT.topBottom += event.keyCode === 38;
    AT.topBottom -= event.keyCode === 40;
};