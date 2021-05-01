import {CGFobject} from '../../lib/CGF.js';

export class MyHalfSphere extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
    // View from outside
    this.verticesOut = [];
    this.indicesOut = [];
    this.normalsOut = [];
    this.texCoordsOut = [];
    // View from inside
    this.verticesIn = [];
    this.indicesIn = [];
    this.normalsIn = [];
    this.texCoordsIn = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;
    this.latDivs = this.latDivs/2;

    var numVertices = (this.longDivs+1)*(this.latDivs+1);
    var inHalfSphereHeight = 0.7;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var yOut = cosPhi;
        var yIn = cosPhi * inHalfSphereHeight;
        var z = Math.sin(-theta) * sinPhi;
        this.verticesOut.push(x, yOut, z);
        this.verticesIn.push(x, yIn, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          
          // View from outside
          this.indicesOut.push( current + 1, current, next);
          this.indicesOut.push( current + 1, next, next +1);

          // View from inside
          this.indicesIn.push( next+numVertices, current+numVertices, current+1+numVertices);
          this.indicesIn.push( next+1+numVertices, next+numVertices, current+1+numVertices);
        }

        //--- Normals
        this.normalsOut.push(x, yOut, z);
        this.normalsIn.push(-x, -yIn, -z);

        //--- Texture Coordinates
        this.texCoordsOut.push(longitude/this.longDivs, latitude/this.latDivs);
        this.texCoordsIn.push(longitude/this.longDivs, latitude/this.latDivs);

        theta += thetaInc;
      }
      phi += phiInc;
    }

    // Concat both sides
    this.vertices = this.verticesOut.concat(this.verticesIn);
    this.indices  = this.indicesOut.concat(this.indicesIn);
    this.normals  = this.normalsOut.concat(this.normalsIn);
    this.texCoords = this.texCoordsOut.concat(this.texCoordsIn);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
