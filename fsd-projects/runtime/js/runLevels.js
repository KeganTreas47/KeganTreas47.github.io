var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
    }
    createSawBlade(500, 250);
    createSawBlade(1000, 170);
    createSawBlade(1500, 250);

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -1;
      enemy.rotationalVelocity = 1;
      
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
  
      }
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink(-10);
      }
    }
    createEnemy(400, groundY - 20);
    createEnemy(800, groundY - 100);
    createEnemy(1200, groundY - 50);

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 15);
      var yellowCircle = draw.circle(15, "yellow");
      yellowCircle.x = 0
      yellowCircle.y = 0
      reward.addChild(yellowCircle);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -1;
      
      

      reward.onPlayerCollision = function(){
        game.changeIntegrity(10);
        reward.fadeOut();
      }
    }
    createReward(1650, groundY-90);
    
    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 70);
      var greenCircle = draw.circle(70, "#4efc03");
      greenCircle.x = 0
      greenCircle.x = 0
      marker.addChild(greenCircle);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -1;

      marker.onPlayerCollision = function(){
        startLevel();
      }
      marker.onProjectileCollision = function(){
        startLevel();
      }
    }
    createMarker(2000, groundY-80);
    


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects 
        
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
};
