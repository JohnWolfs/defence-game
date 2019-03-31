/*
 * @Author: JoneLin
 * @Date:   2016-02-24 11:10:11
 * @Last Modified by:   JoneLin
 * @Last Modified time: 2016-02-26 12:54:09
 */

var FirstBoss = Boss.extend({

  _HP: 30,
  _score: 1000,
  _ySpeed: 0.8,
  _time: 0, // 周期时间点
  _releaseTimes: [120, 200, 300, 400, 500, 600, 700, 800, 900, 1000],

  ctor: function() {
    this._super(res.boss_001);

    this.scheduleUpdate();
  },

  update: function() {
    this.y -= (this._ySpeed);
    this._time++;

    this.checkRelease();

    if (this.y < -20) {

      // 对玩家造成伤害，然后销毁
      this.causeDamage(10);
      this.destroy(false);
    }
  },

  checkRelease: function() {

  	if(this._releaseTimes.indexOf(this._time) !== -1) {
  		LevelManager.getInstance().addRandomEnemy(3);
  	}
  }
});

FirstBoss.create = function() {
	var boss = new FirstBoss();

	Game.getInstance().getEnemys().push(boss);
	return boss;
};
