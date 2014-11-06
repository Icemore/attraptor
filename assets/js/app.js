$(document).ready(function() {
    AT.init();
    AT.world();


    $('#toggle-cam-btn').click(function() { AT.toggleCamera(); });
    AT.render();
});