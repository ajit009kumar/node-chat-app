
var moment = require('moment');

// Jan 1st 1970 00:00:00 am

//All the timestamp is relative  to above added date and time.

// var date = moment();
// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));


var someTimeStamp = moment().valueOf();

console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('h:mm a'));
