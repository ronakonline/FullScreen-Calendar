//Default date format is Day Date Month Year
//Format can be changed according to the timeframe selection
var DateFormat = "dddd DD MMM,YYYY";

//current selected date
var currentDate = moment();

//get current date using moment js
var today = moment().format(DateFormat);

//time frame can be Day,Week,Month
var timeFrame = "Day";

//set todays date as default date
$("#current-date").text(today);

//On day btn click set time frame to Day
$("#day-timeframe").on("click", function () {
  timeFrame = "Day";
  DateFormat = "dddd DD MMM,YYYY";
  //Unactive all time frame buttons
  $("#week-timeframe").removeClass("active");
  $("#month-timeframe").removeClass("active");
  //Active current time frame button
  $(this).addClass("active");

  //set current date
  currentDate = moment(currentDate).format(DateFormat);
  $("#current-date").text(currentDate);
});

//On week btn click set time frame to Week
$("#week-timeframe").on("click", function () {
  timeFrame = "Week";
  //week time format is Date Month Year - Date Month Year
  DateFormat = "DD MMM,YYYY";
  //Unactive all time frame buttons
  $("#day-timeframe").removeClass("active");
  $("#month-timeframe").removeClass("active");
  //Active current time frame button
  $(this).addClass("active");

  //set current date to first day of the week
  currentDate = moment(currentDate).startOf("isoWeek");
  //set current date to last day of the week
  var endDate = moment(currentDate).endOf("isoWeek");
  //set current date to first day of the week
  $("#current-date").text(
    currentDate.format(DateFormat) + " - " + endDate.format(DateFormat)
  );
});

//On month btn click set time frame to Month
$("#month-timeframe").on("click", function () {
  timeFrame = "Month";
  //month time format is Month Year
  DateFormat = "MMM,YYYY";
  //Unactive all time frame buttons
  $("#day-timeframe").removeClass("active");
  $("#week-timeframe").removeClass("active");
  //Active current time frame button
  $(this).addClass("active");

  //set current date to first day of the month
  currentDate = moment(currentDate).startOf("month");
  $("#current-date").text(currentDate.format(DateFormat));
});

$("#nxt-date").on("click", function () {
  //if time frame is Day increment current date by 1 day
  if (timeFrame == "Day") {
    var next = moment(currentDate).add(1, "days").format(DateFormat);
    currentDate = moment(currentDate).add(1, "days");
    $("#current-date").text(next);
  }
  //if time frame is Week increment current date by 1 week
  else if (timeFrame == "Week") {
    var weekstartDate = moment(currentDate).add(1, "weeks").startOf("isoWeek");
    var weekendDate = moment(currentDate).add(1, "weeks").endOf("isoWeek");
    currentDate = weekendDate;
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
  }
  //if time frame is Month increment current date by 1 month
  else if (timeFrame == "Month") {
    var next = moment(currentDate).add(1, "months").format(DateFormat);
    currentDate = moment(currentDate).add(1, "months");
    $("#current-date").text(next);
  }
});

$("#prev-date").on("click", function () {
  //if time frame is Day decrement current date by 1 day
  if (timeFrame == "Day") {
    var prev = moment(currentDate).subtract(1, "days").format(DateFormat);
    currentDate = moment(currentDate).subtract(1, "days");
    $("#current-date").text(prev);
  }
  //if time frame is Week decrement current date by 1 week
  else if (timeFrame == "Week") {
    var weekstartDate = moment(currentDate)
      .subtract(1, "weeks")
      .startOf("isoWeek");
    var weekendDate = moment(currentDate).subtract(1, "weeks").endOf("isoWeek");
    currentDate = weekendDate;
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
  }
  //if time frame is Month decrement current date by 1 month
  else if (timeFrame == "Month") {
    var prev = moment(currentDate).subtract(1, "months").format(DateFormat);
    currentDate = moment(currentDate).subtract(1, "months");
    $("#current-date").text(prev);
  }
});

