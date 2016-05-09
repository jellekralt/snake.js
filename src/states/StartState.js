
class StartState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		let btnPlay = this.game.add.button(center.x, center.y, 'play', this.startGame, this);
        btnPlay.anchor.setTo(0.5, 0.5);
	}

    preload() {
        this.game.stage.backgroundColor = '#777964';

        this.game.load.image('gameover', 'gfx/gameover.png');
        this.game.load.image('point', 'gfx/point.png');
        this.game.load.image('playerball', 'gfx/player-ball.png');
        this.game.load.image('play', 'gfx/play.png');
    }

	startGame() {
		this.game.state.start('PlayState');
	}

}

export default StartState;
