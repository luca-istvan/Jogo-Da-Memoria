const mapa = document.querySelectorAll('.memory-card');

let primeiraCarta = null;
let segundaCarta = null;
let podeClicar = true;
let paresEncontrados = 0;

const totalDePares = mapa.length / 2;

const timerElement = document.querySelector('#timer');
const startButton = document.querySelector('#start');

let segundosPassados = 0;
let temporizador = null;


function virarCarta() {
    if (!podeClicar) return;

    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    verificarPar();
}


function verificarPar() {
    const cartasIguais =
        primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}


function manterParEncontrado() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    if (paresEncontrados === totalDePares) {
        fimDeJogo();
    }
}


function desvirarCartas() {
    podeClicar = false;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetarJogada();
    }, 1500);
}


function resetarJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}


function embaralharCartas() {
    mapa.forEach(carta => {
        const posicaoAleatoria =
            Math.floor(Math.random() * mapa.length);

        carta.style.order = posicaoAleatoria;
    });
}


function fimDeJogo() {
    clearInterval(temporizador);

    alert("Parabéns! Você encontrou todos os pares");
}


function resetarTabuleiro() {
    paresEncontrados = 0;
    resetarJogada();

    mapa.forEach(carta => {
        carta.classList.remove('flip');
        carta.addEventListener('click', virarCarta);
    });

    embaralharCartas();
}


mapa.forEach(carta => {
    carta.addEventListener('click', virarCarta);
});

embaralharCartas();
