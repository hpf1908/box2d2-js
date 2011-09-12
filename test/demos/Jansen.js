demos.Jansen = {};

demos.Jansen.createBody = function(m_world) {
	// scale walker by variable to easily change size
	var m_physScale = this.m_physScale,
		tScale = this.tScale,
		m_offset = this.m_offset,
		m_motorSpeed =  this.m_motorSpeed,
		m_motorOn = this.m_motorOn;

	// Set position in world space
	m_offset.Set(150/m_physScale, 50/m_physScale);
	this.m_motorOn = true;
	var pivot = new b2Vec2(20.0, 50/tScale);
	
	var pd , cd , bd , body;
	

	for (var i = 0; i < 40; ++i) {
		cd = new b2CircleDef();
		cd.density = 1.0;
		cd.radius = 7.5 / tScale;
		//cd.radius = 15;

		bd = new b2BodyDef();
		// Position in world space
		bd.position.Set( i * (cd.radius * 2) + 20 , 100/m_physScale);
		
		body = m_world.CreateBody(bd);
		body.CreateShape(cd);
		body.SetMassFromShapes();

	}
	
	
		pd = new b2PolygonDef();
		pd.density = 1.0;
		pd.SetAsBox(75/tScale, 30/tScale);
		pd.filter.groupIndex = -1;
		bd = new b2BodyDef();
		//bd.position = pivot + m_offset;
		bd.position = b2Math.AddVV(pivot, m_offset);
		this.m_chassis = m_world.CreateBody(bd);
		this.m_chassis.CreateShape(pd);
		this.m_chassis.SetMassFromShapes();
	

		cd = new b2CircleDef();
		cd.density = 1.0;
		cd.radius = 48/tScale;
		cd.filter.groupIndex = -1;
		bd = new b2BodyDef();
		//bd.position = pivot + m_offset;
		bd.position = b2Math.AddVV(pivot, m_offset);
		this.m_wheel = m_world.CreateBody(bd);
		this.m_wheel.CreateShape(cd);
		this.m_wheel.SetMassFromShapes();
	
		var jd = new b2RevoluteJointDef();
		var po = pivot.Copy();
		po.Add(m_offset);
		jd.Initialize(this.m_wheel, this.m_chassis, po);
		jd.collideConnected = false;
		jd.motorSpeed = this.m_motorSpeed;
		jd.maxMotorTorque = 400.0;
		jd.enableMotor = this.m_motorOn;
		this.m_motorJoint = m_world.CreateJoint(jd);
	
		var wheelAnchor;
		
		//wheelAnchor = pivot + b2Vec2(0.0f, -0.8);
		wheelAnchor = new b2Vec2(0.0, 24.0/tScale);
		wheelAnchor.Add(pivot);
		
		this.createLeg(m_world , -1.0, wheelAnchor);
		this.createLeg(m_world , 1.0, wheelAnchor);
		
		this.m_wheel.SetXForm(this.m_wheel.GetPosition(), 120.0 * Math.PI / 180.0);
		this.createLeg(m_world ,-1.0, wheelAnchor);
		this.createLeg(m_world ,1.0, wheelAnchor);
		
		this.m_wheel.SetXForm(this.m_wheel.GetPosition(), -120.0 * Math.PI / 180.0);
		this.createLeg(m_world ,-1.0, wheelAnchor);
		this.createLeg(m_world ,1.0, wheelAnchor);

};

