/**
 * Created by JimmyLin on 2014/8/27.
 */

// enemy 对应代号
// 0 - NormalAttacker
// 1 - QuickAttacker
// 2 - BigAttacker
// 3 - SmallAttacker
// 4 - BurstAttacker
// 5 - ExplosionAttacker
// tool 对应代号
// 0 - ExplosionTool
// 1 - ArrowTool
// 2 - BlackHoleTool
// 3 - FireTool
// boss 
// 
var Levels = [];
Levels[0] = {
    enemyMax:20,
    enemies:[
        [0],
        [1],
        [2],
        [0,1],
        [0,2],
        [1,4],
        [0,1,2],
        [0,0,0,2],
        [0,1,2,3]
    ],
    tools:[
        {time:1,type:0},
        {time:3,type:1}
    ]
};
Levels[1] = {
    enemyMax:20,
    enemies:[
        [0,0,0],
        [1,1,1],
        [1,2,0],
        [1,1,3,0],
        [2,2],
        [0,0,0,0,1],
        [0,1,1,1]
    ],
    tools:[
        {time:2,type:1},
        {time:3,type:2}
    ]
};
Levels[2] = {
    enemyMax:20,
    enemies:[
        [1,4],
        [3,3,3,3],
        [2,2,2,5],
        [4,5,4,4],
        [3,5,1,5],
        [1,1,1,1],
        [0,0,1,3],
        [1,1,1,5,5]
    ],
    tools:[
        {time:2,type:1},
        {time:2,type:2},
        {time:5,type:3}
    ]
};
Levels[3] = {
    enemyMax:20,
    enemies:[
        [4,4,4,3],
        [1,1,1,1],
        [5],
        [2,1,1,2],
        [5,1,1,5],
        [2,2,1,2],
        [5,5,5,5,5,2]
    ],
    tools:[
        {time:3,type:1},
        {time:5,type:0}
    ]
};
Levels[4] = {
    boss: true,
    bossId: 1
};
Levels[5] = {
    enemyMax:20,
    enemies:[
        [1,1,1,1,2],
        [1,4,1,1],
        [5,5],
        [0,0,0,1,0,0,0],
        [5,5,2,2],
        [1,2,3,4,5],
        [1,2,3,4,1]
    ],
    tools:[
        {time:2,type:1},
        {time:1,type:3},
        {time:1,type:2}
    ]
};
Levels[6] = {
    enemyMax:20,
    enemies:[
        [3,4,5,4,4],
        [1,0,0,1,0,1,0,1],
        [1,1,5,1,1],
        [1,4,5,1,1],
        [5,5,2,4,4,1],
        [5,5,3,3,5,4]
    ],
    tools:[
        {time:2,type:1},
        {time:1,type:1},
        {time:3,type:2}
    ]
};
Levels[7] = {
    boss: true,
    bossId: 1
};