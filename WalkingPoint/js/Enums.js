/**
 * Так как js - очень прекрасный язык, то перечисления офромим отдельно в класс, предназначенный для импорта
 */
export default class Enums {

}

Enums.camera = Object.freeze({
	view: { cartesian: 0, isometric: 1 },
	followMode: { noneFollow: 0, simpleFollow: 1}
});