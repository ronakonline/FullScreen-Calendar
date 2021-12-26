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

//all appoitnments list
var Allappointments = [
  {
    id: 1,
    title: "Appointment 1",
    date: "25/12/2021",
    start: "12:00",
    end: "12:45",
    staff: "Staff 1",
    staffid: 1,
    amount: "$45"
  },
  {
    id: 2,
    title: "Appointment 1",
    date: "25/12/2021",
    start: "12:45",
    end: "13:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$45"
  },
  {
    id: 3,
    title: "Appointment 2",
    date: "25/12/2021",
    start: "12:45",
    end: "14:00",
    staff: "Staff 4",
    staffid: 4,
    amount: "$50"
  },
  {
    id: 4,
    title: "Appointment 2",
    date: "25/12/2021",
    start: "13:15",
    end: "15:45",
    staff: "Staff 2",
    staffid: 2,
    amount: "$50"
  },
  {
    id: 5,
    title: "Appointment 2",
    date: "25/12/2021",
    start: "13:00",
    end: "13:15",
    staff: "Staff 2",
    staffid: 2,
    amount: "$50"
  },
  {
    id: 4,
    title: "Appointment 2",
    date: "26/12/2021",
    start: "15:00",
    end: "16:00",
    staff: "Staff 5",
    staffid: 5,
    amount: "$60"
  },
  {
    id: 5,
    title: "Appointment 2",
    date: "26/12/2021",
    start: "17:00",
    end: "18:00",
    staff: "Staff 3",
    staffid: 3,
    amount: "$90"
  },
  {
    id: 6,
    title: "Appointment 2",
    date: "26/12/2021",
    start: "12:00",
    end: "13:45",
    staff: "Staff 1",
    staffid: 1,
    amount: "$90"
  },
  {
    id: 7,
    title: "Appointment 7",
    date: "26/12/2021",
    start: "13:45",
    end: "14:15",
    staff: "Staff 2",
    staffid: 1,
    amount: "$70"
  },
  {
    id: 8,
    title: "Appointment 8",
    date: "21/12/2021",
    start: "14:00",
    end: "15:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$70"
  },
  {
    id: 9,
    title: "Appointment 9",
    date: "23/12/2021",
    start: "14:00",
    end: "15:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$70"
  },
  {
    id: 10,
    title: "Appointment 10",
    date: "18/12/2021",
    start: "14:00",
    end: "15:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$70"
  },
  {
    id: 11,
    title: "Appointment 11",
    date: "24/12/2021",
    start: "15:00",
    end: "16:00",
    staff: "Staff 1",
    staffid: 1,
    amount: "$70"
  }
];

//opening time and closing time of salon
var openingTime = 12;
var closingTime = 18;

//all staff list
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

//selected staff id
//if staff id is 0 then all staffs are selected
var selectedStaff = 0;

//default time frame is day so we will make day Table and get todays appointments
//calling dayTable function will clear our day table and generate new table according to opening time and closing time of salon
dayTable();
//calling CurrentDateAppointments function will add appointments of current date to day table
CurrentDateAppointments();
//hiding other tables
$("#ThreeDayTable").hide();
$("#weekTable").hide();

//Process of time frame button click
//user clicks timeframe button day,week,month
//set time frame to selected time frame
//set date format according to selected time frame
//we will unactive all other time frame
//we will active selected time frame
//we will clear day table and generate new table according to time frame

//On day btn click set time frame to Day
$("#day-timeframe").on("click", function () {
  //set selectedStaff to 0
  selectedStaff = 0;
  timeFrame = "Day";
  DateFormat = "dddd DD MMM,YYYY";
  //Unactive all time frame buttons
  $("#week-timeframe").removeClass("active");
  $("#threedays-timeframe").removeClass("active");
  //Active current time frame button
  $(this).addClass("active");

  //set current date
  var currentDateText = moment(currentDate).format(DateFormat);
  $("#current-date").text(currentDateText);

  dayTable();
  CurrentDateAppointments();
  $("#ThreeDayTable").hide();
  $("#weekTable").hide();
  $("#dayChart").show();
});

//On week btn click set time frame to Week
$("#week-timeframe").on("click", function () {
  selectedStaff = 1;
  timeFrame = "Week";
  //week time format is Date Month Year - Date Month Year
  DateFormat = "DD MMM,YYYY";
  //Unactive all time frame buttons
  $("#day-timeframe").removeClass("active");
  $("#threedays-timeframe").removeClass("active");
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
  $("#ThreeDayTable").hide();
  $("#dayChart").hide();
  $("#weekTable").show();

  WeekTable();
  weekAppointments();
});

