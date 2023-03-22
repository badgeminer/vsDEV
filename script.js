let ctx = null
function clear() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(-5, -5, ctx.canvas.width + 5, 5 + ctx.canvas.height);
  //ctx.fill()
};


const hud = {
  money:{
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
      ctx.fillText(" Money:", hud.money.hudX, hud.money.hudY+10);
      var str = Math.round(Game.money).toString()
      str = str.padStart(9, "0")
      ctx.fillText(` $${str} `, hud.money.hudX, hud.money.hudY+22.5);
    }
  },
  dev:{
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
        ctx.fillText(" Money:", hud.dev.hudX, hud.dev.hudY+10);
        var str = Math.round(Game.money).toString()
        str = str.padStart(18, "0")
        ctx.fillText(` $${str} `, hud.dev.hudX, hud.dev.hudY+22.5);
      }
    }
  }
}

var Game = {
  money:500,
  assets: {},
  flags: {
    devMode:false
  },
  clicks: {
    dev:{
      sx:100,sy:10,
      ex:130,ey:40,
      act: function() {
        Game.flags.devMode = !Game.flags.devMode
      }
    }
  }
}
function isClickd(obj,x,y) {
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
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  //console.log("x: " + x + " y: " + y)
  for (const property in Game.clicks) {
    if (isClickd(Game.clicks[property],x,y)) {
      Game.clicks[property].act()
    }
  }
}

window.onload = function() {
  var c = document.getElementById("canvas");
  

  c.addEventListener('mousedown', function(e) {
      getCursorPosition(c, e)
  })
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth - 15;
  ctx.canvas.height = window.innerHeight - 15;
  Game.assets.dev = document.getElementById("dev");
  clear();
  ui();
  interv = setInterval(function() {
    clear();
    ui();
  },500)
}

