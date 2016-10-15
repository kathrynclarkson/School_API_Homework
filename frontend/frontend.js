var schedule = [];

// Load list of classes from back-end
// populate a dropdown list witht them
$.get( "/allclasses", function( arr ) {
	console.log(arr);
	for (var i = 0; i < arr.length; i++) {
		$("#class-list").append("<option value=" + arr[i] + ">" + arr[i].toUpperCase() + "</option>");
	}
});

// When user clicks "Show Classes" button
// send a get request and populate #my-classes
$.get("/schedule", function(arr){
	schedule = arr;
	for (var i = 0; i < arr.length; i++) {
		$("#my-classes").append(arr[i] + "<br>");
	}
});

$('#add-to-schedule').click(function() {
	var className = $('#class-list option:selected').val();
	$.post('/schedule', {"name": className} ,function(res){
		$.get("/schedule", function(arr){
			schedule = arr;
			$('#my-classes').html('');
			for (var i = 0; i < arr.length; i++) {
				$("#my-classes").append(arr[i] + "<br>");
			}
		});
	});
});

$('#get-grades').click(function() {
	$.get('/grades', function(res) {
		$('#grades').html('');
		for (var key in res) {
			// if the class is in my schedule
			if (schedule.indexOf(key) !== -1) {
				$('#grades').append(key + " - " + res[key] + "<br>");
			}
		}
	});
});

$("#get-homework").click(function() {
	$.get('/homework', function(res) {
		// clear content of div
		$('#my-homework').html('');
		for (var key in res) {
			// if the class is in my schedule
			if (schedule.indexOf(key) !== -1) {
				var homeworkStatus = "Homework is due!";
				if (res[key]) {
					homeworkStatus = "Homework is complete :)";
				}
				$('#my-homework').append(key + " - "  + homeworkStatus + "<button onclick='turnIn(this)' class='turn-in' data-class=" + key + ">Turn in</button>" + "<br>");
			}
		}
	});
});


function turnIn(button) {
	var className = $(button).data('class');
	$.post('/homework', { class: className }, function(res) {
		$.get('/homework', function(res) {
			// clear content of div
			$('#my-homework').html('');
			for (var key in res) {
				// if the class is in my schedule
				if (schedule.indexOf(key) !== -1) {
					var homeworkStatus = "Homework is due!";
					if (res[key]) {
						homeworkStatus = "Homework is complete :)";
					}
					$('#my-homework').append(key + " - "  + homeworkStatus + "<button onclick='turnIn(this)' class='turn-in' data-class=" + key + ">Turn in</button>" + "<br>");
				}
			}
		});
	});
}








