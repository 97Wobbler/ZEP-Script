let players = [];

function updatePlayers() {
    players = App.players;
}

class PlayerTag {
    constructor() {
        this.hasJumped = false;
    }
}



App.onJoinPlayer.Add(function (player) {
    updatePlayers();
    player.tag = new PlayerTag();
});

App.onLeavePlayer.Add(function (player) {
    updatePlayers();
});



App.onUpdate.Add(function (dt) {
    for (let player of players) {
        checkLanding(player);
    }
})

function checkLanding(player) {
    const hasJumped = player.tag.hasJumped;
    const isJumping = player.isJumping;

    if (hasJumped == isJumping) return;

    player.tag.hasJumped = player.isJumping;

    if (player.isJumping) { onPlayerJump(player); }
    else { onPlayerLand(player); }
}

function onPlayerJump(player) {
    let locName = player.getLocationName();
    locName = !!locName ? locName : "somewhere";

    App.sayToAll(`${player.name} has jumped on ${locName}.`);
}

function onPlayerLand(player) {
    let locName = player.getLocationName();
    locName = !!locName ? locName : "somewhere";

    App.sayToAll(`${player.name} has landed on ${locName}.`);
}