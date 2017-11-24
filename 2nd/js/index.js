window.onload = function() {
    var red = '#c17070'
    createAnim(red)
    var blue = '#205dab'
    createAnim(blue)
    // var yellow = '#e4e4a3'
    // createAnim(yellow)
};
function createAnim(color){
  debugger;
  var c = document.querySelector('canvas'),
    ctx = c.getContext('2d'),
    t = null,
    curves = [],
    age = null,
    stroke = null,
    lifetime = 2000;

c.width = window.innerWidth;
c.height = window.innerHeight;

// Setup
// ticket
function tick() {
  requestAnimationFrame(tick);
  var now = Date.now();
  if (!t) t = now;
  update(now - t);
  render(now - t);
  t = now;
}

requestAnimationFrame(tick);

// Loop

function init() {
  if (!curves.length)
    for (var i = 0; i < 4; i++)
      curves.push(Curve.random(0, 0, c.width, c.height));
  else
    curves.forEach(function(curve) {
      curve.a = curve.d.clone();
      curve.b = curve.d.clone().scale(2).sub(curve.c);
      curve.c.randomize(0, 0, c.width, c.height);
      curve.d.randomize(0, 0, c.width, c.height);
    });
  stroke = color;
  age = 0;
}

function update(elapsed) {
  if (!age || age >= lifetime) init();
  age += elapsed;
}

function render(elapsed) {
  var i, j, k, l, begin = (age - elapsed) / lifetime , end = age / lifetime;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = '#e9e4e7';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.restore();
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = stroke;
  ctx.beginPath();
  i = curves[0].value(begin);
  j = curves[1].value(begin);
  k = curves[2].value(begin);
  l = curves[3].value(begin);
  ctx.moveTo(i.x, i.y);
  ctx.bezierCurveTo(j.x, j.y, k.x, k.y, l.x, l.y);
  i = curves[0].value(end);
  j = curves[1].value(end);
  k = curves[2].value(end);
  l = curves[3].value(end);
  ctx.lineTo(l.x, l.y);
  ctx.bezierCurveTo(k.x, k.y, j.x, j.y, i.x, i.y);
  ctx.closePath();
  ctx.fill();
}

// Classes

function Vec2d(x, y) {
  this.x = x;
  this.y = y;
}
  
Vec2d.random = function(a, b, c, d) {
  return (new Vec2d).randomize(a, b, c, d);
};

Vec2d.prototype.randomize = function(a, b, c, d) {
  this.x = Math.random() * (c - a) + a;
  this.y = Math.random() * (d - b) + b;
  return this;
};

Vec2d.prototype.clone = function() {
  return new Vec2d(this.x, this.y);
};

Vec2d.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};

Vec2d.prototype.sub = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};

Vec2d.prototype.scale = function(a) {
  this.x *= a;
  this.y *= a;
  return this;
};


function Curve(A, B, C, D, color) {
  this.a = A;
  this.b = B;
  this.c = C;
  this.d = D;
  this.color = color;
}

Curve.random = function(a, b, c, d) {
  return new Curve(
    Vec2d.random(a, b, c, d),
    Vec2d.random(a, b, c, d),
    Vec2d.random(a, b, c, d),
    Vec2d.random(a, b, c, d)
  );
};

Curve.prototype.value = function(t) {
  var n = 1 - t,
      a = this.a.clone().scale(n * n * n),
      b = this.b.clone().scale(3 * n * n * t),
      c = this.c.clone().scale(3 * n * t * t),
      d = this.d.clone().scale(t * t * t);
  return a.add(b).add(c).add(d);
};

Curve.prototype.randomize = function(a, b, c, d) {
  this.a.randomize(a, b, c, d);
  this.b.randomize(a, b, c, d);
  this.c.randomize(a, b, c, d);
  this.d.randomize(a, b, c, d);
};
}