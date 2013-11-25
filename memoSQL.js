
x$(document).on("deviceready", function () {
});

var listElement = x$('#listItems');
var messageElement = x$('#message');
var db;
x$('#saveItem').on('click', function(e) {
insertItem();
});
// Create a reference to the database
function getDatabase() {
return window.openDatabase("todoListDB",
"1.0", "ToDoList Database", 200000);
}

// Run the onDeviceReady method
onDeviceReady();
// PhoneGap is ready
function onDeviceReady() {
db = getDatabase();
db.transaction(function(tx) {
tx.executeSql('CREATE TABLE IF NOT EXISTS MYLIST
(id INTEGER PRIMARY KEY AUTOINCREMENT, list_action)');
}, databaseError, getItems);
}

// Run a select statement to pull out all records
function getItems() {
db.transaction(function(tx) {
tx.executeSql('SELECT * FROM MYLIST', [],
querySuccess, databaseError);
}, databaseError);
}

// Process the SQLResultSetList
function querySuccess(tx, results) {
var len = results.rows.length;
var output = '';
for (var i=0; i<len; i++){
output = output +
'<li id="' + results.rows.item(i).id + '">' +
results.rows.item(i).list_action + '</li>';
}
messageElement.html('<p>There are ' + len +
' items in your list:</p>');
listElement.html('<ul>' + output + '</ul>');
}

// Insert a record into the database
function insertItem() {
var insertValue =
document.getElementById('list_action').value;
db.transaction(function(tx) {
tx.executeSql('INSERT INTO MYLIST
(list_action) VALUES ("' + insertValue + '")');
}, databaseError, getItems);
// Clear the value from the input box
document.getElementById('list_action').value = '';
}

// Database error handler
function databaseError(error) {
messageElement.html("SQL Error: " + error.code);
}

