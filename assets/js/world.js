AT.getCylinder = function() {
    var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xfffff , wireframe: true});
    return new THREE.Mesh(geometry, material);
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


AT.speed = 10;
AT.startZ = 0;
AT.finishZ = 3000;
AT.sphereCount = 200;
AT.radius = 50;
AT.segments = 10;

AT.far = function() {
    return AT.finishZ - AT.startZ;
};

AT.generateXY = function(obj) {
    if (Math.random() < 0.95) {
        obj.position.x = Math.random() * 10000 - 5000;
        obj.position.y = Math.random() * 10000 - 5000;
    } else {
        obj.position.x = AT.camera.position.x + Math.random() * 200 - 100;
        obj.position.y = AT.camera.position.y + Math.random() * 200 - 100;
    }
};

AT.createSpheres = function() {
    AT.spheres = new Array();

    for (var i = 0; i < AT.sphereCount; ++i) {
        var material = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
        var geometry = new THREE.CircleGeometry(AT.radius, AT.segments);
        var sphere = new THREE.Mesh(geometry, material);

        sphere.position.z = AT.startZ + Math.random() * AT.far() / 1.3;
        AT.generateXY(sphere);

        AT.spheres[i] = sphere;
        AT.scene.add(sphere)
    }
};


AT.world = function() {
    AT.cylinder = AT.getCylinder();
    AT.scene.add(AT.cylinder);

    AT.scene.add(AT.getSpaceSphere());

    AT.createSpheres();

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.intensity = 2;
    AT.scene.add(spotLight);

    var spotLight2 = new THREE.SpotLight(0x5192e9);
    spotLight2.position.set(40, -60, 30);
    spotLight2.intensity = 1.5;
    AT.scene.add(spotLight2);
};