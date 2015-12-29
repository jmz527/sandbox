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

	// **********************************
	//  Description of ALL pager options
	// **********************************
	var pagerOptions = {
		// target the pager markup - see the HTML block below
		container: $('#pager'),
		size: 10,
		// output string - default is '{page}/{totalPages}'
		// possible variables: {size}, {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		// also {page:input} & {startRow:input} will add a modifiable input in place of the value
		output: 'Showing {startRow} - {endRow} of {totalRows} entries',
		// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
		// table row set to a height to compensate; default is false
		fixedHeight: false,
		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows: false,
		// go to page selector - select dropdown that sets the current page
		cssGoto: '.gotoPage'
	};
	// **********************************
	//  Customized pager options
	// **********************************
	$.tablesorter.customPagerControls({
		table: $table,
		pager: $('#pager'),
		pageSize: '.left a',
		currentPage: '.right a',
		ends: 2,
		aroundCurrent: 1,
		link: '<li><a href="#">{page}</a></li>',
		currentClass: 'current',
		adjacentSpacer: '',
		distanceSpacer: '',
		addKeyboard: true
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
	})
	// initialize the pager plugin
	// ****************************
	.tablesorterPager(pagerOptions);
});