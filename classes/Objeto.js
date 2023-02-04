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