const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latinU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const latinL = 'abcdefghijklmnopqrstuvwxyz';
const extra_symbols = '!#$%&()*+/[\\]^{|}'

const chars1 = `${katakana1 + katakana2 + digits + latinU}`;
const chars2 = `${latinL + extra_symbols}`;

const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Sybmol {
    constructor(x, y, fontSize, isGray) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.isGray = isGray;
    }

    draw() {
        if (!this.isGray) {
            let index = Math.floor(Math.random() * chars1.length);
            this.text = chars1.charAt(index);

            ctx.font = `${this.fontSize}px monospace`;
            ctx.filter = `
                blur(${this.fontSize < 11 ? this.fontSize * 0.4 : 0}px)
                drop-shadow(0px 0px 10px #0aff0a)`;
            ctx.fillStyle = '#0aff0a';

        } else {
            let index = Math.floor(Math.random() * chars2.length);
            this.text = chars2.charAt(index);

            ctx.font = '10px monospace';
            ctx.filter = 'none';
            ctx.fillStyle = 'hsl(0 0% 33%)';
        }

        ctx.fillText(this.text, this.x, this.y * this.fontSize);

        if (this.y * this.fontSize > h) {
            this.x = randBetween(0, w);
            this.y = randBetween(-10, 0);
            this.fontSize = !this.isGray ? randBetween(minFontSize, maxFontSize) : this.fontSize;
        } else {
            this.y++;
        }
    }
}

class Effect {
    constructor(amount, isGray=false) {
        this.amount = amount;
        this.symbols = [];
        this.isGray = isGray;
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.amount; i++) {
            let x = randBetween(0, w);
            let y = randBetween(-100, 0);
            let fontSize = !this.isGray ? randBetween(minFontSize, maxFontSize) : 10;
            this.symbols[i] = new Sybmol(x, y, fontSize, this.isGray);
        }

    }
}

const minFontSize = 8;
const maxFontSize = 25;
const amount = randBetween(50, 90);
const effect = new Effect(amount);
const grayEffect = new Effect(amount, true);

function animate() {
    ctx.filter = 'none';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    effect.symbols.forEach(symbol => symbol.draw());
    grayEffect.symbols.forEach(symbol => symbol.draw(ctx));

    requestAnimationFrame(animate);
}
animate();