var id = localStorage.getItem('id');
var networkDataReceived = false;
var cachedDataDrawn = false;


$( document ).ready(function() {
    getEmployeeDetail(id);
});



function getEmployeeDetail(id) {

    	   const dbName = "employees";
		    var request = indexedDB.open(dbName, 1);

		    var employeeListItem = $("#employeeListItem");

		    request.onerror = function(event) {
		      // Handle errors.
		      console.log("Error" + event);
		    };
		    request.onsuccess = function(event) {
		      var db = event.target.result;
			     db.transaction("users").objectStore("users").get(parseInt(id)).onsuccess = function(event) {
			     	if (!networkDataReceived) {
			     		cachedDataDrawn = true;
				  		drawEmployee(event.target.result);
					}
				};
			};
}


function drawEmployee(data) {
		$("#employeeDetail").empty();
	    $("#links").empty();
	    $("#employeeDetail").append("<li class='collection-item avatar'><img class = 'circle' src = '" + data.photo + "' /><span class='title'>" + data.name + "</span><p></p></li>");
	    $("#links").append("<a href='tel:" + data.landline_number +"' class='collection-item'>Phone Office</a><a href='tel: " + data.mobile_number + "' class='collection-item'>Phone Mobile</a><a href=mailto:'" + data.email + "' class='collection-item'>Email</a><a href='sms: " + data.mobile_number + "' class='collection-item'>SMS</a>");
}
