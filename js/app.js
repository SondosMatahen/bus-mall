'use strict'

var product =[];
var totalClick=0;

var currentLeftImg;
var currentMiddleImg;
var currentRightImg;


var final =document.getElementById('tabel')

var leftImage = document.getElementById('leftimg');
var middleImage = document.getElementById('middelimg');
var rightImage = document.getElementById('rightimg');

var previousLeftImageIndex;
var previousMiddelImageIndex;
var previousrightImageIndex;

var maxNumberofclicks=25;

var productName=[];

function Mall (name , url){
    this.name=name;
    this.url=url;
    this.timesShown=0;
    this.numberOfClicks=0;
    product.push(this);
    productName.push(this.name);


}

new Mall ('bag','image/bag.jpg');
new Mall('banana','image/banana.jpg');
new Mall('bathroom','image/bathroom.jpg');
new Mall('boots','image/boots.jpg');
new Mall('breakfast','image/breakfast.jpg');
new Mall('bubblegum','image/bubblegum.jpg');
new Mall('chair','image/chair.jpg');
new Mall('cthulhu','image/cthulhu.jpg');
new Mall('dog-duck','image/dog-duck.jpg');
new Mall('dragon','image/dragon.jpg');
new Mall('pen','image/pen.jpg');
new Mall('pet-sweep','image/pet-sweep.jpg');
new Mall('scissors','image/scissors.jpg');
new Mall('shark','image/shark.jpg');
new Mall('sweep','image/sweep.png');
new Mall('tauntaun','image/tauntaun.jpg');
new Mall('unicorn','image/unicorn.jpg');
new Mall('usb','image/usb.gif');
new Mall('water-can','image/water-can.jpg');
new Mall('wine-glass','image/wine-glass.jpg');


function RandomNumber(imageBox) {

    var random;
    var allowed;
   do {

    random=Math.floor(Math.random()*product.length);
    allowed= true;

    for(var i=0 ; i< imageBox.length ;i++){

        
        if( imageBox[i]===random){
           allowed =false; 

        }
        
    }} while(!allowed);


    return random
}





function displayRandomIamge(){

    var imageBox =[];

    if(totalClick > 0){
        imageBox = [previousLeftImageIndex,previousMiddelImageIndex , previousrightImageIndex];
      }
   

var leftIndex= RandomNumber(imageBox);
imageBox.push(leftIndex);
var MiddelIndex= RandomNumber(imageBox);
imageBox.push(MiddelIndex);
var RightIndex= RandomNumber(imageBox);



previousLeftImageIndex = leftIndex;
previousMiddelImageIndex = MiddelIndex;
previousrightImageIndex = RightIndex;



currentLeftImg= product[leftIndex]
currentMiddleImg= product[MiddelIndex]
currentRightImg= product[RightIndex]


leftImage.setAttribute('src',currentLeftImg.url);
middleImage.setAttribute('src',currentMiddleImg.url);
rightImage.setAttribute('src',currentRightImg.url);

currentLeftImg.timesShown += 1;
currentMiddleImg.timesShown += 1;
currentRightImg.timesShown += 1;

}


displayRandomIamge();




var form = document.getElementById('form')
var input = document.getElementById('in')

form.addEventListener('submit', numberofitration)
function numberofitration(event){
  event.preventDefault();

  maxNumberofclicks=event.target.in.value
  console.log(maxNumberofclicks)


}








tabel.addEventListener('click', NumberClicks)

function NumberClicks(event){
  if( totalClick<maxNumberofclicks){
       
        var clickedElementId = event.target.id;

      if (clickedElementId === 'leftimg' || clickedElementId === 'middelimg'  || clickedElementId === 'rightimg') {
         totalClick++;
  
     if (clickedElementId === 'leftimg') {
        currentLeftImg.numberOfClicks += 1;
      }

      if (clickedElementId === 'middelimg') {
        currentMiddleImg.numberOfClicks += 1;
      }
      if (clickedElementId === 'rightimg') {
        currentRightImg.numberOfClicks += 1;
      }

        displayRandomIamge();
      }

    }
    else{


          resultChart();

          final.removeEventListener('click',NumberClicks);
          
    }
}






function resultChart (){

  var color=[];
  var color2=[];
  var numberOfCliksArray=[];
  var border=[];
  var numberTimeshown =[];
  for(var i=0; i<product.length; i++){
    numberOfCliksArray.push(product[i].numberOfClicks);
    numberTimeshown.push(product[i].timesShown);
    border.push('rgba(12, 12, 12,1)')
      color.push('rgb(180, 76, 76)');
      color2.push('rgb(85, 26, 26)')           
  }


var ctx = document.getElementById('resultsChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productName,
        datasets: [{
            label:'# of clicks',
            data:numberOfCliksArray, 
            backgroundColor: color,                
            borderColor: border,
            borderWidth: 1 ,
            
        },{
        label:'# of time showen',
        data:numberTimeshown, 
        backgroundColor: color2,                
        borderColor: border,
        borderWidth: 1 ,},
      ]
    },

    options: {
     responsive: false,
      maintainAspectRatio: false,



      legend: {
        labels: {
            // This more specific font property overrides the global property
            fontColor: 'black'
        }
    },

        scales: { 
            yAxes: [{
                ticks: {
                  beginAtZero: true,
                  precision:1, 
                  stepSize:1 ,

                  fontColor: 'black'
                    
                }
            }],

            xAxes:[{
            ticks: {
              fontColor: 'black'
            }

            }
          ]  
        }
    }
});
}
  
  









