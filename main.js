var clock =0

var Hp = 100
var score = 0
var money = 50
var FPS = 70;
var bgImg = document.createElement("img");
var eImg = document.createElement("img");
var bgimg = document.createElement("img");
var towerImg = document.createElement("img");
var shootImg = document.createElement("img");

bgImg.src = "images/kk.png";
eImg.src = "images/jason.gif"
bgimg.src = "images/tower-btn.png";
towerImg.src = "images/daigh.gif";
shootImg.src = "images/crosshair.png";

var canvas = document.getElementById("gamecanvas");function draw() {
	clock++;
	if ((clock%80)==0) {
		var newEnemy = new Enemy();
		enemies.push(newEnemy)

	}
		
		ctx.drawImage(bgImg,0,0);
	for(var i = 0; i < enemies.length; i++){
		if(enemies[i].Hp <= 0){
			enemies.splice(i, 1);
			score += 10;
			money += 30;
		}else{
			enemies[i].imove();	
			ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
		}
	}
	ctx.drawImage(bgimg,640-64,480-64,64,64);
	if(build == true){
		ctx.drawImage(towerImg,move.x-move.x%32,move.y-move.y%32);
	}
	for(var i = 0; i < towers.length; i++){
		ctx.drawImage(towerImg,towers[i].x,towers[i].y);
		towers[i].searchEnemy();
		if(towers[i].aimingEnemyId != null){
			var id = towers[i].aimingEnemyId;
			ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y)
		}
	}
	ctx.font = "30px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Hp:" + Hp,32,30);
	ctx.fillText("score:" + score,32,70);
	ctx.fillText("money:" + money,190,30);
	if (Hp<=0) {
		clearInterval(IntervalID)
		ctx.fillText("gameover",220,200);
	}
};
	
	

var ctx = canvas.getContext("2d");


	

var IntervalID = setInterval( draw, 1000/FPS)

var enemypath = [
	{x: 96,y: 64 },
	{x: 288,y: 64 },
	{x: 288,y: 352 },
	{x: 512,y: 352 },
	{x: 512,y: 32 }
];



function Enemy(){
	this.x = 96;
	this.y = 448;
	this.Hp = 9;
	this.speedX = 0;
	this.speedY = -64;
	this.pathDes = 0;
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
 			if (this.pathDes == enemypath.length) {
 				this.Hp = 0;
 				Hp-= 10;
 				return;
 			}

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
};

var enemies = [] 

$("#gamecanvas").on("mousemove",mouse)

function mouse (event){
	
	move.x = event.offsetX
	move.y = event.offsetY
}
var move={x:300, y:100}
var build =false

function Tower() {
	this. shoot = function(id){
		ctx.beginPath();
		ctx.moveTo(this.x+15,this.y+15);
		ctx.lineTo(enemies[id].x,enemies[id].y);
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 3;
		ctx.stroke()
		enemies[id].Hp -= this.damage
	},
	this.fireRate = 2,
	this.readyToShootTime=2, 
	this.damage=3,
	this.x = 0,
    this.y = 0,
    this.range = 100,
    this.aimingenemyID= null,
	this.searchEnemy = function  (){
		this.readyToShootTime -= 1/FPS
		for(var i=0; i<enemies.length; i++){	
	 		var distance = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
			if (distance<=this.range) {
				this.aimingenemyID = i;
				if (this.readyToShootTime <= 0) {
					this.shoot(i);
					this.readyToShootTime = this.fireRate
				}
				return;
			}
 		}
	    // 如果都沒找到，會進到這行，清除鎖定的目標
 		this.aimingenemyID = null;
	};

};
var towers = [];

$("#gamecanvas").on("click",isbuild)

function isbuild (event){
	
	if (event.offsetX>576 &&event.offsetY>416) {
		build = true
	}else{
		//蓋塔
		if (money>=20) {
			money -= 20
			if (build == true) {
				var newTower = new Tower();
				newTower.x = move.x - move.x%32;
				newTower.y = move.y - move.y%32;
				towers.push(newTower);
			}
		}

		build = false
	}
};

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
};