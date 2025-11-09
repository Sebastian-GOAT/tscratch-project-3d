import { Engine } from 'tscratch';

const engine = Engine.init();

type ValueGetter = (theta: number) => number;

export type Mat3 = [
    [ValueGetter, ValueGetter, ValueGetter],
    [ValueGetter, ValueGetter, ValueGetter],
    [ValueGetter, ValueGetter, ValueGetter]
]

export const rotationMatrixX: Mat3 = [
    [t => 1,               t => 0,                t => 0],
    [t => 0,               t => engine.cos(t),    t => -engine.sin(t)],
    [t => 0,               t => engine.sin(t),    t => engine.cos(t)]
];

export const rotationMatrixY: Mat3 = [
    [t => engine.cos(t),   t => 0,                t => engine.sin(t)],
    [t => 0,               t => 1,                t => 0],
    [t => -engine.sin(t),  t => 0,                t => engine.cos(t)]
];

export const rotationMatrixZ: Mat3 = [
    [t => engine.cos(t),   t => -engine.sin(t),   t => 0],
    [t => engine.sin(t),   t => engine.cos(t),    t => 0],
    [t => 0,               t => 0,                t => 1]
];