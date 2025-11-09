import { Engine } from 'tscratch';

const engine = Engine.init();

const aspect = 16 / 9;
const fov = 60;
const zNear = 0.01;
const zFar = 10000;

type ValueGetter = () => number;

export type Mat4 = [
    [ValueGetter, ValueGetter, ValueGetter, ValueGetter],
    [ValueGetter, ValueGetter, ValueGetter, ValueGetter],
    [ValueGetter, ValueGetter, ValueGetter, ValueGetter],
    [ValueGetter, ValueGetter, ValueGetter, ValueGetter]
]

const projectionMatrix: Mat4 = [
    [() => aspect * engine.tan(fov / 2), () => 0, () => 0, () => 0],
    [() => 0, () => engine.cot(fov / 2), () => 0, () => 0],
    [() => 0, () => 0, () => (zFar + zNear) / (zNear - zFar), () => 2 * zFar * zNear / (zNear - zFar)],
    [() => 0, () => 0, () => -1, () => 0]
];

export default projectionMatrix;