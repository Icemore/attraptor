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

AT.world = function() {
    AT.attraptor = AT.getAttraptor();
    AT.scene.add(AT.attraptor);

    //AT.scene.add(AT.getSpaceSphere());

    AT.setUpLight();
};