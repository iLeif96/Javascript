/**
 * Основная периодичная функция, в которой происходит вся движуха
 * @param global {Global}
 * @constructor
 */
export default function Tick(global) {
	
	global.objects.createdObjects.createdCharacter.forEach((character)=> {
		character.tick();
	})
}