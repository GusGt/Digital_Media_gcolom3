let hero;

function preload() {
	hero = new Sprite(62, 24, 32, 32);
	hero.spriteSheet = 'Assets/questKid.png';
	hero.anis.offset.x = 2;
	hero.anis.frameDelay = 8;

	hero.addAnis({
		run: { row: 0, frames: 8 },
		jump: { row: 1, frames: 6 },
		roll: { row: 2, frames: 5, frameDelay: 14 },
		turn: { row: 3, frames: 7 },
		stand: { row: 3, frames: 1 }
	});
	hero.changeAni('run');
}

function setup() {
	new Canvas(124, 48, 'pixelated x4');
	allSprites.pixelPerfect = true;
}

function draw() {
	clear();
	if (kb.presses('r')) hero.changeAni('run');
	if (kb.presses('j')) hero.changeAni('jump');
	if (kb.presses('l')) hero.changeAni('roll');
	if (kb.presses('t')) hero.changeAni('turn');
	if (kb.presses('s')) hero.changeAni('stand');
}