demos.Jansen.createLeg = function(m_world , s, wheelAnchor) {
	var m_physScale = this.m_physScale,
		tScale = this.tScale,
		m_offset = this.m_offset;

	var p1 = new b2Vec2(162 * s/tScale, 183/tScale);
	var p2 = new b2Vec2(216 * s/tScale, 36 /tScale);
	var p3 = new b2Vec2(129 * s/tScale, 57 /tScale);
	var p4 = new b2Vec2( 93 * s/tScale, -24  /tScale);
	var p5 = new b2Vec2(180 * s/tScale, -45  /tScale);
	var p6 = new b2Vec2( 75 * s/tScale, -111 /tScale);
	
	//b2PolygonDef sd1, sd2;
	var sd1 = new b2PolygonDef();
	var sd2 = new b2PolygonDef();
	sd1.vertexCount = 3;
	sd2.vertexCount = 3;
	sd1.filter.groupIndex = -1;
	sd2.filter.groupIndex = -1;
	sd1.density = 1.0;
	sd2.density = 1.0;
	
	if (s > 0.0)
	{
		sd1.vertices[2] = p1;
		sd1.vertices[1] = p2;
		sd1.vertices[0] = p3;
		
		sd2.vertices[2] = new b2Vec2();
		sd2.vertices[1] = b2Math.SubtractVV(p5, p4);
		sd2.vertices[0] = b2Math.SubtractVV(p6, p4);
	}
	else
	{
		sd1.vertices[2] = p1;
		sd1.vertices[1] = p3;
		sd1.vertices[0] = p2;
		
		sd2.vertices[2] = new b2Vec2();
		sd2.vertices[1] = b2Math.SubtractVV(p6, p4);
		sd2.vertices[0] = b2Math.SubtractVV(p5, p4);
	}
	
	//b2BodyDef bd1, bd2;
	var bd1 = new b2BodyDef();
	var bd2 = new b2BodyDef();
	bd1.position.SetV(m_offset);
	bd2.position = b2Math.AddVV(p4, m_offset);
	
	bd1.angularDamping = 10.0;
	bd2.angularDamping = 10.0;
	
	var body1 = m_world.CreateBody(bd1);
	var body2 = m_world.CreateBody(bd2);
	
	body1.CreateShape(sd1);
	body2.CreateShape(sd2);
	
	body1.SetMassFromShapes();
	body2.SetMassFromShapes();
	
	var djd = new b2DistanceJointDef();
	
	djd.Initialize(body1, body2, b2Math.AddVV(p2, m_offset), b2Math.AddVV(p5, m_offset));
	m_world.CreateJoint(djd);
	
	djd.Initialize(body1, body2, b2Math.AddVV(p3, m_offset), b2Math.AddVV(p4, m_offset));
	m_world.CreateJoint(djd);
	
	djd.Initialize(body1, this.m_wheel, b2Math.AddVV(p3, m_offset), b2Math.AddVV(wheelAnchor, m_offset));
	m_world.CreateJoint(djd);
	
	djd.Initialize(body2, this.m_wheel, b2Math.AddVV(p6, m_offset), b2Math.AddVV(wheelAnchor, m_offset));
	m_world.CreateJoint(djd);
	
	var rjd = new b2RevoluteJointDef();
	
	rjd.Initialize(body2, this.m_chassis, b2Math.AddVV(p4, m_offset));
	m_world.CreateJoint(rjd);

};

demos.Jansen.initWorld = function(world) {
	demos.Jansen.m_physScale = 0.5,
	demos.Jansen.tScale = demos.Jansen.m_physScale * 2 ;
	demos.Jansen.m_offset = new b2Vec2();

	demos.Jansen.m_motorSpeed = - 2.0;
	demos.Jansen.m_motorOn = true;
	demos.Jansen.m_chassis = null;
	demos.Jansen.m_motorJoint = null;
	demos.Jansen.m_wheel = null;

	demos.Jansen.createBody(world);
};

demos.Jansen.controls = function(keyCode){

	var m_chassis = this.m_chassis,
		m_motorJoint = this.m_motorJoint;

	if(!m_chassis || !m_motorJoint) return;

	if (keyCode == 65){ // A
		m_chassis.WakeUp();
		m_motorJoint.SetMotorSpeed(-this.m_motorSpeed);
	}
	if (keyCode == 83){ // S
		m_chassis.WakeUp();
		m_motorJoint.SetMotorSpeed(0.0);
	}
	//case 'd':
	if (keyCode == 68){ // D
		m_chassis.WakeUp();
		m_motorJoint.SetMotorSpeed(this.m_motorSpeed);
	}
	//case 'm':
	if (keyCode == 87){ // w
		m_chassis.WakeUp();
		//m_motorJoint.EnableMotor(!this.m_motorJoint.IsMotorEnabled());
		m_motorJoint.EnableMotor(true);
	}
}
			
demos.InitWorlds.push(demos.Jansen);


