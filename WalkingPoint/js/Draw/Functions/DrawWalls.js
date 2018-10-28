import {square} from "./WhatWeDraw.js";

/**
 * Отрисовывает стенку
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param obj {Wall}
 */
export let drawWalls = function(ctx, scope, groundMatrix, obj) {
	ctx.strokeStyle = "rgba(60,60,100,0.2)";
	ctx.fillStyle = obj.color;
	
	square(obj.position.cPoint, ctx, scope);
	ctx.stroke();
	ctx.fill();
	
	// ctx.fillRect(pos.x, pos.y, scope.scale * scope.cell / 2, scope.scale * scope.cell/ 2);
	// ctx.strokeRect(pos.x, pos.y, scope.scale * scope.cell/ 2, scope.scale * scope.cell/ 2);
	
	
	// ctx.stroke();
};