//var socket = io.connect('https://safe-reef-35714.herokuapp.com/');
var socket = io.connect('ws://192.168.198.144:5555');

//test
var myPlayerID = 0;

socket.on("connect", function () {
    var id = socket.io.engine.id;
    console.log("Connected ID: " + id);
    socket.emit("EnterRobby");
});



enchant();

window.onload = function ()
{
    var core = new Core(3200, 1800);

    //æªé­E              Type     Dir  Level ID   BASECOST COST  HP  ATK  SPEED    
    var PUPU = new Demon("PUPU", "None", 0, null, 100,     100, 200, 500, 6);
    var POPO = new Demon("POPO", "None", 0, null, 100,     100, 200, 500, 6);
    var PIPI = new Demon("PIPI", "None", 0, null, 100,     100, 200, 500, 6);

    //èªåEEåæææã³ã¹ãE
    var haveCost = 500;

    //æå¤§ææã³ã¹ãE
    var MaxCost = 3000;

    //æ¯ç§åå¾ã§ããã³ã¹ãE
    var fpsCost = 25;

    //ã¿ãEãå§ãã®å ´æãç¢ºèªE
    var tapPos = new TapPos();
    //ãªã«ãã¿ãEEããããEç¢ºèªE
    var tapObj;
    //ã³ã¹ããæãããã®ãã©ã°
    var Flag;
    //ã¿ã¤ããE
    var Timer;

    //å¿E®ºæãæã£ããã®ãã©ã°
    var deadlyFlag;
    //å¿E®ºæã³ã¹ãæ°
    var deadlyCost = 10;
    //ãã¯ã¼ã¢ãEEã®ã³ã¹ããå¢ããééE
    var powerUpInterval = 5;

    //10åã¾ã§ã®é­ä¿ç®¡ç¨éåE
    var spiritsLength = 10;
    var Spirits = new Array(spiritsLength);
    for (var i = 0; i < spiritsLength; i++)
    {
        Spirits[i] = null;
    }
    //é­ããµããEããããããã«å¿E¦ãªå¤æ°
    var degree = 0;

    //ã­ã¼å²ãå½ã¦(ãEãE°ç¨)
    core.keybind(' '.charCodeAt(0), 'summonSpirit');

    //æ¼ããæã«ä¸åã ãå¼ã°ããããã«ããããã®ãã©ã°
    var oneCallFlag = false;

    //äºåã«ã­ã¼ããè¡ã
    //èæ¯
    core.preload('img/back5.png');

    //ãã¿ã³
    core.preload('img/pupu.png');
    core.preload('img/pipi.png');
    core.preload('img/popo.png');
    core.preload('img/pupu2.png');
    core.preload('img/pipi2.png');
    core.preload('img/popo2.png');
    core.preload('img/ya_blue.png');
    core.preload('img/ya_green.png');
    core.preload('img/ya_red.png');
    core.preload('img/deadly.png');
    core.preload('img/deadly2.png');
    core.preload('img/deadly3.png');

    //UIã»ãã©ã³ãE
    core.preload('img/CP.png');
    core.preload('img/rednumber_siro.png');
    core.preload('img/blacknumber.png');
    core.preload('img/huki_blue.png');
    core.preload('img/huki_green.png');
    core.preload('img/huki_red.png');
    core.preload('img/ponpu1.png');
    core.preload('img/ponpu3.png');
    core.preload('img/ponpu3.5.png');

    //ã¹ããªãE
    core.preload('img/pupu_soul.png');
    core.preload('img/popo_soul.png');
    core.preload('img/pipi_soul.png');

    //fpsã®è¨­å®E
    core.fps = 30;

    core.onload = function ()
    {
        //ãã¬ã¤ã¤ã¼IDã®ã»ãE
        socket.on("PushPlayerID", function (idData) {
            myPlayerID = idData.PlayerID;
            console.log("Connect PlayerID: " + myPlayerID);
        });

        //ãã¬ã¼ã ãªã»ãE
        core.frame = 0;

        ////////ç»åæå ±å¦çE///////

        //ããEã®ãã¿ã³
        var pupuBtn = new Sprite(1200, 1200);
        pupuBtn.image = core.assets['img/pupu.png'];
        pupuBtn.scale(0.25, 0.25);
        pupuBtn.x = 2200;
        pupuBtn.y = -300;

        //ããEã®ãã¿ã³
        var popoBtn = new Sprite(1200, 1200);
        popoBtn.image = core.assets['img/popo.png'];
        popoBtn.scale(0.25, 0.25);
        popoBtn.x = 2200;
        popoBtn.y = 300;

        //ããã®ãã¿ã³
        var pipiBtn = new Sprite(1200, 1200);
        pipiBtn.image = core.assets['img/pipi.png'];
        pipiBtn.scale(0.25, 0.25);
        pipiBtn.x = 2200;
        pipiBtn.y = 900;

        //å¿E®ºæã®ãã¿ã³
        var deadlyBtn = new Sprite(300, 300);
        deadlyBtn.image = core.assets['img/deadly.png'];
        deadlyBtn.scale(1.5, 1.5);
        deadlyBtn.x = 200;
        deadlyBtn.y = 750;

        //èæ¯
        var back = new Sprite(3200, 1800);
        back.image = core.assets['img/back5.png'];
        back.x = 0;
        back.y = 0;

        //UI
        //ããEã®UIèæ¯
        var PUPU_UI = new Sprite(600, 600);
        PUPU_UI.image = core.assets['img/huki_red.png'];
        PUPU_UI.scale(1.2, 1.2);
        PUPU_UI.x = 1900;
        PUPU_UI.y = 0;

        //ããEã®UIèæ¯
        var POPO_UI = new Sprite(600, 600);
        POPO_UI.image = core.assets['img/huki_green.png'];
        POPO_UI.scale(1.2, 1.2);
        POPO_UI.x = 1900;
        POPO_UI.y = 600;

        //ããã®UIèæ¯
        var PIPI_UI = new Sprite(600, 600);
        PIPI_UI.image = core.assets['img/huki_blue.png'];
        PIPI_UI.scale(1.2, 1.2);
        PIPI_UI.x = 1900;
        PIPI_UI.y = 1200;

        //ãã³ãã±ã¼ãã«
        var ponpuCable = new Sprite(600, 600);
        ponpuCable.image = core.assets['img/ponpu1.png'];
        ponpuCable.scale(3, 3);
        ponpuCable.x = 1200;
        ponpuCable.y = 600;

        //ãã³ãæ¬ä½E
        var ponpu = new Sprite(600, 600);
        ponpu.image = core.assets['img/ponpu3.png'];
        ponpu.scale(3, 3);
        ponpu.x = 1200;
        ponpu.y = 600;

        //ãã³ããEä¸ãããã¶ããã¬ã©ã¹ã±ã¼ã¹
        var ponpuCover = new Sprite(600, 600);
        ponpuCover.image = core.assets['img/ponpu3.5.png'];
        ponpuCover.scale(3, 3);
        ponpuCover.x = 1200;
        ponpuCover.y = 600;

        //ç¢å°
        var Arrow = new Sprite(600, 600);
        Arrow.image = core.assets['img/ya_blue.png'];
        Arrow.scale(0.5, 0.5);
        Arrow.x = 5000;
        Arrow.y = -5000;

        //CPã®ãã©ã³ãE
        var CPFont = new Sprite(150, 150);
        CPFont.image = core.assets['img/CP.png'];
        CPFont.scale(1, 1);
        CPFont.x = 1300;
        CPFont.y = 1600;

        //ææã³ã¹ããEãã©ã³ãE
        var costFont = new Array();
        var costDigit = 4;  //æ¡æ°(åæè¨­å®Eæ¡E
        for (var i = 0; i < costDigit; i++)
        {
            costFont[i] = new Sprite(120, 120);
            costFont[i].image = core.assets['img/rednumber_siro.png'];
            costFont[i].scale(4, 4);
            costFont[i].x = 1300 - (i + 1) * 150;
            costFont[i].y = 1600;
            costFont[i].frame = 0;
        }

        //ãEEã¢ã³ã«å¿E¦ãªã³ã¹ããEãã©ã³ãE
        var DemoncostDigit = 3;  //æ¡æ°(åæè¨­å®Eæ¡E

        var PUPUcostFont = new Array();
        for (var i = 0; i < DemoncostDigit; i++) {
            PUPUcostFont[i] = new Sprite(120, 120);
            PUPUcostFont[i].image = core.assets['img/blacknumber.png'];
            PUPUcostFont[i].scale(2, 2);
            PUPUcostFont[i].x = 2400 - (i + 1) * 100;
            PUPUcostFont[i].y = 100;
            PUPUcostFont[i].frame = 0;
        }

        var POPOcostFont = new Array();
        for (var i = 0; i < DemoncostDigit; i++) {
            POPOcostFont[i] = new Sprite(120, 120);
            POPOcostFont[i].image = core.assets['img/blacknumber.png'];
            POPOcostFont[i].scale(2, 2);
            POPOcostFont[i].x = 2400 - (i + 1) * 100;
            POPOcostFont[i].y = 700;
            POPOcostFont[i].frame = 0;
        }

        var PIPIcostFont = new Array();
        for (var i = 0; i < DemoncostDigit; i++)
        {
            PIPIcostFont[i] = new Sprite(120, 120);
            PIPIcostFont[i].image = core.assets['img/blacknumber.png'];
            PIPIcostFont[i].scale(2, 2);
            PIPIcostFont[i].x = 2400 - (i + 1) * 100;
            PIPIcostFont[i].y = 1300;
            PIPIcostFont[i].frame = 0;
        }

        ////////ã¡ã¤ã³å¦çE///////
        //ãã¬ã¼ã ãã¨ã«å¦çEãE
        core.addEventListener('enterframe', function ()
        {
            if (core.frame % core.fps == 0)
            {
                if (haveCost < MaxCost)
                    haveCost += fpsCost;
                else
                    haveCost = MaxCost;
            }

            //CPãã©ã³ãE
            for (var i = costDigit - 1; i >= 0; i--)
            {
                FontSet(haveCost, i, costFont[i]);
            }

            for (var i = DemoncostDigit - 1; i >= 0; i--)
            {
                FontSet(PUPU.Cost, i, PUPUcostFont[i]);
                FontSet(POPO.Cost, i, POPOcostFont[i]);
                FontSet(PIPI.Cost, i, PIPIcostFont[i]);
            }

            //ã¹ããEã¹ãã¿ã³ãæ¼ãã¨é­ãåå¾ã§ããããã«
            core.addEventListener('summonSpiritbuttondown', function ()
            {
                oneCallFlag = true;
            });

            core.addEventListener('summonSpiritbuttonup', function ()
            {
                if (oneCallFlag)
                {
                    socket.emit("SpiritPush", { Type: "PUPU", PlayerID: myPlayerID });
                    oneCallFlag = false;
                }
            });

            for (var i = 0; i < spiritsLength; i++)
            {
                if(Spirits[i] != null)
                {
                    var radian = Math.PI / 180 * degree;
                    Spirits[i].Sprite.y += Math.sin(degree) * 5;
                }
            }

            degree += 0.2;
        });

        //ãã¿ã³ãæ¼ãããæã®å¦çE
        pupuBtn.on('touchstart', function ()
        {
            pupuBtn.image = core.assets['img/pupu2.png'];
            tapObj = "pupuBtn";
        });

        popoBtn.on('touchstart', function ()
        {
            popoBtn.image = core.assets['img/popo2.png'];
            tapObj = "popoBtn";
        });

        pipiBtn.on('touchstart', function ()
        {
            pipiBtn.image = core.assets['img/pipi2.png'];
            tapObj = "pipiBtn";
        });

        deadlyBtn.on('touchstart', function ()
        {
            if (!deadlyFlag) {
                deadlyBtn.image = core.assets['img/deadly2.png'];
                tapObj = "deadlyBtn";
            }
        });

        //ã¿ãEEããå ´æã®åº§æ¨åå¾E
        core.rootScene.on('touchstart', function (startPos)
        {
            tapPos.x = startPos.x;
            tapPos.y = startPos.y;
        });

        //é¢ãããæã®å¦çE
        pupuBtn.on('touchend', function () {
            pupuBtn.image = core.assets['img/pupu.png'];
        });

        popoBtn.on('touchend', function () {
            popoBtn.image = core.assets['img/popo.png'];            
        });

        pipiBtn.on('touchend', function () {
            console.log("call");
            pipiBtn.image = core.assets['img/pipi.png'];            
        });

        deadlyBtn.on('touchend', function ()
        {
            if(!deadlyFlag)
            {
                //å¿E®ºã³ã¹ãåEã®é­ããããç¢ºèªãE
                if (SpiritCheck(Spirits, deadlyCost, spiritsLength))
                {
                    deadlyBtn.image = core.assets['img/deadly3.png'];
                    //ããã§å¿E®ºæE ±ããµã¼ããEã«éã
                    PushDeadly(myPlayerID);
                    //ã³ã¹ããæå¤§ã«åå¾©
                    haveCost = MaxCost;
                    //ä½¿ç¨ãã©ã°ãç«ã¦ãE
                    deadlyFlag = true;
                    //ä½¿ç¨ããé­ãEåé¤
                    Spirits = UsedSpirits(Spirits, deadlyCost, spiritsLength, core);
                }
                else
                {
                    deadlyBtn.image = core.assets['img/deadly.png'];
                }
            }
        });

        //ã¿ãEEããå ´æãä½¿ã£ãåEçEEãããã
        core.rootScene.on('touchend', function (endPos)
        {
            //ããEãã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            if(tapObj == "pupuBtn")
            {
                if ((tapPos.y - endPos.y) > pupuBtn.height / 2 * pupuBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, PUPU, Flag);
                    haveCost = UseCost(haveCost, PUPU);
                    if (Flag == "Succes")
                        PushDemon(PUPU, pupuBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.y - endPos.y) < -pupuBtn.height / 2 * pupuBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, PUPU, Flag);
                    haveCost = UseCost(haveCost, PUPU);
                    if (Flag == "Succes")
                        PushDemon(PUPU, pupuBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.x - endPos.x) < -pupuBtn.height / 2 * pupuBtn.scaleX || (tapPos.x - endPos.x) > pupuBtn.height / 2 * pupuBtn.scaleX) 
                {
                    Flag = CostCheck(haveCost, PUPU, Flag);
                    haveCost = UseCost(haveCost, PUPU);
                    if (Flag == "Succes")
                        PushDemon(PUPU, pupuBtn, tapPos, endPos, myPlayerID);
                }
                //ãã¯ã¼ã¢ãEEãé¸ææ
                else
                {
                    if(SpiritCheck(Spirits, Math.floor(PUPU.Level / powerUpInterval + 1), spiritsLength))
                    {
                        PUPU.Level += 1;
                        PUPU.Cost = PUPU.BaseCost + PUPU.Level * 10;
                        //ä½¿ç¨ããé­ãEåé¤
                        Spirits = UsedSpirits(Spirits, Math.floor(PUPU.Level / powerUpInterval + 1), spiritsLength, core);
                    }
                }
            }
            //ããEãã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            else if(tapObj == "popoBtn")
            {
                if ((tapPos.y - endPos.y) > popoBtn.height / 2 * popoBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, POPO, Flag);
                    haveCost = UseCost(haveCost, POPO);
                    if (Flag == "Succes")
                        PushDemon(POPO, popoBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.y - endPos.y) < -popoBtn.height / 2 * popoBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, POPO, Flag);
                    haveCost = UseCost(haveCost, POPO);
                    if (Flag == "Succes")
                        PushDemon(POPO, popoBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.x - endPos.x) < -popoBtn.height / 2 * popoBtn.scaleX || (tapPos.x - endPos.x) > popoBtn.height / 2 * popoBtn.scaleX) 
                {
                    Flag = CostCheck(haveCost, POPO, Flag);
                    haveCost = UseCost(haveCost, POPO);
                    if (Flag == "Succes")
                        PushDemon(POPO, popoBtn, tapPos, endPos, myPlayerID);
                }
                //ãã¯ã¼ã¢ãEEãé¸ææ
                else 
                {
                    if (SpiritCheck(Spirits, Math.floor(POPO.Level / powerUpInterval + 1), spiritsLength))
                    {
                        POPO.Level += 1;
                        POPO.Cost = POPO.BaseCost + POPO.Level * 10;
                        //ä½¿ç¨ããé­ãEåé¤
                        Spirits = UsedSpirits(Spirits, Math.floor(POPO.Level / powerUpInterval + 1), spiritsLength, core);
                    }
                }
            }
            //ãããã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            else if(tapObj == "pipiBtn")
            {
                if ((tapPos.y - endPos.y) > pipiBtn.height / 2 * pipiBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, PIPI, Flag);
                    haveCost = UseCost(haveCost, PIPI);
                    if (Flag == "Succes")
                        PushDemon(PIPI, pipiBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.y - endPos.y) < -pipiBtn.height / 2 * pipiBtn.scaleY) 
                {
                    Flag = CostCheck(haveCost, PIPI, Flag);
                    haveCost = UseCost(haveCost, PIPI);
                    if (Flag == "Succes")
                        PushDemon(PIPI, pipiBtn, tapPos, endPos, myPlayerID);
                }
                else if ((tapPos.x - endPos.x) < -pipiBtn.height / 2 * pipiBtn.scaleX || (tapPos.x - endPos.x) > pipiBtn.height / 2 * pipiBtn.scaleX) 
                {
                    Flag = CostCheck(haveCost, PIPI, Flag);
                    haveCost = UseCost(haveCost, PIPI);
                    if (Flag == "Succes")
                        PushDemon(PIPI, pipiBtn, tapPos, endPos, myPlayerID);
                }
                //ãã¯ã¼ã¢ãEEãé¸ææ
                else
                {
                    if (SpiritCheck(Spirits, Math.floor(PIPI.Level / powerUpInterval + 1), spiritsLength))
                    {
                        PIPI.Level += 1;
                        PIPI.Cost = PIPI.BaseCost + PIPI.Level * 10;
                        //ä½¿ç¨ããé­ãEåé¤
                        Spirits = UsedSpirits(Spirits, Math.floor(PIPI.Level / powerUpInterval + 1), spiritsLength, core);
                    }
                }
            }
            console.log(PUPU.Cost);

            tapObj = null;
        });

        ////////æç»////////
        //ãªãã¸ã§ã¯ãã«è¿½å ããå¦çEããã«å¥ãããEªãã¸ã§ã¯ããæç»é E«æE®E
        /////////////èæ¯/////////////
        core.rootScene.addChild(back);  

        core.rootScene.addChild(pupuBtn);
        core.rootScene.addChild(popoBtn);
        core.rootScene.addChild(pipiBtn);
        core.rootScene.addChild(deadlyBtn);

        core.rootScene.addChild(ponpuCable);
        core.rootScene.addChild(ponpu);

        core.rootScene.addChild(PUPU_UI);
        core.rootScene.addChild(POPO_UI);
        core.rootScene.addChild(PIPI_UI);

        //ç¢å°è¡¨ç¤ºã®ããã«ããã«å¦çE
        core.rootScene.on('touchmove', function (nowPos) {
            //ããEãã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            if (tapObj == "pupuBtn") {
                Arrow = ArrowSet(PUPU, pipiBtn, tapPos, nowPos, Arrow, core);
                core.rootScene.addChild(Arrow);
            }
                //ããEãã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            else if (tapObj == "popoBtn") {
                Arrow = ArrowSet(POPO, pipiBtn, tapPos, nowPos, Arrow, core);
                core.rootScene.addChild(Arrow);
            }
                //ãããã¿ã³ã®å ´æã§æ¼ãã¦ãå ´åE
            else if (tapObj == "pipiBtn") {
                Arrow = ArrowSet(PIPI, pipiBtn, tapPos, nowPos, Arrow, core);
                core.rootScene.addChild(Arrow);
            }
        });
        core.rootScene.on('touchend', function () {
            Arrow.x = 9000;
            Arrow.y = -9000;
        });
        //é­ãEåãåã&æç»å¦çE
        socket.on("SpiritPushed", function (SpiritData)
        {
            if (SpiritData.PlayerID == myPlayerID)
            {
                for (var i = 0; i < spiritsLength; i++)
                {
                    if (Spirits[i] == null)
                    {
                        Spirits[i] = new Spirit(SpiritData.Type, SpiritData.PlayerID, core);
                        core.rootScene.addChild(Spirits[i].Sprite);
                        break;
                    }
                }

                console.log(Spirits);
            }
        });

        core.rootScene.addChild(ponpuCover);

        //ãã©ã³ãE
        core.rootScene.addChild(CPFont);
        for (var i = 0; i < costDigit; i++)
        {
            core.rootScene.addChild(costFont[i]);
        }

        for (var i = 0; i < DemoncostDigit; i++)
        {
            core.rootScene.addChild(PUPUcostFont[i]);
            core.rootScene.addChild(POPOcostFont[i]);
            core.rootScene.addChild(PIPIcostFont[i]);
        }
        /////////////åé¢/////////////
    }
    core.start();
};

