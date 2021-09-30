var birthdayInput = document.querySelector("#birthday-input");
var submitButton = document.querySelector("#submit-btn");
var output = document.querySelector("#output");
var image = document.querySelector("#image");

function reverseString(str) {
  var listOfChars = str.split("");
  var reversedList = listOfChars.reverse();
  var reversedStr = reversedList.join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reversedStr = reverseString(str);
  return str === reversedStr;
}

function convertToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDatesVariation(date) {
  var dateString = convertToStr(date);
  var ddmmyyyy = dateString.day + dateString.month + dateString.year;
  var mmddyyyy = dateString.month + dateString.day + dateString.year;
  var yyyymmdd = dateString.year + dateString.month + dateString.day;
  var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfDatesVar = getAllDatesVariation(date);
  var palindromeList = [];
  for (var i = 0; i < listOfDatesVar.length; i++) {
    var result = isPalindrome(listOfDatesVar[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function leapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonthArr[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getNextDate(date);
  while (1) {
    counter++;
    var dateStr = convertToStr(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);
    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function showText(message) {
  output.innerText = message;
}

function submitHandler() {
  var birthdayValue = birthdayInput.value;
  if (birthdayValue !== "") {
    var dateArr = birthdayValue.split("-");
    var yyyy = dateArr[0];
    var mm = dateArr[1];
    var dd = dateArr[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    var dateStr = convertToStr(date);
    var resultList = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      var [counter, nextDate] = getNextPalindromeDate(date);
      showText(
        `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter} days.`
      );
    } else {
      showText("Yay! Your birthday is palindrome!");
    }
  } else {
    showText("Please! Select your date first");
  }
}

function clickHandler() {
  image.src = "./assets/loading.gif";
  setTimeout(submitHandler, 5000);
}

submitButton.addEventListener("click", clickHandler);