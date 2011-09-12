demos.stack = {};
demos.stack.initWorld = function(world) {
	
	var sd = new b2PolygonDef();
    sd.SetAsBox(10, 10);
    sd.density = 1.0;
	sd.friction = 0;

	var bdDef = new b2BodyDef();

	var i;
	for (i = 0; i < 8; i++) {
		bdDef.position.Set(500/2-Math.random()*2-1, (250-5-i*22));
		createBody(world , bdDef , sd);
	}
	for (i = 0; i < 8; i++) {
		bdDef.position.Set(500/2-100-Math.random()*5+i, (250-5-i*22));
		createBody(world , bdDef , sd);
	}
	for (i = 0; i < 8; i++) {
		bdDef.position.Set(500/2+100+Math.random()*5-i, (250-5-i*22));
		createBody(world , bdDef , sd);
	}
}
demos.InitWorlds.push(demos.stack);