//get to current date on today button clicked
$("#today").on("click", function () {
  if (timeFrame == "Day") {
    var today = moment().format("dddd DD MMM,YYYY");
    currentDate = moment();
    $("#current-date").text(today);
  } else if (timeFrame == "Week") {
    var weekstartDate = moment().startOf("isoWeek");
    var weekendDate = moment().endOf("isoWeek");
    currentDate = weekendDate;
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
  } else if (timeFrame == "Month") {
    var today = moment().format("MMM,YYYY");
    currentDate = moment();
    $("#current-date").text(today);
  }
});

var Allappointments = [
  {
    id: 1,
    title: "Appointment 1",
    date: "21/12/2021",
    start: "12:00",
    end: "13:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$45"
  },
  {
    id: 2,
    title: "Appointment 2",
    date: "21/12/2021",
    start: "13:00",
    end: "14:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$50"
  }
];

var openingTime = 12;
var closingTime = 18;

var AllStaffs = [
  {
    id: 1,
    name: "Staff 1"
  },
  {
    id: 2,
    name: "Staff 2"
  },
  {
    id: 3,
    name: "Staff 3"
  },
  {
    id: 4,
    name: "Staff 4"
  },
  {
    id: 5,
    name: "Staff 5"
  },
  {
    id: 6,
    name: "Staff 6"
  }
];

//generate staff dropdown
for (var i = 0; i < AllStaffs.length; i++) {
  var staff =
    '<li id="' +
    AllStaffs[i].id +
    '"><a href="#" class="dropdown-item">' +
    AllStaffs[i].name +
    "</a></li>";
  $("#staffdropdown").append(staff);
}

//select dayChart Table
var dayTable = $("#dayChart");
//generate table according to opening time and closing time
for (var i = openingTime; i <= closingTime; i++) {
  var time = moment().hour(i).minute(0).format("HH:mm");
  //1st column is time and others are staff columns
  var row =
    '<tr class="time-slot" data-time="' +
    i +
    '"><td width="30px;" class="schedule-time sch-time"><strong>' +
    time +
    "</strong></td>";
  for (var j = 0; j < AllStaffs.length; j++) {
    row +=
      '<td class="p-0 staff-column" width="150px;" data-staff="' +
      AllStaffs[j].id +
      '">';
    row +=
      '<button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button></td>';
  }
  row += "</tr>";
  dayTable.append(row);
//   $(".staff-column").css("border-left", "1px solid #e5dada");
//   $(".staff-column").css("border-right", "1px solid #e5dada");
}

//this function will return all the appointments for given time
function getAppointments(time) {
  var appointments = [];
  for (var i = 0; i < Allappointments.length; i++) {
    if (Allappointments[i].start == time) {
      appointments.push(Allappointments[i]);
    }
  }
  return appointments;
}

//loop through time slots between 12:00 and 20:00
for (var i = 12; i <= 20; i++) {
  var time = moment().hour(i).minute(0).format("HH:mm");
  console.log(time);
  //get all the appointments for given time
  var appointments = getAppointments(time);
  console.log(appointments);
  //if appointments exist for given time
  if (appointments.length > 0) {
    //loop through appointments
    for (var j = 0; j < appointments.length; j++) {
      //create bar for each appointment
      var bar =
        '<div class="popover__wrapper text-center"><a href="#"><div class="popover__title"><p>' +
        time +
        '</p> <h4>Walk-In</h4><small>Mens Cut</small> </div></a>  <div class="popover__content"><p class="popover__message"><strong>Walk-In</strong></p><table class="table table-bordered m-0 bg-whirt"><td><p class="m-0">' +
        appointments[j].start +
        "PM to " +
        appointments[j].end +
        'PM </p><h5 class="m-0"><strong>Ladies Haircut</strong></h5><small>45 Min with ' +
        appointments[j].staff +
        '</small>   </td><td class="align-middle"><strong>' +
        appointments[j].amount +
        "</strong></td></table></div></div>";
      // add bar to time slot
      $(".time-slot[data-time='" + i + "']")
        .find(".staff-column[data-staff='" + appointments[j].staffid + "']")
        .html(bar)
    }
  }
}
