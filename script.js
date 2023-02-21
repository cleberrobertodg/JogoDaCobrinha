// Define a variável canvas como o elemento HTML com id "snake"
let canvas = document.getElementById("snake");

// Cria um contexto 2D para o canvas
let context = canvas.getContext("2d");

// Define o tamanho de cada quadrado da cobrinha
let box = 32;

// Cria um array para guardar as posições da cobrinha
let snake = [];

// Define a posição inicial da cabeça da cobrinha
snake[0] = {
x: 8 * box,
y: 8 * box
}

// Define a pontuação inicial como 0
let pontos = 0;

// Define a velocidade inicial da cobrinha
let velocidade = 100;

// Cria um elemento HTML <span> para mostrar a pontuação
let scoreElement = document.createElement("span");

// Define o texto inicial do elemento scoreElement
scoreElement.textContent = "Pontos: 0";

// Adiciona o elemento scoreElement como um filho do elemento HTML com id "score"
document.getElementById("score").appendChild(scoreElement);

// Define o estilo do elemento scoreElement
scoreElement.style.color = "White";
scoreElement.style.fontSize = "24px";
scoreElement.style.fontFamily = "Arial";

// Define a direção inicial da cobrinha
let direction = "right";

// Cria um objeto para guardar a posição da comida
let food = {
x: Math.floor(Math.random() * 15 + 1) * box,
y: Math.floor(Math.random() * 15 + 1) * box
}

// Define a função para criar o background do jogo
function criarBG(){
context.fillStyle = "lightblue";
context.fillRect(0, 0, 16 * box, 16* box);
}

// Define a função para criar a cobrinha na tela
function criarCobrinha(){
for(i=0; i < snake.length; i++) {
context.fillStyle = "green";
context.fillRect(snake[i].x, snake[i].y, box, box);
}
}

// Define a função para desenhar a comida na tela
function drawFood(){
context.fillStyle = "red"
context.beginPath();
    context.arc(food.x + box/2, food.y + box/2, box/2, 0, 2*Math.PI);
    context.fill();
}

// Adiciona um evento para capturar as teclas do usuário
document.addEventListener('keydown', update);

// Define a função para atualizar a direção da cobrinha
function update (event){
if(event.keyCode == 37 && direction != "right") direction = "left";
if(event.keyCode == 38 && direction != "down") direction = "up";
if(event.keyCode == 39 && direction != "left") direction = "right";
if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Define a função para iniciar o jogo
function iniciarJogo(){

    
        if(snake[0].x >15 * box && direction == "right") snake[0].x = 0;
        if(snake[0].x <0 && direction == "left") snake[0].x = 16 * box;
        if(snake[0].y >15 * box && direction == "down") snake[0].y = 0;
        if(snake[0].y <0 && direction == "up") snake[0].y = 16 * box;


//Verifica se a cobrinha colidiu com o próprio corpo
        for(i = 1; i < snake.length; i++){
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                clearInterval(jogo);
                alert('Perdeu Playboy, sua pontuação foi de: ' + pontos + ' pontos. De ok, e após isso F5 para iniciar novo jogo')
            }
        }

        criarBG(); // função que cria o fundo do jogo, que é uma tela retangular preenchida com a cor "lightblue".
        criarCobrinha(); //função que desenha a cobrinha na tela, onde a variável snake é um array que contém objetos com as coordenadas x e y de cada parte da cobrinha, e cada parte é desenhada com a cor "green" utilizando o método fillRect() do contexto 2D do canvas.
        drawFood(); //função que desenha a comida na tela, onde a variável food é um objeto com as coordenadas x e y da comida, e é desenhada com a cor "red" utilizando o método fillRect() do contexto 2D do canvas.

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if (direction =="right") snakeX+= box;
        if (direction =="left") snakeX-= box;
        if (direction =="up") snakeY-= box;
        if (direction =="down") snakeY+= box;

        if(snakeX != food.x || snakeY != food.y){

            snake.pop();
        }

        else{food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
            pontos +=10;
            scoreElement.textContent = "Pontos: " + pontos;

            //Aumenta a velocidade da cobrinha a cada vez que come o alimento
            velocidade -= 3;
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, velocidade);
        }

        

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);
    }

    let jogo =setInterval(iniciarJogo, 100);