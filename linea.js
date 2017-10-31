function Line(point_start,point_end,ctx){
	this.point_start = point_start;
	this.point_end = point_end;
	this.ctx = ctx;
}

Line.prototype.draw = function() {
	//alert("graficando linea con add entero3");
    add_entero3(this.point_start.x,this.point_start.y,this.point_end.x,this.point_end.y);
};