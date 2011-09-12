demos.top = {};

demos.top.createBall = function(world, x, y, rad, fixed) {
	var bodyDef = new b2BodyDef();
        bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var shapeDef = new b2CircleDef();
	if (!fixed) shapeDef.density = 1.0;
	shapeDef.radius = rad || 10;
	shapeDef.restitution = 0.2;
	body.CreateShape(shapeDef);
	body.SetMassFromShapes();
	return body;
};
demos.top.createPoly = function(world, x, y, points, fixed) {
	var polySd = new b2PolygonDef();
	if (!fixed) polySd.density = 1.0;
	polySd.vertexCount = points.length;
	for (var i = 0; i < points.length; i++) {
		polySd.vertices[i].Set(points[i][0], points[i][1]);
	}
	var polyBd = new b2BodyDef();
	polyBd.position.Set(x,y);
	var body = world.CreateBody(polyBd);
	body.CreateShape(polySd);
	body.SetMassFromShapes();
	return body;
};

demos.top.initWorld = function(world) {
	demos.top.createBall(world, 350, 100, 50, true);
	demos.top.createPoly(world, 100, 100, [[0, 0], [10, 30], [-10, 30]], true);
	demos.top.createPoly(world, 150, 150, [[0, 0], [10, 30], [-10, 30]], true);
	var pendulum = createBox(world, 150, 100, 20, 20, false);
	var seesaw = demos.top.createPoly(world, 300, 200, [[0, 0], [100, 30], [-100, 30]] , false);
	
	var jointDef = new b2RevoluteJointDef();
	jointDef.Initialize(pendulum , world.GetGroundBody() , pendulum.m_xf.position);
	world.CreateJoint(jointDef);
	
	var jointDef = new b2RevoluteJointDef();
	jointDef.Initialize(seesaw , world.GetGroundBody() , seesaw.m_xf.position);
	world.CreateJoint(jointDef);

};
demos.InitWorlds.push(demos.top);


