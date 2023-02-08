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
  position: {x:0, y:300},
  tamanho: {width:30, height:50},
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
color: '#fa0',
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
    y: 0
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
    y: 0
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
    y: 0
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
    
    
    
    


    if(keys.ArrowLeft.pressed && keys.ArrowUp.pressed){
      char2.velocidade.x = -5
      char2.velocidade.y = -5
    }

    if(keys.ArrowLeft.pressed && keys.ArrowDown.pressed){
      char2.velocidade.x = -5
      char2.velocidade.y = 5
    }

    if(keys.ArrowRight.pressed && keys.ArrowUp.pressed){
      char2.velocidade.x = 5
      char2.velocidade.y = -5
    }

    if(keys.ArrowRight.pressed && keys.ArrowDown.pressed){
      char2.velocidade.x = 5
      char2.velocidade.y = 5
    }


    // Ao movimentar na diagonal, o lastKey impede que o objeto continue se
    // se movimentando ao soltar uma das direções

    // if (keys.ArrowLeft.pressed && char.lastKey === 'ArrowLeft') {
    //     char.velocity.x = -5
    
    // } else if (keys.ArrowRight.pressed && char.lastKey === 'ArrowRight') {
    //     char.velocity.x = 5

    // } else if (keys.ArrowUp.pressed && char.lastKey === 'ArrowUp') {
    //   char.velocity.y = -5

    // } else if (keys.ArrowDown.pressed && char.lastKey === 'ArrowDown') {
    //   char.velocity.y = 5
    // } 

    if (keys.ArrowLeft.pressed ) {
        char2.velocidade.x = -5
        char2.setDirecao('esquerda')
    
    } else if (keys.ArrowRight.pressed ) {
        char2.velocidade.x = 5
        char2.setDirecao('direita')

    } else if (keys.ArrowUp.pressed ) {
      char2.velocidade.y = -5
      char2.setDirecao('cima')

    } else if (keys.ArrowDown.pressed ) {
      char2.velocidade.y = 5
      char2.setDirecao('baixo')
    } 
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
        case 'w':
          char2.velocity.y = -20
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