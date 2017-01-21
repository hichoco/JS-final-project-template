
var bgImg = document.createElement("img");
var eImg = document.createElement("img");
var bgim = document.createElement("img");
var tower = document.createElement("img");

bgImg.src = "images/map.png";
eImg.src = "images/jason.gif";
bgim.src = "images/tower-btn.png";
tower.src = "images/tower.png";

var canvas = document.getElementById("gamecanvas");

var ctx = canvas.getContext("2d");

function draw() {
 
ctx.drawImage(bgImg,0,0);
ctx.drawImage(eImg,enemy.x,enemy.y);
ctx.drawImage(bgim,640-64,480-64,64,64);
if (build == true) {
ctx.drawImage(tower,move.x,move.y);
}

}

setInterval( draw, 40)

var enemy={
	x: 100,
	y: 450
}

$("#gamecanvas").on("mousemove",mouse)

function mouse (event){
	
	move.x = event.offsetX
	move.y = event.offsetY
}
var move={x:300, y:100}
var build =false

$("#gamecanvas").on("click",isbuild)

function isbuild (event){
	if (event.offsetX>576 &&event.offsetY>416) {
		build = true
	}else{
		build = false
	}
}