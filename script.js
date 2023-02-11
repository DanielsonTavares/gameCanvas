const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gravity = 0; //setar 0.7 para efeito de gravidade

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    },
    ArrowUp: {
      pressed: false
    },
    ArrowDown: {
      pressed: false
    }
  }

const char2 = new Char({
  position: {x:100, y:300},
  tamanho: {width:30, height:50},
  velocidadePadraoMovimento: 3,
  color: '#FFFF00'
});


const enemy = new Objeto({
position: {
  x: 900,
  y: 200
},
tamanho: {
  width: 10,
  height:20
},
color: '#ff0000',
velocidade: {
  x: 0,
  y: 0
}
}
);

const listaObjetos = []

listaObjetos.push(new ObjetoErrante({
  position: {
    x: 950,
    y: 300
  },
  tamanho: {
    width: 10,
    height:10
  },
  color: '#fa0',
  velocidade: {
    x: 0,
    y: 0,
    v: -1
  },
  direcao: {
    x: -1,
    y: 1
  }
}));

listaObjetos.push(new ObjetoErrante({
  position: {
    x: 700,
    y: 100
  },
  tamanho: {
    width: 10,
    height:10
  },
  color: '#fa0',
  velocidade: {
    x: 0,
    y: 0,
    v: -1
  },
  direcao: {
    x: -1,
    y: -1
  }
}));

listaObjetos.push(new ObjetoErrante({
  position: {
    x: 800,
    y: 300
  },
  tamanho: {
    width: 10,
    height:10
  },
  color: '#fa0',
  velocidade: {
    x: 0,
    y: 0,
    v: -0.9
  },
  direcao: {
    x: -1,
    y: -1
  }
}));


function animate(){
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    char2.update();
    enemy.update();
    
    listaObjetos.forEach((o)=>{
      o.update();
    })
}

animate();




window.addEventListener('keydown', (event) => {
    
      switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          char2.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          char2.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          keys.ArrowUp.pressed = true
          char2.lastKey = 'ArrowUp'
          break
        case 'ArrowDown':
          keys.ArrowDown.pressed = true
          char2.lastKey = 'ArrowDown'
          break
        case 'q':
          console.log('Botao q');
          char2.skill.teleporte();
          // char2.skill.e.visivel = true;
          // setTimeout(()=>{
          //   char2.skill.e.visivel = false
          // }, 5)
          break
        case 'w':
          char2.skill.w.visivel = true;
          setTimeout(()=>{
            char2.skill.w.visivel = false
          }, 2000)
        break
          case 'e':
            console.log('Botao e');
          break
        case ' ':
          char2.projetil.visivel = true;
          setTimeout(()=>{
            char2.projetil.visivel = false
          }, 200)
          break
      }

    });

window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
      case 'ArrowUp':
        keys.ArrowUp.pressed = false
        break
      case 'ArrowDown':
        keys.ArrowDown.pressed = false
        break
    }
  
  })