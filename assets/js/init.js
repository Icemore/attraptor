var AT = AT || {};

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

    AT.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, AT.far());
    AT.camera.position.z = AT.finishZ;
    AT.camera.position.y += AT.attraptorSize;
    new THREEx.WindowResize(AT.renderer, AT.camera);

    AT.game.init();

    document.addEventListener('mousemove', AT.processMouseMove);
    document.addEventListener('keydown', AT.processKeyDown);
};