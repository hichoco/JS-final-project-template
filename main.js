var clock =0

var hp = 100

var FPS = 70;
var bgImg = document.createElement("img");
var eImg = document.createElement("img");
var bgim = document.createElement("img");
var towerImg = document.createElement("img");
var shootImg = document.createElement("img");

bgImg.src = "images/kk.png";
eImg.src = "images/jason.gif"
bgim.src = "images/tower-btn.png";
towerImg.src = "images/daigh.gif";
shootImg.src = "images/crosshair.png";

var canvas = document.getElementById("gamecanvas");

var ctx = canvas.getContext("2d");

function draw() {
	clock++;
	if ((clock%80)==0) {
		var newEnemy = new Enemy();
		enemies.push(newEnemy)

	}
		
	ctx.drawImage(bgImg,0,0);
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].Hp <= 0) {
			enemies.splice(i,1);
		}else{
			enemies[i].imove();
			ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
		}
	}
	tower.searchEnemy()

	ctx.drawImage(bgim,640-64,480-64,64,64);
	if (build == true) {
		ctx.drawImage(towerImg,move.x,move.y);

	}else{
 	ctx.drawImage(towerImg,tower.x,tower.y);
	}
	ctx.font = "35px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Hp:" + hp,32,30);
	if (tower.aimingenemyID != null) {
		var id = tower.aimingenemyID
		ctx.drawImage(shootImg,enemies[id].x,enemies[id].y)
	}
}
	
	

setInterval( draw, 1000/FPS)

var enemypath = [
	{x: 96,y: 64 },
	{x: 288,y: 64 },
	{x: 288,y: 352 },
	{x: 512,y: 352 },
	{x: 512,y: 32 }
];



function Enemy(){
	this.x = 96,
	this.y = 448,
	this.Hp = 10;
	this.speedX = 0,
	this.speedY = -64,
	this.pathDes = 0,
	this.imove = function(){
 		if (isCollided(enemypath[this.pathDes].x,
		 		enemypath[this.pathDes].y,
		  		this.x,
		   		this.y,
				64/FPS,
		 		64/FPS)) {

 			this.x = enemypath[this.pathDes].x;
 			this.y = enemypath[this.pathDes].y;

 			this.pathDes++;

 			if (this.x < enemypath[this.pathDes].x) {
 						this.speedX = 64
 						this.speedY = 0
			} else if (this.x > enemypath[this.pathDes].x){
						this.speedX = -64
 						this.speedY = 0
			} else if (this.y < enemypath[this.pathDes].y) {
						this.speedX = 0
 						this.speedY = 64
			} else if (this.y > enemypath[this.pathDes].y) {
						this.speedX = 0
 						this.speedY = -64

			}
		}else{

			this.x += this.speedX/FPS;
			this.y += this.speedY/FPS;

		}
		
	}
}

var enemies = [] 

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
    range : 100,
    aimingenemyID: null,
	searchEnemy: function(){
		for(var i=0; i<enemies.length; i++){	
	 		var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingenemyID = i;
				return;
			}
 		}
	    // 如果都沒找到，會進到這行，清除鎖定的目標
 		this.aimingenemyID = null;
	}

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

function isCollided(pointX,pointY, targetX, targetY, targetwidth, targetheight){
	//如果在框框裡面
	if (targetX <= pointX &&
				   pointX<= targetX + targetwidth  &&
		targetY <= pointY &&
				   pointY<= targetY + targetheight) {
		return true;
	} else {
		return false;
}

}