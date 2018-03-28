'use strict'

function registerMoveableObject(moveableObject, bound = false){    
    //ADD reset on container resize
    //ADD conditional statements to check paramters are objects.
    //if they are not, but are instead strings, then use document.getElementById()
    //to retrieve object references
    var moveWidth = moveableObject.offsetWidth;
    var moveHeight = moveableObject.offsetHeight;    
    var clickX;
    var clickY;
    var oldzIndex;
    var container = moveableObject.parentElement;
    var frame;
    //add mousedown event
    moveableObject.addEventListener('mousedown', function (e){
        var clickItemRect = moveableObject.getBoundingClientRect();                    
        clickX = e.clientX - clickItemRect.left;
        clickY = e.clientY - clickItemRect.top;
        oldzIndex = moveableObject.style.zIndex;
        moveableObject.style.zIndex = 1000;
        moveableObject.classList.add('can-move');
        e.preventDefault();        
        //console.log('mouse down');
        //console.log(moveableObject.classList);       
    });
    //add mouseup event
    moveableObject.addEventListener('mouseup', function(e){       
        //console.log('mouse up');
        moveableObject.style.zIndex = oldzIndex;
        oldzIndex = 1;
        moveableObject.classList.remove('can-move');
        e.preventDefault();
             
    });    
    //add mouseleave event    
    container.addEventListener('mouseleave', function (e) {
        e.preventDefault();        
        if(moveableObject.classList.contains('can-move')){
            moveableObject.style.zIndex = oldzIndex;
            oldzIndex = 1;
            moveableObject.classList.remove('can-move');
            //console.log('mouse left container');
            //console.log(moveableObject.classList);
        }                            
    });             
    //add mousemove event
    document.body.addEventListener('mousemove', function(e){
        
        if(!frame){                                    
            frame = window.requestAnimationFrame(moveOnMouse.bind(null, e));                                                
        }
    });

    function moveOnMouse(e, time){
        var canMove = !!moveableObject.classList.contains('can-move');        
        if(canMove){            
            var containerRect = container.getBoundingClientRect();
            var leftBound = 0; //-190
            var rightBound = containerRect.width - moveWidth; //1346
            var topBound =  0;  //-25
            var bottomBound = containerRect.height - moveHeight; //-85
            var xOffset = containerRect.left;
            var yOffset = containerRect.top;                                             
            //set x, y position
            var xPos = e.clientX - clickX - xOffset;
            var yPos = e.clientY - clickY - yOffset;
            //console.log("xPos: " + xPos + ", yPos: " + yPos);        
            if((xPos >= leftBound && xPos <= rightBound) || !bound){            
                moveableObject.style.left = xPos + "px";            
            }
            if((yPos >= topBound && yPos <= bottomBound) || !bound){
                moveableObject.style.top = yPos + "px";                    
            }                                                                                        
        }

        frame = null;
    }


    return moveableObject;
}
