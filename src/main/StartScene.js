/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 07:40:43
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 10:56:23
 */

var StartLayer = cc.Layer.extend({

  ctor: function() {
    this._super();

    this.addBg();
    this.addAnime();
    this.addButtons();
    this.addName();
  },

  // 添加背景
  addBg: function() {
    var size = cc.winSize;
    var bg = new cc.Sprite(res.start_bg);
    bg.attr({
      x: size.width / 2,
      y: size.height / 2
    });
    this.addChild(bg, 0);
  },

  addAnime: function() {
    var size = cc.winSize;
    var shine = new cc.Sprite(res.shine);
    var icon = new cc.Sprite(res.enemys_icon);

    shine.setPosition(cc.p(size.width/2, 580));
    icon.setPosition(cc.p(size.width/2, 580));

    this.addChild(shine);
    this.addChild(icon);

    shine.runAction(cc.repeatForever(cc.rotateBy(12,360)));
  },

  // 添加按钮
  addButtons: function() {
    var _this = this;
    var startButton = new cc.Sprite(res.start_btn);
    var rankIcon = new cc.Sprite(res.rank_icon);

    startButton.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 - 200));
    rankIcon.setPosition(cc.p(cc.winSize.width - 38, 38));

    this.addChild(startButton, 1);
    this.addChild(rankIcon, 1);

    // 按钮事件监听
    var btnListener = Utils.EventTool.singlePointEventListener(function(touch) {

      cc.director.runScene(cc.TransitionSlideInR.create(1,new GameScene()));
    }, 'touch_end');

    var rankListener = Utils.EventTool.singlePointEventListener(function(touch) {
      _this.addChild(new RankLayer(), 10);
    }, 'touch_end');

    cc.eventManager.addListener(btnListener, startButton);
    cc.eventManager.addListener(rankListener, rankIcon);
  },

  addName: function() {
    var _this = this;
    var name = Game.getInstance().getName();
    this.nameText = cc.LabelTTF.create(name, '幼圆', 30);

    this.nameText.setPosition(cc.winSize.width / 2, 50);
    this.nameText.setFontFillColor(cc.color(89, 89, 89));
    
    this.addChild(this.nameText);

    var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.addChild(new NameSettingLayer(), 10);
    }, 'touch_end');

    cc.eventManager.addListener(listener, this.nameText);
  },

  updateName: function() {
    var name = Game.getInstance().getName();

    this.nameText.setString(name);
  }
});

var StartScene = cc.Scene.extend({

  onEnter: function() {
    this._super();

    cc.spriteFrameCache.addSpriteFrames(res.fire_plist);

    this.addChild(new StartLayer(), 1, 0); 
  },

  reset: function() {
    this.removeAllChildren(true);
  }
});
