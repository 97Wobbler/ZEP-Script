const Players = {
    list: [],

    update() {
        this.list = App.players; // TODO: 실제로 변경 시마다 새로 참조해야 하는지? 확인해보기
    },

    forAllPlayers(callback) {
        for (const player of Players.list) {
            callback(player);
        }
    }
}

class PlayerTag {
    constructor(player) {
        this.player = player;
        this.hasJumped = false;
        this.keyboardMode = false;
    }

    turnKeyboardModeOn() {
        this.keyboardMode = true;

        this.player.moveSpeed = 0;
        this.player.sendUpdated();
    }

    turnKeyboardModeOff() {
        this.keyboardMode = false;

        this.player.moveSpeed = 90;
        this.player.sendUpdated();
    }
}





const WHITE_KEY = { WIDTH: 96, HEIGHT: 192 };
const BLACK_KEY = { WIDTH: 64, HEIGHT: 160 };

const PIANO_KEY = {
    ANIM: { default: [0], strong: [2, 0], soft: [1, 0] },
    FRAME_RATE: 8
};

const SPRITE_BLACK_KEYS = {
    "c#": App.loadSpritesheet('images/C#.png', BLACK_KEY.WIDTH, BLACK_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "d#": App.loadSpritesheet('images/D#.png', BLACK_KEY.WIDTH, BLACK_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "f#": App.loadSpritesheet('images/F#.png', BLACK_KEY.WIDTH, BLACK_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "g#": App.loadSpritesheet('images/G#.png', BLACK_KEY.WIDTH, BLACK_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "a#": App.loadSpritesheet('images/A#.png', BLACK_KEY.WIDTH, BLACK_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
};

const SPRITE_WHITE_KEYS = {
    "c": App.loadSpritesheet('images/C.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "d": App.loadSpritesheet('images/D.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "e": App.loadSpritesheet('images/E.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "f": App.loadSpritesheet('images/F.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "g": App.loadSpritesheet('images/G.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "a": App.loadSpritesheet('images/A.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE),
    "b": App.loadSpritesheet('images/B.png', WHITE_KEY.WIDTH, WHITE_KEY.HEIGHT, PIANO_KEY.ANIM, PIANO_KEY.FRAME_RATE)
};

const COORDINATE_DATA_KEYS = {
    "c#": { dx: 1, soft: { dx: 0, dy: 1 }, strong: { dx: 0, dy: 2 } },
    "d#": { dx: 2, soft: { dx: 1, dy: 1 }, strong: { dx: 1, dy: 2 } },
    "f#": { dx: 4, soft: { dx: 0, dy: 1 }, strong: { dx: 0, dy: 2 } },
    "g#": { dx: 5, soft: { dx: 0, dy: 1 }, strong: { dx: 0, dy: 2 } },
    "a#": { dx: 6, soft: { dx: 1, dy: 1 }, strong: { dx: 1, dy: 2 } },
    "c": { dx: 0, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "d": { dx: 1, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "e": { dx: 2, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "f": { dx: 3, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "g": { dx: 4, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "a": { dx: 5, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
    "b": { dx: 6, soft: { dx: 1, dy: 3 }, strong: { dx: 1, dy: 4 } },
}

const ORIGIN_COORDINATE = {
    x: Math.floor(Map.width / 2),
    y: Math.floor(Map.height / 2),
};

const KeyboardObjects = {
    areInstalled: false,

    install() {
        if (this.areInstalled) return;

        this.areInstalled = true;

        const x = ORIGIN_COORDINATE.x - 1;
        const y = ORIGIN_COORDINATE.y - 1;

        for (let blackKey of Object.keys(SPRITE_BLACK_KEYS)) {
            let data = COORDINATE_DATA_KEYS[blackKey];

            Map.putObjectWithKey(x + data.dx, y, SPRITE_BLACK_KEYS[blackKey], { key: blackKey });

            Map.putTileEffect(x + data.dx + data.soft.dx, y + data.soft.dy, TileEffectType.LOCATION, {
                name: `${blackKey}_soft`, width: 1, height: 1
            });
            Map.putTileEffect(x + data.dx + data.strong.dx, y + data.strong.dy, TileEffectType.LOCATION, {
                name: `${blackKey}_strong`, width: 1, height: 1
            });
        }

        for (let whiteKey of Object.keys(SPRITE_WHITE_KEYS)) {
            let data = COORDINATE_DATA_KEYS[whiteKey];

            Map.putObjectWithKey(x + data.dx, y, SPRITE_WHITE_KEYS[whiteKey], { key: whiteKey });

            Map.putTileEffect(x + data.dx + data.soft.dx, y + data.soft.dy, TileEffectType.LOCATION, {
                name: `${whiteKey}_soft`, width: 1, height: 1
            });
            Map.putTileEffect(x + data.dx + data.strong.dx, y + data.strong.dy, TileEffectType.LOCATION, {
                name: `${whiteKey}_strong`, width: 1, height: 1
            });
        }
    },

    deleteObjects() {
        if (!this.areInstalled) return;
        this.areInstalled = false;

        const x = ORIGIN_COORDINATE.x - 1;
        const y = ORIGIN_COORDINATE.y - 1;

        for (let blackKey of Object.keys(SPRITE_BLACK_KEYS)) {
            let data = COORDINATE_DATA_KEYS[blackKey];

            Map.putObjectWithKey(0, 0, null, { key: blackKey });

            Map.putTileEffect(x + data.dx + data.soft.dx, y + data.soft.dy, TileEffectType.NONE);
            Map.putTileEffect(x + data.dx + data.strong.dx, y + data.strong.dy, TileEffectType.NONE);
        }
        for (let whiteKey of Object.keys(SPRITE_WHITE_KEYS)) {
            let data = COORDINATE_DATA_KEYS[whiteKey];

            Map.putObjectWithKey(0, 0, null, { key: whiteKey });

            Map.putTileEffect(x + data.dx + data.soft.dx, y + data.soft.dy, TileEffectType.NONE);
            Map.putTileEffect(x + data.dx + data.strong.dx, y + data.strong.dy, TileEffectType.NONE);
        }
    }
}




App.onJoinPlayer.Add(function (player) {
    installObjects();

    Players.update();
    player.tag = new PlayerTag(player);
});

App.onLeavePlayer.Add(function (player) {
    Players.update();
});

App.onUpdate.Add(function (dt) {
    Players.forAllPlayers(checkLanding);
});

function checkLanding(player) {
    const hasJumped = player.tag.hasJumped;
    const isJumping = player.isJumping;

    if (hasJumped == isJumping) return;

    player.tag.hasJumped = player.isJumping;

    if (player.isJumping) {
        // onPlayerJump(player);
    } else {
        onPlayerLand(player);
    }
}

function onPlayerLand(player) {
    let location = player.getLocationName();
    if (!location) return;

    let key = location.split("_")[0];
    let type = location.split("_")[1];
    pressKey(key, type);
}

function pressKey(key, type = "strong") {
    Map.playObjectAnimationWithKey(key, type, 0);
    App.playSound(`sounds/${key}.mp3`, false, true);

    let debugMsg = { key, type };
    App.sayToAll(JSON.stringify(debugMsg), 0xFF8080);
}

App.onSay.Add(function (player, text) {
    switch (text) {
        case "/on": {
            player.tag.turnKeyboardModeOn();
        } break;
        case "/off": {
            player.tag.turnKeyboardModeOff();
        } break;
    }
});

const KeyMap = { A: "c", S: "d", D: "e", F: "f", G: "g", H: "a", J: "b", W: "c#", E: "d#", T: "f#", Y: "g#", U: "a#" };

for (const [key, value] of Object.entries(KeyMap)) {
    const callback = (player) => {
        if (player.tag.keyboardMode) {
            pressKey(value);
        }
    }

    App.addOnKeyDown(KeyCodeType[key], callback);
}