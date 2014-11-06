AT.getAttraptor = function() {
    var geometry = new THREE.CylinderGeometry(0, 60, 60, 4, false);
    var material = new THREE.MeshLambertMaterial({ color: 0xFF0000, wireframe:true });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
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
        new THREE.Vector3(0, -40, 40)
    ]);};

AT.getTube = function(config) {
    AT.tube = new THREE.TubeGeometry(config.path, config.segments, 2, config.radiusSegments, config.closed);

    var transparent = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: false,
        side: THREE.doubleSided
    });

    var tubeMesh = THREE.SceneUtils.createMultiMaterialObject(AT.tube, [transparent]);

    tubeMesh.scale.set(AT.scale, AT.scale, AT.scale);
    return tubeMesh;
};

AT.world = function() {
    AT.attraptor = AT.getAttraptor();
    AT.attraptor.add(AT.atrCam);
    AT.atrCam.position.set(0,0,200);
    AT.scene.add(AT.attraptor);

    AT.tubeMesh = AT.getTube({
        path: AT.getPath(),
        segments: 400,
        radiusSegments: 12,
        closed: true
    });

    AT.scene.add(AT.tubeMesh);

    AT.setUpLight();
};