/*
*
*
*
* */

//init canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var targeterPos;
var tlightpos = [-1,-1,-1];
var tfadepos = [-1,-1,-1];
var targeting = false;
var tempString = "";
var dots = [];
var effectOn = false;
var axis;
var direction;

var blockData = [[[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1]],
				 [[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1]],
				 [[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1]],
				 [[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1]],
				 [[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1]]];

var face = 0;
var target = [];
var numBlocksWide = 7;

function initStuff(){
	//init canvas size
	canvas.width = document.body.clientWidth/2;
    canvas.height = document.body.clientHeight;
	
	
	//set up array of dots in isometric pattern
	var dotSpacer = canvas.width/numBlocksWide;
	for(k = 0; k<Math.ceil(canvas.height/(dotSpacer/Math.sqrt(3)/2)); k++){
		dots.push([]);
		for(i = 0; i<=numBlocksWide; i++){
			dots[k].push({
				x: i*dotSpacer + (k%2)*dotSpacer/2,
				y: k*dotSpacer/Math.sqrt(3)/2,
				size: dotSpacer/25
			})
		}
	}
	//draw dots (very cpu intensive)
	/*
	for(l = 0; l<dots.length;l++){
		for(j=0;j<dots[0].length;j++){
			ctx.arc(dots[l][j].x, dots[l][j].y, dots[l][j].size, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'black';
			ctx.fill();
			ctx.closePath();
		}
	}*/
	
	initTarget();
	var currentEffect;
	render();

}
function drawTargeter(){
	tlightpos = [-1,-1,-1];
	tfadepos = [-1,-1,-1];
	//see if anything is in front
	var tPos = [0,0,0];
	tPos[0] = targeterPos[0]+1;
	tPos[1] = targeterPos[1]+1;
	tPos[2] = targeterPos[2]+1;
	var covered= false;
	var ctop = false;
	var cleft = false;
	var cright = false;
	while(tPos[0]<5 && tPos[1]<5 && tPos[2]<5){
		if(blockData[tPos[0]][tPos[1]][tPos[2]]==1){
			covered = true;
			var tempTarget = target;
			face = 0;
			initTarget();
			render();
			target = tempTarget;
			break
		}
		//increment
		tPos[0]++;
		tPos[1]++;
		tPos[2]++;
	}
	//update ctop cleft cright
	if(targeterPos[0]<4&&blockData[targeterPos[0]+1][targeterPos[1]][targeterPos[2]]==1){
		ctop = true;
	}
	if(targeterPos[1]<4&&blockData[targeterPos[0]][targeterPos[1]+1][targeterPos[2]]==1){
		cleft = true;
	}
	if(targeterPos[2]<4&&blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]+1]==1){
		cright = true;
	}
	if(ctop && cright && cleft){
		covered = true;
	}
	if(covered){
		//target is a block
		if(blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]]==1){
			//faded out grey overlay
			ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
			ctx.beginPath();
			ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
			ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
			ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
			ctx.closePath();
			ctx.fill();
			//left face
			ctx.beginPath();
			ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
			ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
			ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
			ctx.closePath();
			ctx.fill();
			//right face
			ctx.beginPath();
			ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
			ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
			ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
			ctx.closePath();
			ctx.fill();
		}else{
			//grey outline
			ctx.strokeStyle = 'rgba(100, 100, 100, 0.75)';
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
			ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
			ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
			ctx.closePath();
			ctx.stroke();
			//left face
			ctx.beginPath();
			ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
			ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
			ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
			ctx.closePath();
			ctx.stroke();
			//right face
			ctx.beginPath();
			ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
			ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
			ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
			ctx.closePath();
			ctx.stroke();
			//back corner
			ctx.beginPath();
			ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
			ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
			ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
			ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
			ctx.closePath();
			ctx.stroke();
		}
		ctx.strokeStyle = '#bcbcbc';
	}else{
		//target is a block
		if(blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]]==1){
			//light up block
			tlightpos = JSON.parse(JSON.stringify(targeterPos));
			//console.log(tlightpos);
			var tempTarget = target;
			face = 0;
			initTarget();
			render();
			target = tempTarget;
		}else{
			//Faded block
			tfadepos = JSON.parse(JSON.stringify(targeterPos));
			//console.log(tfadepos);
			var tempTarget = target;
			face = 0;
			initTarget();
			render();
			target = tempTarget;
			/*
			if(ctop===false){
				//top face
				ctx.fillStyle = 'rgba(137,202,196, 0.75)';
				ctx.beginPath();
				ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
				ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
				ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
				ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
				ctx.closePath();
				ctx.fill();
			}
			if(cleft===false){
				//left face
				ctx.fillStyle = 'rgba(54,85,142, 0.75)';
				ctx.beginPath();
				ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
				ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
				ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
				ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
				ctx.closePath();
				ctx.fill();
			}
			if(cright===false){
				//right face
				ctx.fillStyle = 'rgba(246,248,198, 0.75)';
				ctx.beginPath();
				ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
				ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
				ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
				ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
				ctx.closePath();
				ctx.fill();
			}*/

		}

	}



}
function initTargeter(){
	initTarget();
	targeterPos = [0,0,0];//face,row,column
	drawTargeter();
}
function switchStuff(effectFunc){
	targeting = false;
	if(effectOn){
		clearInterval(currentEffect);
	}else{
		currentEffect = setInterval(effectFunc,200);
	}
	effectOn = !effectOn;
}
function initTarget(){
	target = [[0,1],[1,0],[1,1],[2,1],[3,0],[3,1],[4,1]];
	for(var q = 0; q<8; q++){
		moveTarget('c');
	}
	for(var r = 0; r<3; r++){
		moveTarget('r');
	}
	for(var s = 0; s<1; s++){
		moveTarget('f');
	}
}
function render(){
	//clear canvas
	ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eaffff';
    ctx.fill();
	//call render stuff
	for(var f = 0; f<blockData.length; f++){
		renderBlocks();
	}
}
function draw(){
	ctx.lineWidth = 0.5;
	//top face
	ctx.fillStyle = '#89CAC4';
	ctx.strokeStyle ='#89CAC4';
	ctx.beginPath();
	ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
	ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	//left face
	ctx.fillStyle = '#36558E';
	ctx.strokeStyle ='#36558E';
	ctx.beginPath();
	ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	//right face
	ctx.fillStyle = '#F6F8C6';
	ctx.strokeStyle = '#F6F8C6';
	ctx.beginPath();
	ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}
