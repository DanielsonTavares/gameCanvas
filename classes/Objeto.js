class Objeto{
    constructor({position, velocidade, color, tamanho}){

        this.position = position;
        this.tamanho = tamanho;
        this.color = color;
        this.velocidade = velocidade || {x:0, y:0};
    }

    draw(){
        //  ctx.fillStyle = this.color;
        //  ctx.fillRect(this.position.x, this.position.y, this.tamanho.width, this.tamanho.height);

         ctx.fillStyle = this.color;
         ctx.fillRect(this.position.x, this.position.y, this.tamanho.width, this.tamanho.height);

         this.position.x += this.velocidade.x
         this.position.y += this.velocidade.y
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

        this.velocidade.x = -5.5 * this.direcao.x
        this.velocidade.y = -5.5 * this.direcao.y

        super.update();

    }
}

class Char extends Objeto{
    constructor({position, velocidade, color, tamanho}){
        super({position, velocidade, color, tamanho})

        
        this.projetil = {
            x: 0, 
            y: 0, 
            width: 0, 
            height: 0,
            visivel: false,
            widthDefault: 100,
            heightDefault: 60
        };

        this.disparo = 0;

        this.direcao = {
            cima: 0,
            direita:1,
            baixo:0,
            esquerda:0
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

    checkDirecao(){

        // if(this.direcao.cima == 1){
        //     this.projetil.y = this.position.y-this.tamanho.height;
        //     this.projetil.x = this.position.x+ this.projetil.widthDefault/4;
        //     this.projetil.width = this.projetil.heightDefault;
        //     this.projetil.height = this.projetil.widthDefault;
        // } else if(this.direcao.direita == 1){
        //     this.projetil.y = this.position.y-this.projetil.heightDefault/2;
        //     this.projetil.x = this.position.x + this.tamanho.width
        //     this.projetil.width = this.projetil.widthDefault;
        //     this.projetil.height = this.projetil.heightDefault;
        // }else if (this.direcao.baixo == 1){
        //     this.projetil.y = this.position.y+this.tamanho.height/2;
        //     this.projetil.x = this.position.x+this.tamanho.width/4;
        //     this.projetil.width = this.projetil.heightDefault;
        //     this.projetil.height = this.projetil.widthDefault;
        // }else if(this.direcao.esquerda == 1){
        //     this.projetil.y = this.position.y-this.projetil.heightDefault/2;
        //     this.projetil.x = this.position.x;
        //     this.projetil.width = -this.projetil.widthDefault;
        //     this.projetil.height = this.projetil.heightDefault;
        // }


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

    draw(){
        super.draw();

        this.x += this.velocidade.x
        this.y += this.velocidade.y

        this.velocidade.x = 0
        this.velocidade.y = 0 //Desabilitar para ter o efeito da gravidade

        if(this.projetil.visivel){
            ctx.fillStyle = "#FF0000";
            //ctx.fillRect(this.projetil.x, this.projetil.y+this.tamanho.height/2, this.projetil.width, this.projetil.height);
            ctx.fillRect(this.projetil.x, this.projetil.y, this.projetil.width, this.projetil.height);
        }
        

    }

    update(){
        super.update();

        // Gravidade
        // if (this.position.y + this.height + this.velocidade.y >= canvas.height-140) {
        //     this.velocidade.y = 0
        // } else this.velocidade.y += gravity

        this.checkDirecao();

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