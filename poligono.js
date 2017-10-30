function Polygon(points,ctx){
	
    this.points = points;
	this.ctx = ctx;
}

Polygon.prototype.draw = function() {

	var points = this.points;
	var c = this.ctx;
	var lines = [];
	var line;

	if(points.length>1){
		for (var i = 0; i < points.length; i++) {

			if(i!=points.length-1){
					line = new Line(
					{
						x : points[i].x,
						y : points[i].y
					},
					{
						x : points[i+1].x,
						y : points[i+1].y
					},
					c);
					line.draw();
			}
			else{
					line = new Line({
						x : points[points.length-1].x,
						y : points[points.length-1].y
					},
					{
						x : points[0].x,
						y : points[0].y
					},c);
					line.draw();
			}
			lines.push(line);
		};
	}
};

Polygon.prototype.rotate=function(pivot,angle){

	var points = this.points;
	var pointsprima=[];
	var pointsprimax2 = [];
	var pointsprimax3 = [];

	var angle = (angle*Math.PI/180);
	console.log("angulo radianes"+angle);
	var xprima;
	var yprima;

	var xprimax2;
	var yprimax2;

	var xprimax3;
	var yprimax3;


	for (var i = 0; i < points.length; i++) {

		xprima = points[i].x-pivot.x;
		yprima = points[i].y-pivot.y;

		xprimax2 = xprima*Math.cos(angle)-yprima*Math.sin(angle);
		yprimax2 = yprima*Math.cos(angle)+xprima*Math.sin(angle);

		xprimax3 = xprimax2+pivot.x;
		yprimax3 = yprimax2+pivot.y;

		pointsprimax3.push(
			{
				x:xprimax3,
				y:yprimax3
			}
		);
	}

	this.points = pointsprimax3;

	this.draw();

}

