var FPS = 70;
var bgImg = document.createElement("img");
var eImg = document.createElement("img");
var bgim = document.createElement("img");
var towerImg = document.createElement("img");

bgImg.src = "images/map.png";
eImg.src = "images/jason.gif";
bgim.src = "images/tower-btn.png";
towerImg.src = "images/tower.png";

var canvas = document.getElementById("gamecanvas");

var ctx = canvas.getContext("2d");

function draw() {
 enemy.imove()
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(eImg,enemy.x,enemy.y);
	ctx.drawImage(bgim,640-64,480-64,64,64);
	if (build == true) {
		ctx.drawImage(towerImg,move.x,move.y);

	}else{
 	ctx.drawImage(towerImg,tower.x,tower.y);
	}

}

setInterval( draw, 1000/FPS)

var enemy={
	x: 100,
	y: 450,
	speedX:0,
	speedY: -64,
	imove: function(){
		this.x = this.x + this.speedX/FPS;
		this.y = this.y + this.speedY/FPS;
	}
}

$("#gamecanvas").on("mousemove",mouse)

function mouse (event){
	
	move.x = event.offsetX
	move.y = event.offsetY
}
var move={x:300, y:100}
var build =false
var tower = {
	x : 0,
    y : 0,	
}

$("#gamecanvas").on("click",isbuild)

function isbuild (event){
	if (event.offsetX>576 &&event.offsetY>416) {
		build = true
	}else{
		if (build == true) {
			tower.x = move.x - move.x%32
			tower.y = move.y - move.y%32
		build = false
		
		}
	}
}