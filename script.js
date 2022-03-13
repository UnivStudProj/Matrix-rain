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
    var txt = [];
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
        this.y = y * fontSize;
        this.fontSize = fontSize;
        this.text = text
    }

    drawText(context) {
        let blur = this.fontSize < 10 ? this.fontSize * 0.2 : 0;
        let gradient = context.createLinearGradient(this.x, this.y, this.x + this.fontSize, (this.text.length + this.y) * this.fontSize);
        let gradientSteps = 2;

        for (let i = 0; i <= gradientSteps; i++) {
            gradient.addColorStop(i / gradientSteps, `hsl(112, 100%, ${50 + (i * 10.25)}%)`);
        }

        context.fillStyle = gradient;
        context.font = `${this.fontSize}px monospace`;
        context.textAlign = 'center';
        context.filter = `
            blur(${blur}px)
            drop-shadow(0px 0px 10px hsl(112, 100%, 50%))`;

        // Vertical word
        for (let i = 0; i < this.text.length; i++) {
            context.fillText(this.text[i], this.x, (1 + i) * this.fontSize);
        }

        context.filter = 'blur(0px)';
    }
}

// Columns
for (let j = 0; j < 10; j++) {
    let x = getRandomBetween(1, w);
    let fontSize = getRandomBetween(5, 20);

    let text = buildText();
    let line = new TextLine(x, 0, fontSize, text);
    line.drawText(ctx);
}