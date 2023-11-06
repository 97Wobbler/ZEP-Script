const TileSizeInPixels = 32;

class SizeWidget {
    constructor(player) {
        this.player = player;
        this.widget = null;
    }

    get isOpen() {
        return !!this.widget ? true : false;
    }

    initialize() {
        this.open();
    }

    open() {
        if (this.isOpen) this.close();

        const filePath = "sizeWidget.html";
        const postion = "topleft";
        const width = 1;
        const height = 1;

        this.widget = this.player.showWidget(filePath, postion, width, height);

        this.widget.onMessage.Add((player, data) => {
            const playerTag = PlayerTag.getInstanceOfPlayer(player);
            playerTag.update(data);

            this.close();
        });

        this.widget.sendMessage({ type: "initialize" });
    }

    close() {
        if (!this.isOpen) return;

        this.widget.destroy();
        this.widget = null;
    }
}

class PlayerTag {
    constructor(player) {
        this.player = player;
        this.sizeWidget = new SizeWidget(player);

        this.screenWidth = 0;
        this.screenHeight = 0;
    }

    get screenWidthInTiles() {
        return Math.floor(this.screenWidth / TileSizeInPixels);
    }
    
    get screenHeightInTiles() {
        return Math.floor(this.screenHeight / TileSizeInPixels);
    }

    initialize() {
        this.sizeWidget.initialize();
    }

    update({ screenWidth, screenHeight } = {}) {
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
    }

    log() {
        const logMessage1 = `screenSize: W ${this.screenWidth}px * H ${this.screenHeight}px`;
        const logMessage2 = `screenSizeInTiles: W ${this.screenWidthInTiles} * H ${this.screenHeightInTiles}`;

        this.player.sendMessage(logMessage1);
        this.player.sendMessage(logMessage2);
    }
}

// Since the 'static' keyword is not supported on ZEP Script, static methods must be declared separately after the class declaration.
PlayerTag.getInstanceOfPlayer = (player) => { return player.tag; };



App.onJoinPlayer.Add(function (player) {
    player.tag = new PlayerTag(player);
    player.tag.initialize();
});

App.addOnKeyDown(KeyCodeType.Q, logPlayerScreenSize);

function logPlayerScreenSize(player) {
    const playerTag = PlayerTag.getInstanceOfPlayer(player);
    playerTag.log();
}