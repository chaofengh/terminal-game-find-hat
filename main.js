const prompt = require('prompt-sync')({ sigint: true });
const term = require('terminal-kit').terminal;

const hat = 'k';
const hole = 'o';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this._field = field;
        this._playerPosition = this.getRandomPosition();
        while (this._playerPosition.y === 0 && this._playerPosition.x === 0) {
            this._playerPosition = this.getRandomPosition();
        }
        this._locationY = this._playerPosition.y;
        this._locationX = this._playerPosition.x;
        this._field[this._locationY][this._locationX] = pathCharacter;
        this._turns = 0;
        this._hardMode = true; // Enable hard mode
    }

    runGame() {
        let playing = true;
        while (!this.validateField()) {
            this._field = generateField(10, 10, 0.2);
            this._playerPosition = this.getRandomPosition();
            while (this._playerPosition.y === 0 && this._playerPosition.x === 0) {
                this._playerPosition = this.getRandomPosition();
            }
            this._locationY = this._playerPosition.y;
            this._locationX = this._playerPosition.x;
            this._field[this._locationY][this._locationX] = pathCharacter;
        }
        while (playing) {
            this.printField();
            this.getUserInput();
            this._turns += 1;
            if (this._hardMode && this._turns % 5 === 0) {
                this.addHoles();
            }
            if (!this.isInBounds()) {
                term.red('Out of bounds instruction!\n');
                playing = false;
                break;
            } else if (this.isHole()) {
                term.red('Sorry, you fell down a hole!\n');
                playing = false;
                break;
            } else if (this.isHat()) {
                term.green('Congrats, you found your hat!\n');
                playing = false;
                break;
            }

            this._field[this._locationY][this._locationX] = pathCharacter;
        }
    }

    isInBounds() {
        return (
            this._locationY >= 0 &&
            this._locationX >= 0 &&
            this._locationY < this._field.length &&
            this._locationX < this._field[0].length
        );
    }

    isHat() {
        return this._field[this._locationY][this._locationX] === hat;
    }

    isHole() {
        return this._field[this._locationY][this._locationX] === hole;
    }

    printField() {
        term.clear();
        this._field.forEach(row => {
            row.forEach( cell =>{
                if( cell === hat ){
                    term.red(cell);
                }else if (cell === pathCharacter){
                    term.green(cell)
                }else if (cell === hole){
                    term.yellow(cell);
                }else {
                    term(fieldCharacter);
                }
            })
            term('\n');
        });
    }

    getUserInput() {
        const answer = prompt('Which way?').toLowerCase();
        switch (answer) {
            case 'w':
                this._locationY -= 1;
                break;
            case 's':
                this._locationY += 1;
                break;
            case 'a':
                this._locationX -= 1;
                break;
            case 'd':
                this._locationX += 1;
                break;
            default:
                term.red('Enter W, S, A, D\n');
                this.getUserInput();
                break;
        }
    }

    getRandomPosition() {
        const y = Math.floor(Math.random() * this._field.length);
        const x = Math.floor(Math.random() * this._field[0].length);
        return { y, x };
    }

    addHoles() {
        if (this._turns % 5 === 0) {
            const holePosition = this.getRandomPosition();
            if (this._field[holePosition.y][holePosition.x] === fieldCharacter) {
                this._field[holePosition.y][holePosition.x] = hole;
            }
        }
    }

    isValidPosition(y, x) {
        return (
            y >= 0 &&
            x >= 0 &&
            y < this._field.length &&
            x < this._field[0].length &&
            this._field[y][x] !== hole
        );
    }

    validateField() {
        const visited = new Set();
        const stack = [{ y: this._locationY, x: this._locationX }]; // the queue to check next
        
        while (stack.length > 0) { // when this condition is false, means we have checked all elements and can't find the hat
            const { y, x } = stack.pop(); // 
            if(this._field[y][x] === hat) return true
            
            visited.add(`${y},${x}`);
            
            const neighbors = [
                { y: y - 1, x }, // this is shorthand Property Name; it's equal to {y: y - 1, x: x}
                { y: y + 1, x },
                { y, x: x + 1 },
                { y, x: x - 1 }
            ];

            for (const neighbor of neighbors){
                if (this.isValidPosition(neighbor.y, neighbor.x) &&
                    !visited.has(`${neighbor.y},${neighbor.x}`)){
                    stack.push(neighbor);
                }
            }
        }
        return false;
    }
}

function generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(() => new Array(width).fill(fieldCharacter));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
        }
    }

    const hatLocation = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };

    field[hatLocation.y][hatLocation.x] = hat;

    return field;
}

const myField = new Field(generateField(10, 10, 0.2));
myField.runGame();
