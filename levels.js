// var levelOne = {
//     music: "./music/AstralAcademy.mp3",
//     label: "1-1",
//     // hardcoded y for bounding box
//     floors: [{ x: 0, y: 735, size: 800 }, {x: 0, y: -202, size: 800}],
//     clouds: [{x:366, y:222, w: 200, h: 90}],
//     platforms: [{ x: 397, y: 513, w: 270, h: 250 }, {x: 820, y: 475, w: 270, h: 250}, {x: 1220, y: 420, w: 270, h: 250}, 
//         {x: 1800, y: 500, w: 270, h: 250}, {x: 3980, y: 405, w: 270, h: 250}, {x: 4900, y: 300, w: 270, h: 250}],
//     crates: [ { x: -130, y: 610, w: 130, h: 130}, {x: -130, y: 485, w: 130, h: 130}, {x: -130, y: 360, w: 130, h: 130}, {x: -130, y: 235, w: 130, h: 130},
//         {x: -130, y: 110, w: 130, h: 130}, {x: -130, y: -15, w: 130, h: 130}, {x: -130, y: -140, w: 130, h: 130}, {x: 0, y: -140, w: 130, h: 130}, 
//         {x: 320, y: 610, w: 128, h: 128},
//         {x: 1370, y: 307, w: 130, h: 130}, {x: 1825, y: 390, w: 130, h: 130}, {x: 2270, y: 610, w: 130, h: 130}, {x: 2398, y: 610, w: 130, h: 130}, 
//         {x: 2526, y: 610, w: 130, h: 130}, {x: 2398, y: 482, w: 130, h: 130}, {x: 3880, y: 610, w: 130, h: 130}, {x: 4348, y: 610, w: 130, h: 130}, 
//         {x: 4476, y: 610, w: 130, h: 130}, {x: 4476, y: 482, w: 130, h: 130}, {x: 4476, y: 354, w: 130, h: 130}, {x: 5050, y: 610, w: 130, h: 130}],
//     // crates: [{ x: -120, y: 610, w: 130, h: 130}, {x: -120, y: 485, w: 130, h: 130}, {x: -120, y: 360, w: 130, h: 130},
        
//     //     {x: 1370, y: 307, w: 130, h: 130}, {x: 1825, y: 390, w: 130, h: 130}, {x: 2270, y: 610, w: 130, h: 130}, {x: 2398, y: 610, w: 130, h: 130}, 
//     //     {x: 2526, y: 610, w: 130, h: 130}, {x: 2398, y: 482, w: 130, h: 130}, {x: 3880, y: 610, w: 130, h: 130}, {x: 4348, y: 610, w: 130, h: 130}, 
//     //     {x: 4476, y: 610, w: 130, h: 130}, {x: 4476, y: 482, w: 130, h: 130}, {x: 4476, y: 354, w: 130, h: 130}],
//     bats: [{ x: 500, y: 400, size: 1 }, { x: 2750, y: 460, size: 1 }, { x: 3020, y: 300, size: 1 }, { x: 4950, y: 300, size: 1 } ],
//     rats: [{ x: 400, y: 300, size: 1 }, { x: 1780, y: 300, size: 1 }, { x: 4240, y: 660, size: 1 }, { x: 4730, y: 660, size: 1 }, 
//         { x: 3870, y: 532, size: 1 }, /*{ x: 420, y: 300, size: 1 }, { x: 405, y: 300, size: 1 }, { x: 415, y: 300, size: 1 }, { x: 418, y: 300, size: 1 },
//     { x: 410, y: 300, size: 1 },{ x: 422, y: 300, size: 1 },{ x: 428, y: 300, size: 1 },{ x: 390, y: 300, size: 1 },{ x: 380, y: 300, size: 1 }*/],
//     goblins: [{ x: 600, y: 300, size: 1 }, { x: 2020, y: 500, size: 1 }, { x: 2916, y: 100, size: 1 }, { x: 3416, y: 100, size: 1 }],
//     //skeletons: [{x: 300, y: 300, size: 1}],
//     // gargoyles: [{ x: 700, y: 610, size: 2 }],
//     // dragons: [{x: 5200, y: 0, size: 1}],
//     //energyjuices: [{ x: 575, y: 150, size: 1 } ],
//     redapples: [{x: 1275, y: 340, size: 1 }, {x: 2200, y: 680, size: 1 }, {x: 2900, y: 340, size: 1 }, {x: 4390, y: 560, size: 1 } ],
//     healthbars: [{ x: 5, y: 5, size: 1 }],
//     hungerbars: [{ x: 5, y: 60, size: 1 }],
//     castlegates: [{x: 5625, y: 390, w: 400, h:2000}],
//     castles: [{x: 5200, y: -760, size: 1}],
//     backgrounds: [{ x: 0, y: 0, size: 1}],

