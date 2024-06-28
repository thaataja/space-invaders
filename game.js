const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Initial resize
window.addEventListener('resize', resizeCanvas);

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    color: 'white',
    speed: 5
};

let bullets = [];
let enemies = [];
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

// Prevent default touch actions
canvas.addEventListener('touchstart', (event) => event.preventDefault(), { passive: false });
canvas.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });
canvas.addEventListener('touchend', (event) => event.preventDefault(), { passive: false });

function handleTouchStart(event) {
    touchX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    let touch = event.touches[0];
    let touchMovedX = touch.clientX;

    if (touchMovedX < touchX) {
        player.x -= player.speed;
    } else if (touchMovedX > touchX) {
        player.x += player.speed;
    }

    touchX = touchMovedX;
}

function handleTouchEnd(event) {
    bullets.push({ x: player.x + player.width / 2, y: player.y, width: 5, height: 10, color: 'red', speed: 7 });
}

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        context.fillStyle = enemy.color;
        context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemy.speed;
        if (enemy.y + enemy.height > canvas.height) {
            resetGame();
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
            }
        });
    });
}

function resetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height - 30;
    bullets = [];
    enemies = [];
    initializeEnemies();
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

    moveEnemies(); // Move enemies down
    detectCollisions(); // Detect collisions

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    bullets.forEach(bullet => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    requestAnimationFrame(update);
}

function initializeEnemies() {
    const rows = 3;
    const cols = 8;
    const enemyWidth = 20;
    const enemyHeight = 20;
    const padding = 10;
    const offsetTop = 30;
    const offsetLeft = 30;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let enemyX = col * (enemyWidth + padding) + offsetLeft;
            let enemyY = row * (enemyHeight + padding) + offsetTop;
            enemies.push({
                x: enemyX,
                y: enemyY,
                width: enemyWidth,
                height: enemyHeight,
                color: 'green',
                speed: 0.5 // Adjust speed for downward movement
            });
        }
    }
}

initializeEnemies();
update();
