class Objeto{
    

    constructor({position, velocidade, color, tamanho}){

        this.position = position;
        this.tamanho = tamanho;
        this.color = color;
        this.velocidade = velocidade || {x:0, y:0};
    }

    

    draw(){
         ctx.fillStyle = this.color;
         ctx.fillRect(this.position.x, this.position.y, this.tamanho.width, this.tamanho.height);

         this.position.x += this.velocidade.x;
         this.position.y += this.velocidade.y;
    }

    update(){
        this.draw();
    }
}


class ObjetoErrante extends Objeto{
    constructor({position, velocidade, color, tamanho, direcao}){
        super({position, velocidade, color, tamanho})
        this.direcao = direcao;
        
    }



    update(){
        super.update();


        if(this.position.x <= 0){
            this.direcao.x = -1;
        }else if(this.position.x >= 1024){
            this.direcao.x = 1;
        }

        if(this.position.y <= 0){
            this.direcao.y = -1;
        }else if(this.position.y >= 576){
            this.direcao.y = 1;
        }

        this.velocidade.x = this.velocidade.v * this.direcao.x
        this.velocidade.y = this.velocidade.v * this.direcao.y

    }
}

class Enemy extends Objeto{

    constructor({position, velocidadePadraoMovimento, color, tamanho, hero}){
        super({position,  color, tamanho})

        this.velocidadePadraoMovimento = velocidadePadraoMovimento;
        this.hero = hero;
    }

    update(){
        super.update();
        this.move();
    }
    move = ()=>{
        let dx = this.position.x - this.hero.position.x;
        let dy = this.position.y - this.hero.position.y;
        
          if(dy <= 0){
            this.position.y += this.velocidadePadraoMovimento
          }
        
          if(dy >= 0){
            this.position.y -= this.velocidadePadraoMovimento
          }
      
          if(dx <= 0){
            this.position.x += this.velocidadePadraoMovimento
          }
      
          if(dx >= 0){
            this.position.x -=this.velocidadePadraoMovimento
          }
        
      }
}

class Char extends Objeto{
    constructor({position, velocidadePadraoMovimento, color, tamanho}){
        super({position,  color, tamanho})

        
        this.projetil = {
            x: 0, 
            y: 0, 
            width: 0, 
            height: 0,
            visivel: false,
            widthDefault: 100,
            heightDefault: 60
        };

        this.velocidadePadraoMovimento = velocidadePadraoMovimento;
        

        this.direcao = {
            cima: 0,
            direita:1,
            baixo:0,
            esquerda:0
        }


        this.skill = {
            w: {visivel: false},
            e: {visivel: false},
            bonus: {velocidade: velocidadePadraoMovimento},
        
            teleporte: ()=>{
                if(this.direcao.direita == 1){
                    this.position.x += 200;
                }else if(this.direcao.esquerda == 1){
                    this.position.x -= 200;
                }if(this.direcao.cima == 1){
                    this.position.y -= 200;
                }if(this.direcao.baixo == 1){
                    this.position.y += 200;
                }
            }
        
        }

        //this.disparo = 0;


        this.grid = {}
    }

