/**
 * Отвечает за обработку действий пользователя
 */
export class Events {
	/**
	 * Добавить новый обработчик событий
	 * @param {String} event - Имя события
	 * @param {object} object - Объект события
	 * @param {Function} func - Функция - обработчик
	 */
	static addEvent(event, object, func) {
		if (!object.addEventListener) {
			console.log("Для объекта", object, "невозможно добавить событие");
		}
		
		Events.eventID++;
		if (!Events.listOfObjects[object]) {
			Events.listOfObjects[object] = {};
		}
		Events.listOfObjects[object][Events.eventID] = {event, func};
		Events.listOfEvents[Events.eventID] = {event, object, func};
		object.addEventListener(event, func, true);
		
		return Events.eventID;
	}
	
	/**
	 * Удалить обработчик событий
	 * @param {number} eventID - идентификатор события
	 * @param {object} object - требуемый объект
	 */
	static removeEvent(eventID, object) {
		if (!Events.listOfEvents[eventID]) {
			console.log("Такого события не существует");
			return;
		}
		
		if (!object) {
			let evObj = Events.listOfEvents[eventID];
			evObj.object.removeEventListener(evObj.event, evObj.func, true);
			delete Events.listOfObjects[evObj.object][eventID];
			delete Events.listOfEvents[eventID];
		}
		else {
			let evObj = Events.listOfObjects[object][eventID];
			object.removeEventListener(evObj.event, evObj.func, true);
			delete Events.listOfObjects[object][eventID];
			delete Events.listOfEvents[eventID];
		}
		
		if (Object.keys(Events.listOfObjects[object]).length === 0) {
			delete Events.listOfObjects[object];
		}
	}
	
	/**
	 * Очистить от всех событий объект (возможно нужно для очистки памяти)
	 * @param object
	 */
	static clearObject(object) {
		if (!Events.listOfObjects[object]) {
			console.log("Объект не найден");
			return;
		}
		for (let eventID in Events.listOfObjects[object]) {
			Events.removeEvent(eventID, object)
		}
	}
}

/**
 * Список всех объектов с соответсвующими им событиями
 */
Events.listOfObjects = {};

/**
 * Список всех событий с соответсвующими им объектами
 */
Events.listOfEvents = {};

/**
 * Идентификатор новосозанного события
 * @type {number}
 */
Events.eventID = -1;

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

