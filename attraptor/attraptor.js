function generateAttraptor() {
    var me = {};
    me.a = 5; me.b = 16; me.c = 1;
    me.interval = 0.005;

    var particles = 500 * 1000;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);

    var color = new THREE.Color();

    var x        = 0.1, y = 0.1, z = 0.1,
        a        = me.a, b = me.b, c = me.c,
        newX     = x, newY = y, newZ = z,
        interval = me.interval,
        minX     = minY = minZ = Number.POSITIVE_INFINITY,
        maxX     = maxY = maxZ = Number.NEGATIVE_INFINITY;

    for (var i = 0; i < positions.length; i += 3) {
        newX = x - (a * x) * interval + (a * y) * interval;
        newY = y + (b * x) * interval - y * interval - (z * x) * interval;
        newZ = z - (c * z) * interval + (x * y) * interval;

        minX = Math.min(minX, newX);
        minY = Math.min(minY, newY);
        minZ = Math.min(minZ, newZ);

        maxX = Math.max(maxX, newX);
        maxY = Math.max(maxY, newY);
        maxZ = Math.max(maxZ, newZ);

        x = newX;
        y = newY;
        z = newZ;

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z - b;
    }

    var rangeX = (maxX - minX) * .5;
    var rangeY = (maxY - minY) * .5;
    var rangeZ = (maxZ - minZ) * .5;

    for (var i = 0; i < positions.length; i += 3) {
        var vx = Math.abs(positions[i] / rangeX);
        var vy = Math.abs(positions[i + 1] / rangeY);
        var vz = Math.abs(positions[i + 2] / rangeZ);

        colors[i] = vx;
        colors[i + 1] = vy;
        colors[i + 2] = vz;
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointCloudMaterial({size: 2, vertexColors: THREE.VertexColors});
    material.blending = THREE.AdditiveBlending;
    material.transparent = true;
    var attraptor = new THREE.PointCloud(geometry, material);
    attraptor.scale.set(30, 30, 30);

    return attraptor;
}