    drawSkill(skillAtributos){
        
        if(this.skill.w.visivel){
            
            this.velocidadePadraoMovimento = this.skill.bonus.velocidade*skillAtributos.velocidade;
            
            ctx.globalCompositeOperation='destination-over'; //para renderizar por tras do char
            // ctx.fillStyle = "#0000FF";
            // ctx.globalAlpha = 0.2;
            // ctx.fillRect((this.position.x+this.tamanho.width/2)-skill.w/2, (this.position.y+this.tamanho.height/2)-skill.h/2, skill.w, skill.h);
            // ctx.globalAlpha = 1.0;

            ctx.fillStyle = "#0000FF";
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc((this.position.x+this.tamanho.width/2), (this.position.y+this.tamanho.height/2), skillAtributos.raio, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }else{
            this.velocidadePadraoMovimento = this.skill.bonus.velocidade;
        }


    }
    
    draw(){
        super.draw();

        if(this.projetil.visivel){
            ctx.fillStyle = "#FF0000";
            //ctx.fillRect(this.projetil.x, this.projetil.y+this.tamanho.height/2, this.projetil.width, this.projetil.height);
            ctx.fillRect(this.projetil.x, this.projetil.y, this.projetil.width, this.projetil.height);
        }

        this.drawSkill({raio: 100, velocidade: 2.0}); 
        
        
        
         this.velocidade.x = 0
         this.velocidade.y = 0 //Desabilitar para ter o efeito da gravidade        
    }

    update(){
        super.update();

        // Gravidade
        // if (this.position.y + this.height + this.velocidade.y >= canvas.height-140) {
        //     this.velocidade.y = 0
        // } else this.velocidade.y += gravity

        this.checkDirecao();
        
        this.movimentacao();

        this.colisao();
        
    }




    checkDirecao(){

        if(this.direcao.cima == 1){
            this.projetil.y = this.position.y-this.projetil.height;  
            this.projetil.x = this.position.x + this.tamanho.width/2 - (this.projetil.width/2);
            this.projetil.width = this.projetil.heightDefault;
            this.projetil.height = this.projetil.widthDefault;
        } else if(this.direcao.direita == 1){
            this.projetil.y = this.position.y + this.tamanho.height/2 - (this.projetil.height/2);
            this.projetil.x = this.position.x + this.tamanho.width
            this.projetil.width = this.projetil.widthDefault;
            this.projetil.height = this.projetil.heightDefault;
        }else if (this.direcao.baixo == 1){
            this.projetil.y = this.position.y+this.tamanho.height;
            this.projetil.x = this.position.x + this.tamanho.width/2 - (this.projetil.width/2);
            this.projetil.width = this.projetil.heightDefault;
            this.projetil.height = this.projetil.widthDefault;
        }else if(this.direcao.esquerda == 1){
            this.projetil.y = this.position.y + this.tamanho.height/2 - (this.projetil.height/2);
            this.projetil.x = this.position.x;
            this.projetil.width = -this.projetil.widthDefault;
            this.projetil.height = this.projetil.heightDefault;
        }

    }

    setDirecao(param){
        switch (param) {
            case 'cima':
                this.direcao.cima = 1;
                this.direcao.direita = 0;
                this.direcao.baixo = 0;
                this.direcao.esquerda = 0;
                break;
            case 'direita':
                this.direcao.cima = 0;
                this.direcao.direita = 1;
                this.direcao.baixo = 0;
                this.direcao.esquerda = 0;
                break;
            case 'baixo':
                this.direcao.cima = 0;
                this.direcao.direita = 0;
                this.direcao.baixo = 1;
                this.direcao.esquerda = 0;
                break;
            case 'esquerda':
                this.direcao.cima = 0;
                this.direcao.direita = 0;
                this.direcao.baixo = 0;
                this.direcao.esquerda = 1;
                break;
            default:
                break;
        }
    }

    movimentacao(){

        if(keys.ArrowLeft.pressed && keys.ArrowUp.pressed){
            this.velocidade.x = -this.velocidadePadraoMovimento
            this.velocidade.y = -this.velocidadePadraoMovimento
          }
      
          if(keys.ArrowLeft.pressed && keys.ArrowDown.pressed){
            this.velocidade.x = -this.velocidadePadraoMovimento
            this.velocidade.y = this.velocidadePadraoMovimento
          }
      
          if(keys.ArrowRight.pressed && keys.ArrowUp.pressed){
            this.velocidade.x = this.velocidadePadraoMovimento
            this.velocidade.y = -this.velocidadePadraoMovimento
          }
      
          if(keys.ArrowRight.pressed && keys.ArrowDown.pressed){
            this.velocidade.x = this.velocidadePadraoMovimento
            this.velocidade.y = this.velocidadePadraoMovimento
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
            this.velocidade.x = -this.velocidadePadraoMovimento
            this.setDirecao('esquerda')
        
        } else if (keys.ArrowRight.pressed ) {
            this.velocidade.x = this.velocidadePadraoMovimento
            this.setDirecao('direita')
    
        } else if (keys.ArrowUp.pressed ) {
          this.velocidade.y = -this.velocidadePadraoMovimento
          this.setDirecao('cima')
    
        } else if (keys.ArrowDown.pressed ) {
          this.velocidade.y = this.velocidadePadraoMovimento
          this.setDirecao('baixo')
        } 
    }

    colisao(){
        // Colisão com os limites da tela
        if(this.position.y <= 0){
            this.position.y = 0;
        }

        if(this.position.x <= 0){
            this.position.x = 0;
        }

        if(this.position.y+this.tamanho.height >= canvas.height){
            this.position.y = canvas.height-this.tamanho.height;
        }

        if(this.position.x+this.tamanho.width >= canvas.width){
            this.position.x = canvas.width-this.tamanho.width;
        }
    }
}