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
	if (!character.isDie) {
		ctx.fillRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	}
	else {
		ctx.strokeRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * scope.cell, scope.scale * scope.cell);
	}
	
	// ctx.arc(character.getX(groundMatrix) + scope.scale * scope.cell / 2, character.getY(groundMatrix) + scope.scale * scope.cell / 2, scope.scale * scope.cell / 2, 0, 360);
	// ctx.fill();
	ctx.stroke();
	
	/**
	 * Рисуем шкалу здоровья
	 */
	ctx.fillStyle = "rgb(250, 192, 192)";
	ctx.fillRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * scope.cell, 2 * scope.scale);
	
	
	let drawLenghtHp = (scope.cell / character.maxHp) * character.hp;
	ctx.fillStyle = "rgb(100, 230, 100)";
	ctx.shadowBlur = 1;
	ctx.shadowColor = "rgba(10,10,10,0.5)";
	ctx.fillRect(character.getX(groundMatrix), character.getY(groundMatrix), scope.scale * drawLenghtHp, 2 * scope.scale);

	ctx.shadowBlur = 0;
	
	
	// ctx.arc(character.getX(groundMatrix) + scope.cell/2 * scope.scale, character.getY(groundMatrix) + scope.cell/2 * scope.scale,
	// 	(character.visionRadius * scope.scale * scope.cell), 0, 360);
	// ctx.stroke();
};