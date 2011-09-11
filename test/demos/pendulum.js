demos.pendulum = {};
demos.pendulum.initWorld = function(world) {
	var i;
	var ground = world.GetGroundBody();
	var jointDef = new b2RevoluteJointDef();
	var L = 150;
	for (i = 0; i < 4; i++) {
		jointDef.Initialize(ground , createBall(world, 250 + 40 * i, 200) , new b2Vec2(250 + 40 * i,200 - L));
		world.CreateJoint(jointDef);
	}

	jointDef.Initialize(ground , createBall(world, 250 - 40 - L, 200 - L) , new b2Vec2(250 - 40,200 - L));
	world.CreateJoint(jointDef);
}
demos.InitWorlds.push(demos.pendulum.initWorld);


