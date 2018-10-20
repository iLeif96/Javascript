'use strict';
import {MPoint} from "./Point.js";
import {CPoint} from "./Point.js";
import Global from "./Global.js";
import tick from "./Tick.js";
import Interpolation from "./Interpolation/Interpolation.js";
import Time from "./Time.js";

/**
 * Декларация глобального объекта
 * @type {Global}
 */
let global;

let main = function () {
	/*
	 * Объявление глобального объекта
	 */
	global = new Global();
	setStartingProperties();
	
	// global.userActivity.gMTest(global.groundMatrix, global.draw);
	
	/**
	 * Создание персонажей
	 */
	let mid = new MPoint(9, 9);
	// mid.x = 3; mid.y = 2;
	let player = new global.objects.chars.Player("Васяныч", global.groundMatrix.getCell(mid));
	global.userActivity.movePlayerOnClick(player);
	global.userActivity.shootPlayerOnDblClick(player);
	//global.AI.addAI(player, global.AI.BaseAI);
	global.objects.addCharacter(player);
	
	
	
	let runner0 = new global.objects.chars.Runner("Болт", global.groundMatrix.getCell(new MPoint(4, 7)), 200);
	//global.userActivity.movePlayerOnClick(enemy0);
	global.AI.addAI(runner0, global.AI.RunnerAI);
	global.objects.addCharacter(runner0);

	let enemy0 = new global.objects.chars.Enemy("Жопадрызгович", global.groundMatrix.getCell(new MPoint(1, 3)));
	//global.userActivity.movePlayerOnClick(enemy0);
	global.AI.addAI(enemy0, global.AI.SimpleEnemyAI);
	global.objects.addCharacter(enemy0);
	//
	let enemy1 = new global.objects.chars.Enemy("Факингович", global.groundMatrix.getCell(new MPoint(1, 5)), 170);
	global.objects.addCharacter(enemy1);
	//global.userActivity.movePlayerOnClick(enemy1);
	global.AI.addAI(enemy1, global.AI.SimpleEnemyAI);

	let enemy2 = new global.objects.chars.Enemy("Факингович", global.groundMatrix.getCell(new MPoint(10, 5)), 130);
	enemy2.decency = 70;
	enemy2.color = "rgb(192, 168, 0)";
	global.objects.addCharacter(enemy2);
	//global.userActivity.movePlayerOnClick(enemy1);
	global.AI.addAI(enemy2, global.AI.SimpleEnemyAI);
	
	// global.events.addEvent("mousedown", global.canvas, function (ev) {
	// 	let qwe = new global.objects.chars.Enemy("Факингович", global.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), 100);
	// 	global.objects.addCharacter(qwe);
	// 	global.AI.addAI(qwe, global.AI.SimpleEnemyAI);
	// });
	//
	// global.events.addEvent("mouseup", global.canvas, function (ev) {
	// 	let qwe = new global.objects.chars.Runner("Факингович", global.groundMatrix.getCell(new CPoint(ev.offsetX.getNormalX(), ev.offsetY.getNormalY())), 120);
	// 	global.objects.addCharacter(qwe);
	// 	global.AI.addAI(qwe, global.AI.RunnerAI);
	// });
	
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(7, 9))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(7, 8))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 8))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 9))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 10))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 11))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 12))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 13))));
	global.objects.addWall(new global.objects.walls.RoughWall("Wall", global.groundMatrix.getCell(new MPoint(8, 14))));
	//console.log(player.speed, enemy0.speed, enemy1.speed);
	
	for (let cell of global.groundMatrix.forEach()) {
		if (!cell.isBusy()) {
			if ((cell.x === 0)) {
				global.objects.addWall(new global.objects.walls.RoughWall("Wall", cell.clone()));
			}
			else if ((cell.y === 0)) {
				global.objects.addWall(new global.objects.walls.RoughWall("Wall", cell.clone()));
			}
			else if ((cell.x === global.groundMatrix.xLenght - 1)) {
				global.objects.addWall(new global.objects.walls.RoughWall("Wall", cell.clone()));
			}
			else if ((cell.y === global.groundMatrix.yLenght - 1)) {
				global.objects.addWall(new global.objects.walls.RoughWall("Wall", cell.clone()));
			}
		}
	}
	
	global.draw.setRequestAnimationFrame();
	//let tickWorker = new Worker("Tick.js");
	setInterval(tick.bind(this, global), Time.interval);
	
	
};



let setStartingProperties = function() {
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getX = function () {
		return global.scope.getX(this.valueOf())
	};
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getY = function () {
		return global.scope.getY(this.valueOf())
	};
	
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getNormalX = function () {
		return global.scope.getNormalX(this.valueOf())
	};
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getNormalY = function () {
		return global.scope.getNormalY(this.valueOf())
	};
};

main();
