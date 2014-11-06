var AT = {};

AT.init = function() {
    AT.renderer = new THREE.WebGLRenderer({antialiasing: true});
    AT.renderer.setClearColor( 0xf0f0f0 );
    AT.renderer.setSize(window.innerWidth, window.innerHeight);
    AT.renderer.physicallyBasedShading = true;
    AT.renderer.domElement.style.position = 'absolute';
    AT.renderer.domElement.style.left = 0;
    AT.renderer.domElement.style.top = 0;
    AT.renderer.domElement.style.zIndex = -1;
    document.body.appendChild(AT.renderer.domElement);
    $(AT.renderer.domElement).css({webkitFilter:'blur(0px)'});

    AT.scene = new THREE.Scene();

    AT.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    AT.camera.position.z = -600;

    var controls = new THREE.TrackballControls(AT.camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    AT.controls = controls;

    new THREEx.WindowResize(AT.renderer, AT.camera);
};