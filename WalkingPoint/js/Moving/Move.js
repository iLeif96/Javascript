export default class Move {
	constructor(groundMatrix, createdCharacters) {
		this.gM = groundMatrix;
		this.objects = createdCharacters;
	}
	
	tick() {
		this.objects.createdWalls.forEach((wall) => {
			
		})
		
		this.objects.createdCharacters.forEach((character) => {
			
		})
	}
}