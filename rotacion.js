
//var c = $("#canvas").get(0);
var c = document.getElementById("canvas");
console.log(c);
var ctx = c.getContext('2d');
var drawable=false;
var drawn = false;
var rotating = false;
var points = [];
var polygons = [];
var pivot = {};



function inicio_poligono(){
    drawable = true;
    //alert("en start");
    c.style.cursor = "crosshair";
    //$(this).addClass("active");
}
    
function fin_poligono(){
    //alert("en fin");
    if(drawable){
        drawable = false;
        c.style.cursor = "default";
        drawn = true;
        var polygon = new Polygon(points,ctx);
        console.log(polygon);
        polygon.draw();
        polygons.push(polygon);
        console.log("imprimiendo polygons en fin_poligono");
        console.log(polygons);
      points = [];
    //$("#start").removeClass("active");
    }
    else {
        alert('Por favor inicie figura');
    }
}
function en_lienzo(){
    if(drawable||rotating){
        //alert("en lienzo");
        event = event || window.event;
        x = event.pageX - c.offsetLeft,
        y = event.pageY - c.offsetTop;
        console.log("x: "+x);
        console.log("y: "+y);
        //y = convert(y);
        console.log("nuevo y:"+y);
        Dot.draw(x,y,ctx);
        if(rotating){
            pivot.x = x;
            pivot.y = y;
            console.log("pivote: ");
            console.log(pivot);
            //rotating=false;
        }
        if(!rotating)
			{
				points.push({ x:x,y:y })
			}
    }else{
        alert("inicie figura o pivote");
    }
   
}

function Dot () {
}

Dot.draw = function(x,y,ctx) {
	ctx.beginPath();
	ctx.arc(x,y,1,0,2*Math.PI);
	ctx.strokeStyle = "#1400ff";
	console.log(x,y);
	ctx.stroke();
	ctx.closePath();
};

function q(event)
   {

           event = event || window.event;

           var canvas = document.getElementById('canvas');
           x = event.pageX - canvas.offsetLeft;
           y = event.pageY - canvas.offsetTop;
           //y = convert(y);
           graficarPunto(x,y);
}
function convert(y)
   {
       y = Number(y);
       var yprima = 500 - y;
       return yprima;
   }
function graficarPunto(x,y)
   {
       var c=document.getElementById("canvas");
       var ctx=c.getContext("2d");
       ctx.beginPath();
       ctx.strokeStyle = "blue";
       ctx.arc(x,y,3,0,2*Math.PI);
       ctx.closePath();
       ctx.stroke();
       ctx.fill();
   }


function Line(point_start,point_end,ctx){
	this.point_start = point_start;
	this.point_end = point_end;
	this.ctx = ctx;

}

Line.prototype.draw = function() {
	//alert("graficando linea con add entero3");
    add_entero3(this.point_start.x,this.point_start.y,this.point_end.x,this.point_end.y);
};

function add_entero3(x1,y1,x2,y2) {
    //alert("entrando add entero 3");
		x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);

		var dif_x = x2-x1;
		var dif_y = y2-y1;
		if( y1>y2 ){
				console.log(y1);
				var aux = x1;
				x1=x2;
				x2=aux;
				aux=y1;
				y1=y2;
				y2=aux;

				dif_x = -dif_x;
				dif_y = -dif_y;
		}


        var m = dif_y - dif_x;

        var error = 0;
				var x;
				var y;
				x=x1;
				y=y1;
				var canvas = document.getElementById("canvas");
						var ctx = canvas.getContext("2d");
						ctx.fillStyle = "green";
						ctx.fillRect(x,y,1,1);

				if (dif_x>0) {
					if (dif_x>=dif_y) {

						console.log(dif_x);
						for (var i = 1; i < dif_x-1; i++) {
							if (error < 0) {
								x = x+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
								error = error + dif_y;
							}
							else {
								x=x+1;
								y=y+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
										error = error +( dif_y - dif_x );
							}
						}

					}
					//Caso 2
					else {
						console.log(dif_x);
						for (var i = 1; i < dif_y-1; i++){
							if (error < 0) {
								x = x+1;
								y = y+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
								error = error +( dif_y - dif_x );
							}
							else {
								y=y+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
										error = error - dif_x;
							}
						}
					}
				}
				//Caso 3 o 4
				else {
					console.log(dif_x);
					console.log(dif_y);
					if (Math.abs(dif_x)>=dif_y) {
						console.log(dif_x);
						for (var i = 1; i < Math.abs(dif_x)-1; i++) {
							console.log(error);
							if (error < 0) {
								x = x-1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
										console.log(dif_x);
								error = error + dif_y;
							}

							else {
								x=x-1;
								y=y+1;
								console.log(dif_x);
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
										error = error +( dif_y + dif_x );
							}
						}

					}
					//Caso 4
					else {
						console.log(dif_x);
						for (var i = 1; i < dif_y-1; i++){
							if (error < 0) {
								x = x-1;
								y = y+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
								error = error +( dif_y + dif_x );

							}
							else {
								y=y+1;
								var canvas = document.getElementById("canvas");
										var ctx = canvas.getContext("2d");
										ctx.fillStyle = "green";
										ctx.fillRect(x,y,1,1);
										error = error + dif_x;
							}
						}
					}
				}
				var canvas = document.getElementById("canvas");
						var ctx = canvas.getContext("2d");
						ctx.fillStyle = "green";
						ctx.fillRect(x2,y2,1,1);

}

function pivote(){
	rotating = true;
}
function rotar(){
		if(drawn){
			if(rotating){
				var angle =document.getElementById("angle");
				rotate(pivot,angle,0);
			}
		}
		else {
			alert('Termine figura');
		}
	}

function rotate(pivot,angle,idpolygono){
		//clearScreen(c,ctx);
        console.log("impriminedo polygons en rotate:");
		console.log(polygons);
    
		polygons[idpolygono].rotate(pivot,angle);
		for (var i = 0; i < polygons.length; i++) {
		polygons[i].draw();
		}
}


function clearScreen(c,ctx){
	ctx.clearRect(0,0,c.width,c.height);
}