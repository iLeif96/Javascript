'use strict';
/**
 * Задает параметры поля для отрисовки
 */
export default class Scope {
	constructor(canvas, events) {
		this.canvas = canvas;
		this.cell = 20;
		this.deltaX = 0;
		this.deltaY = 0;
		this.scale = 1;
		
		this.width = 0;
		this.height = 0;
		
		this.initialisation(events);
	}
	
	/**
	 * Обновить данные
	 */
	initialisation(events) {
		this.resize();
		events.addEvent("resize", this.canvas, this.resize);
	}
	
	resize() {
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.canvas.globalChanges = true;
	}
	
	/**
	 * Получает координату с масштаброванием и смещением по X;
	 */
	getX(x) {
		return (x + this.deltaX) * this.scale;
	};
	/**
	 * Получает координату с масштаброванием и смещением по Y;
	 */
	getY(y) {
		return (y + this.deltaY) * this.scale;
	};
	
	 /**
	 * Получает координату с обнуленным масштаброванием и смещением по X;
	 */
	getNormalX(x) {
		return (x / this.scale - this.deltaX) ;
	};
	/**
	 * Получает координату с обнуленным масштаброванием и смещением по Y;
	 */
	getNormalY(y) {
		return (y / this.scale - this.deltaY);
	};
};

