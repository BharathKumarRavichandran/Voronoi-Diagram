var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var num=7;
var width = canvas.width;
var height = canvas.height;
var id = ctx.createImageData(1,1);
var d  = id.data;
var a=1;

var colourArray = ["#2e6269","#97b78f","#ac7f2c","#6f2fde","#1bd7c2","#db3900","#4d046c"];
var r = ["1","211","96","138","123","58","58"];
var g = ["236","143","56","254","197","134","212"];
var b = ["164","68","176","84","23","112","119"];
var pointsArray = [];

function point(x,y,colour,r,g,b){
	this.x = x;
	this.y = y; 
	this.colour = colour;
	this.r = r;
	this.g = g;
	this.b = b;
}

function distanceCalculator(x1,y1,x2,y2){
	var a = x1 - x2;
	var b = y1 - y2;
	var c = Math.sqrt( a*a + b*b );
	return c;
}

function randomPointGenerator(num){

	for(var i=0;i<num;i++){
		var x = Math.floor(Math.random()*200+13);
		var y = Math.floor(Math.random()*100+10);
		pointsArray.push(new point(x,y,colourArray[i],r[i],g[i],b[i]));
		ctx.fillStyle = "black";
		ctx.fillRect(x,y,1,1);
	}
	console.log(pointsArray);

}

function colorRegion(){

	for(var q=0;q<height;q++){
		for(var p=0;p<width;p++){

			var sdindex;
			var sdvalue;
			var distanceArray = [];

			for(var i=0;i<num;i++){
				distanceArray[i] = distanceCalculator(p,q,pointsArray[i].x,pointsArray[i].y);
			}

			sdvalue = distanceArray[0];
			sdindex = 0;
			for(var x=1;x<num;x++){
				if(distanceArray[x]<sdvalue){
					sdvalue = distanceArray[x];
					sdindex=x;
				}
			}
			ctx.fillStyle = pointsArray[sdindex].colour;
			ctx.fillRect(p,q,1,1);
		}
	}

}

function randomPointColor(num){

	for(var i=0;i<num;i++){
		ctx.fillStyle = "black";
		ctx.fillRect(pointsArray[i].x,pointsArray[i].y,1,1);
	}
}	



randomPointGenerator(num);
colorRegion();
randomPointColor(num);