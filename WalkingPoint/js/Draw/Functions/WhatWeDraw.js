import {CPoint} from "../../Point.js";
import Camera from "../../Objects/Camera.js";
/**
 * Задает квадрат для отриисовки в виде пути для canvas
 * @param pos {CPoint}
 * @param ctx
 * @param scope
 */
export let square = function (pos, ctx, scope) {
	let pos1 = pos.clone(),
		pos2 = new CPoint(pos1.x + scope.cell * scope.scale, pos1.y),
		pos3 = new CPoint(pos1.x + scope.cell * scope.scale, pos1.y + scope.cell * scope.scale),
		pos4 = new CPoint(pos1.x, pos1.y + scope.cell * scope.scale);
	
	comparisonCoordinates(scope, pos1, pos2, pos3, pos4);
	
	ctx.beginPath();
	ctx.moveTo(pos1.x, pos1.y);
	ctx.lineTo(pos2.x, pos2.y);
	ctx.lineTo(pos3.x, pos3.y);
	ctx.lineTo(pos4.x, pos4.y);
	ctx.closePath();
};

/**
 * Переводит координату во внутреннем предствлении в вид для отрисовки
 * @param scope {Scope}
 * @param args {CPoint}
 */
export let comparisonCoordinates = function(scope, ...args) {
	for (let i = 0; i < args.length; i++) {
		if (scope.view === Camera.view.isometric)
			args[i].setPositionFromPoint(scope.pointToIsometric(args[i]));
		
		args[i].setPositionFromPoint(scope.pointToDraw(args[i]));
	}
	return args;
};