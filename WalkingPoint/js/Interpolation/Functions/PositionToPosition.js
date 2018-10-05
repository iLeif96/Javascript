import Path from "../../Path.js"
/**
 * прокладывает путь от точки к точке
 * @param gM
 * @param position1
 * @param position2
 */
export default function positionToPosition(gM, position1, position2) {
	
	let mPt1 = position1.mPoint;
	let mPt2 = position2.mPoint;
	
	let path = new Path();
	
	let xSteps = mPt2.x - mPt1.x;
	let ySteps = mPt2.y - mPt1.y;
	
	let xDir = 1;
	let yDir = 1;
	
	if (xSteps < 0) { xDir = -xDir; xSteps = -xSteps; }
	if (ySteps < 0) { yDir = -yDir; ySteps = -ySteps; }
	
	let step = mPt1.clone();
	let pathCell;
	
	
	for (let i = 1; i <= (xSteps); i++) {
		step.x = mPt1.x + i * xDir;
		pathCell = gM.getCell(step);
		try { path.push(gM.getCell(step)); }
		catch (e) { }
	}
	
	for (let j = 1; j <= (ySteps); j++) {
		step.y = mPt1.y + j * yDir;
		try { path.push(gM.getCell(step)); }
		catch (e) { }
	}
	
	return path;
}