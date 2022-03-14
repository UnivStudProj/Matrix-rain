const frame = document.querySelector('.frame');

const katakana1 = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグ';
const katakana2 = 'ズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const digits = '0123456789';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = `${katakana1 + katakana2 + digits + latin}`;

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Symbols {
    constructor(frame, fontSize) {
        this.frame = frame;
        this.fontSize = fontSize;
        this.p = document.createElement('p');
        this.p.innerHTML = '';
        this.isInserted = false;
        this.#setStyle();
    }

    addSymbol() {
        this.p.innerHTML += chars.charAt(randomBetween(0, chars.length));
        if (!this.isInserted) { this.#insertParagraph() };
    }

    #insertParagraph() {
        this.frame.appendChild(this.p);
        this.isInserted = true;
    }

    #setStyle() {
        if (this.fontSize <= 7) { this.p.style.filter = 'blur(2px)'; }
        this.p.style.fontSize = `${this.fontSize}px`;
        this.p.style.textShadow = `0px 0px 20px #0aff0a`;
    }
}

var symbolsArr = [];

function main() {
    for (let i = 0; i < 120; i++) {
        let fontSize = randomBetween(5, 20);
        let symbol = new Symbols(frame, fontSize);
        let symbolsNum = randomBetween(4, 20);

        for (let l = 0; l <= symbolsNum; l++) {
            symbol.addSymbol();
        }
        symbolsArr.push(symbol);
        
    }
    let st = window.getComputedStyle(symbolsArr[0].p);
    let m = new WebKitCSSMatrix(st.transform);
    console.log(m.m5);
}

main();