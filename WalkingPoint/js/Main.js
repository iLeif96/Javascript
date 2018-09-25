'use strict';
import {MPoint} from "./Point.js";
import {CPoint} from "./Point.js";
import Scope from "./Area/Scope.js";
import GroundMatrix from "./Area/GroundMatrix.js";
import Draw from  "./Draw/DrawMain.js";
import Objects from "./Objects/Objects.js";
import Tick from "./Tick.js";

/*
 * Декларация глобальных объектов
 */
let canvas;
let ctx;
let scope;
let groundMatrix;
let objects;
let draw;

let main = function () {
	/*
	 * Объявление глобальных объектов
	 */
	canvas = document.getElementById("canv");
	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;
	ctx = canvas.getContext("2d");
	
	scope = new Scope(canvas);
	groundMatrix = new GroundMatrix(canvas, scope);
	objects = new Objects();
	draw = new Draw(ctx, scope, groundMatrix, objects.createdObjects);
	
	
	/**
	 * Создание персонажей
	 */
	let player = new objects.chars.Player("Васяныч", new MPoint(1, 1));
	objects.addCharacter(player);
	
	let enemy0 = new objects.chars.Enemy("Факингович", groundMatrix.getMPoint(new CPoint(300, 300)));
	objects.addCharacter(enemy0);
	
	let enemy1 = new objects.chars.Enemy("Факингович", groundMatrix.getMPoint(new CPoint(500, 500)));
	objects.addCharacter(enemy1);
	
    setStartingProperties();
    draw.draw();
};

let setStartingProperties = function() {
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getX = function () {
		return scope.getX(this.valueOf())
	};
	/**
	 * Для быстрого перевода координат
	 * @return {number};
	 */
	Number.prototype.getY = function () {
		return scope.getY(this.valueOf())
	};
	
};

main();