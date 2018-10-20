import {MPoint} from "../../Point.js";

/**
 *  Рисует поле
 * @param ctx {CanvasRenderingContext2D}
 * @param scope {Scope}
 * @param gM {GroundMatrix}
 */
export let drawGround = function(ctx, scope, gM) {
	// ctx.strokeStyle = 'rgb(220, 230, 250)';
	
	let startPoint;
	let endPoint;
	
	// ctx.fillStyle = "rgb(240, 240, 240)";
	ctx.strokeStyle = "rgba(220, 220, 220,0.25)";
	
	// ctx.shadowBlur = 0.5;
	// ctx.shadowColor = "rgb(100,100,100)";
	for (let cell of gM.forEach()) {
		// ctx.fillRect(cell.getX(), cell.getY(), (scope.cell * scope.scale), (scope.cell * scope.scale));
		ctx.strokeRect(cell.getX(), cell.getY(), (scope.cell * scope.scale), (scope.cell * scope.scale));
		// ctx.stroke();
	}
	
	
	// for (let i = 0; i < gM.xLenght; i++) {
	// 	ctx.beginPath();
	// 	startPoint = new CPoint(gM[i][0].getX(), gM[i][0].getY());
	// 	endPoint = new CPoint(gM[i][gM.yLenght - 1].getX(), gM[i][gM.yLenght - 1].getY());
	// 	ctx.lineTo(startPoint.x, startPoint.y);
	// 	ctx.lineTo(endPoint.x, endPoint.y);
	// 	ctx.stroke();
	// }
	//
	// for (let j = 0; j < gM.yLenght; j++) {
	// 	ctx.beginPath();
	// 	startPoint = new CPoint(gM[0][j].getX(), gM[0][j].getY());
	// 	endPoint = new CPoint(gM[gM.xLenght - 1][j].getX(), gM[gM.xLenght - 1][j].getY());
	// 	ctx.lineTo(startPoint.x, startPoint.y);
	// 	ctx.lineTo(endPoint.x, endPoint.y);
	// 	ctx.stroke();
	// }
	
	/*
	for (let w = gM[0][0].getX() + 0.5; w <= gM[gM.xLenght][0].getX() + 0.5; w += scope.cell * scope.scale) {
		ctx.beginPath();
		ctx.lineTo(w, gM[0][0].getY());
		ctx.lineTo(w, gM[0][gM.yLenght].getY());
		ctx.stroke();
	}
	
	for (let h = gM[0][0].getY() + 0.5; h <= gM[0][gM.yLenght].getY() + 0.5; h += scope.cell * scope.scale) {
		ctx.beginPath();
		ctx.lineTo(gM[0][0].getX(), h);
		ctx.lineTo(gM[gM.xLenght][0].getX(), h);
		ctx.stroke();
	}
	*/
};