var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var num = 7;
var width = canvas.width;
var height = canvas.height;

var colourArray = ["#7f4600","#97b78f","#ac7f2c","#ffa500","#1bd7c2","#db3900","#4d046c"];
var colourArray = ["#eee","#ddd","#999","#bbb","#777","#666","#444","#fff","#888","#333","#222"];
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

/* Function to calculate distance between two points */
function distanceCalculator(x1,y1,x2,y2){
	var a = x1 - x2;
	var b = y1 - y2;
	var c = (Math.sqrt(a*a + b*b));
	return c;
}

/* Function to generate random points */
function randomPointGenerator(num){

	for(var i=0;i<num;i++){
		var x = Math.floor(Math.random()*220+10);
		var y = Math.floor(Math.random()*100+10);
		pointsArray.push(new point(x,y,colourArray[i],r[i],g[i],b[i]));
	}

}

/* Function to color each pixel in the canvas */
function colorRegion(){

	for(var q=-10;q<height+10;q=q+0.6){
		for(var p=-10;p<width+10;p=p+0.6){

			var sdindex;
			var sdvalue;
			var distanceArray = [];

			for(var i=0;i<num;i++){
				distanceArray[i] = distanceCalculator(p,q,pointsArray[i].x,pointsArray[i].y);
			}

			sdvalue = distanceArray[0];
			sdindex = 0;
			for(var x=1;x<num;x++){
				if(sdvalue>distanceArray[x]){
					sdvalue = distanceArray[x];
					sdindex=x;
				}
			}

			ctx.beginPath();
			ctx.fillStyle = pointsArray[sdindex].colour;
	        ctx.arc(p,q,1,0,2*Math.PI);
	        ctx.fill();

	        ctx.fillStyle = pointsArray[sdindex].colour;
			ctx.fillRect(p,q,1,1);

			ctx.beginPath();
	        ctx.moveTo(pointsArray[sdindex].x,pointsArray[sdindex].y);
	        ctx.lineTo(p,q);
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = pointsArray[sdindex].colour;
	        ctx.stroke();

	        ctx.beginPath();
	        ctx.moveTo(p,q);
	        ctx.lineTo(p+1,q);
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = pointsArray[sdindex].colour;
	        ctx.stroke();
	
		}
	}

}

/* Function to color randomly created points*/
function randomPointColor(num){

	for(var i=0;i<num;i++){
		ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(pointsArray[i].x,pointsArray[i].y,1.2,0,2*Math.PI,true);
        ctx.fill();
	}
}	



randomPointGenerator(num);
colorRegion();
//randomPointColor(num);