//On month btn click set time frame to Month
$("#threedays-timeframe").on("click", function () {
  //set selectedStaff to 1
  selectedStaff = 1;
  timeFrame = "3 Days";
  //month time format is Month Year
  DateFormat = "DD,MM,YYYY";
  //Unactive all time frame buttons
  $("#day-timeframe").removeClass("active");
  $("#week-timeframe").removeClass("active");
  //Active current time frame button
  $(this).addClass("active");

  //set current date to first day of the month
  $("#current-date").text(currentDate.format(DateFormat));

  $("#dayChart").hide();
  $("#weekTable").hide();
  $("#ThreeDayTable").show();
  ThreeDayTable();
  ThreeDayAppointments();
});

$("#nxt-date").on("click", function () {
  //if time frame is Day increment current date by 1 day
  if (timeFrame == "Day") {
    var next = moment(currentDate).add(1, "days").format(DateFormat);
    currentDate = moment(currentDate).add(1, "days");
    $("#current-date").text(next);
    dayTable();
    CurrentDateAppointments();
  }
  //if time frame is Week increment current date by 1 week
  else if (timeFrame == "Week") {
    console.log(currentDate);
    var weekstartDate = moment(currentDate).add(1, "weeks").startOf("isoWeek");
    var weekendDate = moment(currentDate).add(1, "weeks").endOf("isoWeek");
    // WeekEndDateLast = weekendDate;
    currentDate = moment(weekstartDate);
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
    WeekTable();
    weekAppointments();
  }
  //if time frame is Month increment current date by 1 month
  else if (timeFrame == "3 Days") {
    var next = moment(currentDate).add(3, "days").format(DateFormat);
    currentDate = moment(currentDate).add(3, "days");
    $("#current-date").text(next);
    ThreeDayTable();
    ThreeDayAppointments();
  }
});

$("#prev-date").on("click", function () {
  //if time frame is Day decrement current date by 1 day
  if (timeFrame == "Day") {
    var prev = moment(currentDate).subtract(1, "days").format(DateFormat);
    currentDate = moment(currentDate).subtract(1, "days");
    $("#current-date").text(prev);
    dayTable();
    CurrentDateAppointments();
  }
  //if time frame is Week decrement current date by 1 week
  else if (timeFrame == "Week") {
    console.log(currentDate);
    var weekstartDate = moment(currentDate)
      .subtract(1, "weeks")
      .startOf("isoWeek");
    var weekendDate = moment(currentDate).subtract(1, "weeks").endOf("isoWeek");
    // currentDate = weekendDate;
    currentDate = moment(weekstartDate);
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
    WeekTable();
    weekAppointments();
  }
  //if time frame is Month decrement current date by 1 month
  else if (timeFrame == "3 Days") {
    var prev = moment(currentDate).subtract(3, "days").format(DateFormat);
    currentDate = moment(currentDate).subtract(3, "days");
    $("#current-date").text(prev);
    ThreeDayTable();
    ThreeDayAppointments();
  }
});

//get to current date on today button clicked
$("#today").on("click", function () {
  if (timeFrame == "Day") {
    var today = moment().format("dddd DD MMM,YYYY");
    currentDate = moment();
    $("#current-date").text(today);
    dayTable();
    CurrentDateAppointments();
  } else if (timeFrame == "Week") {
    var weekstartDate = moment().startOf("isoWeek");
    var weekendDate = moment().endOf("isoWeek");
    //currentDate = weekendDate;
    currentDate = moment(weekstartDate);
    $("#current-date").text(
      weekstartDate.format(DateFormat) + " - " + weekendDate.format(DateFormat)
    );
    WeekTable();
    weekAppointments();
  } else if (timeFrame == "3 Days") {
    var today = moment().format("DD,MM,YYYY");
    currentDate = moment();
    $("#current-date").text(today);
    ThreeDayTable();
    ThreeDayAppointments();
  }
});

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

//Change Selected Staff and show appointments accordingly
$("#staffdropdown").on("click", "li", function () {
  var staffid = $(this).attr("id");
  selectedStaff = staffid;
  if (timeFrame == "Day") {
    dayTable();
    CurrentDateAppointments();
  } else if (timeFrame == "Week") {
    WeekTable();
    weekAppointments();
  } else if (timeFrame == "3 Days") {
    ThreeDayTable();
    ThreeDayAppointments();
  }
});

