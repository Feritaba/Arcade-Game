// Enemies class
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y + 51;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        this.boundry = this.step * 5;
        this.resetPos = -this.step;
    }

    // Update the enemy's position
    update(dt) {

        if (this.x < this.boundry) {
            this.x += this.speed * dt;
        } else {
            this.x = this.resetPos;
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class
class FirstPlayer {
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 51;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Player moves with arrow keys
    handleInput(input) {
        switch(input) {
            case 'left' :
                if (this.x > 0)
                    {this.x -= this.step;
                }
            break;
            case 'right' :
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
            break;
            case 'up' :
                if (this.y > 0) {
                    this.y -= this.jump;
                }
            break;
            case 'down' :
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
            break;
        }
    }

    // Update the player's position
    update() {
        for (let enemy of allEnemies) {
            if ( (this.y === enemy.y) && (enemy.x + enemy.step/2 + 20 > this.x)
                && (enemy.x < this.x + this.step/2) ) {
                    this.reset();
            }
        }

        // Won the game alert
        if ( this.y < 55 ) {
            alert('You won!!');
            this.reset();
        }
    }

    // Reset the player's position
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}

// Instantiate our objects (player and enemy)
const player = new FirstPlayer();
const allEnemies = [
    new Enemy (-101,0, 350),
    new Enemy(-101,83, 300),
    new Enemy((-101*2.5), (83 * 2), 30),
    new Enemy(-101,83, 400)
    ];

// Listens for key presses and sends the keys to your player
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
