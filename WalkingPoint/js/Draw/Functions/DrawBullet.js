/**
 * Отрисовывает пулю
 * @param ctx
 * @param scope
 * @param groundMatrix
 * @param bullet {Bullet}
 */
export let drawBullet = function(ctx, scope, groundMatrix, bullet) {
	//ctx.strokeStyle = "rgba(60,60,100,0.2)";
	ctx.fillStyle = bullet.color;
	let x = scope.getX(bullet.position.cPoint.x + scope.cell / 3);
	let y = scope.getY(bullet.position.cPoint.y + scope.cell / 3);
	ctx.fillRect(x, y, scope.scale * (scope.cell / 3), scope.scale * (scope.cell / 3));
	//ctx.strokeRect(x, y, scope.scale * (scope.cell / 4), scope.scale * (scope.cell / 4));
	
	
	// ctx.stroke();
};