
class EndState extends Phaser.State {

    create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let btnPlay = this.game.add.button(center.x, center.y, 'gameover', this.startGame, this);
        btnPlay.anchor.setTo(0.5, 0.5);
    }

    startGame() {
        this.game.state.start('PlayState');
    }

}

export default EndState;
