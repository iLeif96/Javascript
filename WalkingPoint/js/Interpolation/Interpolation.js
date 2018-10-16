import {Cell} from "../Cell.js";
import Path from "../Path.js";

/**
 * Просчитывает точки путей
 */
export default class Interpolation {
	/**
	* Прокладывает путь от точки к точке
	* @param gM {GroundMatrix}
	* @param position1: {Cell}
	* @param position2: {Cell}
    * @return {Path}
	*/
	static positionToPosition(gM, position1, position2) {
		
		if (position1.x === position2.x && position1.y === position2.y)
			return null;
		
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
		let pathCell = position1;
		
		let prevStep = step.clone();
		let prevStepLength = 0;
		
		let steps = Math.max(Math.abs(xSteps), Math.abs(ySteps));
		
		path.push(pathCell.clone());
		
		let cellInfluence = [];
		
		let range = 9;
		
		do {
			let minX = Math.max(0, pathCell.x - 1);
			let maxX = Math.min(gM.xLenght, pathCell.x + 1);
			let minY = Math.max(0, pathCell.y - 1);
			let maxY = Math.min(gM.xLenght, pathCell.y + 1);
			
			prevStep = path[path.length - 1];
			//prevStepLength = Math.abs(prevStep.x - mPt2.x) + Math.abs(prevStep.y - mPt2.y);
			cellInfluence = [];
			
			for (let i = minX; i <= maxX; i++) {
				for (let j = minY; j <= maxY; j++) {
					if (!gM[i][j].isBusy())
						gM[i][j].influence = 1 / ((Math.abs(i - mPt2.x)) + Math.abs(j - mPt2.y) + 1);
					else
						gM[i][j].influence = 0;
					
					cellInfluence.push(gM[i][j]);
				}
			}
			
			if (cellInfluence.length === 0)
				return null;
				
			pathCell = cellInfluence[0];
			for (let i = 1; i < cellInfluence.length; i++) {
				if (cellInfluence[i].influence > pathCell.influence && (!cellInfluence[i].mPoint.compare(prevStep.mPoint)))
					pathCell = cellInfluence[i]
			}
			//console.log(pathCell.mPoint);
			path.push(pathCell.clone());
			
			if (path.length > 100)
				return null;
			
		} while (((pathCell.x !== mPt2.x) || (pathCell.y !== mPt2.y)));
		
		if (path.length <= 1)
			path = null;
		
		return path;
	};
	
	positionToPositionOld() {
				
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
				let prevStep = step.clone();
				
				let pathCell;
				
				let steps = Math.max(Math.abs(xSteps), Math.abs(ySteps));
				
				try { path.push(gM.getCell(step)); }
				catch (e) { }
				
				do {
					if (step.x !== mPt2.x && step.y !== mPt2.y) {
						step.x = step.x + xDir;
						step.y = step.y + yDir;
					}
					else if (step.x === mPt2.x && step.y === mPt2.y) {
						break;
					}
					else if (step.x === mPt2.x) {
						step.y = step.y + yDir;
					}
					else if (step.y === mPt2.y) {
						step.x = step.x + xDir;
					}
					
					pathCell = gM[step.x][step.y];
					
					if (pathCell.isBusy()) {
						if (path.length <= 1)
							path = null;
						
						return path;
					}
					
					try { path.push(pathCell.clone()); }
					catch (e) { }
					
					if (path.length > 100)
						return null;
					
				} while (((step.x !== mPt2.x) || (step.y !== mPt2.y)));
				
				if (path.length <= 1)
					path = null;
				
				return path;
	}
}