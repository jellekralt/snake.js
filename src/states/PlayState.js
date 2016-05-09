
class PlayState extends Phaser.State {

    constructor() {
        super();

        this.game = null;
        this.cursors = null;
        this.currentMovement = 2;
        this.player = null;
        this.point = null;
        this.score = 0;
        this.speed = 16;
        this.updateSpeed = 100;
        this.lastUpdate = 0;
        this.scoreText = null;
        this.movement = {
            'UP' : 1,
            'RIGHT' : 2,
            'DOWN' : 4,
            'LEFT' : 8
        }
    }

    create() {
        this.currentMovement = 2;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.score = 0;
        this.point = null;
        this.addPoint();
        this.player = [];
        for(var i = 0; i < 4; i++) {
            this.increaseLength();
        }

        var style = {
            font: "16px Arial",
            fill: "#000",
            align: "center"
        };

        this.scoreText = this.game.add.text(10, 10, '', style);
        this.updateScore();
    }

    addPoint() {
        var widthPoints = this.game.width/16;
        var heightPoints = this.game.height/16;
        var x = Math.round(Math.random()*(widthPoints-1))*16;
        var y = Math.round(Math.random()*(heightPoints-1))*16;
        if(!this.point) {
            this.point = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'point');
        }
        this.point.x = x;
        this.point.y = y;
    }

    updateScore() {
        this.scoreText.setText('SCORE: ' + this.score);
    }

    increaseLength() {
        var x = 160;
        var y = 160;
        if(this.player.length != 0) {
            x = this.player[this.player.length-1].x + 16;
            y = this.player[this.player.length-1].y + 16;
        }
        var ball = this.game.add.sprite(x, y, 'playerball');
        this.game.physics.arcade.enable(ball);

        this.player.push(ball);
    }

    updateMovementPosition() {
        if (this.cursors.up.isDown) {
            if(this.currentMovement != this.movement.DOWN) {
                this.currentMovement = this.movement.UP;
            }
        }

        if (this.cursors.right.isDown) {
            if(this.currentMovement != this.movement.LEFT) {
                this.currentMovement = this.movement.RIGHT;
            }
        }

        if (this.cursors.down.isDown) {
            if(this.currentMovement != this.movement.UP) {
                this.currentMovement = this.movement.DOWN;
            }
        }

        if (this.cursors.left.isDown){
            if(this.currentMovement != this.movement.RIGHT) {
                this.currentMovement = this.movement.LEFT;
            }
        }
    }

    getTimeStamp() {
        return new Date().getTime();
    }

    isColliding(a, b) {
        return (a.body.hitTest(b.x, b.y));
    }

    checkCollisionWithSelf() {
        for(var i = 1; i < this.player.length; i++) {
            if(this.player[0].body.hitTest(this.player[i].x, this.player[i].y)) {
                return true;
            }
        }

        return false;
    }

    checkOutOfBoundary() {
        if(this.player[0].x > this.game.width || this.player[0].x < 0) {
            return true;
        }
        if(this.player[0].y > this.game.height || this.player[0].y < 0) {
            return true;
        }

        return false;
    }

    update() {
        this.updateMovementPosition();

        if((this.getTimeStamp() - this.lastUpdate) < this.updateSpeed) {
            return;
        }

        // Check collision with point
        if(this.isColliding(this.player[0], this.point)) {
            this.increaseLength();
            this.addPoint();
            this.score++;
            this.updateScore();
        }

        // Check collision with self
        if(this.checkCollisionWithSelf()) {
            this.game.state.start("EndState");
            return;
        }

        this.lastUpdate = this.getTimeStamp();

        var oldX, oldY;
        for(var i = 0; i < this.player.length; i++) {
            var x = this.player[i].x;
            var y = this.player[i].y;
            if(i != 0) {
                this.player[i].x = oldX;
                this.player[i].y = oldY;
            }

            oldX = x;
            oldY = y;
        }

        this.movePlayer();

    }

    movePlayer() {
        var outOfBoundary = this.checkOutOfBoundary();

        switch(this.currentMovement) {
            case this.movement.UP:
                if (outOfBoundary) {
                    this.player[0].y = this.game.height;
                } else {
                    this.player[0].y -= this.speed;
                }
                break;
            case this.movement.RIGHT:
                if (outOfBoundary) {
                    this.player[0].x = 0;
                } else {
                    this.player[0].x += this.speed;
                }
                break;
            case this.movement.DOWN:
                if (outOfBoundary) {
                    this.player[0].y = 0;
                } else {
                    this.player[0].y += this.speed;
                }
                break;
            case this.movement.LEFT:
                if (outOfBoundary) {
                    this.player[0].x = this.game.width;
                } else {
                    this.player[0].x -= this.speed;
                }
                break;
        }
    }

}

export default PlayState;
