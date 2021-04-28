class Game {
  constructor(){}
  
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

  start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();
      form = new Form()
      form.display();
    }
    car1 = createSprite(50,150);
    car2 = createSprite(100,150);
    car3 = createSprite(150,150);
    car4 = createSprite(200,150);

    cars = [car1,car2,car3,car4];
  }
  
  play(){
    form.hide();
    text("Game Start",200,100);
    Player.getPlayerInfo();

    if(allPlayers !== undefined ){

      //index of the array
      var index = 0;


      //x and y positions of the cars
      var x =0 ,y;

      var display_position = 150;
      for(var plr in allPlayers){ // for ( var i =0; i <10; i++)
        //add 1 to the  index of for loop
        index = index + 1;

        //postion the cars a little away from each other
        x = x + 200;

        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if( index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
        }
        if(plr === "player" + player.index){
            fill("red");
        }
        else{
          fill("black");
        }
         display_position += 20;
         textSize(15);
          text(allPlayers[plr].name + ": " + allPlayers[plr].distance,120,display_position);
      }
      console.log(allPlayers);
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance += 50; //i = i+1 ----- i+=1
        player.update();
    }
    drawSprites();
  }
}
