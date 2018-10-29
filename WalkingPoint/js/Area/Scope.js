'use strict';

import Enums from "../Enums.js";
import {Events} from "../Events.js";

/**
 * Задает параметры поля для отрисовки
 */
export default class Scope {
	constructor(canvas) {
		this.canvas = canvas;
		this.cell = 35;
		this.deltaX = 0;
		this.deltaY = 0;
		this.scale = 1;
		
		this.view = Enums.camera.view.cartesian;
		
		this.wStart = 0;
		this.hStart = 0;
		
		this.width = 0;
		this.height = 0;
		
		this.wMid = this.width / 2;
		this.hMid = this.height / 2;
		
		this.initialisation();
	}
	
	/**
	 * Обновить данные
	 */
	initialisation() {
		this.setCanvasSize();
		this.refresh();
		Events.addEvent("resize", this.canvas, this.resize);
	}
	
	/**
	 * Обновление объекта
	 */
	refresh() {
		this.resize();
	}
	
	/**
	 * Изменение размеров поля
	 */
	resize() {
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.wMid = this.width / 2;
		this.hMid = this.height / 2;
		this.canvas.globalChanges = true;
	}
	
	/**
	 * Установить размер холста в зависимости от размера поля
	 */
	setCanvasSize() {
		this.canvas.canvasContainer.style.width = (this.canvas.width - (this.canvas.width % this.cell)) + "px";
		this.canvas.canvasContainer.style.height = (this.canvas.height - (this.canvas.height % this.cell)) + "px";
		this.hStart = this.canvas.canvasContainer.offsetTop;
		this.wStart = this.canvas.canvasContainer.offsetHeight;
		this.canvas.refresh();
		
	}
	
	/**
	 * Переводи координату в изометрический вид
	 * @param cPoint {CPoint}
	 */
	pointToIsometric(cPoint) {
		return cPoint.clone().setPosition(cPoint.x - cPoint.y, (cPoint.x + cPoint.y) / 2);
	}
	
	/**
	 * Переводи координату в изометрический вид
	 * @param cPoint {CPoint}
	 * @return CPoint
	 */
	pointFromIsometric(cPoint) {
		return cPoint.clone().setPosition((2 * cPoint.y + cPoint.x) / 2, (2 * cPoint.y - cPoint.y) / 2);
	}
	
	/**
	 * Возвращает экранные координаты точки
	 * @param cPoint {CPoint}
	 * @return CPoint
	 */
	pointToDraw(cPoint) {
		return cPoint.clone().setPosition(this.getX(cPoint.x), this.getY(cPoint.y))
	}
	
	/**
	 * Получает координату с масштаброванием и смещением по X;
	 */
	getX(x) {
		return ((x + this.deltaX) * this.scale);
	};
	/**
	 * Получает координату с масштаброванием и смещением по Y;
	 */
	getY(y) {
		return ((y + this.deltaY) * this.scale) ;
	};
	
	/**
	 * Переводит точку из экранных координат в игровые
	 * @param cPoint
	 * @return {*}
	 */
	pointToNormal(cPoint) {
		return cPoint.clone().setPosition(this.getNormalX(cPoint.x), this.getNormalY(cPoint.y))
	}
	
	 /**
	 * Получает координату с обнуленным масштаброванием и смещением по X;
	 */
	getNormalX(x) {
		return ((x / this.scale) - this.deltaX);
	};
	/**
	 * Получает координату с обнуленным масштаброванием и смещением по Y;
	 */
	getNormalY(y) {
		return ((y / this.scale) - this.deltaY);
	};
};

