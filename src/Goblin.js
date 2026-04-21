import goblinImg from './img/goblin.png';

export default class Goblin {
    constructor() {
        this.el = document.createElement('img');
        this.el.src = goblinImg;
        this.el.classList.add('goblin');
    }

    show(cell) {
        cell.appendChild(this.el);
    }

    remove() {
        this.el.remove();
    }
}