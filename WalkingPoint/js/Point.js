export default class Pt {
	constructor(x, y) {
		
		this.x = x;
		this.y = y;
	}
	
	getX(scope) {
		return scope.getX(this.x);
	};
	getY(scope) {
		return scope.getY(this.y);
	};
};

