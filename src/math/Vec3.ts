export default class Vec3 {

    public x: number;
    public y: number;
    public z: number;

    public static dot(vec1: Vec3, vec2: Vec3) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}