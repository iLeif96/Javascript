/**
 * Отрисовывает персонажа
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param character {Character}
 */
export let drawChar = function(ctx, scope, groundMatrix, character) {
	ctx.strokeStyle = 'rgb(200, 0, 0)';
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.beginPath();
	ctx.fillRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.stroke();
};