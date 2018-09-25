export default class MatrixCell {
	constructor(mPoint, cPoint, cell) {
		this.mPoint = mPoint;
		this.cPoint = cPoint;
		this.cell = cell;
		this.border = {leftTop: null, rightDown: null}
		this.setBorder();
	}
	
	setBorder() {
		this.border.leftTop = this.cPoint.clone();
		this.border.rightDown = this.cPoint.clone();
		
		this.border.rightDown.x += this.cell;
		this.border.rightDown.y += this.cell;
	}
	
	checkCross(cPoint) {
		let match = {xMatch: false, yMatch: false, total: false}
		
		match.xMatch = ((cPoint.x >= this.border.leftTop.x) && (cPoint.x <= this.border.rightDown.x));
		match.yMatch = ((cPoint.y >= this.border.leftTop.y) && (cPoint.y <= this.border.rightDown.y));
		match.total = (match.xMatch && match.yMatch);
		
		return match;
	}
}