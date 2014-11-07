var AT = AT || {};

AT.speed = 10;
AT.startZ = 0;
AT.finishZ = 3000;
AT.sphereCount = 200;
AT.radius = 70;
AT.segments = 10;
AT.attraptorSize = 50;

AT.randomRadius = function() {
    return AT.radius * (0.5 + Math.random());
};

AT.far = function() {
    return AT.finishZ - AT.startZ;
};

AT.generateXY = function(obj) {
    if (Math.random() < 0.95) {
        obj.position.x = Math.random() * 10000 - 5000;
        obj.position.y = Math.random() * 10000 - 5000;
    } else {
        obj.position.x = AT.camera.position.x + Math.random() * 1000 - 500;
        obj.position.y = AT.camera.position.y + Math.random() * 1000 - 500;
    }
};

AT.generateZ = function(obj) {
    obj.position.z = AT.startZ + Math.random() * AT.far() / 1.3;
};

AT.createAsteroid = function() {
    var material = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
    var geometry = new THREE.CircleGeometry(AT.randomRadius(), AT.segments);
    return new THREE.Mesh(geometry, material);
};

AT.createAsteroids = function() {
    AT.asteroids = new Array();

    for (var i = 0; i < AT.sphereCount; ++i) {
        var asteroid = AT.createAsteroid();
        AT.generateXY(asteroid);
        AT.generateZ(asteroid);

        AT.asteroids[i] = asteroid;
        AT.scene.add(asteroid);
    }
};

AT.getAttraptor = function() {
    var attraptor = AT.game.getAttraptorModel();
    attraptor.position.z = AT.finishZ - 2 * AT.attraptorSize;
    return attraptor;
};

AT.getSpaceSphere = function() {
    //Space background is a large sphere
    var spacetex = THREE.ImageUtils.loadTexture("assets/img/space.jpg");
    var spacesphereGeo = new THREE.SphereGeometry(40, 40, 40);
    var spacesphereMat = new THREE.MeshPhongMaterial();
    spacesphereMat.map = spacetex;

    //spacesphere needs to be double sided as the camera is within the spacesphere
    var spacesphere = new THREE.Mesh(spacesphereGeo, spacesphereMat);
    spacesphere.material.side = THREE.DoubleSide;
    spacesphere.material.map.wrapS = THREE.RepeatWrapping;
    spacesphere.material.map.wrapT = THREE.RepeatWrapping;
    spacesphere.material.map.repeat.set(5, 3);

    return spacesphere;
};

AT.world = function() {
    AT.cube = AT.getAttraptor();
    AT.scene.add(AT.cube);

    //AT.scene.add(AT.getSpaceSphere());

    //var spotLight = new THREE.SpotLight(0xffffff);
    //spotLight.position.set(-40, 60, -10);
    //spotLight.intensity = 2;
    //AT.scene.add(spotLight);
    //
    //var spotLight2 = new THREE.SpotLight(0x5192e9);
    //spotLight2.position.set(40, -60, 30);
    //spotLight2.intensity = 1.5;
    //AT.scene.add(spotLight2);

    AT.createAsteroids();
    AT.game.setObjects(AT.asteroids);
};