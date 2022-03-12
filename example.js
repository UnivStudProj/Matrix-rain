const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Sybmol {
    constructor(x, y, fontSize, canvasHeight) {
        this.chars = `${katakana1 + katakana2 + digits + latin}`;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        let index = Math.floor(Math.random() * this.chars.length);
        this.text = this.chars.charAt(index);

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y++;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Sybmol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);

const fps = 75;
const nextFrame = 1000 / fps;

let lastTime = 0;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}
animate(0);