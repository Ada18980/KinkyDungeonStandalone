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

    Player.AudioSettings = {Volume:1};
    Player.ArousalSettings = {};
    Player.ArousalSettings.VFXFilter = "VFXFilterHeavy";
    Player.OnlineSharedSettings = {};
    Player.OnlineSharedSettings.ItemsAffectExpressions = true

    CharacterAppearanceSetDefault(Player);
    CurrentCharacter = null; 
    MiniGameStart("KinkyDungeon", 1, "ArcadeKinkyDungeonEnd");

    // Default keybindings, these are initialized as part of the Player
    KinkyDungeonKeybindings = {
        Down: 115,
        DownLeft: 122,
        DownRight: 99,
        Left: 97,
        Right: 100,
        Spell1: 49,
        Spell2: 50,
        Spell3: 51,
        Up: 119,
        UpLeft: 113,
        UpRight: 101,
        Wait: 120,
    };
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
