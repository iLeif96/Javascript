/**
 * Отрисовывает персонажа
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param character {Character}
 */
export let drawChar = function(ctx, scope, groundMatrix, character) {
	ctx.strokeStyle = character.color;
	ctx.fillStyle = character.color;
	ctx.beginPath();
	ctx.fillRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.stroke();
};