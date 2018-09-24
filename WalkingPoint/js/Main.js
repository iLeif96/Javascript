'use strict';
import Scope from "./Area/Scope.js";
import GroundMatrix from "./Area/GroundMatrix.js";
import Draw from  "./Draw/DrawMain.js";

/*
 * Декларация глобальных объектов
 */
let canvas;
let ctx;
let scope;
let groundMatrix;
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
	draw = new Draw(ctx, scope, groundMatrix);
	
	
    setStartingProperties();
    draw.draw();
};

let setStartingProperties = function() {
	/**
	 * Для быстрого перевода координат
	 */
	Number.prototype.getX = function () {
		return scope.getX(this.valueOf())
	};
	/**
	 * Для быстрого перевода координат
	 */
	Number.prototype.getY = function () {
		return scope.getY(this.valueOf())
	};
	
};

main();