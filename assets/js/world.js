AT.getAttraptor = function() {
    var geometry = new THREE.CubeGeometry(100, 100, 10);
    var material = new THREE.MeshBasicMaterial( { color: 0xaaaaff, wireframe: true } );
    return new THREE.Mesh(geometry, material);
};

AT.getSpaceSphere = function() {

    //Space background is a large sphere
    var spacetex = THREE.ImageUtils.loadTexture("assets/img/space.jpg");
    var spacesphereGeo = new THREE.SphereGeometry(100, 40, 40);
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

AT.setUpLight = function() {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.intensity = 2;
    AT.scene.add(spotLight);

    var spotLight2 = new THREE.SpotLight(0x5192e9);
    spotLight2.position.set(40, -60, 30);
    spotLight2.intensity = 1.5;
    AT.scene.add(spotLight2);
};

AT.getPath = function() {
    return new THREE.SplineCurve3([
        new THREE.Vector3(0, 10, -10), new THREE.Vector3(10, 0, -10), new THREE.Vector3(20, 0, 0), new THREE.Vector3(30, 0, 10), new THREE.Vector3(30, 0, 20), new THREE.Vector3(20, 0, 30), new THREE.Vector3(10, 0, 30), new THREE.Vector3(0, 0, 30), new THREE.Vector3(-10, 10, 30), new THREE.Vector3(-10, 20, 30), new THREE.Vector3(0, 30, 30), new THREE.Vector3(10, 30, 30), new THREE.Vector3(20, 30, 15), new THREE.Vector3(10, 30, 10), new THREE.Vector3(0, 30, 10), new THREE.Vector3(-10, 20, 10), new THREE.Vector3(-10, 10, 10), new THREE.Vector3(0, 0, 10), new THREE.Vector3(10, -10, 10), new THREE.Vector3(20, -15, 10), new THREE.Vector3(30, -15, 10), new THREE.Vector3(40, -15, 10), new THREE.Vector3(50, -15, 10), new THREE.Vector3(60, 0, 10), new THREE.Vector3(70, 0, 0), new THREE.Vector3(80, 0, 0), new THREE.Vector3(90, 0, 0), new THREE.Vector3(100, 0, 0)]);
};

AT.getTube = function(config) {
    var tube = new THREE.TubeGeometry(config.path, config.segments, 2, config.radiusSegments, config.closed);

    var tubeMesh = THREE.SceneUtils.createMultiMaterialObject(tube, [
        new THREE.MeshLambertMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.3,
            wireframe: true,
            transparent: true
        })]);

    tubeMesh.scale.set(config.scale, config.scale, config.scale);
    return tubeMesh;
};

AT.world = function() {
    AT.attraptor = AT.getAttraptor();
    AT.scene.add(AT.attraptor);

    AT.tube = AT.getTube({
        path: AT.getPath(),
        segments: 400,
        radiusSegments: 3,
        closed: true,
        scale: 4
    });

    AT.scene.add(AT.tube);

    AT.setUpLight();
};