import {EventAbleObject} from "./Events.js";

/**
 * Класс нужен для организации хранения информации об объектах HTML: canvas
 */

export default class UserCanvas extends EventAbleObject{
	/**
	 * @param events {Events} - для задания события обновления размера
	 * @param container {String} - название контейнера
	 */
	constructor(events, container = "canvasContainer") {
		super();
		/**
		 * Контейнер, в котором хранятся холсты
		 * @type {HTMLDivElement}
		 */
		this.canvasContainer = null;
		
		/**
		 * Холст для отрисовки пространства
		 * @type {HTMLCanvasElement}
		 */
		this.groundCanvas = null;
		
		/**
		 * Холст для отрисовки объектов
		 * @type {HTMLCanvasElement}
		 */
		this.objectsCanvas = null;
		
		/**
		 * Холст для отрисовки тестов
		 * @type {HTMLCanvasElement}
		 */
		this.testsCanvas = null;
		
		/**
		 * Контекст для отрисовки пространства
		 * @type {CanvasRenderingContext2D}
		 */
		this.groundContext = null;
		
		/**
		 * Контекст для отрисовки объектов
		 * @type {CanvasRenderingContext2D}
		 */
		this.objectsContext = null;
		
		/**
		 * Контекст для отрисовки тестов
		 * @type {CanvasRenderingContext2D}
		 */
		this.testsContext = null;
		
		/**
		 * Были ли изменения в поле
		 * @type {boolean}
		 */
		this.groundChanges = true;
		
		/**
		 * Были ли изменения в объектах
		 * @type {boolean}
		 */
		this.objectsChanges = true;
		
		/**
		 * Были ли глобальные изменения
		 * @type {boolean}
		 */
		this.globalChanges = true;
		
		this.width = 0;
		this.height = 0;
		
		this.initialisation(events, container);
	}
	
	/**
	 * Инициализация объектов
	 */
	initialisation(events, container) {
		this.canvasContainer = document.getElementById(container);
		
		this.groundCanvas = this.canvasContainer.children.groundCanvas;
		this.objectsCanvas = this.canvasContainer.children.objectsCanvas;
		this.testsCanvas = this.canvasContainer.children.testsCanvas;
		
		this.groundContext = this.groundCanvas.getContext("2d");
		this.objectsContext = this.objectsCanvas.getContext("2d");
		this.testsContext = this.testsCanvas.getContext("2d");
		
		
		this.refresh();
		
		events.addEvent("resize", this, this.resize);
		
		/*
			Нужно для задания функции-обработчика
		 */
		this.HTMLElement = this.canvasContainer;
	}
	
	/**
	 * Функция для обновления изменений
	 */
	refresh()  {
		this.resize();
	}
	
	/**
	 * Изменение размеров холстов при изменении размеров окна
	 */
	resize() {
		this.width = this.groundCanvas.width = this.objectsCanvas.width = this.testsCanvas.width = this.canvasContainer.offsetWidth;
		this.height = this.groundCanvas.height = this.objectsCanvas.height = this.testsCanvas.height = this.canvasContainer.offsetHeight;
	}
}