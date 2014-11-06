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
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 1 );
    AT.scene.add( light );
};

AT.getPath = function() {
    return new THREE.ClosedSplineCurve3([
        new THREE.Vector3(0, -40, -40),
        new THREE.Vector3(0, 40, -40),
        new THREE.Vector3(0, 140, -40),
        new THREE.Vector3(0, 40, 40),
        new THREE.Vector3(0, -40, 40),
    ]);};

AT.getTube = function(config) {
    var tube = new THREE.TubeGeometry(config.path, config.segments, 2, config.radiusSegments, config.closed);

    var tubeMesh = THREE.SceneUtils.createMultiMaterialObject(tube, [
        new THREE.MeshLambertMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
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
        radiusSegments: 12,
        closed: true,
        scale: 4
    });

    AT.scene.add(AT.tube);

    AT.setUpLight();
};