import Vec2 from '../math/Vec2.ts';

// Define the edges

// Cube
const edges: Vec2[] = [
    // Bottom
    new Vec2(0, 1),
    new Vec2(1, 2),
    new Vec2(2, 3),
    new Vec2(3, 0),
    // Top
    new Vec2(4, 5),
    new Vec2(5, 6),
    new Vec2(6, 7),
    new Vec2(7, 4),
    // Sides
    new Vec2(0, 4),
    new Vec2(1, 5),
    new Vec2(2, 6),
    new Vec2(3, 7)
];

export default edges;