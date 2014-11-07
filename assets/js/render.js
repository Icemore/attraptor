var AT = AT || {};

AT.moveObjects = function(objs, count, speed, rc, gc, bc) {
    for (var i = 0; i < count; ++i) {
        var obj = objs[i];

        obj.position.z += speed;
        if (obj.position.z > AT.finishZ) {
            obj.position.z -= AT.finishZ;
            AT.generateXY(obj);
        }

        var value = 1 - ((AT.finishZ - obj.position.z) / AT.far());
        var color = obj.material.color;
        color.r = value * rc;
        color.g = value * gc;
        color.b = value * bc;
    }
};

AT.moveCamera = function() {
    AT.cube.position.x = AT.relativeMouseX * innerWidth * 1.5;
    AT.cube.position.y = -AT.relativeMouseY * innerHeight * 2;

    AT.camera.position.x = AT.cube.position.x;
    AT.camera.position.y = AT.cube.position.y + AT.attraptorSize;

    AT.leftRight = 0;
    AT.topBottom = 0;
};

AT.rotateAttractor = function() {
    AT.cube.rotation.z += 0.02;
    AT.cube.rotation.y += 0.02;
};

AT.interact = function() {
    AT.game.handleInteractions();

    var oldAttr = AT.cube;
    var newAttr = AT.getAttraptor();

    AT.scene.remove(oldAttr);
    AT.scene.add(newAttr);

    AT.cube = newAttr;
    AT.cube.rotation.z = oldAttr.rotation.z;
    AT.cube.rotation.y = oldAttr.rotation.y;
};

AT.render = function() {
    requestAnimationFrame(AT.render);

    AT.interact();
    AT.moveCamera();
    AT.rotateAttractor();

    if (AT.freq != 0)
        AT.speed = AT.freq / 10;
    AT.moveObjects(AT.asteroids, AT.asteroidCount, AT.speed, 1, 1, 1);
    AT.moveObjects(AT.goods, AT.goodCount, AT.speed * 1.5, 0, 1, 0);
    AT.moveObjects(AT.bads, AT.badCount, AT.speed * 1.5, 1, 0, 0);

    AT.updateScores();

    AT.renderer.render(AT.scene, AT.camera);
};