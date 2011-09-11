var worldAABB;
var _world;
var bigLongShapeDef;
var floorBodyDef;
var floorBody;
var ctx;
var canvasTop;
var canvasLeft;
var canvasWidth;
var canvasHeight;
var pb, pp, pt, pd;

function init(){
    canvasElm = document.getElementById('canvas');
    ctx = canvasElm.getContext("2d");
    //1. 建立一个world
    _world = setupWorld();
    
    //2. 添加物体
    
    createBox(_world, 130, 0, 100, 10); //上
    createBox(_world, 370, 0, 100, 10); //上
    createBox(_world, 130, 300, 100, 10); //下
    createBox(_world, 370, 300, 100, 10); //下
    createBox(_world, 0, 150, 10, 120); //左
    createBox(_world, 500, 150, 10, 120); //右
    createBall(_world, new b2Vec2(200, 150), 10,1);
    createBall(_world, new b2Vec2(220, 165), 10,1);
    createBall(_world, new b2Vec2(220, 135), 10,1);
    player = createBall(_world, new b2Vec2(100, 150), 10,1);
    player.m_linearVelocity = new b2Vec2(0, 0)
	createPoly(_world, 150, 150, [[0, 0], [10, 30], [-10, 30]], false);
    
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    canvasTop = parseInt(canvasElm.offsetTop);
    canvasLeft = parseInt(canvasElm.offsetLeft);
    
    
    
    $(canvasElm).bind('click', function(e){
        var pt = new b2Vec2(e.clientX - canvasLeft, e.clientY - canvasTop);
        var pp = player.m_xf.position.clone();
        var pd = pt.clone().sub(pp).norm();
        var pb = pd.clone().scale(15).add(pp);
        var newball = createBall(_world, pb, 5,5);
        newball.SetLinearVelocity(pd.scale(1000));
    });
    step();
}


function setupWorld(){

    //1. 设置有效区域大小 - b2AABB 类 （左上角向量,右下角向量）
    worldAABB = new b2AABB();

	worldAABB.lowerBound.Set(-10000.0, -10000.0);
	worldAABB.upperBound.Set(10000.0, 10000.0);
	/*
    worldAABB.minVertex.Set(-1000, -1000); //左上角
    worldAABB.maxVertex.Set(1000, 1000); //右下角
	*/
    //2. 定义重力 - 2D向量 - b2Vec2 类 （x,y）
    gravity = new b2Vec2(0, 0);
    
    //3. 忽略休眠的物体
    var doSleep = true;
    
    //4. 创建world 
    var world = new b2World(worldAABB, gravity, doSleep);
    return world;
}

function step(cnt){
    var stepping = false;
    var timeStep = 1.0 / 60;
    var iteration = 10;
    _world.Step(timeStep, iteration);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawWorld(_world, ctx);
    setTimeout('step(' + (cnt || 0) + ')', 10);
}

function createBall(world, v, r, d){
    var bodyDef = new b2BodyDef();
        bodyDef.position.Set(v.x, v.y);
        bodyDef.isBullet = true;
        var body = world.CreateBody(bodyDef);
        var shapeDef = new b2CircleDef();
        shapeDef.radius = r;
        //var shapeDef = new b2PolygonDef();
        //shapeDef.SetAsBox(1.0, 1.0);
        shapeDef.restitution = 0.9;
        shapeDef.density = d;
        shapeDef.friction = 0.1;
		body.m_linearDamping = 0.2;
		body.m_angularDamping = 0.995;

        body.CreateShape(shapeDef);
        body.SetMassFromShapes();
	return body;
}

function createBox(world, x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') 
        fixed = true;

    var bodyDef = new b2BodyDef();
    bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var shapeDef = new b2PolygonDef();
    shapeDef.SetAsBox(width, height);
    body.w = width;
    body.h = height;
    shapeDef.restitution = .8;
    if (!fixed) boxSd.density = 1;
    shapeDef.friction = 1.0;
    body.CreateShape(shapeDef);
    body.SetMassFromShapes();
	return body;
}

function createPoly(world, x, y, points, fixed) {
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
	return body;
};


function drawWorld(world, context){
    for (var j = world.m_jointList; j; j = j.m_next) {
        drawJoint(j, context);
    }
    for (var b = world.m_bodyList; b; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            drawShape(b , s, context);
        }
    }
}

function drawJoint(joint, context){
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b1.m_position;
    var x2 = b2.m_position;
    var p1 = joint.GetAnchor1();
    var p2 = joint.GetAnchor2();
    context.strokeStyle = '#00eeee';
    context.beginPath();
    switch (joint.m_type) {
        case b2Joint.e_distanceJoint:
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            break;
            
        case b2Joint.e_pulleyJoint:
            // TODO
            break;
            
        default:
            if (b1 == world.m_groundBody) {
                context.moveTo(p1.x, p1.y);
                context.lineTo(x2.x, x2.y);
            }
            else 
                if (b2 == world.m_groundBody) {
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(x1.x, x1.y);
                }
                else {
                    context.moveTo(x1.x, x1.y);
                    context.lineTo(p1.x, p1.y);
                    context.lineTo(x2.x, x2.y);
                    context.lineTo(p2.x, p2.y);
                }
            break;
    }
    context.stroke();
}

function drawShape(body , shape, context){
    context.strokeStyle = '#000';
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:{
            var circle = shape;
            var pos = body.m_xf.position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            context.arc(pos.x, pos.y, r, 0, Math.PI * 2, false);
            /*
             context.moveTo(pos.x + r, pos.y);
             for (var i = 0; i < segments; i++) {
             var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
             var v = b2Math.AddVV(pos, d);
             context.lineTo(v.x, v.y);
             theta += dtheta;
             }
             context.lineTo(pos.x + r, pos.y);
             */
            // draw radius
			/*
            context.moveTo(pos.x, pos.y);
            var ax = body.m_xf.R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
			*/
        }
break;
        case b2Shape.e_polygonShape:{
            var poly = shape;
			var pos = body.m_xf.position , R = body.m_xf.R;
            var tV = b2Math.AddVV(pos, b2Math.b2MulMV(R , poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
			
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(pos, b2Math.b2MulMV(R , poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
        }
break;
    }
    context.stroke();
}

function g(g){
    _world.m_gravity = g;
}
