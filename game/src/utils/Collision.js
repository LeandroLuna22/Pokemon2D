//Collision.js
export function checkPlatformCollision(player, platforms) {

    const SNAP_DISTANCE = 8;
    player.onGround = false;

    platforms.forEach(p => {

        const playerTop = player.y;
        const playerBottom = player.y + player.h;
        const playerLeft = player.x;
        const playerRight = player.x + player.w;

        const platformTop = p.y;
        const platformBottom = p.y + p.h;
        const platformLeft = p.x;
        const platformRight = p.x + p.w;

        const horizontalOverlap =
            playerRight > platformLeft + 52 &&
            playerLeft < platformRight - 52;

        // =========================
        // ⬇️ CHÃO (queda)
        // =========================
        if (
            horizontalOverlap &&
            player.vy >= 0 &&
            playerBottom <= platformTop + player.vy &&
            playerBottom + player.vy >= platformTop
        ) {
            player.y = platformTop - player.h;
            player.vy = 0;
            player.onGround = true;
        }

        // =========================
        // 🔒 SNAP NO CHÃO
        // =========================
        else if (
            horizontalOverlap &&
            player.vy === 0 &&
            Math.abs(playerBottom - platformTop) <= SNAP_DISTANCE
        ) {
            player.y = platformTop - player.h;
            player.onGround = true;
        }

// =========================
// ⬆️ TETO (cabeçada)
// =========================
else if (
    horizontalOverlap && 
    player.vy < 0 && 
    player.y <= platformBottom &&      // Se a posição atual passou do teto
    player.prevY >= platformBottom     // E a posição anterior estava abaixo do teto
) {
    player.y = platformBottom; 
    player.vy = 0;
}
    });
}

