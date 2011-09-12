demos.compound = {};
demos.compound.createCompoundBall = function(world, x, y) {
	var ballSd1 = new b2CircleDef();
	ballSd1.density = 2.0;
	ballSd1.radius = 20;
	ballSd1.localPosition.Set(- 40.0 ,0);

	var ballSd2 = new b2CircleDef();
	ballSd2.density = 2.0;
	ballSd2.radius = 20;
	ballSd1.localPosition.Set( 40.0 ,0);

	var ballBd = new b2BodyDef();

	ballBd.position.Set(x , y);

	return createBody(world , ballBd , [ballSd1,ballSd2]);
}

demos.compound.createCompoundPoly = function(world, x, y) {
	var points = [[0, 0], [0, 30], [- 60, 60]] , m_physScale = 1.0;

	var polySd1= new b2PolygonDef();
	polySd1.SetAsBox(7.5/m_physScale, 15.0/m_physScale);
	polySd1.density = 2.0;
	
	var polySd2 = new b2PolygonDef();
	polySd2.SetAsOrientedBox(7.5/m_physScale, 15.0/m_physScale, new b2Vec2(0.0, -15.0/m_physScale), 0.5 * Math.PI);
	polySd2.density = 2.0;

	var polyBd = new b2BodyDef();
	polyBd.position.Set(x,y);
	return createBody(world , polyBd ,  [polySd1,polySd2]);
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


