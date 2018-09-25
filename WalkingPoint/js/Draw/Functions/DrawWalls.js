/**
 * Отрисовывает стенку
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param wall {Wall}
 */
export let drawWalls = function(ctx, scope, groundMatrix, wall) {
	ctx.strokeStyle = wall.color;
	ctx.fillStyle = wall.color;
	ctx.beginPath();
	ctx.fillRect(wall.getX(groundMatrix), wall.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.stroke();
};