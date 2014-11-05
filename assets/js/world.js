AT.world = function() {
    var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xfffff , wireframe: true});
    AT.cylinder = new THREE.Mesh(geometry, material);
    AT.scene.add(AT.cylinder);
};