// The method of applying force to particles is from Daniel Shifman

class Attractor {
  constructor(x, y, m, G) {
    this.pos = createVector(x, y);
    this.x = x;
    this.y = y;
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.theta = 1;
    this.G = G;
  }
  mover(signal) {
    this.pos.x = this.r * cos(this.theta);
    this.pos.y = this.r * sin(this.theta);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let strength = (this.G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  //this section is where the EEG data influences the attractor
  update(signal) {
    this.pos.add(signal);
  }

  show() {
    noStroke();
    strokeWeight(0.5);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
