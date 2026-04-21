import Goblin from './Goblin';

export default class Game {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.maxMisses = 5;

        this.board = document.querySelector('#game');
        this.scoreEl = document.querySelector('#score');

        this.cells = [];
        this.currentCell = null;

        this.goblin = new Goblin();
  }

    start() {
        this.createBoard(16);
        this.spawn();
    }

    createBoard(size) {
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.addEventListener('click', () => this.onCellClick(cell));

            this.board.appendChild(cell);
            this.cells.push(cell);
        }
    }

    spawn() {
        this.timer = setInterval(() => {
            if (this.misses >= this.maxMisses) {
                clearInterval(this.timer);
                alert('Game Over');
                return;
            }

        this.showGoblin();
        }, 1200);
    }

    showGoblin() {
        if (this.currentCell) {
            this.misses++;
        }

        this.goblin.remove();

        const index = Math.floor(Math.random() * this.cells.length);
        this.currentCell = this.cells[index];

        this.goblin.show(this.currentCell);

        setTimeout(() => {
            this.goblin.remove();
            this.currentCell = null;
        }, 1000);
    }

    onCellClick(cell) {
        if (cell === this.currentCell) {
            this.score++;
            this.scoreEl.textContent = this.score;

            this.goblin.remove();
            this.currentCell = null;
        }
    }
}