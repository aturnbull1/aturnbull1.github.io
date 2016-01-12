var db;
var token, secret, userid;

createDB();


function createDB() {
    const dbName = "employees";
    request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      // Handle errors.
    };
    request.onupgradeneeded = function(event) {
        db = event.target.result;

        var objectStore = db.createObjectStore("users", { keyPath: "id" });

        objectStore.createIndex("name", "name", { unique: false });

        objectStore.transaction.oncomplete = function(event) {
          console.log("Created Database");
          getEmployeeData();

        }
    };
}

function addUser(user) {
    var transaction = db.transaction(["users"],"readwrite");
    var store = transaction.objectStore("users");

    var request = store.add(user);

     request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
    }

    request.onsuccess = function(e) {
      //Yay
    }


}

function getEmployeeData() {

  fetch('users.json')
  .then(function(response) {
    return response.json();
  }).then(function(data) {

    for (i = 0; i < data.employees.length; i++) {
      addUser(data.employees[i]);
    }
  }).catch(function(err) {
    console.log(err);
  });
}

function searchName(searchTerm) {

    var employeeListItem = $("#employeeListItem");

    employeeListItem.empty();

  request = indexedDB.open('employees', 1);

   request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(["users"],"readwrite");
      var store = transaction.objectStore("users");

      var index = store.index("name");

    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var lowerName = cursor.value.name.toLowerCase();
        if (lowerName.indexOf(searchTerm.toLowerCase()) != -1) {
          employeeListItem.append("<a onclick='goToDetail(" + cursor.value.id + ")' href = 'detail.html'><li class='collection-item avatar'><img class = 'circle' src = '" + cursor.value.photo + "' /><span class='title'>" + cursor.value.name + "</span></li></a>")
        }
        cursor.continue();
      }
    };



    };

}

 function goToDetail(id) {
  localStorage.setItem('id', id);
  return true;
}
