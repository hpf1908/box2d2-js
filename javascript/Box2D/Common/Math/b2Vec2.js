var b2Vec2 = function(x_, y_) {
    if(arguments.length == 2) {
        this.x=x_; this.y=y_;
    }
}
// static attributes
// static methods
b2Vec2.Make = function (x_, y_) {
		return new b2Vec2(x_, y_);
	}
// attributes
b2Vec2.prototype.x =  0;
b2Vec2.prototype.y =  0;
// methods
b2Vec2.prototype.SetZero = function () { this.x = 0.0; this.y = 0.0; }
b2Vec2.prototype.Set = function (x_, y_) {this.x=x_; this.y=y_;}
b2Vec2.prototype.SetV = function (v) {this.x=v.x; this.y=v.y;}
b2Vec2.prototype.Negative = function () { return new b2Vec2(-this.x, -this.y); }
b2Vec2.prototype.Copy = function () {
		return new b2Vec2(this.x,this.y);
	}
b2Vec2.prototype.Add = function (v) {
		this.x += v.x; this.y += v.y;
	}
b2Vec2.prototype.Subtract = function (v) {
		this.x -= v.x; this.y -= v.y;
	}
b2Vec2.prototype.Multiply = function (a) {
		this.x *= a; this.y *= a;
	}
b2Vec2.prototype.MulM = function (A) {
		var tX = this.x;
		this.x = A.col1.x * tX + A.col2.x * this.y;
		this.y = A.col1.y * tX + A.col2.y * this.y;
	}
b2Vec2.prototype.MulTM = function (A) {
		var tX = b2Math.b2Dot(this, A.col1);
		this.y = b2Math.b2Dot(this, A.col2);
		this.x = tX;
	}
b2Vec2.prototype.CrossVF = function (s) {
		var tX = this.x;
		this.x = s * this.y;
		this.y = -s * tX;
	}
b2Vec2.prototype.CrossFV = function (s) {
		var tX = this.x;
		this.x = -s * this.y;
		this.y = s * tX;
	}
b2Vec2.prototype.MinV = function (b) {
		this.x = this.x < b.x ? this.x : b.x;
		this.y = this.y < b.y ? this.y : b.y;
	}
b2Vec2.prototype.MaxV = function (b) {
		this.x = this.x > b.x ? this.x : b.x;
		this.y = this.y > b.y ? this.y : b.y;
	}
b2Vec2.prototype.Abs = function () {
		if (this.x < 0) this.x = -this.x;
		if (this.y < 0) this.y = -this.y;
	}
b2Vec2.prototype.Length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
b2Vec2.prototype.LengthSquared = function () {
		return (this.x * this.x + this.y * this.y);
	}
b2Vec2.prototype.Normalize = function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		if (length < Number.MIN_VALUE)
		{
			return 0.0;
		}
		var invLength = 1.0 / length;
		this.x *= invLength;
		this.y *= invLength;
		
		return length;
	}
b2Vec2.prototype.IsValid = function () {
		return b2Math.b2IsValid(this.x) && b2Math.b2IsValid(this.y);
	}

extend(b2Vec2.prototype ,{
	clone:function(){return new b2Vec2(this.x,this.y);},
	set:function(v){this.x=v.x;this.y=v.y;return this;},
	add:function(v){this.x+=v.x;this.y+=v.y;return this;},
	sub:function(v){this.x-=v.x;this.y-=v.y;return this;},
	dot:function(v){return this.x*v.x+this.y*v.y;},
	projection:function(v){return v.clone().norm().scale(this.clone().dot(v)/v.length());},
	length:function(){return Math.sqrt(this.x*this.x+this.y*this.y);},
	distance:function(v){var xx=this.x-v.x;var yy=this.y-v.y;return Math.sqrt(xx*xx+yy*yy);},
	distance2:function(v){var xx=this.x-v.x;var yy=this.y-v.y;return xx*xx+yy*yy;},
	theta:function(){return Math.atan2(this.y,this.x);},
	thetaTo:function(vec){var v=this.clone().norm();var w=vec.clone().norm();return Math.acos(v.dot(w));},
	thetaTo2:function(vec){return Math.atan2(vec.y,vec.x)-Math.atan2(this.y,this.x);},
	norm:function(){var len=this.length();if(len==0)return this;this.x/=len;this.y/=len;return this;},
	rotate:function(a){
		var ca=Math.cos(a);var sa=Math.sin(a);
		with(this){var rx=x*ca-y*sa;var ry=x*sa+y*ca;x=rx;y=ry;}
		return this;
	},
	invert:function(){
		this.x=-this.x;
		this.y=-this.y;
		return this;
	},
	scale:function(s){
		this.x*=s;this.y*=s;return this;
	},
	x:null,
	y:null
});