// };

var levelOne = {
    music: "./music/AstralAcademy.mp3",
    label: "1-1",
    floors: [{ x: 0, y: 735, size: 800}, {x: 0, y: -202, size: 800}],
        //Signpost ids using 101 to 200 range for this level
    signposts: [{x: 190, y: 610, w: 130, h:130, id: 101}, {x: 990, y: 610, w: 130, h:130, id: 102},
        {x: 2390, y: 360, w: 130, h:130, id: 103}, {x: 4090, y: 295, w: 130, h:130, id: 104},
        {x: 5800, y: 610, w: 130, h:130, id: 105}],
    platforms: [{ x: 397, y: 513, w: 270, h: 250 }, {x: 820, y: 475, w: 270, h: 250}, {x: 1220, y: 420, w: 270, h: 250}, 
        {x: 1800, y: 500, w: 270, h: 250}, {x: 3980, y: 405, w: 270, h: 250}, {x: 4900, y: 300, w: 270, h: 250}],
    crates: [ { x: -130, y: 610, w: 130, h: 130}, {x: -130, y: 485, w: 130, h: 130}, {x: -130, y: 360, w: 130, h: 130}, {x: -130, y: 235, w: 130, h: 130},
        {x: -130, y: 110, w: 130, h: 130}, {x: -130, y: -15, w: 130, h: 130}, {x: -130, y: -140, w: 130, h: 130}, {x: 0, y: -140, w: 130, h: 130}, 
        {x: 320, y: 610, w: 128, h: 128},
        {x: 1370, y: 307, w: 130, h: 130}, {x: 1825, y: 390, w: 130, h: 130}, {x: 2270, y: 610, w: 130, h: 130}, {x: 2398, y: 610, w: 130, h: 130}, 
        {x: 2526, y: 610, w: 130, h: 130}, {x: 2398, y: 482, w: 130, h: 130}, {x: 3880, y: 610, w: 130, h: 130}, {x: 4348, y: 610, w: 130, h: 130}, 
        {x: 4348, y: 482, w: 130, h: 130}, {x: 4476, y: 610, w: 130, h: 130}, {x: 4476, y: 482, w: 130, h: 130}, {x: 4476, y: 354, w: 130, h: 130}, {x: 5050, y: 610, w: 130, h: 130}],
    bats: [{ x: 2750, y: 460, size: 1 }, { x: 3020, y: 300, size: 1 }, { x: 4950, y: 300, size: 1 } ],
    rats: [{ x: 1780, y: 300, size: 1 }, { x: 4240, y: 660, size: 1 }, { x: 4730, y: 660, size: 1 }, 
        { x: 3870, y: 532, size: 1 }, /*{ x: 420, y: 300, size: 1 }, { x: 405, y: 300, size: 1 }, { x: 415, y: 300, size: 1 }, { x: 418, y: 300, size: 1 },
    { x: 410, y: 300, size: 1 },{ x: 422, y: 300, size: 1 },{ x: 428, y: 300, size: 1 },{ x: 390, y: 300, size: 1 },{ x: 380, y: 300, size: 1 }*/],
    goblins: [{ x: 750, y: 500, size: 1 }, { x: 2020, y: 500, size: 1 }, { x: 2916, y: 100, size: 1 }, { x: 3416, y: 100, size: 1 }],
    redapples: [{x: 1675, y: 100, size: 1 }, {x: 2200, y: 680, size: 1 }, {x: 3000, y: 40, size: 1 }, {x: 4390, y: 560, size: 1 } ],
    healthbars: [{ x: 5, y: 5, size: 1 }],
    hungerbars: [{ x: 5, y: 60, size: 1 }],
    castlegates: [{x: 5625, y: 390, w: 400, h:2000}],
    castles: [{x: 5200, y: -760, size: 1}],
    statuepuzzles: [{x: 5850, y:0, w:150, h:800, visible: false}],
    backgrounds: [{ x: 0, y: 0, size: 1}],
};

