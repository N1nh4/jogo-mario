const mario = document.querySelector('#mario');
const barril = document.querySelector('#pipe');


const posicaoBottomMario = +window.getComputedStyle(mario).bottom.replace('px', '');

let pontos = document.querySelector('#pontos-numero');

let pontuacao = 0;


const audio = new Audio('audio.m4a');
window.onload = () => {
    audio.play();
}



document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        mario.classList.add('jump');
    }

    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 1000);
});



const somarPontos = setInterval(() => {
    const posicaoBarril = +window.getComputedStyle(barril).left.replace('px', '');

    console.log(posicaoBarril);
    
    if (mario.classList.contains('soma-ponto')) {
        pontuacao = pontuacao + 50;
        pontos.innerHTML = pontuacao;
        console.log("PONTUOU");
        mario.classList.remove('soma-ponto');
    }

}, 1500);

const loop = setInterval(() => {
    const posicaoBottomMario = +window.getComputedStyle(mario).bottom.replace('px', '');
    const posicaoBarril = +window.getComputedStyle(barril).left.replace('px', '');


   
    
    if (posicaoBottomMario > 43) {
        mario.src = 'imagens/mario-voando.png';
        mario.style.left = '-50px';
        mario.style.width = '240px';
        
        if (posicaoBottomMario < 44.5) { 
           
            mario.src = 'imagens/mario.gif';
            mario.style.left = '0px';
            mario.style.width = '120px';

            mario.classList.add('soma-ponto');
        }

    }
    console.log("Mario: " + mario.offsetWidth + "\nBarril: " + posicaoBarril);

    if (posicaoBarril <= 105 && posicaoBottomMario < 113 && posicaoBarril > 0) {
        const nuvens = document.querySelectorAll('#nuvem');
        const chaos = document.querySelectorAll('#chao-l, #chao-r');
        const arbustos = document.querySelectorAll('#arbusto-medio');
        const macas = document.querySelectorAll('#maca');
        const perdeu = new Audio('perdeu.m4a');

        nuvens.forEach((nuvem) => {
            nuvem.style.animationPlayState = 'paused';
        });

        chaos.forEach((chao) => {
            chao.style.animationPlayState = 'paused';
        });

        arbustos.forEach((arbustos) => {
            arbustos.style.animationPlayState = 'paused';
        });

        macas.forEach((maca) => {
            maca.style.animationPlayState = 'paused';
        });

        document.getElementById('reload').style.display = 'block';

        document.getElementById('reload').addEventListener('click', function() {
            location.reload();
        });
        

        mario.classList.remove('soma-ponto');
        pontos.innerHTML = pontuacao;

        barril.style.animation = 'none';
        mario.style.animation = 'none';
        barril.style.left = `${posicaoBarril}px`;

        mario.src = '../imagens/game-over.png';
        mario.style.bottom = `${posicaoBottomMario}px`;
        mario.style.left = '50px';
        
        mario.style.width = '60px';

        mario.style.animation = 'game-over 1s ease-in-out 1s forwards';

        audio.pause();
        perdeu.play();

        clearInterval(loop);
    }
}, 0.2);