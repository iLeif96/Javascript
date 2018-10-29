import {EventAbleObject, Events} from "./Events.js";

/**
 * Класс нужен для организации хранения информации об объектах HTML: canvas
 */

export default class UserCanvas extends EventAbleObject{
	/**
	 * @param container {String} - название контейнера
	 */
	constructor(container = "canvasContainer") {
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
		 * Холст для отрисовки персонажей
		 * @type {HTMLCanvasElement}
		 */
		this.charactersCanvas = null;
		
		/**
		 * Холст для отрисовки стен
		 * @type {HTMLCanvasElement}
		 */
		this.wallsCanvas = null;
		
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
		 * Контекст для отрисовки персонажей
		 * @type {CanvasRenderingContext2D}
		 */
		this.charactersContext = null;
		
		/**
		 * Контекст для отрисовки стен
		 * @type {CanvasRenderingContext2D}
		 */
		this.wallsContext = null;
		
		/**
		 * Контекст для отрисовки тестов
		 * @type {CanvasRenderingContext2D}
		 */
		this.testsContext = null;
		
		/**
		 * Были ли глобальные изменения
		 * @type {boolean}
		 */
		this.globalChanges = true;
		
		/**
		 * Были ли изменения в поле
		 * @type {boolean}
		 */
		this.groundChanges = true;
		
		/**
		 * Были ли изменения в персонажах
		 * @type {boolean}
		 */
		this.charactersChanges = true;
		
		/**
		 * Были ли изменения в стенах
		 * @type {boolean}
		 */
		this.wallsChanges = true;
		

		
		
		
		/**
		 * Были ли глобальные изменения
		 * @type {boolean}
		 */
		this.globalChanges = true;
		
		this.width = 0;
		this.height = 0;
		
		this.initialisation(container);
	}
	
	/**
	 * Инициализация объектов
	 */
	initialisation(container) {
		this.canvasContainer = document.getElementById(container);
		
		this.groundCanvas = this.canvasContainer.children.groundCanvas;
		this.charactersCanvas = this.canvasContainer.children.charactersCanvas;
		this.wallsCanvas = this.canvasContainer.children.wallsCanvas;
		this.testsCanvas = this.canvasContainer.children.testsCanvas;
		
		this.groundContext = this.groundCanvas.getContext("2d");
		this.charactersContext = this.charactersCanvas.getContext("2d");
		this.wallsContext = this.wallsCanvas.getContext("2d");
		this.testsContext = this.testsCanvas.getContext("2d");
		
		this.refresh();
		
		Events.addEvent("resize", this, this.resize);
		
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
		this.width = this.groundCanvas.width = this.charactersCanvas.width = this.wallsCanvas.width = this.testsCanvas.width = this.canvasContainer.offsetWidth;
		this.height = this.groundCanvas.height = this.charactersCanvas.height = this.wallsCanvas.height = this.testsCanvas.height = this.canvasContainer.offsetHeight;
	}
}