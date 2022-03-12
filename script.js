const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;

let chars = `${katakana1 + katakana2 + digits + latin}`;
let fontSize = 25;
let gradient = ctx.createLinearGradient(0, 0, 0, h);

for (let i = 0; i < palette.length; i++) {
    gradient.addColorStop(i / palette.length, palette[i]);
}
// TODO: hsla
// ctx.fillStyle = '#0aff0a';
ctx.fillStyle = gradient;
ctx.font = `${fontSize}px monospace`;

function buildText() {
    const minLength = 5;
    const maxLength = 40;
    var txt = [];
    let txtLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    for (let i = 0; i <= txtLength; i++) {
        let index = Math.floor(Math.random() * chars.length);
        txt[i] = chars.charAt(index);
    }

    return txt;
}

for (let i = 0; i < 5; i++) {
    let text = buildText();
    let x = i * fontSize;
    for (let j = 0; j < text.length; j++) {
        let y = (1 + j) * fontSize;
        ctx.fillText(text[j], x, y + j);
    }
}
