import {square} from "./WhatWeDraw.js";

/**
 * Отрисовывает тени
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param obj {SimpleObject}
 * @param blur  {Number}
 */
export let drawShadow = function(ctx, scope, groundMatrix, obj, blur = 4) {
	ctx.strokeStyle = obj.color;
	ctx.fillStyle = obj.color;
	ctx.shadowBlur = blur;
	ctx.shadowColor = "rgba(1,1,1,0.5)";

	square(obj.position.cPoint, ctx, scope);
	ctx.stroke();
	//ctx.strokeRect(pos.x, pos.y, scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.shadowBlur = 0;
	
};