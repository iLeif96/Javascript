let drawChar = function(ctx, scope, groundMatrix, character) {
	ctx.strokeStyle = 'rgb(200, 0, 0)';
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.beginPath();
	ctx.fillRect(groundMatrix[0][0].getX(scope), groundMatrix[0][0].getY(scope), scope.scale * scope.cell, scope.scale * scope.cell);
	ctx.stroke();
};

export {drawChar};