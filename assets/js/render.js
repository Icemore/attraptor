AT.render = function() {
    requestAnimationFrame(AT.render);

    AT.lastMsec = AT.nowMsec;
    AT.nowMsec = window.performance.now();
    var delta = AT.nowMsec - AT.lastMsec;
    AT.update(delta);

    AT.renderer.render(AT.scene, AT.camera);
};