function drawBright(){
	//top face
	ctx.fillStyle = 'rgba(147,212,206, 1)';
	ctx.beginPath();
	ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
	ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.closePath();
	ctx.fill();
	//left face
	ctx.fillStyle = 'rgba(64,95,152, 1)';
	ctx.beginPath();
	ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
	ctx.closePath();
	ctx.fill();
	//right face
	ctx.fillStyle = 'rgba(255,255,208, 1)';
	ctx.beginPath();
	ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.closePath();
	ctx.fill();
}
function drawFaded(){
	//top face
	ctx.fillStyle = 'rgba(137,202,196, 0.75)';
	ctx.beginPath();
	ctx.moveTo(dots[target[0][0]][target[0][1]].x, dots[target[0][0]][target[0][1]].y);
	ctx.lineTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.closePath();
	ctx.fill();
	//left face
	ctx.fillStyle = 'rgba(54,85,142, 0.75)';
	ctx.beginPath();
	ctx.moveTo(dots[target[1][0]][target[1][1]].x, dots[target[1][0]][target[1][1]].y);
	ctx.lineTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.lineTo(dots[target[4][0]][target[4][1]].x, dots[target[4][0]][target[4][1]].y);
	ctx.closePath();
	ctx.fill();
	//right face
	ctx.fillStyle = 'rgba(246,248,198, 0.75)';
	ctx.beginPath();
	ctx.moveTo(dots[target[3][0]][target[3][1]].x, dots[target[3][0]][target[3][1]].y);
	ctx.lineTo(dots[target[2][0]][target[2][1]].x, dots[target[2][0]][target[2][1]].y);
	ctx.lineTo(dots[target[5][0]][target[5][1]].x, dots[target[5][0]][target[5][1]].y);
	ctx.lineTo(dots[target[6][0]][target[6][1]].x, dots[target[6][0]][target[6][1]].y);
	ctx.closePath();
	ctx.fill();
}
function moveTarget(selector){
	for(u = 0; u <target.length;u++){
		target[u] = moveP(target[u],selector);
	}
}
function moveP(point,selector){
	//Points are moved based upon the row they exist in (even/odd)
	//See documentation for details
	//define temporary point
	var temp = [point[0],point[1]];
	
	if(selector==='r'){
		if(temp[0]%2===0){
			//even case
			temp[0]+=1;
			temp[1]-=1;
			return temp;
		}else{
			//odd case
			temp[0]+=1;
			return temp;
		}
	}else if(selector==='c'){
		if(temp[0]%2===1){
			//odd case
			temp[0]+=1;
			temp[1]+=1;
			return temp;
		}else{
			//even case
			temp[0]+=1;
			return temp;
		}
	}else if(selector==='f'){
		temp[0]-=2;
		return temp;
	}
}
function resetPos(num,selector){
	for(var n = 0; n<num; n++){
		if(selector==='r'){
			moveTarget('c');
			moveTarget('f');
		}else if(selector==='c'){
			moveTarget('r');
			moveTarget('f');
		}else{
			moveTarget('r');
			moveTarget('c');
		}
	}
	
}
function renderBlocks(){
	for(var c = 0; c < blockData[0][0].length; c++){
		for(var r = 0; r < blockData[0].length;r++){
			//if element at [r][c] == 1 render block
			if(blockData[face][r][c]==1){
				//actual rendering
				if(face===tlightpos[0] && r ===tlightpos[1] && c===tlightpos[2]){
					//draw light version of block
					drawBright();
				}else{
					//draw normally
					draw();
				}

			}else{
				if(face===tfadepos[0] && r ===tfadepos[1] && c===tfadepos[2]) {
					//draw faded version of block
					drawFaded();
				}
			}
			
			//row move targets
			moveTarget('r');
		}
		//col move targets
		moveTarget('c');
		//row reset targets
		resetPos(r,'r');
	}
	//face move targets
	moveTarget('f');
	//col reset targets
	resetPos(c,'c');
	//increment face
	face += 1
}
function destruction(){
	var didStuff = false;
	//console.log("started");
	var tempArray = JSON.parse(JSON.stringify(blockData));
	for(var a = 0; a< 5; a++){
		for(var b = 0; b<5; b++){
			for(var c = 0; c<5; c++){
				if((a-1>=0 && blockData[a-1][b][c]===0) || (a+1<5 && blockData[a+1][b][c]===0) || (b-1>=0 && blockData[a][b-1][c]===0) || (b+1<5 && blockData[a][b+1][c]===0) || (c-1>=0 && blockData[a][b][c-1]===0) || (c+1<5 && blockData[a][b][c+1]===0)){
					tempArray[a][b][c]=0;
					didStuff = true;
				}
			}
		}
	}
	if(didStuff===false){
		tempArray[2][2][2] = 0;
	}
	blockData = JSON.parse(JSON.stringify(tempArray));
	face = 0;
	initTarget();
	render();
}
function randomInit(){
	//console.log("STARTED");
	//console.log(blockData.length[0]);
	// for(var a = 0; a<blockData.length; a++){
	for(var a = 0; a< 5; a++){
		for(var b = 0; b<5; b++){
			for(var c = 0; c<5; c++){
				blockData[a][b][c] = Math.floor(Math.random()*2);

			}
		}
	}
	//console.log("FINISHED");
	face = 0;
	//temp code b/c standardization is my friend
	initTarget();
	render();
}
window.onload = initStuff;
//key listeners
window.onkeydown = function(e){
	var key = e.keyCode;
	if(targeting==false){
		initTargeter();
		if(effectOn){
			clearInterval(currentEffect);
			effectOn = false;
		}
	}

	if(targeting==true){
		if(key == 32){
			if(blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]]==0){
				blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]]=1;
			}else {
				blockData[targeterPos[0]][targeterPos[1]][targeterPos[2]] = 0;
			}
		}else if(key == 81 && targeterPos[0]<4){
			//move up face q
			targeterPos[0] += 1;
			moveTarget('f');
		}else if (key == 69 && targeterPos[0]>0) {
			//move down face q
			targeterPos[0] -= 1;
			moveTarget('c');
			moveTarget('r');
		}else if(key == 65 && targeterPos[2]>0){
			//left a
			moveTarget('f');
			moveTarget('r');
			targeterPos[2] -= 1;
		}else if(key==87 && targeterPos[1]>0){
			//up w
			moveTarget('f');
			moveTarget('c');
			targeterPos[1] -= 1;
		}else if(key==68 && targeterPos[2]<4){
			//right d
			moveTarget('c');
			targeterPos[2] += 1;
		}else if(key==83 && targeterPos[1]<4){
			//down s
			moveTarget('r');
			targeterPos[1] += 1;
		}
	}else{
		targeting = true;
	}
	var tempTarget = target;
	face = 0;
	initTarget();
	render();
	target = tempTarget;
	drawTargeter();
	ctx.font = "25px serif";
	ctx.fillStyle = '#000000';
	tempString = "[ "+(targeterPos[0]+1).toString()+" , "+(targeterPos[1]+1).toString()+" , "+(targeterPos[2]+1).toString()+' ]';
	ctx.fillText(tempString, 0, 30);
}
function rotateHandler(){
	if(document.getElementById('rotsubmitbutton').className==='btn btn-default'){
		//get input of radio buttons
		//axis
		if (document.getElementById('al').checked) {
		axis = 'L';
		}else if (document.getElementById('am').checked) {
			axis = 'M';
		}else if (document.getElementById('ar').checked) {
			axis = 'R';
		}
		//direction
		if (document.getElementById('cw').checked) {
			direction = 'CW';
		}else if (document.getElementById('ccw').checked) {
			direction = 'CCW';
		}
		//rotate blockData
		//create temporary array
		var tempArray = JSON.parse(JSON.stringify(blockData));
		if(axis==='L'){
			if(direction==='CW'){
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[a][b][c]=blockData[c][b][4-a];

						}
					}
				}
			}else{
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[c][b][4-a]=blockData[a][b][c];

						}
					}
				}
			}
		}else if(axis==='M'){
			if(direction==='CW'){
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[a][c][4-b]=blockData[a][b][c];

						}
					}
				}
			}else{
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[a][b][c]=blockData[a][c][4-b];

						}
					}
				}
			}
		}else if(axis==='R'){
			if(direction==='CW'){
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[b][4-a][c]=blockData[a][b][c];

						}
					}
				}
			}else{
				for(var a = 0; a< 5; a++){
					for(var b = 0; b<5; b++){
						for(var c = 0; c<5; c++){
							tempArray[a][b][c]=blockData[b][4-a][c];

						}
					}
				}
			}
		}
		//update real array
		blockData = JSON.parse(JSON.stringify(tempArray));
		//refresh everything
		face = 0;
		initTarget();
		render();
	}


}
function updaterotbutton(){
	axis = 'undef';
	direction = 'undef';
	//axis
	if (document.getElementById('al').checked) {
		axis = 'L';
	}else if (document.getElementById('am').checked) {
		axis = 'M';
	}else if (document.getElementById('ar').checked) {
		axis = 'R';
	}
	//direction
	if (document.getElementById('cw').checked) {
		direction = 'CW';
	}else if (document.getElementById('ccw').checked) {
		direction = 'CCW';
	}
	if(axis!='undef' && direction!='undef'){
		document.getElementById('rotsubmitbutton').className = "btn btn-default";
	}
}
function createCode(){
	var dataString = "";
	for(var a = 0; a<5;a++){
		for(var b = 0; b<5;b++){
			//for every col
			var tempCol = blockData[a][b];
			var binString = "";
			for(var i = 0; i<5;i++){
				binString += tempCol[i];
			}
			var tempChar = String.fromCharCode(parseInt(binString,2)+65);
			dataString += tempChar;
		}
	}
	document.getElementById('codeBox').value = dataString;
}
function enterCode(){
	var dataString = document.getElementById('codeBox').value;
	for(var a = 0; a<5;a++){
		for(var b = 0; b<5;b++){
			//get row of data from character
			var tempBinData = (dataString.charAt(a*5+b).charCodeAt(0)-65).toString(2);
			while(tempBinData.length<5){
				tempBinData = "0"+tempBinData;
			}
			//update data
			for(var c = 0; c<5; c++){
				blockData[a][b][c] = parseInt(tempBinData.charAt(c));
			}

		}
	}
	face = 0;
	initTarget();
	render();

}
function fill(){
	for(var a = 0; a< 5; a++){
		for(var b = 0; b<5; b++){
			for(var c = 0; c<5; c++){
				blockData[a][b][c]=1;

			}
		}
	}
	var tempTarget = target;
	face = 0;
	initTarget();
	render();
	target = tempTarget;
}