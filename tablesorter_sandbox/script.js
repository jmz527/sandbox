$(function() {
	console.log('...Document Ready...');


	$.tablesorter.addWidget({
		id: "tableFootTotals",
		priority: 1,
		format: function() {
			var total = 0;
			var totalFiltered = 0;
			var table = $('#table').find('tbody tr td:nth-child(5)').each(function(i) {
				total += parseInt($(this).html());
				// console.log( i + ': ' + $(this).text());
			});
			var table = $('#table').find('tbody tr.filtered td:nth-child(5)').each(function(i) {
				totalFiltered += parseInt($(this).html());
				// console.log( i + ': ' + $(this).text());
			});
			console.log('total: '+(total-totalFiltered));
			$('#table').find('tfoot tr td:nth-child(5)').html((total-totalFiltered));
		}

	});

	var $table = $('#table').tablesorter({
		// theme: 'blue',
		widgets: ["filter", "tableFootTotals"],
		widgetOptions : {
			// filter_anyMatch replaced! Instead use the filter_external option
			// Set to use a jQuery selector (or jQuery object) pointing to the
			// external filter (column specific or any match)
			filter_external : '.search',
			// add a default type search to the first name column
			// filter_defaultFilter: { 1 : '~{12}' },
			// include column filters
			filter_columnFilters: false,
			filter_formatter: null,
			// filter_placeholder: { search : 'Search...' },
			filter_ignoreCase: true,
			filter_liveSearch: true,
			filter_saveFilters : false,
			filter_reset: '.reset'
		}
	});

});