//this function will return all the appointments for given time
function getAppointments(time, staff, date = currentDate) {
  var appointments = [];
  for (var i = 0; i < Allappointments.length; i++) {
    if (staff == 0) {
      if (
        Allappointments[i].start == time &&
        Allappointments[i].date == moment(date).format("DD/MM/YYYY")
      ) {
        appointments.push(Allappointments[i]);
      }
    } else {
      if (
        Allappointments[i].start == time &&
        Allappointments[i].date == moment(date).format("DD/MM/YYYY") &&
        Allappointments[i].staffid == staff
      ) {
        appointments.push(Allappointments[i]);
      }
    }
  }

  return appointments;
}

//Generate Day Table
function dayTable() {
  //select dayChart Table
  var dayTable = $("#dayChart");
  //remove all rows except first
  dayTable.find("tr:gt(0)").remove();
  //generate table according to opening time and closing time
  for (var i = openingTime; i <= closingTime; i++) {
    var time = moment().hour(i).minute(0).format("HH:mm");
    //1st column is time and others are staff columns
    var row =
      '<tr class="time-slot" data-time="' +
      i +
      '"><td width="30px;"  class="schedule-time sch-time"><strong>' +
      time +
      "</strong></td>";
    for (var j = 0; j < AllStaffs.length; j++) {
      row +=
        '<td class="time-columns staff-column" data-staff="' +
        AllStaffs[j].id +
        '"><table class="inner-table">';
      for (var k = 0; k <= 3; k++) {
        row +=
          '<tr class="block-row"><td class="block-row min-slot" data-min="' +
          15 * k +
          '"><div class="block unfilled-block button block-border" data-hover="' +
          i +
          ":" +
          15 * k +
          '" data-active="IM ACTIVE"></div</td></tr>';
      }
      row += "</table></td>";
    }
    row += "</tr>";
    dayTable.append(row);
  }
}

