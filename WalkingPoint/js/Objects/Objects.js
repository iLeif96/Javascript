/**
 * Сначла импортируем объекты
 */
import Player from "./PhysicalObjects/Characters/Player.js";
import Enemy from "./PhysicalObjects/Characters/Enemy.js";
import Runner from "./PhysicalObjects/Characters/Runner.js";

import RoughWall from "./PhysicalObjects/Walls/RoughWall.js";

import Bullet from "./Decals/Bullet.js";

import Weapon from "./PhysicalObjects/Loot/Weapons/Weapon.js";

import Camera from "./Camera.js"

/**
 * Основной класс для создания и хранения объектов;
 */
export default class Objects {
	constructor(groundMatrix) {
		this.groundMatrix = groundMatrix;
		
		/**
		 Список доступных персонажей
		 */
		this.chars = {
			/** @type Player */
			Player: Player,
			/** @type Enemy */
			Enemy: Enemy,
			/** @type Runner */
			Runner: Runner
		};
		
		/**
			Список доступных стен
		 */
		this.walls = {
			/** @type RoughWall */
			RoughWall: RoughWall,
		};
		
		/**
		 Список доступных декалей
		 */
		this.decals = {
			/** @type RoughWall */
			Bullet: Bullet,
		};
		
		/**
		 Список доступного лута
		 */
		this.loot = {
			Weapon: Weapon,
		};
		
		//this.Camera = Camera;
		
		/**
		 * Список созданных объектов
		 */
		this.createdObjects = {
			character: [],
			decal: [],
			wall: [],
			loot: [],
			camera: [],
		};
		
		this.forId = 0;
	}
	
	/**
	 * Создать персонажа
	 * @param character
	 */
	addCharacter(character) {
		this.createdObjects.character.push(character);
		character.id = this.forId++;
		this.groundMatrix[character.position.mPoint.x][character.position.mPoint.y].placed[character.id] = character;
		return character;
	}
	
	/**
	 * Создать стенку
	 * @param wall
	 */
	addWall(wall) {
		this.createdObjects.wall.push(wall);
		wall.id = this.forId++;
		this.groundMatrix[wall.position.mPoint.x][wall.position.mPoint.y].placed[wall.id] = wall;
		return wall;
	}
	
	/**
	 * Создать декаль
	 * @param decal
	 */
	addDecal(decal) {
		this.createdObjects.decal.push(decal);
		decal.id = this.forId++;
		this.groundMatrix[decal.position.mPoint.x][decal.position.mPoint.y].placed[decal.id] = decal;
		return decal;
	}
	
	/**
	 * Создать лут
	 * @param loot
	 */
	addLoot(loot) {
		this.createdObjects.loot.push(loot);
		loot.id = this.forId++;
		this.groundMatrix[loot.position.mPoint.x][loot.position.mPoint.y].placed[loot.id] = loot;
		return loot;
	}
	
	/**
	 * Добавить камеру
	 * @param camera Camera
	 */
	addCamera(camera) {
		this.createdObjects.camera.push(camera);
		camera.id = this.forId++;
		return camera;
	}
}