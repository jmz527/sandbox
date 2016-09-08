	// Event listener for AJAX MY PIQUANCY link
	$("#myPiquancy").on('click', function(event) {
		event.preventDefault();

		// AJAX accessing Piqs
		$.ajax({
			url: "/ajax/piquancy",
			method: "GET",
			dataType: "json",
			timeout: 5000,
			success: function(data, textStatus, jqXHR) {
				var myPiqs = data;
			
				// Clears the container
				$(".piqContainer").html('');

				// Iterating loop for the returned piqs data array
				for (i=0; i<myPiqs.length; i++) {
					// Creates an html element for each piq
					$(".piqContainer").append("<a class='plink' href='/piq/" + myPiqs[i]._id + "'><div class='piq' style='background-color: " + myPiqs[i].color + "'></div></a>");

					// This console.log is client-side:
					// console.log("Success! Here's the data! PiqUser: " + myPiqs[i]._id + ", Color: " + myPiqs[i].color);					
				}

			},
			error: function() {
				console.log('Error!');
			},
			complete: function() {
				console.log('FIN');
			}

		});

	});
