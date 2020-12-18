console.log('Winter Break is almost here!!!');
let daysOpened = JSON.parse(localStorage.getItem('clickDays'));

let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];
//variable to hold all the boxes
const boxes = document.querySelectorAll('.num');
//function to control the click on boxes
function handelBoxClick(event){
  const clickedBox = event.currentTarget;
  const dayClicked = clickedBox.dataset.day;
  const today = new Date();
  console.log(today.getDate(), Number(dayClicked));
  if(today.getDate() >= Number(dayClicked)){
    clickedBox.innerHTML = icons[Number(dayClicked)];
  }else{
    console.log('No peaking! Its not the right day yet');
  }
}// end of handelBoxClick
boxes.forEach(function(box){
  //each box in the list, add an event listener
  box.addEventListener('click', handelBoxClick);
})
  //make the boxes variable right here
  // reassign the icons to the random list
  icons = randomizeIcons(icons);
  //this function will store in localStorage the days that have already been clicked
  function storeDaysClicked(day){
    //add the clickedBox to local localStorage
    //first check to see if clickedDays exists in localStorage
    if(!localStorage.getItem('clickedDays')){ //clickDays does not exist yet
      daysOpened = [];
    } else { //there is something in clickDays
      daysOpened = JSON.parse(localStorage.getItem('clickedDays'));
    }
    localStorage.setItem('clickedDays', JSON.stringify(daysOpened));
    if(!daysOpened.includes(day)){ // if the number is not already in the array
     daysOpened.push(day);
    }
  }//end of storeDaysClicked

  //this function will randomize the list of emojis
  function randomizeIcons(oldList){
    let randomList = [];
    if(!localStorage.getItem('icons')){ // if there is not a list in local storage for the icons
      while(oldList.length > 0){
        const index = Math.floor(Math.random() * oldList.length);
        //put random item from old list into the new list
        randomList.push(oldList[index]);
        //remove the item from the oldList
        oldList.splice(index, 1) //start at index and remove 1 item
      }
      //put the randomList into localStorage
      localStorage.setItem('icons', JSON.stringify(randomList));
    } else{ //there is a list of randomized icons
      randomList = JSON.parse(localStorage.getItem('icons'));
      //TODO --> show the clicked boxes
    }
    return randomList;
  }// end of randomizeIcons

//this function will show the previously clicked boxes
  function showClickedBoxes(){
      boxes.forEach(function(box){
        const day = Number(box.dataset.day);
        if(daysOpened.includes(day)){
          box.innerHTML = icons[day];
        }
      });
  } // end of showClickedBoxes
if(daysOpened !== null){
  showClickedBoxes();
}
  //this function will reset the calendar
  function resetCalendar(){
    const answer = confirm('Are you sure you want to reset the calendar? This action cannot be undone.');
    if(answer){
    localStorage.clear();
    //reload page
    document.location.reload();
    }
  }//end of resetCalendar

  //Add reset button to the bottom of the Calendar
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Reset Button';
  //add event listener
  resetButton.addEventListener('click', resetCalendar);
  //place the button on the page
  //grab the footer
  const footer = document.querySelector('footer');
  //add button after the opening footer tag
  footer.insertAdjacentElement('afterbegin',resetButton);
 //afterbegin, beforebegin, beforeend, afterend

 //add a little style
 footer.style.textAlign = 'center';
 footer.style.paddingTop = '20px';
