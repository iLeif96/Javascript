export let drawWalls = function(ctx, scope, groundMatrix, wall) {
	ctx.strokeStyle = 'rgb(200, 0, 0)';
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.beginPath();
	let posMat = groundMatrix[wall.position.xMat][wall.position.yMat];
	ctx.fillRect(posMat.getX(scope), posMat.getY(scope), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.stroke();
};