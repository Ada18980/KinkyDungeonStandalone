function init() {

    // index.html
    ServerURL = "foobar";
    CommonIsMobile = CommonDetectMobile();
    TranslationLoad();
    DrawLoad();
    AssetLoadAll();
    ControllerActive = false;
    let _TextLoad = TextLoad; // Avoid nonexistant text query
    TextLoad = () => {};
    CommonSetScreen("KinkyDungeon", "KinkyDungeonMain");
    TextLoad = _TextLoad;
    MainRun(0);

    // LoginLoad
    Character = [];
    CharacterNextId = 1;
    CharacterReset(0, "Female3DCG");
    CharacterLoadCSVDialog(Player);
    ActivityDictionaryLoad();

    Player.ArousalSettings = {};
    Player.ArousalSettings.VFXFilter = "VFXFilterHeavy";
    Player.OnlineSharedSettings = {};
    Player.OnlineSharedSettings.ItemsAffectExpressions = true
    Player.AudioSettings = {};
    Player.AudioSettings.Volume = 1;

    CharacterAppearanceSetDefault(Player);
    CurrentCharacter = null; 
    MiniGameStart("KinkyDungeon", 1, "ArcadeKinkyDungeonEnd");

    // Default keybindings, these are initialized as part of the Player
    KinkyDungeonKeybindings = {
        Down: "KeyS",
        DownLeft: "KeyZ",
        DownRight: "KeyC",
        Left: "KeyA",
        Right: "KeyD",
        Skip: "Space",
        Spell1: "Digit1",
        Spell2: "Digit2",
        Spell3: "Digit3",
        Spell4: "Digit4",
        Spell5: "Digit5",
        Up: "KeyW",
        UpLeft: "KeyQ",
        UpRight: "KeyE",
        Wait: "KeyX",
    };
    if (localStorage.getItem("KinkyDungeonKeybindings") && JSON.parse(localStorage.getItem("KinkyDungeonKeybindings"))) {
        KinkyDungeonKeybindings = JSON.parse(localStorage.getItem("KinkyDungeonKeybindings"));
    }
    GLDrawLoad();
}

// Useful for debugging
trace = function(f) {
    return function(...args) {
        console.log(new Error(f.name));
        console.log(...args);
        f(...args);
    }
}

// More misc. shims

KinkyDungeonMainRun = () => {};
KinkyDungeonMainClick = () => {};

TimerPrivateOwnerBeep = () => {};

ServerSend = () => {};
ServerPrivateCharacterSync = () => {};
ServerPlayerIsInChatRoom = () => false;
ServerAccountUpdate = {
    SyncToServer: () => {},
    QueueData: () => {}
};

PrivateCharacter = [];

ChatRoomChatLog = [];
ChatRoomCharacterUpdate = () => {};
ChatRoomCharacterItemUpdate = () => {};

AsylumGGTSControlItem = () => false;

ArcadeDeviousChallenge = true;
ArcadeKinkyDungeonEnd = () => { console.log('Nope'); }

KinkyDungeonMultiplayerUpdate = () => {};