/////////////////ã¯ã©ã¹/////////////////
//ãEEã¢ã³ã¯ã©ã¹
function Demon(Type, Direction, Level, PlayerID, BaseCost, Cost, HP, ATK, SPEED){
    this.Type = Type;
    this.Direction = Direction;
    this.Level = Level;
    this.PlayerID = PlayerID;
    this.BaseCost = BaseCost;
    this.Cost = Cost;
    this.HP = HP;
    this.ATK = ATK;
    this.SPEED = SPEED;
}
//åº§æ¨åå¾ã¯ã©ã¹
function TapPos(x, y) {
    this.x = x;
    this.y = y;
}
//ã¹ããªãEã¯ã©ã¹
function Spirit(Type, PlayerID, core)
{
    this.Type = Type;
    this.PlayerID = PlayerID;
    this.Sprite = new Sprite(600, 600);
    if (this.Type == "PUPU")
    {
        this.Sprite.image = core.assets['img/pupu_soul.png'];
    }
    else if (this.Type == "POPO")
    {
        this.Sprite.image = core.assets['img/pupu_soul.png'];
    }
    else if (this.Type == "PIPI")
    {
        this.Sprite.image = core.assets['img/pupu_soul.png'];
    }

    this.Sprite.scale(0.3, 0.3);

    this.Sprite.x = Math.floor(Math.random() * 500) + 700;
    this.Sprite.y = Math.floor(Math.random() * 700) + 250;    
}

