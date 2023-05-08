let ns = 0.03;
class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.x = x;
    this.y = y;
    //add the angle calculation for flowfields
    this.angle = map(noise(this.x * ns, this.y * ns), 0, 1, 0, TAU);
    this.vel = p5.Vector.fromAngle(cos(this.angle), sin(this.angle));
    this.vel.mult(5);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.angle = createVector(0, 0);
    this.limit = random(20);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // adding a variation to being attracted
    this.vel.limit(this.limit);
    this.acc.set(0, 0);

    // this.hue = map (this.pos, 0,width, 330,360)
  }

  show() {
    blendMode(SCREEN);
    stroke(random(200, 245), random(23, 59), random(34, 100), random(40, 65));

    strokeWeight(2);
    fill(255, 100);
    point(this.pos.x, this.pos.y); //, this.r * 2);
  }
}
