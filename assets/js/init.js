var AT = {};

AT.init = function() {
    AT.renderer = new THREE.WebGLRenderer({antialiasing: true});
    AT.renderer.setSize(window.innerWidth, window.innerHeight);
    AT.renderer.physicallyBasedShading = true;
    AT.renderer.domElement.style.position = 'absolute';
    AT.renderer.domElement.style.left = 0;
    AT.renderer.domElement.style.top = 0;
    AT.renderer.domElement.style.zIndex = -1;
    document.body.appendChild(AT.renderer.domElement);
    $(AT.renderer.domElement).css({webkitFilter:'blur(0px)'});

    AT.scene = new THREE.Scene();

    AT.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    new THREEx.WindowResize(AT.renderer, AT.camera);
};

AT.world = function() {
    var geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xfffff , wireframe: true});
    AT.cylinder = new THREE.Mesh(geometry, material);
    AT.scene.add(AT.cylinder);
};

AT.render = function() {
    requestAnimationFrame(AT.render);
    AT.cylinder.rotation.z += 0.01;
    AT.cylinder.rotation.y += 0.1;
    AT.renderer.render(AT.scene, AT.camera);
};

$(document).ready(function() {
    AT.init();
    AT.world();

    AT.camera.position.z = 20;
    AT.render();
});