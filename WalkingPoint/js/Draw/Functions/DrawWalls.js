/**
 * Отрисовывает стенку
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param wall {wall}
 */
export let drawWalls = function(ctx, scope, groundMatrix, wall) {
	ctx.strokeStyle = "rgba(60,60,100,0.2)";
	ctx.fillStyle = wall.color;
	
	ctx.fillRect(wall.getX(groundMatrix), wall.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.strokeRect(wall.getX(groundMatrix), wall.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	
	
	// ctx.stroke();
};