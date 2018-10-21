/**
 * Те предметы, которые можно взять в инвентарь
 */
import PhysicalObjects from "../PhysicalObjects.js";

export default class Loot extends PhysicalObjects{
	constructor(name, position, hp = 100) {
		super(name = "Loot", position, hp);
		this.type = Loot;
		this.baseType = Loot;
	}
	tick() {
		super.tick();
	}
}