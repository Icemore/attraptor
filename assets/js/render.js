AT.moveSpheres = function() {
    for (var i = 0; i < AT.sphereCount; ++i) {
        var sphere = AT.spheres[i];
        sphere.position.z += AT.speed;
        if (sphere.position.z > AT.finishZ) {
            sphere.position.z -= AT.finishZ;
            AT.generateXY(sphere);
        }
    }
};


AT.render = function() {
    requestAnimationFrame(AT.render);

    AT.moveSpheres();

    AT.cylinder.rotation.z += 0.01;
    AT.cylinder.rotation.y += 0.1;
    AT.renderer.render(AT.scene, AT.camera);
};