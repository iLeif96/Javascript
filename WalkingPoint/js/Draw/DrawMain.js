import {drawGround} from "./DrawGround.js";
import {drawChar} from "./DrawCharacter.js";

export default class Draw {
	constructor (context, scope, groundMatrix, listOfCharacter) {
		this.ctx =  context;
		this.scope = scope;
		this.groundMatrix = groundMatrix;
		this.listOfCharacter = listOfCharacter;
	}
	
	draw() {
		
		drawGround(this.ctx, this.scope);
		drawChar(this.ctx, this.scope, this.groundMatrix, this.listOfCharacter);
		//ctx.fillRect(scope.getX(0), scope.getY(0), 21, 21);
		
	};
}