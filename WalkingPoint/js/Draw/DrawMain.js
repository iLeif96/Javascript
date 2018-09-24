import {drawGround} from "./Functions/DrawGround.js";
import {drawChar} from "./Functions/DrawCharacter.js";
import {drawWalls} from "./Functions/DrawWalls.js";

export default class Draw {
	constructor (context, scope, groundMatrix, createdObjects) {
		this.ctx =  context;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.createdObjects = createdObjects;
	}
	
	draw() {
		//Рисуем поле;
		drawGround(this.ctx, this.scope);
		
		//Рисуем стены;
		this.createdObjects.createdWalls.forEach((wall) => {
			drawWalls(this.ctx, this.scope, this.groundMatrix, wall);
		});
		
		//Рисуем персонажей;
		this.createdObjects.createdCharacter.forEach((character) => {
			drawChar(this.ctx, this.scope, this.groundMatrix, character);
		});
		
		
	};
}