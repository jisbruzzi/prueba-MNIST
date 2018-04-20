function dibujarEstado(casilleros,columnas,filas,canvas){
	let c=canvas.getContext("2d");
	
	let width=canvas.width;
	let height=canvas.height;
	
	
	c.lineWidth=1;
	for(let i=0;i<columnas+1;i++){
		c.moveTo(i*width/columnas,0)
		c.lineTo(i*width/columnas,height)
	}
	for(let i=0;i<filas+1;i++){
		c.moveTo(0,i*height/filas)
		c.lineTo(width,i*height/filas)
	}
	c.stroke()
	
	
	c.fillStyle="orange";
	for(let f=0;f<filas;f++){
		for(let cc=0;cc<columnas;cc++){
			if(casilleros[f][cc]>0){
				c.rect(
					cc*width/columnas,
					f*height/filas,
					width/columnas,
					height/filas
				)
			}
		}
	}
	c.fill()
	
	
}


function mouseEn(x,y,casilleros,anchoColumna,altoFila,cuanto){
	if(cuanto==null) cuanto=255;
	
	let filaPrendida=Math.floor(y/ altoFila);
	let columnaPrendida=Math.floor(x / anchoColumna);
	casilleros[filaPrendida][columnaPrendida]=Math.min(255,casilleros[filaPrendida][columnaPrendida]+cuanto);
}


$(document).ready((function(){
	let columnas=28;
	let filas=28;
	let canvas=document.getElementById("inputDigitos");
	let width=canvas.width;
	let height=canvas.height;
	
	casilleros=[]
	for(let f=0;f<filas;f++){
		columna=[];
		
		for(let c=0;c<columnas;c++){
			columna.push(0)
		}
		casilleros.push(columna)
	}
	
	console.log(casilleros)
	
	dibujarEstado(casilleros,columnas,filas,canvas)
	
	
	let mousedown=false;
	let prevX=null;
	let prevY=null;
	
	$(canvas).on("mousedown",function(e){
		mouseEn(e.offsetX,e.offsetY,casilleros,width/columnas,height/filas)
		dibujarEstado(casilleros,columnas,filas,canvas)
		mousedown=true;
		prevX=e.offsetX
		prevY=e.offsetY
	})
	
	
	$(canvas).on("mouseup",function(e){
		mousedown=false;
		mouseEn(e.offsetX,e.offsetY,casilleros,width/columnas,height/filas)
		dibujarEstado(casilleros,columnas,filas,canvas)
		prevX=null
		prevY=null
	})
	
	$(canvas).on("mouseout",function(e){
		mousedown=false;
		prevX=null
		prevY=null
	})
	
	
	
	
	$(canvas).on("mousemove",function(e){
		if(mousedown){
			console.log(e)
			
			let dx=e.offsetX-prevX;
			let dy=e.offsetY-prevY;
			
			pasos=Math.sqrt(dx*dx+dy*dy)
			
			for(let i=0; i<pasos+1;i++){
				let x=dx/pasos*i+e.offsetX;
				let y=dy/pasos*i+e.offsetY;
				
				
				let pasosGiro=8
				for(let j=0;j<pasosGiro;j++){
					let xx=x+Math.cos(j/pasosGiro*2*Math.PI)*5
					let yy=y+Math.sin(j/pasosGiro*2*Math.PI)*5
					mouseEn(xx,yy,casilleros,width/columnas,height/filas,30)
				}
			}
			
			
			dibujarEstado(casilleros,columnas,filas,canvas)
			
			
			prevX=e.offsetX
			prevY=e.offsetY
		}
	})
	
	
	
}))