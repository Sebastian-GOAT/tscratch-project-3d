export default class Vec2 {

    public x: number;
    public y: number;

    public static dot(vec1: Vec2, vec2: Vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}