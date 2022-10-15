var contexto = document.getElementById("lienzojuego")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;
//variables
var score= 0
 var FPS= 60
 var gravedad=1.5
var personaje =  {
    x:50,
    y:150,
    width:50,
    height:50
}
var tuberias= new Array()
tuberias[0]={
    x:contexto.width,
    y:0
}
//variables audios
var punto= new Audio()
punto.src="audios/punto.mp3"

//variables imagenes
var husky=new Image()
husky.src ="imagenes/husky1.png"

var background=new Image()
background.src ="imagenes/fondo.jpg"

var tuberiasur=new Image()
tuberiasur.src ="imagenes/tuberiasur1.png"

var tuberianorte=new Image()
tuberianorte.src ="imagenes/tuberianorte1.png"

var suelo=new Image()
suelo.src ="imagenes/suelo.png"



    //CONTROL
    function presionar(){
        personaje.y -=35
    }
    resize()
    function resize(){
        CANVAS_HEIGHT = window.innerHeight;
        CANVAS_WIDTH = window.innerWidth;

        contexto.width = WIDTH;
        contexto.height = HEIGHT;

        contexto.style.height = ""+CANVAS_HEIGHT+"px";
        //contexto.style.height = ""+CANVAS_WIDTH+"px";

    }

//bucle//
setInterval(loop,1000/FPS)
function loop() {
    ctx.clearRect(0,0,300,530)
    
//fondo
ctx.drawImage(background,0,0)
ctx.drawImage(suelo,0,contexto.height - suelo.height)

//personaje
ctx.drawImage(husky,personaje.x,personaje.y)

//tuberias
for(i=0; i< tuberias.length; i++){
    var constante = tuberianorte.height + 100
    ctx.drawImage(tuberianorte,tuberias[i].x,tuberias[i].y)
    ctx.drawImage(tuberiasur,tuberias[i].x,tuberias[i].y + constante)
tuberias[i].x--
if(tuberias[i].y+tuberianorte.height < 100){
    tuberias[i].y=0
}
if(tuberias[i].x==150){
   tuberias.push({
       x:contexto.width,
       y:Math.floor(Math.random()*tuberianorte.height) - tuberianorte.height
   })
}
//colisiones
if(personaje.x + husky.width >= tuberias[i].x && 
    personaje.x <= tuberias[i].x + tuberianorte.width &&
    (personaje.y <= tuberias[i].y + tuberianorte.height || 
        personaje.y + husky.height >= tuberias[i].y + constante)
        || personaje.y + husky.height >= contexto.heigt- suelo.height){
            location.reload()
  
}
if(tuberias[i].x==50){
    score++
    punto.play()
}
}


//condiciones
personaje.y += gravedad
ctx.fillStyle="rgba(0,0,0,1)"
ctx.font = "20px Arial"
ctx.fillText("Score: "+score,10,contexto.height - 500)
}


//eventos

window.addEventListener("resize",resize)
 window.addEventListener("keydown",presionar)


//Cuando escribí este código, solo Dios y yo entendimos lo que hice. Ahora solo Dios lo sabe

