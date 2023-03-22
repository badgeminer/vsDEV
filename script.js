let ctx = null
function clear() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(-5, -5, ctx.canvas.width + 5, 5 + ctx.canvas.height);
  //ctx.fill()
};


const hud = {
  money:{
    hudX: 10,
    hudY: 10
  }
}

var Game = {
  money:500,
  assets: {}
}

function ui() {
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

window.onload = function() {
  var c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth - 15;
  ctx.canvas.height = window.innerHeight - 15;
  Game.assets.dev = document.getElementById("dev");
  clear();
  ui();
  
}

