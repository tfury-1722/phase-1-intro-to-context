// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  // User's record
  const empRecord = {
    firstName, // made from mapping input
    familyName, // values to an empty Object
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return empRecord;
}

function createEmployeeRecords(nestedArray) {
  // Input: Array of arrays
  const freshArray = []; // Initialize an empty array to hold modified value
  for (const chunk of nestedArray) {
    // Iterate over nested arrays
    freshArray.push(createEmployeeRecord(chunk)); // Index each retained value from callback into empty array
  }
  return freshArray;
}

function createTimeInEvent(empRecord, timeStamp) {
  let date = timeStamp.split(" ")[0];
  const timeInObject = {
    type: "TimeIn",
    date: `${date}`,
    hour: parseInt(timeStamp.slice(-4), 10),
  };
  empRecord.timeInEvents.push(timeInObject);
  return empRecord;
}

function createTimeOutEvent(empRecord, timeStamp) {
  let date = timeStamp.split(" ")[0];
  const timeOutObject = {
    type: "TimeOut",
    date: `${date}`,
    hour: parseInt(timeStamp.slice(-4), 10),
  };
  empRecord.timeOutEvents.push(timeOutObject);
  return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
  let punchOut = empRecord.timeOutEvents.find((e) => {
    return e.date === date;
  }).hour;
  let punchIn = empRecord.timeInEvents.find((e) => {
    return e.date === date;
  }).hour;

  return (punchOut - punchIn) / 100;
}

function wagesEarnedOnDate(empRecord, date) {
  return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour;
}

function allWagesFor(record) {
  let total = 0;
  for (let i = 0; i < record.timeInEvents.length; i++) {
    const payDay = wagesEarnedOnDate(record, record.timeInEvents[i].date);
    total += payDay;
  }
  return total;
}

function calculatePayroll(array) {
  let totalPay = array.reduce((acc, record) => {
    const empPay = allWagesFor(record);
    return acc + empPay;
  }, 0);
  return totalPay;
}
