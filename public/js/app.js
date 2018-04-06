
var calculator = (function(){
  var MAX = 15; //controls number of charcters allowed in display
  var power = true;  
  var inputBuffer = "";
  var myCalc = {};
  var display = $(".calculator__display > p");

  //////////////////////////////////////////////////////////////
  //   PUBLIC METHODS                                         //
  //////////////////////////////////////////////////////////////

  //Handle AC button clicks -- darkens display when turned off
  myCalc.power = function(){
    power = !power;
    $("#display").toggleClass("calculator__display--on");    
    this.clear();
  }
  //Clear calculator display
  myCalc.clear = function(){
    clearBuffer();
    updateDisplay();
  };
  //keypad input handler for calculator
  myCalc.input = function(value){
    var allowed = /[0-9\+\.\*\/=-]/gi
    if(power && allowed.test(value)){
      //NOTE: add check for numbers and arithmatic symbols      
      addToBuffer(value);
      updateDisplay();
    }    
  };
  //calculates values when EQUAL button is pressed
  myCalc.calculate = function(){
    //number.toExponential on any answer greater than MAX
    if(power){
      try{
        var calc = new Function('return ' + inputBuffer + ';');
        var answer = calc();         
        if(answer == 777){
          updateDisplay("Carl Hain");
          return 0;
        }  
        answer = answer.toString();
        var len = answer.length;
        if(len > MAX){
          answer = answer.slice(0, len + 2 - MAX);
        }
        this.clear();
        this.input(answer);
      }
      catch(e){
        clearBuffer();
        updateDisplay("ERROR");
      }
    }
  };

  //////////////////////////////////////////////////////////////
  //   PRIVATE METHODS                                        //
  //////////////////////////////////////////////////////////////

  //add values to inputBuffer
  function addToBuffer(value){
    if(inputBuffer.length < MAX){
     return inputBuffer += value;
    }
  }
  //clear inputBuffer
  function clearBuffer(){
    inputBuffer = "";
  }
  //update the display with contents of inputBuffer
  function updateDisplay(){

    if(arguments.length > 0){
      //console.log("my arguments are: " + arguments[0]);
      display.text(arguments[0]);
    }
    else if(inputBuffer.length === 0){
      display.text("0");
    }
    else{
      display.text(inputBuffer);
    }
  }          
  return myCalc;
})();

////////////////////////////////////////////////////////////////
//   Main function to run on document ready                   //
////////////////////////////////////////////////////////////////
$("document").ready(function(){
  //register calculator as moveable object using moveable.js
  registerMoveableObject(document.getElementById("calculator"));
  //set display text to zero
  $(".calculator__display > p").text("0");
  //set up event handler for button clicks
  $(".calculator__btn").on("click", function(event){
    var value = event.target.value;
    if(value === 'ce'){ calculator.clear(); }
    else if(value === 'ac'){ calculator.power()}
    else if(value === '='){ calculator.calculate(); }
    else{ calculator.input(value); }
  });
  //set up event handler for keyboard clicks
  $("body").on("keypress", function(event){
    var key = event.key.toLowerCase();
    console.log(event);
    if(key === 'a') { calculator.power(); }
    else if(key === 'c') { calculator.clear(); }
    else if(key === '=' || key === 'enter'){ calculator.calculate(); }
    else { calculator.input(key) }    
  });
});