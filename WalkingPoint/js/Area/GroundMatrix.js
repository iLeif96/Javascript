import Pt from  "../Point.js";

export default class GroundMatrix extends Array {
	constructor (canvas, scope) {
		super();
		this.scope = scope;
		this.canvas = canvas;
		this.create(this.canvas, this.scope);
	}
	
	create(canvas, scope) {
		for (let i = 0; i * scope.cell < (canvas.width - (scope.wEnd - scope.wStart)); i++) {
			this[i] = [];
			for (let j = 0; j * scope.cell < (canvas.height - (scope.hEnd - scope.hStart)); j ++) {
				this[i][j] = new Pt((scope.cell * i) + scope.wStart, (scope.cell * j) + scope.hStart);
			}
		}
	}
}