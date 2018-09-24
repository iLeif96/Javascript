/**
 * Сначла импортируем объекты
 */
import _Player from "./Characters/Player.js";
import _Enemy from "./Characters/Enemy.js";

import _RoughWall from "./Walls/RoughWall.js";

/**
 * Основной класс для создания и хранения объектов;
 */
export default class Objects {
	constructor() {
		/**
		 Список доступных персонажей
		 */
		this.chars = {
			Player: _Player,
			Enemy: _Enemy,
		};
		
		/**
			Список доступных стен
		 */
		this.walls = {
			RoughWall: _RoughWall,
		};
		
		/**
		 * Список созданных объектов
		 */
		this.createdObjects = {
			createdCharacter: [],
			createdWalls: [],
		};
	}
	
	/**
	 * Создать персонажа
	 * @param character
	 */
	addCharacter(character) {
		this.createdObjects.createdCharacter.push(character);
	}
	
	/**
	 * Создать стенку
	 * @param wall
	 */
	addWall(wall) {
		this.createdObjects.createdCharacter.push(wall);
	}
}