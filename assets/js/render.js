AT.moveSpheres = function() {
    for (var i = 0; i < AT.sphereCount; ++i) {
        var sphere = AT.spheres[i];
        sphere.position.z += AT.speed;
        if (sphere.position.z > AT.finishZ) {
            sphere.position.z -= AT.finishZ;
            AT.generateXY(sphere);
        }
        sphere.material.color.r = 1 - ((AT.finishZ - sphere.position.z) / AT.far());
        sphere.material.color.g = 1 - ((AT.finishZ - sphere.position.z) / AT.far());
        sphere.material.color.b = 1 - ((AT.finishZ - sphere.position.z) / AT.far());
    }
};

AT.moveCamera = function() {
    AT.camera.position.x = AT.relativeMouseX * 700;
    AT.camera.position.y = AT.relativeMouseY * 700;
    AT.cube.position.x = AT.camera.position.x;
    AT.cube.position.y = AT.camera.position.y;
    AT.camera.position.y += AT.attraptorSize;
};

AT.rotateAttractor = function() {
    AT.cube.rotation.z += 0.02;
    AT.cube.rotation.y += 0.02;
};

AT.render = function() {
    requestAnimationFrame(AT.render);

    AT.moveCamera();
    AT.moveSpheres();
    AT.rotateAttractor();

    AT.game.processCollision()

    AT.renderer.render(AT.scene, AT.camera);
};