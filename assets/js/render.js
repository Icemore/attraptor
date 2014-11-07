var AT = AT || {};

AT.moveObjects = function(objs, tag, deleted, speed, rc, gc, bc) {
    var todel = [];

    for (var i = 0; i < objs[tag].length; ++i) {
        var obj = objs[tag][i];

        obj.position.z += speed * AT.speedCoef;
        if (obj.position.z > AT.finishZ) {
            obj.position.z -= AT.finishZ;
            AT.generateXY(obj);

            if(deleted === true) {
                AT.objects[tag].push(obj);
                AT.scene.add(obj);
                todel.push(obj);
            }
        }

        var value = 1 - ((AT.finishZ - obj.position.z) / AT.far());
        var color = obj.material.color;
        color.r = value * rc;
        color.g = value * gc;
        color.b = value * bc;
    }

    for(var i = 0; i < todel.length; ++i) {
        var idx = objs[tag].indexOf(todel[i]);
        objs[tag].splice(idx, 1);
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

AT.interact = (function() {
    var firstCall = true;
    return function() {
        if(firstCall) {
            firstCall = false;
            return;
        }

        AT.game.handleInteractions();

        var oldAttr = AT.cube;
        var newAttr = AT.getAttraptor();

        AT.scene.remove(oldAttr);
        AT.scene.add(newAttr);

        AT.cube = newAttr;
        AT.cube.rotation.z = oldAttr.rotation.z;
        AT.cube.rotation.y = oldAttr.rotation.y;
    }
})();

AT.render = function() {
    if (!AT.ended) {
        requestAnimationFrame(AT.render);
    } else {
        $(document).trigger('game-ended');
    }
    AT.speedCoef = AT.speedCoef * 1.0001;

    AT.interact();
    AT.moveCamera();
    AT.rotateAttractor();

    if (AT.freq != 0)
        AT.speed = AT.speed + (AT.freq - AT.speed * 7) / 7;

    AT.moveObjects(AT.objects, 'asteroids', false, AT.speed, 1, 0.7, 0);
    AT.moveObjects(AT.objects, 'good', false, AT.speed * 1.5, 0, 1, 0);
    AT.moveObjects(AT.objects, 'bad', false, AT.speed * 1.5, 1, 0, 0);
    AT.moveObjects(AT.deletedObjects, 'asteroids', true, AT.speed, 1, 1, 1);
    AT.moveObjects(AT.deletedObjects, 'good', true, AT.speed * 1.5, 0, 1, 0);
    AT.moveObjects(AT.deletedObjects, 'bad', true, AT.speed * 1.5, 1, 0, 0);

    AT.updateScores();

    AT.renderer.render(AT.scene, AT.camera);
};