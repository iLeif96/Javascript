/**
 * Предоставляет временные данные для процесса
 */
export default class Time {
	static get interval() {
		return 4;
	}
	
	static get operationsInSecond() {
		return 1000 / this.interval
	}
}