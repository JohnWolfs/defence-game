/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 07:40:43
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 10:01:28
 */

// 游戏背景层
var GameBgLayer = cc.Layer.extend({

  ctor: function() {
    this._super();
    this.addBg();
  },
  addBg: function() {
    var size = cc.winSize;
    var bg = new cc.Sprite(res.game_bg);
    bg.attr({
      x: size.width / 2,
      y: size.height / 2
    });
    this.addChild(bg, 0);
  }
});

// 游戏动画层
var GameAnimateLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    this.initFingerEvent();
  },

  // 点击事件
  initFingerEvent: function() {
    var _this = this;
    var listener = Utils.EventTool.singlePointEventListener(function(touch) {
      var collector = cc.director.getRunningScene().getChildByTag(2).getChildByTag(100);

      // 触发道具使用 or 直接点击效果
      if (collector.useSelectedTool(touch)) {

      } else {
        _this.createHole(touch);
      }
    }, 'touch_began');

    cc.eventManager.addListener(listener, this);
  },

  createHole: function(touch) {
    // 创建点击效果，并随后消失
    var hole = Hole.getOrCreate();
    hole.x = touch.x;
    hole.y = touch.y;
    this.addChild(hole, 1, Game.GC.unit_tag.hole);

    hole.collision();
    hole.toDestroy();
  }
});

// 游戏交互层
var GameInteractionLayer = cc.Layer.extend({

  ctor: function() {
    this._super();

    this.addInfo();
    this.addPauseBtn();
    this.addWall();
    this.addToolCollector();
  },

  // 显示游戏数据
  addInfo: function() {
    var game = Game.getInstance();
    var life = '防御: ' + game.getLife();
    var score = '得分: ' + game.getScore();

    this.textLife = cc.LabelTTF.create(life, '幼圆', 23, cc.size(120, 23), cc.TEXT_ALIGNMENT_LEFT);
    this.textScore = cc.LabelTTF.create(score, '幼圆', 23, cc.size(120, 23), cc.TEXT_ALIGNMENT_LEFT);
    this.textLife.setFontFillColor(cc.color.BLACK);
    this.textScore.setFontFillColor(cc.color.BLACK);

    this.textLife.setAnchorPoint(cc.p(0,0));
    this.textScore.setAnchorPoint(cc.p(0,0));
    this.textLife.setPosition(cc.p(5, cc.winSize.height - 30));
    this.textScore.setPosition(cc.p(5, cc.winSize.height - 60));

    this.addChild(this.textLife);
    this.addChild(this.textScore);
  },

  // 更新游戏数据
  updateInfo: function() {
    var game = Game.getInstance();
    var life = '防御: ' + game.getLife();
    var score = '得分: ' + game.getScore();

    this.textLife.setString(life);
    this.textScore.setString(score);
  },

  // 暂停按钮
  addPauseBtn: function() {
    var _this = this;
    var pause = new cc.Sprite(res.pause);

    pause.setPosition(cc.p(cc.winSize.width - 30, cc.winSize.height - 30));
    this.addChild(pause);

    var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      cc.director.pause();
      _this.addPauseLayer();
    }, 'touch_end');
    cc.eventManager.addListener(listener, pause);
  },

  // 暂停菜单层
  addPauseLayer: function() {
    this.addChild(new PauseLayer(), 10);
  },

  // 结算得分层
  addScoreLayer: function() {
    this.addChild(new ScoreLayer(), 10);
  },

  // 添加墙体
  addWall: function() {
    var wall = new cc.Sprite(res.wall);
    wall.setAnchorPoint(cc.p(0, 0));
    wall.setPosition(cc.p(0, 0));
    this.addChild(wall);
  },

  // 道具收集器
  addToolCollector: function() {
    this.addChild(new ToolCollector(), 10, 100);
  }
});

// 游戏场景
var GameScene = cc.Scene.extend({
  _time: 0,

  onEnter: function() {
    this._super();

    this.presetObjects();

    this.addChild(new GameBgLayer(), 0, 0);
    this.addChild(new GameAnimateLayer(), 1, 1);
    this.addChild(new GameInteractionLayer(), 2, 2);

    // 关卡管理器开始加载数据，执行enemy，tool的投放
    this.scheduleUpdate();

    // 显示开始信息
    Utils.TextTool.centerText('游戏开始',
      this.getChildByTag(1),
      cc.color(100 ,100, 100),
      50);
  },

  onExit: function() {
    this.reset();
  },

  update: function() {
    if(this._time >= 120) {
      this._time = 0;
      LevelManager.getInstance().loadLevel();
    }
    this._time++; 
  },

  // 把若干场景对象放进对象池
  presetObjects: function() {
    Hole.preset();
    Enemy.preset();
    Tool.preset();
    Effect.preset();
  },

  shake: function(num) {
    var move = cc.moveBy(0.03, cc.p(-6, -6));
    var move2 = cc.moveBy(0.03, cc.p(6, 6));
    var move_back = move.reverse();
    var move_back2 = move2.reverse();

    // 造成伤害并检测状态
    var cb = cc.callFunc(function() {
      Game.getInstance().damageAndDetect(num);
    });
    var move_seq = cc.sequence(move, move_back, move2, move_back2, cb);

    this.runAction(move_seq);

    // if ('vibrate' in navigator) {
    //   navigator.vibrate(300);
    // }
  },

  reset: function() {
    this._time = 0;

    // 移除动画层所有元素和动作
    this.getChildByTag(1).removeAllChildren(true);
    
    this.unscheduleAllCallbacks();
    this.stopAllActions();
  }
});

