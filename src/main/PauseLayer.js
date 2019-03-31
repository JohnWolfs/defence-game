/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-02-21 22:02:06
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 15:59:16
 */

var PauseLayer = cc.Layer.extend({

	ctor: function(){
		this._super();
		this.init();
	},

	init: function() {
		
		this.addBg();
		this.addButtons();
		this.initEventListener();
	},

	initEventListener: function() {
		var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      
    }, 'touch_start');

    cc.eventManager.addListener(listener, this);
	},

	addBg: function() {
		this.menuBg = new cc.Sprite(res.pause_bg);
		this.menuBg.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 + 30));
		this.addChild(this.menuBg);
	},

	addButtons: function() {
		var _this = this;
		var backToGame = new cc.Sprite(res.back_to_game);
		var backToMenu = new cc.Sprite(res.back_to_menu);
		var bgSize = this.menuBg.getContentSize();

		backToGame.setPosition(cc.p(bgSize.width/2, bgSize.height - 80));
		backToMenu.setPosition(cc.p(bgSize.width/2, bgSize.height - 170));
		this.menuBg.addChild(backToGame);
		this.menuBg.addChild(backToMenu);

		var btglistener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.backToGame();
    }, 'touch_end');

    var btmlistener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.backToMenu();
    }, 'touch_end');

    cc.eventManager.addListener(btglistener, backToGame);

    cc.eventManager.addListener(btmlistener, backToMenu);
	},

	backToGame: function() {

		this.removeFromParent();
		cc.director.resume();
	},

	backToMenu: function() {
		Game.getInstance().reset();

		cc.director.getRunningScene().reset();
		cc.director.runScene(cc.TransitionSlideInL.create(1, new StartScene()));
		cc.director.resume();
	}
});