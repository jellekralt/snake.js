import StartState from 'states/StartState';

const SCREEN_WITH = 800;
const SCREEN_HEIGHT = 800;

class Game extends Phaser.Game {

	constructor() {
		super(SCREEN_WITH, SCREEN_HEIGHT, Phaser.AUTO, 'content', null);
        
		this.state.add('StartState', StartState, false);
		this.state.start('StartState');
	}

}

new Game();
