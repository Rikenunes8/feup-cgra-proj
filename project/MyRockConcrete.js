import { CGFobject} from '../lib/CGF.js';


export class MyRockConcrete extends CGFobject {
  constructor(scene, rock, x, z, sclX, sclZ, rotY) {
    super(scene);
    this.rock = rock;
    this.initX = x;
    this.initY = 0.9;
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
    /*
     * 0 -> in floor
     * 1 -> in fish
     * 2 -> dropping
     * 3 -> collected
     */
    this.state = 0;
  }

  display() {
    if (this.state != 1) 
      this.scene.translate(this.x, this.scene.floor + this.y, this.z);
    
   
    this.scene.rotate(this.rotY*Math.PI/180, 0, 1, 0);
    this.scene.scale(this.sclX, 1, this.sclZ);
    this.scene.scale(0.1, 0.05, 0.1);
    this.rock.display();
  }

  update(x, y, z, r) {
    this.x += this.velX;
    this.z += this.velZ;
    this.y += this.velY;
    if (this.y < y && Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(z-this.z, 2)) <= r) {
      this.velX = 0;
      this.velZ = 0;
      this.state = 3;
      this.scene.rocksDropping.shift();
    }
    else if (this.y < this.initY) {
      this.y = this.initY;
      this.velX = 0;
      this.velZ = 0;
      this.state = 0;
      this.scene.rocksDropping.pop();
    }
  }

}
