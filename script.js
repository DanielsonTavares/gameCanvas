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

const char = {
    x: 0, 
    y: 100,
    width: 40,
    height: 40,
    lastKey: undefined,
    velocity: {x: 0, y: 0},
    
    draw: function (){
        
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(char.x, char.y, this.width, this.height);
    },
    update: function (){
        this.draw();
        this.x += this.velocity.x
        this.y += this.velocity.y
        
        this.velocity.x = 0
        this.velocity.y = 0 //Desabilitar para ter o efeito da gravidade



        // Gravidade
        // if (this.y + this.height + this.velocity.y >= canvas.height-140) {
        //     this.velocity.y = 0
        // } else this.velocity.y += gravity

        // Colisão com os limites da tela
        if(this.y <= 0){
          this.y = 0;
        }

        if(this.x <= 0){
          this.x = 0;
        }

        if(this.y+this.height >= canvas.height){
          this.y = canvas.height-this.height;
        }

        if(this.x+this.width >= canvas.width){
          this.x = canvas.width-this.width;
        }

    }
};

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

const enemyErrante1 = new ObjetoErrante({
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
});

const enemyErrante2 = new ObjetoErrante({
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
});

function animate(){
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    char.update();
    enemy.update();
    enemyErrante1.update();
    enemyErrante2.update();
    
    if(keys.ArrowLeft.pressed && keys.ArrowUp.pressed){
      char.velocity.x = -5
      char.velocity.y = -5
    }

    if(keys.ArrowLeft.pressed && keys.ArrowDown.pressed){
      char.velocity.x = -5
      char.velocity.y = 5
    }

    if(keys.ArrowRight.pressed && keys.ArrowUp.pressed){
      char.velocity.x = 5
      char.velocity.y = -5
    }

    if(keys.ArrowRight.pressed && keys.ArrowDown.pressed){
      char.velocity.x = 5
      char.velocity.y = 5
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
        char.velocity.x = -5
    
    } else if (keys.ArrowRight.pressed ) {
        char.velocity.x = 5

    } else if (keys.ArrowUp.pressed ) {
      char.velocity.y = -5

    } else if (keys.ArrowDown.pressed ) {
      char.velocity.y = 5
    } 
}

animate();




window.addEventListener('keydown', (event) => {
    
      switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          char.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          char.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          keys.ArrowUp.pressed = true
          char.lastKey = 'ArrowUp'
          break
        case 'ArrowDown':
          keys.ArrowDown.pressed = true
          char.lastKey = 'ArrowDown'
          break
        case 'w':
          char.velocity.y = -20
          break
        case ' ':
          console.log('attack successul');
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