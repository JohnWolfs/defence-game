/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-11 07:40:43
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 08:49:20
 */

var defaultConfig = {
  life: 5,
  score: 0,
  name: 'user001'
};

var Game = cc.Class.extend({

  _life: null,
  _score: null,
  _speed: null,

  _enemys: null,
  _tools: null,

  _combo: 0,
  _maxcombo: 0,

  _speedUp: 0,

  ctor: function() {

    this._life = defaultConfig.life;
    this._score = defaultConfig.score;
    this._enemys = [];
    this._tools = [];

    // 名字存储到本地
    var name = cc.sys.localStorage.getItem('player');

    if(!name) {
    	this._name = defaultConfig.name;
    	cc.sys.localStorage.setItem('player', this._name);
    }
    else {this._name = name;}
  },

  getEnemys: function() {
    return this._enemys;
  },

  getEnemysCount: function() {
    return this._enemys.length;
  },

  getName: function() {
  	return this._name;
  },

  setName: function(name) {
  	this._name = name;
  },

  getTools: function() {
    return this._tools;
  },

  getToolsCount: function() {
    return this._tools.length;
  },

  getLife: function() {
    return this._life;
  },

  getScore: function() {
    return this._score;
  },

  getMaxCombo: function() {
  	return this._maxcombo;
  },

  speedUp: function() {
    this._speedUp++;

    for(var i = 0; i < this._enemys.length; i++) {
      this._enemys[i].speedDown(this._speedUp-1);
      this._enemys[i].speedUp(this._speedUp);
    }
  },

  getSpeedUp: function() {
    return this._speedUp;
  },

  addScore: function(score) {
  	var gamescene = cc.director.getRunningScene();

    this._score += score;
    gamescene.getChildByTag(2).updateInfo();
  },

  _reduceLife: function(num) {
  	var gamescene = cc.director.getRunningScene();

  	this._life -= (num? num : 1);

    gamescene.getChildByTag(2).updateInfo();
  },

  _detectStatus: function() {
  	var gamescene = cc.director.getRunningScene();

    if (this._life <= 0) {
      cc.director.pause();
      this.saveData();
      gamescene.getChildByTag(2).addScoreLayer();
    }
  },

  saveData: function() {

  	var rankData = cc.sys.localStorage.getItem('rank');
  	var data = {};

  	if(!rankData) {
  		rankData = [];
  	}
  	else {
  		rankData = JSON.parse(rankData);
  	}

  	data.name = this._name;
  	data.score = this._score;
  	data.maxcombo = this._maxcombo;

		rankData.push(data);
		rankData = this.sortDataByScore(rankData);

		// 超过长度舍弃
  	if(rankData.length > 10) {
  		rankData = rankData.slice(0, 10);
  	}
  	
  	cc.sys.localStorage.setItem('rank', JSON.stringify(rankData));
  },

  sortDataByScore: function(data) {
  	return data.sort(this.compareByScore);
  },

  compareByScore: function(a, b) {
  	if (a.score > b.score) {
			return -1; 
  	}
		if (a.score < b.score) {
			return 1; 
		}
  },

  damageAndDetect: function(num) {
    this._reduceLife(num);
    this._detectStatus();
  },

  reset: function() {
  	this._life = defaultConfig.life;
  	this._score = defaultConfig.score;
  	this._combo = 0;
  	this._maxcombo = 0;
    this._speedUp = 0;
  	this._enemys = [];
  	this._tools = [];

  	cc.pool.drainAllPools();
  	LevelManager.getInstance().resetLevel();
  },

  comboUp: function() {
  	var gamescene = cc.director.getRunningScene();

    this._combo++;

    // 计算最大连击数
    if(this._combo > this._maxcombo) {
    	this._maxcombo = this._combo;
    }

    if (this._combo > 2) {

      // 连击加分
      if (Utils.NumTool.isTen(this._combo)) {
        this.addScore(this._combo * 2);

        Utils.TextTool.centerText('连击奖励+' + this._combo * 2,
          gamescene.getChildByTag(1),
          cc.color(234, 84, 19),
          36);
        return;
      }

      // 连击计数显示
      Utils.TextTool.comboText('连击X' + this._combo,
        gamescene.getChildByTag(1),
        cc.color(100, 100, 100),
        30);
    }
  },

  comboStop: function() {
    this._combo = 0;
  }
});

Game.GC = {
  unit_tag: {
    enemy: 1000,
    tool: 1001,
    hole: 1002
  }
};

// 单例设计
Game._instance = null;
Game.getInstance = function() {
  if (Game._instance === null) {
    Game._instance = new Game();
  }
  return Game._instance;
};