var levelTwo = {
    music: "./music/AstralAcademy.mp3",
    label: "1-2",
        //Signpost ids using 101 to 200 range for this level
    floors: [{ x: 0, y: 735, size: 800 }, {x: 0, y: -202, size: 800}],
    metalspikesceiling: [{x: 100, y:90, w:130, h:130}, {x: 950, y:90, w:130, h:130}, 
        {x: 1300, y:90, w:130, h:130}, {x: 1650, y:90, w:130, h:130},
        {x: 3950, y:90, w:130, h:130}, {x: 4600, y:90, w:130, h:130},
        {x: 9300, y:90, w:130, h:130}, {x: 9600, y:90, w:130, h:130}],
    metalspikesfloor: [{x: 1525, y:625, w:130, h:130}, {x: 1655, y:625, w:130, h:130},
        {x: 1785, y:625, w:130, h:130}, {x: 1915, y:625, w:130, h:130},
        {x: 2600, y:625, w:130, h:130}, {x: 2860, y:625, w:130, h:130},
        {x: 3120, y:625, w:130, h:130}, {x: 3380, y:625, w:130, h:130},
        {x: 5580, y:625, w:130, h:130}, {x: 7180, y:625, w:130, h:130},
        {x: 5275, y:370, w:130, h:130}],
    crates: [{x:2730, y:610, w:130, h:130}, {x:2990, y:610, w:130, h:130},
            {x:3250, y:610, w:130, h:130}, {x:5010, y:610, w:130, h:130},
            {x:5140, y:610, w:130, h:130}, {x:5270, y:610, w:130, h:130},
            {x:7320, y:610, w:130, h:130}, {x:8300, y:610, w:130, h:130},
            //Stacked crates below here:
            {x:5140, y:480, w:130, h:130}, {x:5270, y:480, w:130, h:130}],
    statuepuzzles: [{x: -150, y:0, w:150, h:800, visible: false},
                    {x: 11020, y:0, w:150, h:550, visible: true}],
    redapples: [{x: 1165, y: 500, size: 1 }, {x: 2595, y: 210, size: 1},
                {x: 4275, y: 600, size: 1},{x: 6545, y: 165, size: 1}, 
                {x: 7770, y: 200, size: 1},{x: 9485, y: 125, size: 1},
                {x: 11035, y: 625, size: 1}],
    platforms: [{ x: 5800, y: 425, w: 270, h: 250 }, { x: 7400, y: 425, w: 270, h: 250 },
                { x: 9000, y: 425, w: 270, h: 250 }],
    skeletons: [{x: 750, y: 450, size: 1}, {x: 3700, y: 450, size: 1}, {x: 4730, y: 450, size: 1},
                {x: 6600, y: 450, size: 1}, {x: 8000, y: 450, size: 1}],
    bats:  [{x: 1430, y: 680, size: 1}, {x: 1625, y: 645, size: 1}, {x: 1910, y: 530, size: 1}, 
            {x: 2050, y: 540, size: 1}, {x: 4200, y: 540, size: 1}, 
            {x: 5310, y: 385, size: 1}, {x: 8625, y: 540, size: 1},
            {x: 10485, y: 440, size: 1},],
    healthbars: [{ x: 5, y: 5, size: 1 }],
    hungerbars: [{ x: 5, y: 60, size: 1 }],
    castlegates: [{x: 11700, y: 250, w: 2000, h: 5500}],
    backgrounds: [{x: 0, y: 0, size: 1}],
};


