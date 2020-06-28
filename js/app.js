'use strict'


// Array for all products
var product =[];

// defualt value for all clicks
var totalClick=0;


// declare variables for current images
var currentLeftImg;
var currentMiddleImg;
var currentRightImg;



// get elements from html
var final =document.getElementById('tabel')
var leftImage = document.getElementById('leftimg');
var middleImage = document.getElementById('middelimg');
var rightImage = document.getElementById('rightimg');


// array for the names of products 
var productName=[];


// declare variables for previous images
var previousLeftImageIndex;
var previousMiddelImageIndex;
var previousrightImageIndex;


//Default number for max number of all cliks
var maxNumberofclicks=25;


// constructor
function Mall (name , url){
    this.name=name;
    this.url=url;
    this.timesShown=0;
    this.numberOfClicks=0;
    product.push(this);
    productName.push(this.name);

}




// check if there is max number of cliks saved in local storage
if (localStorage.getItem('maxnumberofclicks')){

// Get the value of max number of clicks from storage
  maxNumberofclicks=JSON.parse(localStorage.getItem('maxnumberofclicks'));
}



// check if there is product array saved in local storage
if (localStorage.getItem('saveproducts')){
 
// Get the product from storage  
product=JSON.parse(localStorage.getItem('saveproducts'));

// Get the total clicks from storage 
totalClick=JSON.parse(localStorage.getItem('totalClicks'));

// push name values from product array to name array
for(var i=0 ;i<product.length;i++){
  productName.push(product[i].name)
   }
console.log(product)

}




// Declare objects

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




//Function to get Random Number
function RandomNumber(imageBox) {

// get  the random number
//check if the random number is from previous numbers 
//check if the random number is same to current middle or left numbers

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




//function to display images
function displayRandomIamge(){

//Display diffrent images
//ncrease the time shown for each image will appear
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


// call function of display images 
displayRandomIamge();



//Make an event listener to input number of ittrations
var form = document.getElementById('form')
var input = document.getElementById('in')

form.addEventListener('submit', numberofitration)
function numberofitration(event){
  event.preventDefault();

  maxNumberofclicks=number(event.target.in.value);
  console.log(maxNumberofclicks)


}







//Make an event listener for clicks on images
tabel.addEventListener('click', NumberClicks)


function NumberClicks(event){

//Check which image was clicked
//increase number of clicks for clicked image
// increase total number of cliked
//Save product array in local storage
//save total clicks in loal storage
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

      
    localStorage.setItem('saveproducts',JSON.stringify(product));
    console.log('The localStorage before: ', localStorage);
    console.log('After retriving ',JSON.parse(localStorage.getItem('products')));
    localStorage.setItem('totalClicks',JSON.stringify(totalClick))
      displayRandomIamge();
      //update();
      //localStorage.setItem('products',JSON.stringify(product));
      }

    }

//show the chart when total clicked number is equal to max number of clicks 
//call maxnumber function    
    else{

        
      resultChart();
     
     final.removeEventListener('click',NumberClicks);
      maxnumber();
          
    }
}





// Function for draw chart
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
    color2.push('rgb(85, 26, 26)');
   // if (productName===undefined){
    //  productName.push(product[i].name);
      
    //} 
         
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




// Function to update max number of clicks by 25 each time
function maxnumber(){

//upate the value of  max number of clicks & save it after updating in local storage   
maxNumberofclicks+=25;
localStorage.setItem('maxnumberofclicks',JSON.stringify(maxNumberofclicks))

}





  
  









