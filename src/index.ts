import { Engine } from 'tscratch';
import Renderer from './Renderer.ts';
import vertices from './lib/vertices.ts';
import edges from './lib/edges.ts';

const engine = Engine.init();

const penSize = 10;
const scale = 75;

// Renderer
const renderer = new Renderer({
    vertices,
    edges,
    scale,
    size: penSize
});

engine.setLoop('main', () => {

    renderer.rotateX(1);
    renderer.rotateY(1);
    renderer.rotateZ(1);

    const r = engine.pickRandom(0, 255);
    const g = engine.pickRandom(0, 255);
    const b = engine.pickRandom(0, 255);

    renderer.setColor(`rgb(${r}, ${g}, ${b})`);
});