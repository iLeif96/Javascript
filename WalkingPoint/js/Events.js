/**
 * Отвечает за обработку действий пользователя
 */
export class Events {
	constructor() {
		/**
		 * Список всех объектов с соответсвующими им событиями
		 */
		this.listOfObjects = {};
		
		/**
		 * Список всех событий с соответсвующими им объектами
		 */
		this.listOfEvents = {};
		
		/**
		 * Идентификатор новосозанного события
		 * @type {number}
		 */
		this.eventID = -1;
	}
	
	/**
	 * Добавить новый обработчик событий
	 * @param {String} event - Имя события
	 * @param {object} object - Объект события
	 * @param {Function} func - Функция - обработчик
	 */
	addEvent(event, object, func) {
		if (!object.addEventListener) {
			console.log("Для объекта", object, "невозможно добавить событие");
		}
		
		this.eventID++;
		if (!this.listOfObjects[object]) {
			this.listOfObjects[object] = {};
		}
		this.listOfObjects[object][this.eventID] = {event, func};
		this.listOfEvents[this.eventID] = {event, object, func};
		object.addEventListener(event, func, true);
		
		return this.eventID;
	}
	
	/**
	 * Удалить обработчик событий
	 * @param {number} eventID - идентификатор события
	 * @param {object} object - требуемый объект
	 */
	removeEvent(eventID, object) {
		if (!this.listOfEvents[eventID]) {
			console.log("Такого события не существует");
			return;
		}
		
		if (!object) {
			let evObj = this.listOfEvents[eventID];
			evObj.object.removeEventListener(evObj.event, evObj.func, true);
			delete this.listOfObjects[evObj.object][eventID];
			delete this.listOfEvents[eventID];
		}
		else {
			let evObj = this.listOfObjects[object][eventID];
			object.removeEventListener(evObj.event, evObj.func, true);
			delete this.listOfObjects[object][eventID];
			delete this.listOfEvents[eventID];
		}
		
		if (Object.keys(this.listOfObjects[object]).length === 0) {
			delete this.listOfObjects[object];
		}
	}
	
	/**
	 * Очистить от всех событий объект (возможно нужно для очистки памяти)
	 * @param object
	 */
	clearObject(object) {
		if (!this.listOfObjects[object]) {
			console.log("Объект не найден");
			return;
		}
		for (let eventID in this.listOfObjects[object]) {
			this.removeEvent(eventID, object)
		}
	}
}

/**
 * Класс, позволяющий объекту работать с событиями
 */
export class EventAbleObject {
	constructor(HTMLElement) {
		this.HTMLElement = HTMLElement;
	}
	/**
	 * Функция для добавления события
	 * @param {String} event - имя события
	 * @param {Function} func - функция-обработчик
	 */
	addEventListener(event, func, useCapture) {
		if (this.HTMLElement) {
			this.HTMLElement.addEventListener(event, func, useCapture)
		}
	}
	
	/**
	 * Функция для удаления события
	 * @param {String} event - имя события
	 * @param {Function} func - функция-обработчик
	 */
	removeEventListener(event, func, useCapture) {
		if (this.HTMLElement) {
			this.HTMLElement.removeEventListener(event, func, useCapture)
		}
	}
}