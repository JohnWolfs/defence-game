/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-02-22 16:58:56
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-24 15:34:09
 */

var ScoreLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		this.init();
	},

	init: function() {
		
		this.addBg();
		this.addTitle();
		this.addScoreInfo();
		this.addButtons();
		this.initEventListener();
	},

	initEventListener: function() {
		var listener = Utils.EventTool.singlePointEventListener(function(touch) {

      
    }, 'touch_start');

    cc.eventManager.addListener(listener, this);
	},

	addBg: function() {
		this.menuBg = new cc.Sprite(res.score_bg);
		this.menuBg.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
		this.addChild(this.menuBg);
	},

	addTitle: function() {
		var gameover = cc.LabelTTF.create('游戏结束', '幼圆', 38);
		var bgSize = this.menuBg.getContentSize();

		gameover.setPosition(cc.p(bgSize.width/2, bgSize.height - 120));
		gameover.setFontFillColor(cc.color(120,120,120));
		this.menuBg.addChild(gameover);
	},

	addScoreInfo: function() {
		var game = Game.getInstance();
		var score = '总得分：' + game.getScore();
		var maxcombo = '最大连击数：' + game.getMaxCombo();
		var name = '连击称号：' + this.getNameByCombo(game.getMaxCombo());
		var bgSize = this.menuBg.getContentSize();

		this.scoreInfo = cc.LabelTTF.create(score, '幼圆', 30, cc.size(320, 32), cc.TEXT_ALIGNMENT_LEFT);
    this.comboInfo = cc.LabelTTF.create(maxcombo, '幼圆', 30, cc.size(320, 32), cc.TEXT_ALIGNMENT_LEFT);
    this.comboNameInfo = cc.LabelTTF.create(name, '幼圆', 30, cc.size(320, 32), cc.TEXT_ALIGNMENT_LEFT);

    this.scoreInfo.setFontFillColor(cc.color(110,90,77));
    this.comboInfo.setFontFillColor(cc.color(110,90,77));
    this.comboNameInfo.setFontFillColor(cc.color(110,90,77));

    this.scoreInfo.setAnchorPoint(cc.p(0,0));
    this.comboInfo.setAnchorPoint(cc.p(0,0));
    this.comboNameInfo.setAnchorPoint(cc.p(0,0));

    this.scoreInfo.setPosition(cc.p(66, bgSize.height - 200));
    this.comboInfo.setPosition(cc.p(66, bgSize.height - 250));
    this.comboNameInfo.setPosition(cc.p(66, bgSize.height - 300));

    this.menuBg.addChild(this.scoreInfo);
    this.menuBg.addChild(this.comboInfo);
    this.menuBg.addChild(this.comboNameInfo);
	},

	getNameByCombo: function(maxcombo) {
		var name;
		if(maxcombo <= 6) {
			name = '菜鸟';
		}
		else if(maxcombo < 20) {
			name = '连击新手';
		}
		else if(maxcombo < 40) {
			name = '连击能手';
		}
		else  if(maxcombo < 60) {
			name = '连击专家';
		}
		else if(maxcombo < 80) {
			name = '连击大师';
		}
		else if(maxcombo < 100) {
			name = '神射手';
		}
		else if(maxcombo < 120) {
			name = '百发百中';
		}
		else if(maxcombo < 140) {
			name = '无人能挡';
		}
		else if(maxcombo < 160) {
			name = '究极连击者';
		}
		else {
			name = '连击之神';
		}
		return name;
	},

	addButtons: function() {
		var _this = this;
		var backToMenuS = new cc.Sprite(res.back_to_menu_s);
		var bgSize = this.menuBg.getContentSize();

		backToMenuS.setPosition(cc.p(bgSize.width/2, 66));
		this.menuBg.addChild(backToMenuS);

    var btmlistener = Utils.EventTool.singlePointEventListener(function(touch) {

      _this.backToMenu();
    }, 'touch_end');

    cc.eventManager.addListener(btmlistener, backToMenuS);
	},

	backToMenu: function() {
		Game.getInstance().reset();

		cc.director.getRunningScene().reset();
		cc.director.runScene(cc.TransitionSlideInL.create(1, new StartScene()));
		cc.director.resume();
	}
});