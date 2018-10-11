export default class Time {
	constructor(interval = 4) {
		this.interval = interval;
		this.operationsInSecond = 1000 / this.interval;
	}
	
}