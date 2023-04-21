$(function () {
  let dayTime = getDateTime();

  let displayCurrent = $('#currentDay');
  displayCurrent.text(dayTime)

  //reformatting hours 
  let hour = new Date();
  let currentHour = String('hour-' + String(hour.getHours()).padStart(2, 0));

  let mainDiv = $('.container-fluid');
  let hourBlocks = mainDiv.children('.row');

  for(let i = 0; i < hourBlocks.length; i++){
    let currentRow = hourBlocks[i];

    //textarea set and storage pulling sets
    let entries = JSON.parse(localStorage.getItem(currentRow.id));
    currentTextArea = $(currentRow).children('textarea').text(entries)
  
    let curDiv = $(currentRow);

    //time blocking based on current time when accessed
    if(currentRow.id < currentHour){
      curDiv.addClass('past');
    }else if(currentRow.id > currentHour){
      curDiv.addClass('future');
    }else{
      curDiv.addClass('present');
    }    
  }

//push events to local storage
  hourBlocks.children("button").on('click', (e) => {
      let buttonParent = $(e.target).parent();
      $('.confirmation').text("Appointment added to local storage");
      let divId = $(buttonParent).attr('id');
      let selectedText = $(buttonParent).children('textarea');
      let newEvent = selectedText.val();
      localStorage.setItem(divId, JSON.stringify(newEvent));
    });
});

function getDateTime(){
  //Setting AMPM
  let am_pm = 'AM';
  let currentDate = new Date();
  let month = getMonth(currentDate.getMonth());
  let today = month + " " + currentDate.getDate() + ", " + currentDate.getFullYear();

  //AMPM Formatting
  let currentHours = currentDate.getHours();
  if(currentHours > 12){
    am_pm = 'PM';
    currentHours -= 12;
  }
  //Formatting minutes
  let currentMinutes = String(currentDate.getMinutes()).padStart(2, 0);
  let time = currentHours + ":" + currentMinutes + "" + am_pm;
  return today + " - " + time;
}

function getMonth(monthNumber){
  switch(monthNumber){
    case 0: return 'January';
    case 1: return 'February';
    case 2: return 'March';
    case 3: return 'April';
    case 4: return 'May';
    case 5: return 'June';
    case 6: return 'July';
    case 7: return 'August';
    case 8: return 'September';
    case 9: return 'October';
    case 10: return 'November';
    case 11: return 'December';
  }
}


