let drawGround = function(ctx, scope) {
	ctx.strokeStyle = 'rgb(220, 230, 250)';
	
	for (let w = scope.wStart.getX() + 0.5; w <= scope.wEnd.getX() + 0.5; w += scope.cell * scope.scale) {
		ctx.beginPath();
		ctx.lineTo(w, scope.hStart.getY());
		ctx.lineTo(w, scope.hEnd.getY());
		ctx.stroke();
	}
	
	for (let h = scope.hStart.getY() + 0.5; h <= scope.hEnd.getY() + 0.5; h += scope.cell * scope.scale) {
		ctx.beginPath();
		ctx.lineTo(scope.wStart.getX(), h);
		ctx.lineTo(scope.wEnd.getX(), h);
		ctx.stroke();
	}
};

export {drawGround};