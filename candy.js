let candy=['Blue','Orange','Green','Yellow','Red','Purple']
let board=[];
let rows=9;
let columns=9;
let currTile;
let otherTile;
let score=0;
let currsrc;

window.onload= function(){
    setGame();
   window.setInterval(function(){
       crushCandy();
       slideCandy();
       generateCandy();
   },100) 
}
function scoreUpdate(){
    document.querySelector('.score').innerText=score;
}
function setGame(){
    
    for(let r=0;r<rows;r++){
        let row=[]
        for(let c=0;c<columns;c++){
            let tile = document.createElement('img');
            tile.id = r.toString()+"-"+c.toString();
            tile.src='./images/'+randomCandy()+'.png'
            row.push(tile);
           
           
           
           
           document.getElementById('board').append(tile);
           
           tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
           tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
           tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
           tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
           tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
           tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

        }
        board.push(row);
    }
     

}

function generateCandy(){
    for(let i=0;i<columns;i++){
        if(board[0][i].src.includes('blank'))
         board[0][i].src = './images/'+randomCandy()+'.png'
    }
}
function randomCandy(){
    return candy[Math.floor(Math.random()*candy.length)];
}

function dragEnd(){
    
    if(currTile.src.includes('blank')|| otherTile.src.includes('blank')){
        return;
    }


    let currCord= currTile.id.split("-");
    let r=parseInt(currCord[0])
    let c=parseInt(currCord[1])
       
    let otherCord= otherTile.id.split("-");
    console.log(currCord,otherCord)
    
    let r2=parseInt(otherCord[0])
    let c2=parseInt(otherCord[1])
    
    let moveLeft = r==r2 && c==c2-1;
    let moveRight = r==r2 && c==c2+1;

    let moveUp = c==c2 && r==r2-1;
    let moveDown = c==c2 && r==r2+1;
  
    let isAdjecent = moveUp || moveDown || moveRight || moveLeft; 

    if(isAdjecent){
        let currImg = currTile.src;
        currsrc=currImg;
        let otherImg = otherTile.src;

        currTile.src= otherImg;
        otherTile.src=currImg;
        
        if(!checkValid()){
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src= otherImg;
        otherTile.src=currImg;
           
        }
    }
   
   
    
}
function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}
function crushCandy(){
    // crushFive();
    crushFour();
    crushThree();
}
function crushFour(){
    for(let r=0;r<rows;r++){
        for(let c =0;c<columns-3;c++){
          let candy1 = board[r][c];
          let candy2 = board[r][c+1];
          let candy3 = board[r][c+2];
          let candy4 = board[r][c+3];
          
          
          if(candy1.src==candy2.src && candy2.src==candy3.src &&  candy3.src==candy4.src && !candy1.src.includes('blank')){
              candy1.src='./images/blank.png'
              
              let color= candy2.src.split("/")
              console.log(color)
              candy2.src='./images/blank.png'
              candy3.src='./images/blank.png'
              
              candy4.src='./images/blank.png'
              
             
            }
            
        }
    }
    
    // check column
    for(let c=0;c<columns;c++){
        for(let r =0;r<rows-3;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            
            if(candy1.src==candy2.src && candy2.src==candy3.src && candy3.src==candy4.src && !candy1.src.includes('blank')){
                candy1.src='./images/blank.png'
                candy2.src='./images/blank.png'
                candy3.src='./images/blank.png'
                candy4.src='./images/blank.png'
                
                let color= board[r][c].src
                console.log(color)
              
            }
            
        }
    }
}
function crushThree(){
    
    // check rows
    for(let r=0;r<rows;r++){
        for(let c =0;c<columns-2;c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank')){
                candy1.src='./images/blank.png'
                candy2.src='./images/blank.png'
                candy3.src='./images/blank.png'
                
                score+=30;
                scoreUpdate()
            }
            
        }
    }
    
    // check column
    for(let c=0;c<columns;c++){
        for(let r =0;r<rows-2;r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+1][c];
            
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank')){
                candy1.src='./images/blank.png'
                candy2.src='./images/blank.png'
                candy3.src='./images/blank.png'
                
                score+=30;
                scoreUpdate()
            }
            
        }
    }
}
function checkValid(){

 for(let r=0;r<rows;r++){
    for(let c =0;c<columns-2;c++){
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];

        if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank')){
            return true;
        }

    }
 }

// check column
 for(let c=0;c<columns;c++){
    for(let r =0;r<rows-2;r++){
        let candy1 = board[r][c];
        let candy2 = board[r+1][c];
        let candy3 = board[r+1][c];

        if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes('blank')){
          return true;
        }

    }
 }
 return false;
}
function slideCandy(){
    
    for(let c=0;c<columns;c++){
        let ind=rows-1;
        for(let r=rows-1;r>=0;r--){
            if(!board[r][c].src.includes('blank')){
                board[ind][c].src = board[r][c].src;
                ind--;
            }
        }
        for(let r=ind;r>=0;r--){
            board[r][c].src = './images/blank.png'
        }
    }


}