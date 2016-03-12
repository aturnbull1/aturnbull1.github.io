$( document ).ready(function() {
	$.getJSON('/data.json', function(data) {
		$.each(data.touristdata.restaurants, function(index, value) {
		   $('#restaurants').append("<li style='list-style:none' class='collection-item avatar'><img class = 'circle' src = '" + value.photo + "' /><span class='title'>" + value.name + "</span><p>" + value.address + "</p></li>");
		});

 	 });
});
