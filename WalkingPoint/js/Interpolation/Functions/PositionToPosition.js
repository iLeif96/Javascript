import Path from "../../Path.js"
/**
 * прокладывает путь от точки к точке
 * @param gM {GroundMatrix}
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
	
	let steps = Math.max(Math.abs(xSteps), Math.abs(ySteps));
	
	try { path.push(gM.getCell(step)); }
	catch (e) { }
	
	for (let i = 0; i <= steps; i++) {
		if (step.x !== mPt2.x && step.y !== mPt2.y) {
			step.x = step.x + xDir;
			step.y = step.y + yDir;
		}
		else if (step.x === mPt2.x && step.y === mPt2.y) {
			continue;
		}
		else if (step.x === mPt2.x) {
			step.y = step.y + yDir;
		}
		else if (step.y === mPt2.y) {
			step.x = step.x + xDir;
		}
		
		pathCell = gM[step.x][step.y];
		if (pathCell.isBusy()) {
			return path;
		}
		try { path.push(pathCell.clone()); }
		catch (e) { }
	}
	
	
	// for (let i = 1; i <= (xSteps); i++) {
	// 	step.x = mPt1.x + i * xDir;
	// 	pathCell = gM[step.x][step.y];
	//
	// 	if (pathCell.isBusy()) {
	// 		return path;
	// 	}
	// 	try { path.push(pathCell.clone()); }
	// 	catch (e) { }
	// }
	//
	// for (let j = 1; j <= (ySteps); j++) {
	// 	step.y = mPt1.y + j * yDir;
	// 	pathCell = gM[step.x][step.y];
	// 	if (pathCell.isBusy()) {
	// 		return path;
	// 	}
	// 	try { path.push(pathCell.clone()); }
	// 	catch (e) { }
	// }
	
	return path;
}

// positionToPositionOld() {
//
// 	let mPt1 = position1.mPoint;
// 	let mPt2 = position2.mPoint;
//
// 	let path = new Path();
//
// 	let xSteps = mPt2.x - mPt1.x;
// 	let ySteps = mPt2.y - mPt1.y;
//
// 	let xDir = 1;
// 	let yDir = 1;
//
// 	if (xSteps < 0) { xDir = -xDir; xSteps = -xSteps; }
// 	if (ySteps < 0) { yDir = -yDir; ySteps = -ySteps; }
//
// 	let step = mPt1.clone();
// 	let prevStep = step.clone();
//
// 	let pathCell;
//
// 	let steps = Math.max(Math.abs(xSteps), Math.abs(ySteps));
//
// 	try { path.push(gM.getCell(step)); }
// 	catch (e) { }
//
// 	do {
// 		if (step.x !== mPt2.x && step.y !== mPt2.y) {
// 			step.x = step.x + xDir;
// 			step.y = step.y + yDir;
// 		}
// 		else if (step.x === mPt2.x && step.y === mPt2.y) {
// 			break;
// 		}
// 		else if (step.x === mPt2.x) {
// 			step.y = step.y + yDir;
// 		}
// 		else if (step.y === mPt2.y) {
// 			step.x = step.x + xDir;
// 		}
//
// 		pathCell = gM[step.x][step.y];
//
// 		if (pathCell.isBusy()) {
// 			if (path.length <= 1)
// 				path = null;
//
// 			return path;
// 		}
//
// 		try { path.push(pathCell.clone()); }
// 		catch (e) { }
//
// 		if (path.length > 100)
// 			return null;
//
// 	} while (((step.x !== mPt2.x) || (step.y !== mPt2.y)));
//
// 	if (path.length <= 1)
// 		path = null;
//
// 	return path;
// }