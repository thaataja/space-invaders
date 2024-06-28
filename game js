const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    color: 'white',
    speed: 5
};

let bullets = [];
let keys = {};
let touchX = null;

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);
canvas.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    touchX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    let touch = event.touches[0];
    let touchMovedX = touch.clientX;

    if (touchMovedX < touchX) {
        // Move left
        player.x -= player.speed;
    } else if (touchMovedX > touchX) {
        // Move right
        player.x += player.speed;
    }

    // Update touchX for next move
    touchX = touchMovedX;
}

function handleTouchEnd(event) {
    // Shoot when touch ends
    bullets.push({ x: player.x + player.width / 2, y: player.y, width: 5, height: 10, color: 'red', speed: 7 });
}

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    if (keys[' ']) {
        bullets.push({ x: player.x + player.width / 2, y: player.y, width: 5, height: 10, color: 'red', speed: 7 });
    }

    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    bullets.forEach(bullet => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    requestAnimationFrame(update);
}

update();
