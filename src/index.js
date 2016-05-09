import StartState from 'states/StartState';
import PlayState from 'states/PlayState';
import EndState from 'states/EndState';

const SCREEN_WITH = 800;
const SCREEN_HEIGHT = 800;

class Game extends Phaser.Game {

	constructor() {
		super(SCREEN_WITH, SCREEN_HEIGHT, Phaser.AUTO, 'content', null);

        this.state.add('StartState', StartState, false);
        this.state.add('PlayState', PlayState, false);
        this.state.add('EndState', EndState, false);
		this.state.start('StartState');
	}

}

new Game();
