import Goblin from './Goblin';

const FIELD_SIZE = 4;
const CELLS_COUNT = FIELD_SIZE * FIELD_SIZE;
const MOVE_INTERVAL = 1200;
const HIDE_DELAY = 1000;

export default class Game {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.maxMisses = 5;

        this.board = document.querySelector('#game');
        this.scoreEl = document.querySelector('#score');
        this.missEl = document.querySelector('#misses');
        this.gameOverEl = document.querySelector('#game-over');

        this.cells = [];
        this.currentCell = null;

        this.goblin = new Goblin();

        this.isGameOver = false;
        this.hideTimeout = null;
        this.timer = null;
    }

    start() {
        this.createBoard(CELLS_COUNT);
        this.spawn();
    }

    createBoard(size) {
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.addEventListener('click', () => this.onCellClick(cell));

            this.board.append(cell);
            this.cells.push(cell);
        }
    }

    spawn() {
        this.timer = setInterval(() => {
            this.showGoblin();
        }, MOVE_INTERVAL);
    }

    getRandomIndex() {
        let index;

        do {
            index = Math.floor(Math.random() * this.cells.length);
        } while (this.cells[index] === this.currentCell);

        return index;
    }

    showGoblin() {
        if (this.isGameOver) return;

        this.goblin.remove();

        const index = this.getRandomIndex();
        this.currentCell = this.cells[index];

        this.goblin.show(this.currentCell);

        this.hideTimeout = setTimeout(() => {
            if (this.isGameOver) return;
            
            if (this.currentCell) {
                this.misses++;
                this.missEl.textContent = this.misses;

                if (this.misses >= this.maxMisses) {
                    this.stopGame();
                    this.showGameOver();
                    return;
                }
            }

            this.goblin.remove();
            this.currentCell = null;
        }, HIDE_DELAY);
    }

    onCellClick(cell) {
        if (this.isGameOver) return;

        if (cell === this.currentCell) {
            this.score++;
            this.scoreEl.textContent = this.score;

            this.goblin.remove();
            this.currentCell = null;
        }
    }

    showGameOver() {
        this.isGameOver = true;

        this.gameOverEl.textContent = `Game Over! Score: ${this.score}`;
        this.gameOverEl.style.display = 'block';

        this.goblin.remove();
        this.currentCell = null;

        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }

    stopGame() {
        clearInterval(this.timer);
        this.timer = null;
    }
}