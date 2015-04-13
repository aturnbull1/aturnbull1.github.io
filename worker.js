importScripts("js/easy-web-worker.js");
importScripts("js/localstoragedb.js");
importScripts("http://www.parsecdn.com/js/parse-1.3.5.min.js");


function sync() {
	setTimeout(function() {
	   upload();
	}, 5000);
	
}

function upload() {
	console.log('Hello there');
	var lib = new localStorageDB("people", localStorage);
	var query = lib.query("people");
	Parse.initialize("kQvDcOoUjfKARLE9vuF59uh2rsyVhEUtrpAqztr6", "0BKWnEbz1z9U3xPGRmoIc5I0PjFaozaBr19jFL4p");

	for (var i = 0; i < query.length; i++) { 
		var Person = Parse.Object.extend("Person");
		var person = new Person();
		person.set("name", query[i].name);
		person.set("age", query[i].age);
		person.set("gender", query[i].gender);

		lib.deleteRows("people", {name: query[i].name});
		lib.commit();

		person.save().then(function(object) {
		  console.log('I did something');
		});

		self.execute("sycnCallBack");

	}
}


