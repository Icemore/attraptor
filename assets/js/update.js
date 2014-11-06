AT.update = function(delta) {
    AT.controls.update();

    // Try Animate Camera Along Spline
    var time = AT.nowMsec;
    var looptime = 20 * 1000;
    var t = ( time % looptime ) / looptime;

    var pos = AT.tube.parameters.path.getPointAt(t);
    pos.multiplyScalar(AT.scale);

    // interpolation
    var segments = AT.tube.tangents.length;
    var pickt = t * segments;
    var pick = Math.floor(pickt);
    var pickNext = ( pick + 1 ) % segments;

    AT.binormal.subVectors(AT.tube.binormals[pickNext], AT.tube.binormals[pick]);
    AT.binormal.multiplyScalar(pickt - pick).add(AT.tube.binormals[pick]);
    var dir = AT.tube.parameters.path.getTangentAt(t);
    var offset = 15;
    AT.normal.copy(AT.binormal).cross(dir);

    // We move on a offset on its binormal
    pos.add(AT.normal.clone().multiplyScalar(offset));

    AT.atrCam.position.copy(pos);

    var lookAt = AT.tube.parameters.path.getPointAt((t + 30 / AT.tube.parameters.path.getLength() ) % 1).multiplyScalar(AT.scale);
    AT.atrCam.matrix.lookAt(AT.atrCam.position, lookAt, AT.normal);
    AT.atrCam.rotation.setFromRotationMatrix(AT.atrCam.matrix, AT.atrCam.rotation.order);
};
