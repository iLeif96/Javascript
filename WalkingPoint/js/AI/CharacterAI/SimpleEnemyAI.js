import Periodic from "../../Periodic.js";
import {CPoint, MPoint} from "../../Point.js";
import Path from "../../Path.js";
import Interpolation from "../../Interpolation/Interpolation.js";
import Animation from "../../Animation/Animation.js";
import Cell from "../../Cell.js";
import BaseAI from "./BaseAI.js";

export default class SimpleEnemyAI extends BaseAI {
	/**
	 * @param character {Character}
	 * @param scope {Scope}
	 * @param groundMatrix {GroundMatrix}
	 * @param canvas {UserCanvas}
	 * @param time {Time}
	 */
	constructor(character, scope, groundMatrix, canvas, time) {
		super(character, scope, groundMatrix, canvas, time);
		this.fowl = null;
	}
	
	/**
	 * Ищем в пределах видимости кто-то похожий на персонажа
	 */
	findPlayer() {
		let mP = this.character.position.mPoint;
		let r = this.character.visionRadius;
		for (let i = mP.x - this.character.visionRadius; i <= mP.x + r; i++) {
			for (let j = mP.y - this.character.visionRadius; j <= mP.y + r; j++) {
				if (i >= 0 && i < this.groundMatrix.xLenght && j >= 0 && j < this.groundMatrix.yLenght)
					if (Math.pow(i - mP.x, 2) + Math.pow(j - mP.y, 2) <= r * 2) {
						let currCell;
						if (currCell = this.groundMatrix[i][j]) {
							for (let obj in currCell.placed) {
								if (currCell.placed[obj].type === "Player") {
									this.fowl = currCell.placed[obj];
									this.character.setTargetPosition(currCell.clone(), true);
									this.changeState(this.stateList.hunting)
								}
							}
						}
					}
			}
		}
	}
	
	hunting() {
		this.character.setTargetPosition(this.fowl.position.clone(), true);
		this.toTargetPosition();
	}
	
	tick() {
		switch (this.state) {
			case (this.stateList.idle) : {
				this.findPlayer();
				break;
			}
			case (this.stateList.hunting) : {
				this.hunting();
				break;
			}
			case (this.stateList.move) : {
				this.toTargetPosition();
				break;
			}
		}
	}
}