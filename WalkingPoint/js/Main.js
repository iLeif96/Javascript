'use strict';
import {MPoint} from "./Point.js";
import {CPoint} from "./Point.js";
import Global from "./Global.js";
import tick from "./Tick.js";

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
	
	/**
	 * Создание персонажей
	 */
	let player = new global.objects.chars.Player("Васяныч", new MPoint(1, 1));
	global.objects.addCharacter(player);
	
	let enemy0 = new global.objects.chars.Enemy("Факингович", global.groundMatrix.getMPoint(new CPoint(300, 300)));
	global.objects.addCharacter(enemy0);
	
	let enemy1 = new global.objects.chars.Enemy("Факингович", global.groundMatrix.getMPoint(new CPoint(500, 500)));
	global.objects.addCharacter(enemy1);
	
    setStartingProperties();
	
    //Для теста
	document.onmousemove = function(ev) {
		player.position = global.groundMatrix.getMPoint(new CPoint(ev.clientX, ev.clientY));
		global.draw.draw();
		
	};
	
	global.draw.draw();
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
	
};

main();