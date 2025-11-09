import { Pen, type PenOptions } from 'tscratch';
import projectionMatrix from './math/projectionMatrix.ts';
import { rotationMatrixX, rotationMatrixY, rotationMatrixZ } from './math/rotationMatrix.ts';
import Vec2 from './math/Vec2.ts';
import Vec3 from './math/Vec3.ts';
import Vec4 from './math/Vec4.ts';

export interface RendererOptions extends PenOptions {
    vertices?: Vec3[];
    edges?: Vec2[];
    scale?: number;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
}

export default class Renderer extends Pen {

    public scale: number;
    public rotationX: number;
    public rotationY: number;
    public rotationZ: number;

    private vertices: Vec3[];
    private edges: Vec2[];

    public render(): void {

        const rotated = this.getRotatedVertices();
        const projected = this.getProjectedVertices(rotated);

        for (const e of this.edges) {

            const rootX = projected[e.x]!.x * this.scale;
            const rootY = projected[e.x]!.y * this.scale;

            const targetX = projected[e.y]!.x * this.scale;
            const targetY = projected[e.y]!.y * this.scale;

            this.goTo(rootX, rootY);
            this.down();
            this.goTo(targetX, targetY);
            this.up();
        }
    }

    public setColor(color: string) {
        this.color = color;
        this.update();
    }

    public rotateX(deg: number) {
        this.rotationX = (this.rotationX + deg) % 360;
        this.update();
    }

    public rotateY(deg: number) {
        this.rotationY = (this.rotationY + deg) % 360;
        this.update();
    }

    public rotateZ(deg: number) {
        this.rotationZ = (this.rotationZ + deg) % 360;
        this.update();
    }

    private getProjectedVertices(vertices: Vec3[]): Vec2[] {

        const verts4 = vertices.map(v => new Vec4(v.x, v.y, v.z, 1));

        const projected: Vec2[] = [];

        for (const v of verts4) {
            // Step 1: Multiply projectionMatrix * v
            const m = projectionMatrix;
            const vec = new Vec4(v.x, v.y, v.z, 1);

            const row0 = new Vec4(m[0][0](), m[0][1](), m[0][2](), m[0][3]());
            const row1 = new Vec4(m[1][0](), m[1][1](), m[1][2](), m[1][3]());
            const row2 = new Vec4(m[2][0](), m[2][1](), m[2][2](), m[2][3]());
            const row3 = new Vec4(m[3][0](), m[3][1](), m[3][2](), m[3][3]());

            const xPrime = Vec2.dot(row0, vec);
            const yPrime = Vec2.dot(row1, vec);
            const zPrime = Vec2.dot(row2, vec);
            const wPrime = Vec2.dot(row3, vec);

            // Step 2: Perspective divide (avoid division by zero)
            const invW = wPrime !== 0 ? 1 / wPrime : 1;

            projected.push(new Vec2(xPrime * invW, yPrime * invW));
        }

        return projected;
    }

    private getRotatedVertices(): Vec3[] {

        const rotated: Vec3[] = [];

        const mX = rotationMatrixX;
        const mY = rotationMatrixY;
        const mZ = rotationMatrixZ;

        const rX = this.rotationX;
        const rY = this.rotationY;
        const rZ = this.rotationZ;

        for (const v of this.vertices) {

            // Multiply rotationMatrix * v
            let x = v.x;
            let y = v.y;
            let z = v.z;

            // Rotate by mX
            let x1 = mX[0][0](rX) * x + mX[0][1](rX) * y + mX[0][2](rX) * z;
            let y1 = mX[1][0](rX) * x + mX[1][1](rX) * y + mX[1][2](rX) * z;
            let z1 = mX[2][0](rX) * x + mX[2][1](rX) * y + mX[2][2](rX) * z;

            x = x1; y = y1; z = z1;

            // Rotate by mY
            let x2 = mY[0][0](rY) * x + mY[0][1](rY) * y + mY[0][2](rY) * z;
            let y2 = mY[1][0](rY) * x + mY[1][1](rY) * y + mY[1][2](rY) * z;
            let z2 = mY[2][0](rY) * x + mY[2][1](rY) * y + mY[2][2](rY) * z;

            x = x2; y = y2; z = z2;

            // Rotate by mZ
            let x3 = mZ[0][0](rZ) * x + mZ[0][1](rZ) * y + mZ[0][2](rZ) * z;
            let y3 = mZ[1][0](rZ) * x + mZ[1][1](rZ) * y + mZ[1][2](rZ) * z;
            let z3 = mZ[2][0](rZ) * x + mZ[2][1](rZ) * y + mZ[2][2](rZ) * z;

            rotated.push(new Vec3(x3, y3, z3));
        }

        return rotated;
    }

    private update() {
        this.ereaseAll();
        this.render();
    }

    constructor(options?: RendererOptions) {
        super(options);

        this.scale = options?.scale ?? 100;
        this.rotationX = options?.rotationX ?? 0;
        this.rotationY = options?.rotationY ?? 0;
        this.rotationZ = options?.rotationZ ?? 0;

        this.vertices = options?.vertices ?? [];
        this.edges = options?.edges ?? [];

        this.render();
    }
}