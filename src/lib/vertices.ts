import Vec3 from '../math/Vec3.ts';

// Define the vertices

// Cube
const vertices: Vec3[] = [
    // Bottom
    new Vec3(-1, -1, -1),
    new Vec3( 1, -1, -1),
    new Vec3( 1, -1,  1),
    new Vec3(-1, -1,  1),
    // Top
    new Vec3(-1,  1, -1),
    new Vec3( 1,  1, -1),
    new Vec3( 1,  1,  1),
    new Vec3(-1,  1,  1)
];

export default vertices;