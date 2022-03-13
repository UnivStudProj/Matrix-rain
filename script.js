const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = `${katakana1 + katakana2 + digits + latin}`;

const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildText() {
    let txt = [];
    let txtLength = getRandomBetween(5, 20);
    for (let i = 0; i <= txtLength; i++) {
        let index = Math.floor(Math.random() * chars.length);
        txt[i] = chars.charAt(index);
    }

    return txt;
}


class TextLine {
    constructor(x, y, fontSize, text) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = text;
        this.#initialize();
    }

    #initialize() {
        let blur = this.fontSize <= 5 ? this.fontSize * 0.4 : 0;
        let gradient = ctx.createLinearGradient(this.x, this.y, this.x * this.fontSize, this.y * this.fontSize);
        let gradientSteps = 2;

        for (let i = 0; i <= gradientSteps; i++) {
            gradient.addColorStop(i / gradientSteps, `hsl(112, 100%, ${50 + (i * 10.25)}%)`);
        }

        ctx.fillStyle = gradient;
        ctx.font = `${this.fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.filter = `
            blur(${blur}px)
            drop-shadow(0px 0px 10px hsl(112, 100%, 50%))`;
    }

    drawLine() {
        ctx.clearRect(0, 0, w, h);
        // Vertical word
        for (let i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.x, (1 + i) * this.fontSize);
        }
    }

    moveLine(imgCache, index) {
        if (this.y == h) {
            lines.splice(index, 1);
            cache.splice(index, 1);
        } else {
            this.y++;
        }

        ctx.drawImage(imgCache, 0, this.y);
    }
}

var lines = [];
var cache = [];

function createSymbols() {
    // Columns
    let x = getRandomBetween(1, w);
    let fontSize = getRandomBetween(3, 20);

    let text = buildText();
    var line = new TextLine(x, -40, fontSize, text);
    line.drawLine();
    lines.push(line);

    let img = new Image();
    img.src = canvas.toDataURL('image/png', 1);
    cache.push(img);
}

function move() {
    // Moving text lines
    ctx.clearRect(0, 0, w, h);
    for (let l = 0; l < lines.length; l++) {
        lines[l].moveLine(cache[l], l);
    }
    if (lines.length < 20) { createSymbols(); }

    requestAnimationFrame(move);
}

createSymbols();
move();