export function checkPlatformCollision(player, platforms) {

    player.onGround = false;

    platforms.forEach(p => {

        if (
            player.x < p.x + p.w &&
            player.x + player.w > p.x &&
            player.y + player.h <= p.y + 10 &&
            player.y + player.h + player.vy >= p.y
        ) {
            if (player.vy > 0) {
                player.y = p.y - player.h;
                player.vy = 0;
                player.onGround = true;
            }
        }

    });
}
