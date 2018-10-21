/**
 * Массив: первым пришел, последним вышел
 */
export default class Queue {
	/**
	 * Нужно ли хранить значения
	 * @param saveValues
	 */
	constructor(saveValues = true) {
		this.current = null;
		this.arr =  [];
		
		if (saveValues) {
			this.i = 0;
			
			this.get = function () {
				this.current = this.arr[this.i++];
				return this.current;
			};
			
			this.put = function (cell) {
				// if (this.i === - 1)
				// 	this.i = 0;
				this.arr.push(cell);
			};
			
			this.isDone = function() {
				return (this.i >= this.arr.length)
			}
		}
		
	}
	put(cell) {
		this.arr.push(cell);
	}
	
	get() {
		this.current = this.arr[0];
		this.arr.shift();
		return this.current;
	}
	
	isDone() {
		return (this.arr.length === 0)
	}
}