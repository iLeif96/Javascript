/**
 * Основная периодичная функция, в которой происходит вся движуха
 * @param global {Global}
 * @constructor
 */
export default function Tick(global) {
	
	global.objects.createdObjects.createdWalls.forEach((wall)=> {
		wall.tick();
		let oldPlace = global.groundMatrix[wall.lastPosition.mPoint.x][wall.lastPosition.mPoint.y];
		let newPlace = global.groundMatrix[wall.position.mPoint.x][wall.position.mPoint.y];
		if (oldPlace !== newPlace) {
			newPlace.placed[wall.id] = wall;
			if (oldPlace.placed[wall.id]) {
				delete oldPlace.placed[wall.id];
			}
			wall.lastPosition = wall.position.clone();
		}
	});
	
	global.objects.createdObjects.createdCharacter.forEach((character) => {
		character.tick();
		let oldPlace = global.groundMatrix[character.lastPosition.mPoint.x][character.lastPosition.mPoint.y];
		let newPlace = global.groundMatrix[character.position.mPoint.x][character.position.mPoint.y];
		if (oldPlace !== newPlace) {
			newPlace.placed[character.id] = character;
			if (oldPlace.placed[character.id]) {
				delete oldPlace.placed[character.id];
			}
			character.lastPosition = character.position.clone();
		}
	});
}