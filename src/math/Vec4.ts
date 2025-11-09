export default class Vec4 {

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public static dot(vec1: Vec4, vec2: Vec4) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z + vec1.w * vec2.w;
    }

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}