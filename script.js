
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



        // gravity function
        if (this.y + this.height + this.velocity.y >= canvas.height-140) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
};



function animate(){
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    char.update();
    
    
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


    if (keys.ArrowLeft.pressed && char.lastKey === 'ArrowLeft') {
        char.velocity.x = -5
        console.log('move to left');
    
    } else if (keys.ArrowRight.pressed && char.lastKey === 'ArrowRight') {
        char.velocity.x = 5
        console.log('move to right');

    } else if (keys.ArrowUp.pressed && char.lastKey === 'ArrowUp') {
      char.velocity.y = -5
      console.log('move to up');

    } else if (keys.ArrowDown.pressed && char.lastKey === 'ArrowDown') {
      char.velocity.y = 5
      console.log('move to down');
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
            console.log('arrowUp false');
            keys.ArrowUp.pressed = false
            break
          case 'ArrowDown':
            console.log('ArrowDown false');
            keys.ArrowDown.pressed = false
            break
        }
      
      })