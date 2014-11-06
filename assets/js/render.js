AT.render = function() {
    requestAnimationFrame(AT.render);

    AT.lastMsec = AT.nowMsec;
    AT.nowMsec = window.performance.now();
    var delta = AT.nowMsec - AT.lastMsec;

    AT.update(delta);

    AT.cylinder.rotation.z += 0.01;
    AT.cylinder.rotation.y += 0.1;
    AT.renderer.render(AT.scene, AT.camera);
};