/////////////////é¢æ°/////////////////
function FontSet(_Cost, Digit, Sprite)
{
    if (Digit == 3) {
        Sprite.frame = _Cost / 1000;
    }
    else if (Digit == 2) {
        Sprite.frame = (_Cost % 1000) / 100;
    }
    else if (Digit == 1) {
        Sprite.frame = (_Cost % 100) / 10;
    }
    else if (Digit == 0) {
        Sprite.frame = _Cost % 10;
    }

    return Sprite;
}

function CostCheck(_haveCost, _demon, _Flag)
{
    if (_haveCost - (_demon.Cost + _demon.Level * 10) >= 0) {
        _Flag = "Succes";
    }
    else {
        _Flag = "Faild";
        console.log("Faild");
    }
    return _Flag;
}

function UseCost(_haveCost, _demon)
{
    if (_haveCost - _demon.Cost >= 0)
    {
        _haveCost -= _demon.Cost;
    }
    return _haveCost;
}

function SpiritCheck(_Spirits, _Cost, Length)
{
    var countSpirit = 0;
    for(var i = 0; i < Length; i++)
    {
        //ããã§ã¹ããªãEãEEã¿ããããã®ç¢ºèªããããE
        if (_Spirits[i] != null)
        {
            countSpirit += 1;
        }
    }
    //ã¹ããªãEéãå¿E®ºæã³ã¹ãããå¤ãå ´åErueãè¿ã
    if (countSpirit >= _Cost)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function UsedSpirits(_Spirits, _Cost, Length, core)
{
    var count = 0;

    for (var i = 0; i < Length; i++)
    {
        if(_Spirits[i] != null)
        {
            core.rootScene.removeChild(_Spirits[i].Sprite);
            _Spirits[i] = null;
            count += 1;
            if (count >= _Cost)
                break;
        }
    }

    return _Spirits;
}

function ArrowSet(demon, btn, startPos, endPos, Arrow, core)
{
    //åº§æ¨ãEç§»åå¹Eè¦ã¦æ¹åæå®E
    //ä¸æ¹åæ
    if ((startPos.y - endPos.y) > btn.height / 2 * btn.scaleY)
    {
        if (demon.Type == "PUPU")
        {
            Arrow.image = core.assets['img/ya_red.png'];
            Arrow.x = 2500;
            Arrow.y = -200;
            Arrow.rotation = 0;
        }
        else if (demon.Type == "POPO")
        {
            Arrow.image = core.assets['img/ya_green.png'];
            Arrow.x = 2500;
            Arrow.y = 400;
            Arrow.rotation = 0;
        }
        else if (demon.Type == "PIPI")
        {
            Arrow.image = core.assets['img/ya_blue.png'];
            Arrow.x = 2500;
            Arrow.y = 1000;
            Arrow.rotation = 0;
        }        
    }
    //ä¸æ¹åæ
    else if ((startPos.y - endPos.y) < -btn.height / 2 * btn.scaleY)
    {
        if (demon.Type == "PUPU") {
            Arrow.image = core.assets['img/ya_red.png'];
            Arrow.x = 2500;
            Arrow.y = 200;
            Arrow.rotation = 180;
        }
        else if (demon.Type == "POPO") {
            Arrow.image = core.assets['img/ya_green.png'];
            Arrow.x = 2500;
            Arrow.y = 800;
            Arrow.rotation = 180;
        }
        else if (demon.Type == "PIPI") {
            Arrow.image = core.assets['img/ya_blue.png'];
            Arrow.x = 2500;
            Arrow.y = 1400;
            Arrow.rotation = 180;
        }
    }
    //å³æ¹åæ
    else if ((startPos.x - endPos.x) < -btn.height / 2 * btn.scaleX)
    {
        if (demon.Type == "PUPU") {
            Arrow.image = core.assets['img/ya_red.png'];
            Arrow.x = 2700;
            Arrow.y = 0;
            Arrow.rotation = 90;
        }
        else if (demon.Type == "POPO") {
            Arrow.image = core.assets['img/ya_green.png'];
            Arrow.x = 2700;
            Arrow.y = 600;
            Arrow.rotation = 90;
        }
        else if (demon.Type == "PIPI") {
            Arrow.image = core.assets['img/ya_blue.png'];
            Arrow.x = 2700;
            Arrow.y = 1200;
            Arrow.rotation = 90;
        }
    }
    //å·¦æ¹åæ
    else if ((startPos.x - endPos.x) > btn.height / 2 * btn.scaleX)
    {
        if (demon.Type == "PUPU") {
            Arrow.image = core.assets['img/ya_red.png'];
            Arrow.x = 2300;
            Arrow.y = 0;
            Arrow.rotation = 270;
        }
        else if (demon.Type == "POPO") {
            Arrow.image = core.assets['img/ya_green.png'];
            Arrow.x = 2300;
            Arrow.y = 600;
            Arrow.rotation = 270;
        }
        else if (demon.Type == "PIPI") {
            Arrow.image = core.assets['img/ya_blue.png'];
            Arrow.x = 2300;
            Arrow.y = 1200;
            Arrow.rotation = 270;
        }
    }

    return Arrow;
}

//ãEEã¢ã³ã®éä¿¡
function PushDemon(demon, btn, startPos, endPos, setPlayerID)
{
    //åº§æ¨ãEç§»åå¹Eè¦ã¦æ¹åæå®E
    if ((startPos.y - endPos.y) > btn.height / 2 * btn.scaleY) {
        demon.Direction = "Top";
    }
    else if ((startPos.y - endPos.y) < -btn.height / 2 * btn.scaleY) {
        demon.Direction = "Bottom";
    }
    else if ((startPos.x - endPos.x) < -btn.height / 2 * btn.scaleX || (startPos.x - endPos.x) > btn.height / 2 * btn.scaleX) {
        demon.Direction = "Middle";
    }
    else {
        demon.Direction = "None";
    }
    //ãã¬ã¤ã¤ã¼IDè¨­å®E
    demon.PlayerID = setPlayerID;

    //ãEEã¿éä¿¡
    if (demon.Direction != "None")
        socket.emit("DemonPush", { Type: demon.Type, Direction: demon.Direction, Level: demon.Level, PlayerID: demon.PlayerID });

    //ã­ã°åºåE
    console.log(demon.Type);
    console.log(demon.Direction);
    console.log(demon.Level);
    console.log(demon.PlayerID);
}

//å¿E®ºæéä¿¡
function PushDeadly(setPlayerID)
{
    socket.emit("DeadlyPush", { Deadly: "Fire", PlayerID: setPlayerID});
    console.log("DeadlyPushed");
}

//ã¨ã©ã¼æã¢ã©ã¼ããå¼ã³åºãããããE«
window.onerror = function(error)
{
    alert(error);
}
