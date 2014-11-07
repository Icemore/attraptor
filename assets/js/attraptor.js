var AT = AT || {};

AT.attraptor = {};

AT.attraptor.init = function() {
    AT.attraptor.models = {};

    var karma_range = AT.game.maxKarma - AT.game.minKarma;
    var health_range = AT.game.maxHealth - AT.game.minHealth;
    for(var k = AT.game.minKarma; k <= AT.game.maxKarma; ++k) {
        for(var h = AT.game.minHealth; h <= AT.game.maxHealth; ++h) {
            var nk = (k - AT.game.minKarma) / karma_range;
            var nh = (h - AT.game.minHealth) / health_range;

            AT.attraptor.models[[k, h]] = this.generateAttraptor(nk, nh);
        }
    }
};

AT.attraptor.generateAttraptor = function(karma, health) {
    var params = {};
    params.a = 5; params.b = 15; params.c = 0.8;
    params.interval = 0.05;
    params.point_size = 0.5;
    params.iterations = 1000 * (5 * (1 - health) + 100 * (health));
    params.scale = 3;

    var min_coef = 0.1, max_coef = 0.6;
    params.red_range_coef = min_coef * (1 - karma) + max_coef * karma;
    params.green_range_coef = min_coef * karma + (1 - karma) * max_coef;
    params.blue_range_coef = 1;

    return this.createAttraptorByParams(params);
};

AT.attraptor.createAttraptorByParams = function(params) {
    var particles = params.iterations;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);

    var color = new THREE.Color();

    var x        = 0.1, y = 0.1, z = 0.1,
        a        = params.a, b = params.b, c = params.c,
        newX     = x, newY = y, newZ = z,
        interval = params.interval,
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

    var rangeX = (maxX - minX) * params.red_range_coef;
    var rangeY = (maxY - minY) * params.green_range_coef;
    var rangeZ = (maxZ - minZ) * params.blue_range_coef;

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
    geometry.computeBoundingBox();


    var material = new THREE.PointCloudMaterial({size: params.point_size, vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending, transparent: true, depthTest: false});
    var attraptor = new THREE.PointCloud(geometry, material);
    attraptor.scale.set(params.scale, params.scale, params.scale);

    return attraptor;
};

AT.attraptor.boxToPoints = function(box) {
    var points = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
    ];

    // NOTE: I am using a binary pattern to specify all 2^3 combinations below
    points[0].set(box.min.x, box.min.y, box.min.z); // 000
    points[1].set(box.min.x, box.min.y, box.max.z); // 001
    points[2].set(box.min.x, box.max.y, box.min.z); // 010
    points[3].set(box.min.x, box.max.y, box.max.z); // 011
    points[4].set(box.max.x, box.min.y, box.min.z); // 100
    points[5].set(box.max.x, box.min.y, box.max.z); // 101
    points[6].set(box.max.x, box.max.y, box.min.z); // 110
    points[7].set(box.max.x, box.max.y, box.max.z);  // 111

    return points;
};

AT.attraptor.intersects = function(attr, collidableMeshList) {
    var box = attr.geometry.boundingBox;
    var originPoint = attr.position.clone();

    var points = this.boxToPoints(box);
    //var result = [];
    for(var vertexIndex = 0; vertexIndex < points.length; vertexIndex++) {
		var localVertex = points[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4(attr.matrix);
		var directionVector = globalVertex.sub(attr.position);

		var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
		var collisionResults = ray.intersectObjects(collidableMeshList);


        //result.concat(collisionResults.filter(function(val){return val.distance < directionVector.length()}));
		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
            return true;
	}

    return false;
}
