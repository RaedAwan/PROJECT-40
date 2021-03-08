class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("player1", player_img);
    player2 = createSprite(300,200);
    player2.addImage("player2", player_img);
    

    players = [player1, player2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
     for(var plr in allPlayers){
       index = index + 1;
       x = 500 - allPlayers[plr].distance;
        
       y = 500;
       players[index-1].x = x;
       players[index-1].y = y;



     
        if(index === player.index){
          fill("black");
          textSize(25);
          text(allPlayers[plr].name, x - 5, y + 25);
        }
      }

        

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    drawSprites();
    }

    if(frameCount % 20 === 0){
      fruits = createSprite(random(100,1000), 0, 100, 100);
      fruits.velocityY = 6;
      var rand = Math.round(random(1,5));
      switch(rand){
        case 1: fruits.addImage("fruit1", fruit1_img);
        break;
        case 2: fruits.addImage("fruit2", fruit2_img);
        break;
        case 3: fruits.addImage("fruit3", fruit3_img);
        break;
        case 4: fruits.addImage("fruit4", fruit4_img);
        break;
        case 5: fruits.addImage("fruit5", fruit5_img);
        break;
      }
      fruitGroup.add(fruits);
    }
    if (player.index !== null) {
      //fill code here, to destroy the objects.
     for(var i =0; i<fruitGroup.length; i++){

         var fruit = fruitGroup.get(i);

         if(fruit.isTouching(player1)){
             fruit.destroy();
            // player.score = ++score1;
             player.update();
         }

         if(fruit.isTouching(player2)){
             fruit.destroy();
          //   player.score = ++score2;
             player.update();
         }
     }
 }
}

  end(){
   
  
    console.log("GAME ENDED");
  
  }
}
