/**
 * @file: 
 *
 * @Author: JoneLin
 * @Date:   2016-01-12 21:34:34
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-12 11:41:12
 */

var LevelManager = cc.Class.extend({
  _currentLevel: null,
  _levelIndex: 0,
  _time: 0,
  _infinite: false,

  ctor: function() {
    this._currentLevel = Levels[this._levelIndex];
  },

  loadLevel: function() {

    // 无尽模式
    if(this._infinite) {
      this.infiniteLoad();
      return;
    }

    var enemysCount = Game.getInstance().getEnemysCount();
    var localCurrentLevel = this._currentLevel;
    var addCount = localCurrentLevel.enemyMax - enemysCount;

    // 判断关卡是否boss关
    if(localCurrentLevel.boss === true) {
      this.loadBoss(localCurrentLevel.bossId);
      return;
    }

    // 一个关卡周期循环完毕，加载下一个关卡
    if (this._time >= localCurrentLevel.enemies.length) {
      this.resetTime();
      this.goNextLevel();
      return;
    }

    // 范围安全性检测
    this._time = this._time < 0 ? 0 : (this._time >= localCurrentLevel.enemies.length ? (localCurrentLevel.enemies.length - 1) : this._time);

    // 添加一个时间点的敌人和道具
    var enemyGroup = localCurrentLevel.enemies[this._time];
    var toolGroup = localCurrentLevel.tools;
    var enemyType;
    var toolType;

    for (var i = 0; i < enemyGroup.length; i++) {
      enemyType = enemyGroup[i];
      this.addEnemy(enemyType, this.calculateX(i, enemyGroup.length));
    }

    for (var j = 0; j < toolGroup.length; j++) {
      toolType = toolGroup[j].type;
      if (this._time === toolGroup[j].time) {
        this.addTool(toolType, this.calculateX(0, 1));
      }
    }

    // 时间点前进
    this._time++;
  },

  infiniteLoad: function() {
    var hasTool = parseInt(Math.random() * 10) > 6? true : false;
    var randomEnemyCount = parseInt(Math.random() * 4) + 2;

    this.addRandomEnemy(randomEnemyCount);
    if(hasTool) {this.addRandomTool(1);}
    return;
  },

  loadBoss: function(bossId) {
    var boss;
    var gamescene = cc.director.getRunningScene();
    var layer = gamescene.getChildByTag(1);

    switch (bossId) {
      case 1:
        boss = FirstBoss.create();
        break;
    }

    gamescene.unscheduleAllCallbacks();
    boss.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height + 50));
    layer.addChild(boss, 0);
  },

  resetTime: function() {
    this._time = 0;
  },

  resetLevel: function() {
    this.resetTime();
    this._levelIndex = 0;
    this._currentLevel = Levels[this._levelIndex];
    this._infinite = false;
  },

  addEnemy: function(enemyType, x) {

    var enemy;
    var gamescene = cc.director.getRunningScene();

    switch (enemyType) {
      case 0:
        enemy = NormalAttacker.getOrCreate();
        break;
      case 1:
        enemy = QuickAttacker.getOrCreate();
        break;
      case 2:
        enemy = BigAttacker.getOrCreate();
        break;
      case 3:
        enemy = SmallAttacker.getOrCreate();
        break;
      case 4:
        enemy = BurstAttacker.getOrCreate();
        break;
      case 5:
        enemy = ExplosionAttacker.getOrCreate();
        break;
      default:
        enemy = NormalAttacker.getOrCreate();
    }
    enemy.x = x;
    enemy.y = cc.winSize.height + parseInt(Math.random() * 50);

    var layer = gamescene.getChildByTag(1);
    layer.addChild(enemy, 0);
  },

  addRandomEnemy: function(num) {
    var type;

    for(var i = 0; i < num; i++) {
      type = parseInt(Math.random() * 6) - 1;

      this.addEnemy(type, this.calculateX(i, num));
    }
  },

  addTool: function(toolType, x) {
    var tool;
    var gamescene = cc.director.getRunningScene();

    switch (toolType) {
      case 0:
        tool = ExplosionTool.getOrCreate();
        break;
      case 1:
        tool = ArrowTool.getOrCreate();
        break;
      case 2:
        tool = BlackHoleTool.getOrCreate();
        break;
      case 3:
        tool = FireTool.getOrCreate();
        break;
      default:
        tool = ExplosionTool.getOrCreate();
    }
    tool.x = x;
    tool.y = cc.winSize.height + parseInt(Math.random() * 50);

    var layer = gamescene.getChildByTag(1);
    layer.addChild(tool, 1);
  },

  addRandomTool: function(num) {
    var type;

    for(var i = 0; i < num; i++) {
      type = parseInt(Math.random() * 6) - 1;

      this.addTool(type, this.calculateX(i, num));
    }
  },

  goNextLevel: function() {
    if (this._levelIndex % 2 === 0 && this._levelIndex !== 0) {
      Game.getInstance().speedUp();
      Utils.TextTool.centerText('加速', cc.director.getRunningScene().getChildByTag(1), cc.color(100,100,100), 38);
    }
    this._levelIndex++;
    if (this._levelIndex >= Levels.length) {
      //this._currentLevel = Levels[parseInt((Levels.length - 1) * Math.random())];
      this._infinite = true;
      return;
    }
    this._currentLevel = Levels[this._levelIndex];
  },

  calculateX: function(index, addCount) {
    var winSize = cc.winSize;
    var trackWidth = ((winSize.width - 50 + 50) / addCount) - 50;
    var start = 25 + (0 + (trackWidth + 50) * index);
    var end = ((trackWidth + 50) * index + trackWidth) + 25;
    var result = Math.random() * (end - start) + start;

    if(result > (winSize.width-25)) {result = 25;}
    else if(result < 25) {result = winSize.width - 25;}
    return result;
  }
});

// 单例设计
LevelManager._instance = null;
LevelManager.getInstance = function() {
  if (LevelManager._instance === null) {
    LevelManager._instance = new LevelManager();
  }
  return LevelManager._instance;
};
