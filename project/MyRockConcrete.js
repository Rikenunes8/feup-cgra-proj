import { CGFobject} from '../lib/CGF.js';


export class MyRockConcrete extends CGFobject {
  constructor(scene, rock, x, z, sclX, sclZ, rotY) {
    super(scene);
    // Pseudo Consts
    this.rock = rock;
    this.initX = x;
    this.initY = this.scene.floor + 0.9;
    this.initZ = z;
    this.sclX = sclX;
    this.sclZ = sclZ;
    this.rotY = rotY;
    
    
    this.x = this.initX;
    this.y = this.initY;
    this.z = this.initZ;
    this.velX = 0;
    this.velY = -0.05;
    this.velZ = 0;

    /* Works like an enum type
     * 0 -> in floor
     * 1 -> in fish
     * 2 -> falling
     * 3 -> collected
     */
    this.state = 0;
  }

  display() {
    if (this.state != 1) // If the rock is in fish, he cares about rock's movement.
      this.scene.translate(this.x, this.y, this.z);
    
    this.scene.rotate(this.rotY*Math.PI/180, 0, 1, 0);
    this.scene.scale(this.sclX, 1, this.sclZ);
    this.scene.scale(0.1, 0.05, 0.1);
    this.rock.display();
  }

  update(x, y, z, r) {
    this.x += this.velX;
    this.z += this.velZ;
    this.y += this.velY;
    var dist = this.getDistTo(x, z);

    if (dist < r) { // If rock is above nest
      if (this.y < this.calculateNestHeight(dist, y, r)) {
        this.endDrop(3);
        return;
      }
    }

    if (this.y < this.initY) {
      this.y = this.initY;
      this.endDrop(0);
    }
  }

  getDistTo(x, z) {
    return Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(z-this.z, 2));
  }

  endDrop(nextState) {
    this.velX = 0;
    this.velZ = 0;
    this.state = nextState;
    this.scene.rocksFalling.shift();
  }

  reset() {
    this.x = this.initX;
    this.y = this.initY;
    this.z = this.initZ;
    this.velX = 0;
    this.velZ = 0;
    this.state = 0;
  }

  calculateNestHeight(dist, y, r) {
    // Deduced mathematically based on Nest radius (r) and displacement from the floor (y) as a function of dist
    return 0.7/(4*r)*dist*dist+0.3*r/4+y+0.05;
  }
}
