demos.crank = {};
demos.crank.initWorld = function(world) {
	var ground = world.m_groundBody;

	// Define crank.

	var sd = new b2PolygonDef();
    sd.SetAsBox(5, 25);
    sd.density = 1.0;

	var bd = new b2BodyDef();
	
	

	var prevBody = ground;

	bd.position.Set(500/2, 210);

	var body = world.CreateBody(bd);
	body.CreateShape(sd);
	body.SetMassFromShapes();

	var rjd = new b2RevoluteJointDef();
	rjd.Initialize(prevBody , body , new b2Vec2(500/2,235));
	rjd.motorSpeed = - 1.0 * Math.PI;
	rjd.motorTorque = 5000000.0;
	rjd.enableMotor = true;
	world.CreateJoint(rjd);

	prevBody = body;

	// Define follower.
	sd.SetAsBox(5, 45);
	bd.position.Set(500/2, 140);
	body = world.CreateBody(bd);
	body.CreateShape(sd);
	body.SetMassFromShapes();

	rjd.Initialize(prevBody , body , new b2Vec2(500/2 ,185));
	rjd.enableMotor = false;
	world.CreateJoint(rjd);

	prevBody = body;

	// Define piston
	sd.SetAsBox(20, 20);
	bd.position.Set(500/2, 95);
	body = world.CreateBody(bd);
	body.CreateShape(sd);
	body.SetMassFromShapes();

	rjd.Initialize(prevBody , body , new b2Vec2(500/2 ,95));
	world.CreateJoint(rjd);

	var pjd = new b2PrismaticJointDef();
	pjd.Initialize(ground , body , new b2Vec2(500/2 ,95) ,new b2Vec2(0.0 ,1.0));
	pjd.motorSpeed = 0.0; // joint friction
	pjd.maxMotorForce = 100000.0;
	pjd.enableMotor = true;
	world.CreateJoint(pjd);
	
	
	// Create a payload
	sd.density = 2.0;
	bd.position.Set(500/2, 10);
	body = world.CreateBody(bd);
	body.CreateShape(sd);
	body.SetMassFromShapes();
}
demos.InitWorlds.push(demos.crank.initWorld);