//Get Appoitnmets for current date
function CurrentDateAppointments() {
  //loop through time slots between 12:00 and 20:00
  for (var i = 12; i <= 20; i++) {
    for (var k = 0; k <= 3; k++) {
      var time = moment()
        .hour(i)
        .minute(k * 15)
        .format("HH:mm");
      //get all the appointments for given time
      var appointments = getAppointments(time, selectedStaff);
      //if appointments exist for given time
      if (appointments.length > 0) {
        //loop through appointments
        for (var j = 0; j < appointments.length; j++) {
          //random number between 1 and 4;
          var random = Math.floor(Math.random() * 4) + 1;
          //create bar for each appointment
          //divide appointment into 15 min blocks
          var start = moment(appointments[j].start, "HH:mm");
          var end = moment(appointments[j].end, "HH:mm");
          var startHour = start.hour();
          var startMin = start.minute();
          var endHour = end.hour();
          var endMin = end.minute();
          //console.log(startHour, startMin, endHour, endMin);
          var bar =
            '<div class="block block-color' +
            random +
            ' "><p>Appointment ' +
            appointments[j].id +
            "</p></div>";
          //divide start to end in 15 min blocks and loop through
          var flag = 0;
          var endTime = endHour;
          if (endMin == 0) {
            endTime = endHour - 1;
            flag = 1;
          } else {
            flag = 0;
            endTime = endHour;
          }
          for (var m = startHour; m <= endHour; m++) {
            if (startHour == endHour) {
              for (var n = startMin; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".staff-column[data-staff='" +
                      appointments[j].staffid +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == startHour) {
              for (var n = startMin; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".staff-column[data-staff='" +
                      appointments[j].staffid +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == endHour) {
              for (var n = 0; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".staff-column[data-staff='" +
                      appointments[j].staffid +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (flag == 1) {
              for (var n = 0; n < 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".staff-column[data-staff='" +
                      appointments[j].staffid +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else {
              for (var n = 0; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".staff-column[data-staff='" +
                      appointments[j].staffid +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            }
          }
        }
      }
    }
  }
}

//Generate Theree Days Table
function ThreeDayTable() {
  var threedayTable = $("#ThreeDayTable");
  threedayTable.find("tr:gt(1)").remove();
  //set heading of table columns with 3 dates
  var day1 = moment(currentDate).format("dddd DD MMM,YYYY");
  var day2 = moment(currentDate).add(1, "days").format("dddd DD MMM,YYYY");
  var day3 = moment(currentDate).add(2, "days").format("dddd DD MMM,YYYY");
  $("#ThreeDayTable").find("th:eq(1)").text(day1);
  $("#ThreeDayTable").find("th:eq(2)").text(day2);
  $("#ThreeDayTable").find("th:eq(3)").text(day3);
  //generate table according to opening time and closing time
  for (var i = openingTime; i <= closingTime; i++) {
    var time = moment().hour(i).minute(0).format("HH:mm");
    //1st column is time and others are days column
    var row =
      '<tr class="time-slot" data-time="' +
      i +
      '"><td width="30px;" class="schedule-time sch-time"><strong>' +
      time +
      "</strong></td>";
    //3 columns for each day
    for (var j = 0; j < 3; j++) {
      row +=
        '<td class="time-columns date-column" data-date="' +
        moment(currentDate).add(j, "days").format("DD/MM/YYYY") +
        '"><table class="inner-table">';
      for (var k = 0; k <= 3; k++) {
        row +=
          '<tr class="block-row"><td class="block-row min-slot" data-min="' +
          15 * k +
          '"><div class="block unfilled-block button block-border" data-hover="' +
          i +
          ":" +
          15 * k +
          '" data-active="IM ACTIVE"></div</td></tr>';
      }
      row += "</table></td>";
    }
    row += "</tr>";
    threedayTable.append(row);
  }
}

//Get Appoitnmets for three days
function ThreeDayAppointments() {
  //loop throught time slots between opening time and closing time
  for (var i = openingTime; i <= closingTime; i++) {
    for (var k = 0; k <= 3; k++) {
      var time = moment()
        .hour(i)
        .minute(k * 15)
        .format("HH:mm");
      //get all the appointments for given time
      var appointments = getAppointments(time, selectedStaff, currentDate);
      //if appointments exist for given time
      if (appointments.length > 0) {
        //loop through appointments
        for (var j = 0; j < appointments.length; j++) {
          //random number between 1 and 4;
          var random = Math.floor(Math.random() * 4) + 1;
          //create bar for each appointment
          //divide appointment into 15 min blocks
          var start = moment(appointments[j].start, "HH:mm");
          var end = moment(appointments[j].end, "HH:mm");
          var startHour = start.hour();
          var startMin = start.minute();
          var endHour = end.hour();
          var endMin = end.minute();
          //console.log(startHour, startMin, endHour, endMin);
          var bar =
            '<div class="block block-color' +
            random +
            ' "><p>Appointment ' +
            appointments[j].id +
            "</p></div>";
          //divide start to end in 15 min blocks and loop through
          var flag = 0;
          var endTime = endHour;
          if (endMin == 0) {
            endTime = endHour - 1;
            flag = 1;
          } else {
            flag = 0;
            endTime = endHour;
          }
          for (var m = startHour; m <= endHour; m++) {
            if (startHour == endHour) {
              for (var n = startMin; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == startHour) {
              for (var n = startMin; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == endHour) {
              for (var n = 0; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (flag == 1) {
              for (var n = 0; n < 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else {
              for (var n = 0; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            }
          }
        }
      }
      var appointments = getAppointments(
        time,
        selectedStaff,
        moment(currentDate).add(1, "days")
      );
      //if appointments exist for given time
      if (appointments.length > 0) {
        //loop through appointments
        for (var j = 0; j < appointments.length; j++) {
          //random number between 1 and 4;
          var random = Math.floor(Math.random() * 4) + 1;
          //create bar for each appointment
          //divide appointment into 15 min blocks
          var start = moment(appointments[j].start, "HH:mm");
          var end = moment(appointments[j].end, "HH:mm");
          var startHour = start.hour();
          var startMin = start.minute();
          var endHour = end.hour();
          var endMin = end.minute();
          //console.log(startHour, startMin, endHour, endMin);
          var bar =
            '<div class="block block-color' +
            random +
            ' "><p>Appointment ' +
            appointments[j].id +
            "</p></div>";
          //divide start to end in 15 min blocks and loop through
          var flag = 0;
          var endTime = endHour;
          if (endMin == 0) {
            endTime = endHour - 1;
            flag = 1;
          } else {
            flag = 0;
            endTime = endHour;
          }
          for (var m = startHour; m <= endHour; m++) {
            if (startHour == endHour) {
              for (var n = startMin; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(1, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == startHour) {
              for (var n = startMin; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(1, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == endHour) {
              for (var n = 0; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(1, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (flag == 1) {
              for (var n = 0; n < 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(1, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else {
              for (var n = 0; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(1, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            }
          }
        }
      }
      var appointments = getAppointments(
        time,
        selectedStaff,
        moment(currentDate).add(2, "days")
      );
      //if appointments exist for given time
      if (appointments.length > 0) {
        //loop through appointments
        for (var j = 0; j < appointments.length; j++) {
          //random number between 1 and 4;
          var random = Math.floor(Math.random() * 4) + 1;
          //create bar for each appointment
          //divide appointment into 15 min blocks
          var start = moment(appointments[j].start, "HH:mm");
          var end = moment(appointments[j].end, "HH:mm");
          var startHour = start.hour();
          var startMin = start.minute();
          var endHour = end.hour();
          var endMin = end.minute();
          //console.log(startHour, startMin, endHour, endMin);
          var bar =
            '<div class="block block-color' +
            random +
            ' "><p>Appointment ' +
            appointments[j].id +
            "</p></div>";
          //divide start to end in 15 min blocks and loop through
          var flag = 0;
          var endTime = endHour;
          if (endMin == 0) {
            endTime = endHour - 1;
            flag = 1;
          } else {
            flag = 0;
            endTime = endHour;
          }
          for (var m = startHour; m <= endHour; m++) {
            if (startHour == endHour) {
              for (var n = startMin; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(2, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == startHour) {
              for (var n = startMin; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(2, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (m == endHour) {
              for (var n = 0; n < endMin; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(2, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else if (flag == 1) {
              for (var n = 0; n < 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(2, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            } else {
              for (var n = 0; n <= 60; n += 15) {
                $(".time-slot[data-time='" + m + "']")
                  .find(
                    ".date-column[data-date='" +
                      moment(currentDate).add(2, "days").format("DD/MM/YYYY") +
                      "']"
                  )
                  .find(".min-slot[data-min='" + n + "']")
                  .html(bar);
              }
            }
          }
        }
      }
    }
  }
}

//Generate Week Table
function WeekTable() {
  var weektable = $("#weekTable");
  //design week table header
  //table heading should be week days from monday to sunday
  for (i = 0; i < 7; i++) {
    var day = moment(currentDate).add(i, "days").format("ddd DD/MM/YY");
    weektable.find("th:eq(" + (i + 1) + ")").text(day);
  }
  //remove all table rows except the first one
  weektable.find("tr:gt(1)").remove();
  //generate table according to opening time and closing time
  for (var i = openingTime; i <= closingTime; i++) {
    var time = moment().hour(i).minute(0).format("HH:mm");
    //1st column is time and others are days column
    var row =
      '<tr class="time-slot" data-time="' +
      i +
      '"><td width="30px;" class="schedule-time sch-time"><strong>' +
      time +
      "</strong></td>";
    for (var j = 0; j < 7; j++) {
      row +=
        '<td class="p-0 day-column" width="150px;" data-day="' +
        moment(currentDate).add(j, "days").format("DD/MM/YYYY") +
        '">';
      row +=
        '<button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button><button class="button" type="button" data-hover="12:00" data-active="IM ACTIVE"><span class="invisible">HOVER EFFECT</span></button></td>';
    }
    row += "</tr>";
    weektable.append(row);
  }
}

//Get Week appointments
function weekAppointments() {
  var weektable = $("#weekTable");
  for (var i = openingTime; i <= closingTime; i++) {
    var time = moment().hour(i).minute(0).format("HH:mm");
    for (var j = 0; j < 7; j++) {
      var appointments = getAppointments(
        time,
        selectedStaff,
        moment(currentDate).add(j, "days")
      );
      if (appointments.length > 0) {
        for (var k = 0; k < appointments.length; k++) {
          var bar =
            '<div class="popover__wrapper text-center"><a href="#"><div class="popover__title"><p>' +
            time +
            '</p> <h4>Walk-In</h4><small>Mens Cut</small> </div></a>  <div class="popover__content"><p class="popover__message"><strong>Walk-In</strong></p><table class="table table-bordered m-0 bg-whirt"><td><p class="m-0">' +
            appointments[k].start +
            "PM to " +
            appointments[k].end +
            'PM </p><h5 class="m-0"><strong>Ladies Haircut</strong></h5><small>45 Min with ' +
            appointments[k].staff +
            '</small>   </td><td class="align-middle"><strong>' +
            appointments[k].amount +
            "</strong></td></table></div></div>";
          $(".time-slot[data-time='" + i + "']")
            .find(
              ".day-column[data-day='" +
                moment(currentDate).add(j, "days").format("DD/MM/YYYY") +
                "']"
            )
            .html(bar);
        }
      }
    }
  }
}
