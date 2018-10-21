/**
 * Основная периодичная функция, в которой происходит вся движуха
 * @param global {Global}
 * @constructor
 */
export default function Tick(global) {
	
	// global.objects.createdObjects.wall.forEach((wall)=> {
	// 	wall.tick();
	// 	if (wall.needRedraw) {
	// 		global.draw.canvas.charactersChanges = true;
	// 		wall.needRedraw = false;
	// 	}
	// 	let oldPlace = global.groundMatrix[wall.lastPosition.mPoint.x][wall.lastPosition.mPoint.y];
	// 	let newPlace = global.groundMatrix[wall.position.mPoint.x][wall.position.mPoint.y];
	// 	if (oldPlace !== newPlace) {
	// 		newPlace.placed[wall.id] = wall;
	// 		if (oldPlace.placed[wall.id]) {
	// 			delete oldPlace.placed[wall.id];
	// 		}
	// 		wall.lastPosition = wall.position.clone();
	// 		global.draw.canvas.wallsChanges = true;
	// 	}
	// });
	//
	// global.objects.createdObjects.character.forEach((character) => {
	// 	character.tick();
	// 	if (character.needRedraw) {
	// 		global.draw.canvas.charactersChanges = true;
	// 		character.needRedraw = false;
	// 	}
	// 	let oldPlace = global.groundMatrix[character.lastPosition.mPoint.x][character.lastPosition.mPoint.y];
	// 	let newPlace = global.groundMatrix[character.position.mPoint.x][character.position.mPoint.y];
	// 	if (oldPlace !== newPlace) {
	// 		newPlace.placed[character.id] = character;
	// 		if (oldPlace.placed[character.id]) {
	// 			delete oldPlace.placed[character.id];
	// 		}
	// 		character.lastPosition = character.position.clone();
	// 	}
	// });
	
	for (let obj in global.objects.createdObjects) {
		global.objects.createdObjects[obj].forEach((object) => {
			object.tick();
			if (object.needRedraw) {
				global.draw.canvas.charactersChanges = true;
				object.needRedraw = false;
			}
			let oldPlace = global.groundMatrix[object.lastPosition.mPoint.x][object.lastPosition.mPoint.y];
			let newPlace = global.groundMatrix[object.position.mPoint.x][object.position.mPoint.y];
			if (oldPlace !== newPlace) {
				newPlace.placed[object.id] = character;
				if (oldPlace.placed[object.id]) {
					delete oldPlace.placed[object.id];
				}
				object.lastPosition = object.position.clone();
			}
		});
	}
}