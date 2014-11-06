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

    var sceneCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    sceneCamera.position.z = -600;

    var attraptorCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 10000);
    AT.atrCam = attraptorCamera;
    AT.toggleCamera = function() { AT.camera = (AT.camera === sceneCamera) ? attraptorCamera : sceneCamera; };

    AT.camera = AT.atrCam;

    var controls = new THREE.TrackballControls(sceneCamera);
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

    AT.binormal = new THREE.Vector3();
    AT.normal = new THREE.Vector3();
    AT.scale = 120;
};