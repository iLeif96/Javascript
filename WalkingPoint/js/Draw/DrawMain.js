import {drawGround} from "./Functions/DrawGround.js";
import {drawChar} from "./Functions/DrawCharacter.js";
import {drawWalls} from "./Functions/DrawWalls.js";
import {drawShadow} from "./Functions/DrawShadow.js";
import {drawBullet} from "./Functions/DrawBullet.js";
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
		if (this.canvas.charactersChanges || this.canvas.globalChanges) {
			//очистка канваса
			this.clear(this.canvas.charactersCanvas);
			
			//Рисуем тени персонажей;
			// this.createdObjects.createdCharacter.forEach((character) => {
			// 	drawShadow(this.canvas.charactersContext, this.scope, this.groundMatrix, character);
			// });
			
			//Рисуем персонажей;
			this.createdObjects.character.forEach((character) => {
				drawShadow(this.canvas.charactersContext, this.scope, this.groundMatrix, character, 1);
				drawChar(this.canvas.charactersContext, this.scope, this.groundMatrix, character);
			});
			
			//Рисуем декали
			this.createdObjects.decal.forEach((decal) => {
				drawBullet(this.canvas.charactersContext, this.scope, this.groundMatrix, decal);
			});
			
			this.canvas.charactersChanges = false;
		}
		
		if (this.canvas.wallsChanges || this.canvas.globalChanges) {
			this.clear(this.canvas.wallsCanvas);
			//Рисуем тени стен;
			this.createdObjects.wall.forEach((wall) => {
				drawShadow(this.canvas.wallsContext, this.scope, this.groundMatrix, wall);
			});
			//Рисуем стены;
			this.createdObjects.wall.forEach((wall) => {
				drawWalls(this.canvas.wallsContext, this.scope, this.groundMatrix, wall);
			});
			
			this.canvas.wallsChanges = false;
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
		this.draw();
		//this.debugDraw();
		requestAnimationFrame(this.draw.bind(this));
	}
	
	/**
	 * Очистка либо всего поля, либо одного холста
	 * @param canvas {HTMLCanvasElement}
	 */
	clear(canvas = null) {
		if (!canvas) {
			this.canvas.groundCanvas.width = this.canvas.groundCanvas.width;
			this.canvas.charactersCanvas.width = this.canvas.charactersCanvas.width;
			this.canvas.wallsCanvas.width = this.canvas.wallsCanvas.width;
			//this.canvas.testsCanvas.width = this.canvas.testsCanvas.width;
		}
		else {
			canvas.width = canvas.width;
		}
	}
}