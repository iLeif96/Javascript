import {drawGround} from "./Functions/DrawGround.js";
import {drawChar} from "./Functions/DrawCharacter.js";
import {drawWalls} from "./Functions/DrawWalls.js";
import Interpolation from "../Interpolation/Interpolation.js";

export default class Draw {
	constructor (canvas, scope, groundMatrix, createdObjects) {
		this.canvas = canvas;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.createdObjects = createdObjects;
	}
	
	draw() {
		//Если были изменения, то рисуем поле;
		if (this.canvas.groundChanges || this.canvas.globalChanges) {
			this.clear(this.canvas.groundCanvas);
			drawGround(this.canvas.groundContext, this.scope, this.groundMatrix);
			this.canvas.groundChanges = false;
		}
		
		//Если были изменения, то рисуем объекты
		if (this.canvas.objectsChanges || this.canvas.globalChanges) {
			//очистка канваса
			this.clear(this.canvas.objectsCanvas);
			//Рисуем стены;
			this.createdObjects.createdWalls.forEach((wall) => {
				drawWalls(this.canvas.objectsContext, this.scope, this.groundMatrix, wall);
			});
			
			//Рисуем персонажей;
			this.createdObjects.createdCharacter.forEach((character) => {
				drawChar(this.canvas.objectsContext, this.scope, this.groundMatrix, character);
			});
			
			this.canvas.objectsChanges = false;
		}
	
		this.canvas.globalChanges = false;
		
		requestAnimationFrame(this.draw.bind(this));
		
	};
	
	debugDraw(cell) {
		
		
			this.canvas.testsContext.strokeStyle = "rgb(70, 50, 50)";
			this.canvas.testsContext.fillStyle = "rgb(50, 70, 50)";
			this.canvas.testsContext.beginPath();
			this.canvas.testsContext.fillRect(
				cell.getX(this.groundMatrix), cell.getY(this.groundMatrix),
				this.scope.scale * this.scope.cell, this.scope.scale * this.scope.cell);
			this.canvas.testsContext.stroke();
		
	}
	
	setRequestAnimationFrame() {
		//this.draw();
		//this.debugDraw();
		requestAnimationFrame(this.draw.bind(this));
	}
	
	/**
	 * Очистка либо всего поля, либо одного холста
	 * @param canvas {HTMLCanvasElement}
	 */
	clear(canvas = undefined) {
		if (!canvas) {
			this.canvas.groundCanvas.width = this.canvas.groundCanvas.width;
			this.canvas.objectsCanvas.width = this.canvas.objectsCanvas.width;
			//this.canvas.testsCanvas.width = this.canvas.testsCanvas.width;
		}
		else {
			canvas.width = canvas.width;
		}
	}
}