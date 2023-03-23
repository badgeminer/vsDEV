let ctx = null
let c = null
function clear() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(-5, -5, ctx.canvas.width + 5, 5 + ctx.canvas.height);
  //ctx.fill()
  //ctx.drawImage(Game.assets.stars, bgx, bgy);
};
var bgx = 0;
var bgy = 0;
let bgs = 0;
var bgdx = 0.2;
var bgdy = 0.1;

var build = {
  heal: 1,
  research: 2,
  top: 4,
  bottom: 8
}


const hud = {
  money: {
    hudX: 10,
    hudY: 10,
    drw: function() {

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#009933";
      ctx.roundRect(hud.money.hudX, hud.money.hudY, 85, 28, 5);
      ctx.stroke();
      ctx.fill()

      ctx.fillStyle = "#ffffff";
      ctx.font = "13px Space Mono, monospace";
      ctx.fillText(" Money:", hud.money.hudX, hud.money.hudY + 10);
      var str = Math.round(Game.money).toString()
      str = str.padStart(9, "0")
      ctx.fillText(` $${str} `, hud.money.hudX, hud.money.hudY + 22.5);
    }
  },
  heal: {
    hudX: 130,
    hudY: 10,
    drw: function() {
      ctx.drawImage(Game.assets.heal, 130, 10);
    }
  },
  res: {
    hudX: 160,
    hudY: 10,
    drw: function() {
      ctx.drawImage(Game.assets.res, 160, 10);
    }
  },
  dev: {
    hudX: 10,
    hudY: 50,
    drw: function() {
      if (Game.flags.devMode) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#009933";
        ctx.roundRect(hud.dev.hudX, hud.dev.hudY, 170, 58, 5);
        ctx.stroke();
        ctx.fill()

        ctx.fillStyle = "#ffffff";
        ctx.font = "13px Space Mono, monospace";
        ctx.fillText(" Money:", hud.dev.hudX, hud.dev.hudY + 10);
        var str = Math.round(Game.money).toString()
        str = str.padStart(18, "0")
        ctx.fillText(` $${str} `, hud.dev.hudX, hud.dev.hudY + 22.5);
      }
    }
  }
}
function sector(sd, sx, sy, w, h,res) {
  return {
    sd: sd,
    sx: sx, sy: sy,
    ex: w, ey: h,
    res:res
    
  }
}

var Game = {
  money: 500,
  assets: {},
  flags: {
    devMode: false
  },
  clicks: {
    dev: {
      sx: 100, sy: 10,
      ex: 130, ey: 40,
      act: function() {
        Game.flags.devMode = !Game.flags.devMode
      }
    }
  },

}
var map = {}
function isClickd(obj, x, y) {
  //console.log((obj.sx < x))
  //console.log((obj.sy < y))
  //console.log((obj.ex > x))
  //console.log((obj.ey > y))
  if ((obj.sx < x) & (obj.sy < y) & (obj.ex > x) & (obj.ey > y)) {

    return true

  }
  return false
}

function ui() {
  ctx.drawImage(Game.assets.dev, 100, 10);
  for (const property in hud) {
    hud[property].drw()
  }
};



function Map() {

  for (const prprty in map) {
    rect = map[prprty]
    //console.log(rect)
    ctx.strokeStyle = '#000000';
    if (rect.sd <= 0) {
      ctx.fillStyle = '#009933';
    } else {
      ctx.fillStyle = '#ff0000';
    };
    ctx.fillRect(rect.sx, rect.sy, rect.ex, rect.ey);
    if (rect.res& build.research) {
      ctx.drawImage(Game.assets.res, rect.sx, rect.sy);
    }
    ctx.strokeRect(rect.sx, rect.sy, rect.ex, rect.ey);
  };


}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  //console.log("x: " + x + " y: " + y)
  for (const property in Game.clicks) {
    if (isClickd(Game.clicks[property], x, y)) {
      Game.clicks[property].act()
    }
  }
}

var cpx = 0;
var cpy = 0;

var cwth = 0

window.onload = function() {
  c = document.getElementById("canvas");


  c.addEventListener('mousedown', function(e) {
    getCursorPosition(c, e)
  })
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth-5;
  ctx.canvas.height = window.innerHeight-5;
  Game.assets.dev = document.getElementById("dev");
  Game.assets.stars = document.getElementById("stars");
  Game.assets.heal = document.getElementById("heal");
  Game.assets.res = document.getElementById("rese");
  bgs = 2440-c.width
  clear();
  ui();
  cwth = c.width
  canvas.addEventListener("mousemove", function(e) {
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    cpx = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    cpy = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    //ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
    //ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);
  });
  var resea = 0;
  var GI = 0;
  for (let I = 0; I < 10; I++) {
    for (let p = 0; p < 15; p++) {
      resea = 0;
      if (((I-4)%2 == 0)&(p%5 == 0)) {
        resea = resea | build.research;
      }
      map[GI] = sector((I-4), (10 + (I * 25)), (50 + (p * 25)), 25, 25,resea);
      GI++;
    }
  }
  interv = setInterval(function() {
    clear();
    
    Map();
    ui();

  }, 50)
}

var cash = setInterval(function() {
    for (const prprty in map) {
      rect = map[prprty]
      if (rect.sd == 0) {
        Game.money++
      }
    }
  }, 1000)