var levelDebug = {
    music: "./music/Clashing Steel.wav",
    label: "Debug",
    floors: [{ x: 0, y: 735, size: 800 }, {x: 0, y: -202, size: 800}],
    statuepuzzles: [{x: 495, y:0, v: true}],
    //Signpost ids using 401 to 500 range for this level
    signposts: [{x: 300, y:610, w:130, h:130, id:401}],
    platforms: [{ x: 397, y: 513, w: 270, h: 250 }],
    metalspikesfloor: [{x: 600, y:610, w:130, h:130}, {x: 880, y:610, w:130, h:130}],
    redapples: [{x: 800, y: 650, size: 1 }],
    healthbars: [{ x: 5, y: 5, size: 1 }],
    hungerbars: [{ x: 5, y: 60, size: 1 }],
    backgrounds: [{x: 0, y: 0, size: 1}]
};

var bossRoom = {
    music: "./music/AstralAcademy.mp3",
    label: "BossRoom",
    crates: [{ x: -130, y: 610, w: 130, h: 130}, {x: -130, y: 485, w: 130, h: 130}, {x: -130, y: 360, w: 130, h: 130}, {x: -130, y: 235, w: 130, h: 130},
        {x: -130, y: 110, w: 130, h: 130}, {x: -130, y: -15, w: 130, h: 130}, {x: -130, y: -140, w: 130, h: 130}, {x: 0, y: -140, w: 130, h: 130},],
    dragons: [{x: 1700, y: 0, size: 9}],
    floors: [{x: 0, y:735, size: 800}, {x: 0, y: -202, size: 800}],
    //Signpost ids using 501 to 600 range for this level
    signposts: [{x: 2500, y:610, w:767, h:300, id:501}, 
                {x: 3500, y:610, w:767, h:300, id:502},
                {x: 4500, y:610, w:767, h:300, id:503},
                {x: 5500, y:610, w:767, h:300, id:504},
                {x: 6500, y:610, w:767, h:300, id:505},
                {x: 7500, y:610, w:767, h:300, id:506},
                {x: 8500, y:610, w:767, h:300, id:507},
                {x: 9500, y:610, w:767, h:300, id:508},],
    endplatforms: [{x: 2000, y: 735}],
    platforms: [{ x: 1400, y: 515, w: 270, h: 250 }, {x:1475, y: 300, w:270, h:250}],
    healthbars: [{ x: 5, y: 5, size: 1 }],
    hungerbars: [{ x: 5, y: 60, size: 1 }],
    goldapples:[{x: 10550, y: 580, size: 2}],
    goldpiles: [{x: 10200, y: 610, size: 1}, {x: 10400, y: 610, size: 1}, {x: 10600, y: 610, size: 1}, 
        {x: 10800, y: 610, size: 1},
    // stacked up
        {x: 10600, y: 480, size: 1}, {x: 10800, y: 480, size: 1}, {x: 11000, y: 480, size: 1},
        {x: 11000, y: 380, size: 1}
    ],
    backgrounds: [{x: 0, y: 0, size: 1}],

}

var credits = {
    text: [
    "Made Possible By",
    "Richard Hardwick",
    "Brandon Lu",
    "Glenn Pak",
    "Andrew Treece",
    "Playtesters",
    "Sam Wu",
    "Runsen Wu",
    ]
}

