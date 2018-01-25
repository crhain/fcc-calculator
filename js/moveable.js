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
    //add mousedown event
    moveableObject.addEventListener('mousedown', (e)=>{
        let clickItemRect = moveableObject.getBoundingClientRect();                    
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
    moveableObject.addEventListener('mouseup', (e)=>{       
        //console.log('mouse up');
        moveableObject.style.zIndex = oldzIndex;
        oldzIndex = 1;
        moveableObject.classList.remove('can-move');
        e.preventDefault();
             
    });    
    //add mouseleave event    
    container.addEventListener('mouseleave', (e)=>{
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
    document.body.addEventListener('mousemove', (e)=>{    
        let canMove = !!moveableObject.classList.contains('can-move');        
        if(canMove){            
            let containerRect = container.getBoundingClientRect();
            let leftBound = 0; //-190
            let rightBound = containerRect.width - moveWidth; //1346
            let topBound =  0;  //-25
            let bottomBound = containerRect.height - moveHeight; //-85
            let xOffset = containerRect.left;
            let yOffset = containerRect.top;                                             
            //set x, y position
            let xPos = e.clientX - clickX - xOffset;
            let yPos = e.clientY - clickY - yOffset;
            //console.log("xPos: " + xPos + ", yPos: " + yPos);        
            if((xPos >= leftBound && xPos <= rightBound) || !bound){            
                moveableObject.style.left = xPos + "px";            
            }
            if((yPos >= topBound && yPos <= bottomBound) || !bound){
                moveableObject.style.top = yPos + "px";                    
            }                                                                                        
        }
    });

    return moveableObject;
}

//ADD ability to turn on collision detection between objects
//  * on mouse up or leave container events, calculate objects current possition and add to some data structure
//  * add additional collsion detection logic into mousemove handler that iterates through data structure detecting if any objects occupy that space
//  * have flag that enables/disables collision detection on individual items
//  * modify canMove flag by systematically testing for collisions.  Maybe split out function to do this.
//ADD optional export for use with require js modules and also one for es6 module system