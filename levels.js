var levelOne = {
    music: "./music/AstralAcademy.mp3",
    label: "1-1",
    knights: [ {} ],
    // hardcoded y for bounding box
    floors: [{ x: 0, y: 735, size: 800 }],
    clouds: [{x:366, y:222, w: 200, h: 90}],
    platforms: [{ x: 397, y: 513, w: 270, h: 250 }, {x: 820, y: 475, w: 270, h: 250}, {x: 1220, y: 420, w: 270, h: 250}, 
        {x: 1800, y: 500, w: 270, h: 250}, {x: 3980, y: 405, w: 270, h: 250}],
    crates: [{ x: -130, y: 610, w: 130, h: 130}, {x: -130, y: 485, w: 130, h: 130}, {x: -130, y: 360, w: 130, h: 130},
        {x: 320, y: 610, w: 128, h: 128},
        {x: 1370, y: 307, w: 130, h: 130}, {x: 1825, y: 390, w: 130, h: 130}, {x: 2270, y: 610, w: 130, h: 130}, {x: 2398, y: 610, w: 130, h: 130}, 
        {x: 2526, y: 610, w: 130, h: 130}, {x: 2398, y: 482, w: 130, h: 130}, {x: 3880, y: 610, w: 130, h: 130}, {x: 4348, y: 610, w: 130, h: 130}, 
        {x: 4476, y: 610, w: 130, h: 130}, {x: 4476, y: 482, w: 130, h: 130}, {x: 4476, y: 354, w: 130, h: 130}],
    // crates: [{ x: -120, y: 610, w: 130, h: 130}, {x: -120, y: 485, w: 130, h: 130}, {x: -120, y: 360, w: 130, h: 130},
        
    //     {x: 1370, y: 307, w: 130, h: 130}, {x: 1825, y: 390, w: 130, h: 130}, {x: 2270, y: 610, w: 130, h: 130}, {x: 2398, y: 610, w: 130, h: 130}, 
    //     {x: 2526, y: 610, w: 130, h: 130}, {x: 2398, y: 482, w: 130, h: 130}, {x: 3880, y: 610, w: 130, h: 130}, {x: 4348, y: 610, w: 130, h: 130}, 
    //     {x: 4476, y: 610, w: 130, h: 130}, {x: 4476, y: 482, w: 130, h: 130}, {x: 4476, y: 354, w: 130, h: 130}],
    goldpiles: [{x: 5700, y: 450, w: 800, h: 400}],
    bats: [{ x: 500, y: 400, size: 1 }, { x: 2750, y: 460, size: 1 }, { x: 3020, y: 300, size: 1 }],
    rats: [{ x: 400, y: 300, size: 1 }, { x: 1780, y: 300, size: 1 }, { x: 4240, y: 660, size: 1 }, { x: 4730, y: 660, size: 1 }, 
        { x: 3870, y: 532, size: 1 }, { x: 420, y: 300, size: 1 }, { x: 405, y: 300, size: 1 }, { x: 415, y: 300, size: 1 }, { x: 418, y: 300, size: 1 },
        { x: 410, y: 300, size: 1 },{ x: 422, y: 300, size: 1 },{ x: 428, y: 300, size: 1 },{ x: 390, y: 300, size: 1 },{ x: 380, y: 300, size: 1 }],
    goblins: [{ x: 600, y: 300, size: 1 }, { x: 2020, y: 100, size: 1 }, { x: 2916, y: 100, size: 1 }, { x: 3416, y: 100, size: 1 }],
    //dragons: [{x: 5200, y: 0, size: 5}],
    dragons: [{x: 5200, y: 0, size: 1}],
    //dragons: [{ x: 1000, y: 200, size: 1 }],
    energyjuices: [{ x: 575, y: 150, size: 1 } ],
    redapples: [{x: 1275, y: 340, size: 1 }, {x: 1720, y: 680, size: 1 }, {x: 2900, y: 340, size: 1 }, {x: 4390, y: 560, size: 1 } ],
    goldapples:[{x: 6075, y: 425, size: 2}],
    healthbars: [{ x: 5, y: 5, size: 1 }],
    hungerbars: [{ x: 5, y: 60, size: 1 }],
    backgrounds: [{ x: 1, y: 1, size: 1}],

};

var credits = {
    text: [
    "      Made Possible By",
    "• Richard Hardwick",
    "• Brandon Lu",
    "• Glenn Pak",
    "• Andrew Treece"
    
    ]
}