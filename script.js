const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = `${katakana1 + katakana2 + digits + latin}`;

const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Sybmol {
    constructor(x, y, fontSize) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
    }

    draw(context) {
        let index = Math.floor(Math.random() * chars.length);
        this.text = chars.charAt(index);

        context.font = `${this.fontSize}px monospace`;
        context.filter = `
            blur(${this.fontSize < 9 ? this.fontSize * 0.4 : 0}px)
            drop-shadow(0px 0px 10px #0aff0a)`;

        context.fillText(this.text, this.x, this.y * this.fontSize);

        if (this.y * this.fontSize > h) {
            this.x = randBetween(0, w);
            this.y = randBetween(-10, 0);
            this.fontSize = randBetween(minFontSize, maxFontSize);
        } else {
            this.y++;
        }
    }
}

class Effect {
    constructor(amount) {
        this.amount = amount;
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.amount; i++) {
            let x = randBetween(0, w);
            let y = randBetween(-100, 0);
            let fontSize = randBetween(minFontSize, maxFontSize);
            this.symbols[i] = new Sybmol(x, y, fontSize);
        }
    }
}

const minFontSize = 4;
const maxFontSize = 15;
const amount = randBetween(50, 90);
const effect = new Effect(amount);

function animate() {
    ctx.filter = 'none';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0aff0a';
    ctx.filter = ``;
    effect.symbols.forEach(symbol => symbol.draw(ctx));

    requestAnimationFrame(animate);
}
animate();