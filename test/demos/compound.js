demos.compound = {};
demos.compound.createCompoundBall = function(world, x, y) {
	var result = [];
	var ballSd1 = new b2CircleDef();
	ballSd1.density = 1.0;
	ballSd1.radius = 20;
	ballSd1.restitution = 0.2;

	var ballSd2 = new b2CircleDef();
	ballSd2.density = 1.0;
	ballSd2.radius = 20;
	ballSd2.restitution = 0.2;

	var ballBd = new b2BodyDef();

	ballBd.position.Set(x - 20 , y);
	result.push(createBody(world , ballBd , ballSd1));
	ballBd.position.Set(x + 20 , y);
	result.push(createBody(world , ballBd , ballSd2));
	return result;
}

demos.compound.createCompoundPoly = function(world, x, y) {
	var points = [[-30, 0], [0, 15] , [30, 0] , [0, 30]];
	var polySd = new b2PolygonDef();
	polySd.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd.vertices[i].Set(points[i][0], points[i][1]);
	}
	polySd.density = 1.0;
	var polyBd = new b2BodyDef();
	polyBd.position.Set(x,y);
	return createBody(world , polyBd , polySd);
}

demos.compound.initWorld = function(world) {
	var i;
	for (i = 1; i <= 4; i++) {
		demos.compound.createCompoundPoly(world, 150 + 3 * Math.random(), 40 * i);
	}
	for (i = 1; i <= 4; i++) {
		demos.compound.createCompoundBall(world, 350 + 3 * Math.random(), 45 * i);
	}
}
demos.InitWorlds.push(demos.compound.initWorld);


