AT.render = function() {
    requestAnimationFrame(AT.render);
    AT.cylinder.rotation.z += 0.01;
    AT.cylinder.rotation.y += 0.1;
    AT.renderer.render(AT.scene, AT.camera);
};