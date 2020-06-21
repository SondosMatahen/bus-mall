# bus-mall'use strict';





function displayRandomImages() {

  var forbiddenIndex=[];

  if(totalClicks > 0){
    forbiddenIndex = [previousLeftImageIndex, previousrightImageIndex];
  }

  var leftIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(leftIndex);
  var rightIndex = generateRandomNumber(forbiddenIndex);

  previousLeftImageIndex = leftIndex;
  previousrightImageIndex = rightIndex;

}













function generateRandomNumber(forbiddenIndex) {

  var allowed;
  var randomNumber;

  do{
    randomNumber = Math.floor(Math.random() * allGoats.length);
    allowed = true;
    for(var i = 0; i < forbiddenIndex.length ; i++){
      if(forbiddenIndex[i] === randomNumber){
        allowed = false;
      }
    }
  } while(!allowed);

  return randomNumber;
}

