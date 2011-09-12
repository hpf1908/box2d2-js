function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.lowerBound.Set(-10000.0, -10000.0);
	worldAABB.upperBound.Set(10000.0, 10000.0);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	createBox(world, 0, 125, 10, 250);
	createBox(world, 500, 125, 10, 250);
	return world;
}

function createGround(world) {
    var bodyDef = new b2BodyDef();
    bodyDef.position.Set(-500, 340);
    var body = world.CreateBody(bodyDef);
    var shapeDef = new b2PolygonDef();
    shapeDef.SetAsBox(1000, 50);
    shapeDef.restitution =  0.2;
    body.CreateShape(shapeDef);
    body.SetMassFromShapes();
	return body;
}

function createBall(world, x, y) {
	var bodyDef = new b2BodyDef();
        bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var shapeDef = new b2CircleDef();
	shapeDef.radius = 20;
	shapeDef.restitution = 1.0;
	shapeDef.density = 1.0;
	shapeDef.friction = 0;
	body.CreateShape(shapeDef);
	body.SetMassFromShapes();
	return body;
}

function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
    var bodyDef = new b2BodyDef();
    bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var shapeDef = new b2PolygonDef();
    shapeDef.SetAsBox(width, height);
    if (!fixed) shapeDef.density = 1.0;
    body.CreateShape(shapeDef);
    body.SetMassFromShapes();
	return body;
}

function createBody(world, bd, sd ) {
	var body = world.CreateBody(bd);
	if(Object.prototype.toString.apply(sd) === '[object Array]') {
		for(var i = 0 ; i <sd.length; i ++) {
			body.CreateShape(sd[i]);
		}
	}else
		body.CreateShape(sd);
    body.SetMassFromShapes();
	return body;
}

var demos = {};
demos.InitWorlds = [];
