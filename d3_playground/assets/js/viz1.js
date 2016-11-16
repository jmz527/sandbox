// self executing function here
(function() {
	// your page initialization code here
	// the DOM will be available here

	//Variables
	var margin, width, height, x0, x1, y0, xAxis, yAxis, svg, chart, electGroup, gasGroup, xPos, yPos;

	//Width and height
    margin = {top: 20, right: 20, bottom: 30, left: 40};
	width = 600 - margin.left - margin.right;
	height = 250 - margin.top - margin.bottom;

	d3.csv("./assets/data/bills.csv", function(error, data) {
		if (error) throw error;

		var dataset = {
			dates: data.map(function(d) { return d.Date }),
			elect: data.map(function(d) { return d.Electricity }),
			electBen: data.map(function(d) { return d.ElectricBenchmark }),
			gas: data.map(function(d) { return d.Gas }),
			gasBen: data.map(function(d) { return d.GasBenchmark })
		};

		var max = d3.max([  d3.max(dataset.elect), d3.max(dataset.electBen),
						d3.max(dataset.gas), d3.max(dataset.gasBen) ]);

		// console.log('dates', dates);
		// console.log('dataset', dataset);
		console.log('max:', max);

		x0 = d3.scale.ordinal().domain(data.map(function(d) { return d.date }));

		x1 = d3.scale.ordinal()
				.domain(dataset.dates)
				.rangeRoundBands([margin.left, width], 0.35);

		y0 = d3.scale.linear()
				.domain([0, max])
				.range([height - margin.bottom, margin.top]);

		xAxis = d3.svg.axis()
				.scale(x1)
				.orient("bottom");

		yAxis = d3.svg.axis()
				.scale(y0)
				.orient("left")
				.ticks(5)
				.innerTickSize(- width + margin.left)
				.outerTickSize(0)
				.tickPadding(10);

		//Create SVG element
		svg = d3.select("#viz1").append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);

		//Create X axis
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (height + margin.top - margin.bottom) + ")")
			.call(xAxis);

		//Create Y axis
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -6)
			.attr("dy", -30)
			.style("text-anchor", "end")
			.text("Cost ($)");

		//Create chart
		chart = svg.append("g")
			.attr("class", "chart")
			.attr("transform", "translate(0," + margin.top + ")");

		//Create bars
		chart.selectAll("rect.elect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "elect")
			.attr("x", function(d) { return x1(d.Date) })
			.attr("y", function(d) { return (height - margin.bottom) - (height - margin.bottom - y0(d.Electricity)) })
			.attr("height", function(d) { return (height - margin.bottom - y0(d.Electricity)) })
			.attr("width", x1.rangeBand() / 2)
			.attr("fill", '#58cfe9')
			.on("mouseover", function(d) {

				//Get this bar's x/y values, then augment for the tooltip
				xPos = parseFloat(d3.select(this).attr("x")) + x1.rangeBand() / 2;
				yPos = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

				//Update the tooltip position and value
				d3.select("#tooltip1")
					.style("left", xPos + "px")
					.style("top", yPos + "px")
					.select("#value1")
					.text(d.Electricity);

				d3.select("#tooltip1").classed("hidden", false); //Show the tooltip
			})
			.on("mouseout", function() {
				d3.select("#tooltip1").classed("hidden", true); //Hide the tooltip
			});


		//Create bars
		chart.selectAll("rect.gas")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "gas")
			.attr("x", function(d) { return x1(d.Date) + x1.rangeBand() / 2 })
			.attr("y", function(d) { return (height - margin.bottom) - (height - margin.bottom - y0(d.Gas)) })
			.attr("height", function(d) { return (height - margin.bottom - y0(d.Gas)) })
			.attr("width", x1.rangeBand() / 2)
			.attr("fill", '#ccc')
			.on("mouseover", function(d) {

				//Get this bar's x/y values, then augment for the tooltip
				xPos = parseFloat(d3.select(this).attr("x")) + x1.rangeBand() / 2;
				yPos = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

				//Update the tooltip position and value
				d3.select("#tooltip1")
					.style("left", xPos + "px")
					.style("top", yPos + "px")
					.select("#value1")
					.text(d.Gas);

				d3.select("#tooltip1").classed("hidden", false); //Show the tooltip
			})
			.on("mouseout", function() {
				d3.select("#tooltip1").classed("hidden", true); //Hide the tooltip
			});

		//Create circles
		chart.selectAll("circle.electBen")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "electBen")
			.attr("cx", function(d) { return x1(d.Date) + (x1.rangeBand() / 4) })
			.attr("cy", function(d) { return (height - margin.bottom) - (height - margin.bottom - y0(d.ElectricBenchmark)) })
			.attr("r", x1.rangeBand() / 5)
			.attr("fill", function(d) { return (d.ElectricBenchmark > d.Electricity)? '#45e386' : '#fb1a19' })
			.on("mouseover", function(d) {

				//Get this bar's x/y values, then augment for the tooltip
				xPos = parseFloat(d3.select(this).attr("cx")) + x1.rangeBand() / 2;
				yPos = parseFloat(d3.select(this).attr("cy"));

				//Update the tooltip position and value
				d3.select("#tooltip1")
					.style("left", xPos + "px")
					.style("top", yPos + "px")
					.select("#value1")
					.text(d.ElectricBenchmark);

				d3.select("#tooltip1").classed("hidden", false); //Show the tooltip
			})
			.on("mouseout", function() {
				d3.select("#tooltip1").classed("hidden", true); //Hide the tooltip
			});

		//Create circles
		chart.selectAll("circle.gasBen")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "gasBen")
			.attr("cx", function(d) { return x1(d.Date) + ((x1.rangeBand() / 4) * 3) })
			.attr("cy", function(d) { return (height - margin.bottom) - (height - margin.bottom - y0(d.GasBenchmark)) })
			.attr("r", x1.rangeBand() / 5)
			.attr("fill", function(d) { return (d.GasBenchmark > d.Gas)? '#45e386' : '#fb1a19' })
			.on("mouseover", function(d) {

				//Get this bar's x/y values, then augment for the tooltip
				xPos = parseFloat(d3.select(this).attr("cx")) + x1.rangeBand() / 2;
				yPos = parseFloat(d3.select(this).attr("cy"));

				//Update the tooltip position and value
				d3.select("#tooltip1")
					.style("left", xPos + "px")
					.style("top", yPos + "px")
					.select("#value1")
					.text(d.GasBenchmark);

				d3.select("#tooltip1").classed("hidden", false); //Show the tooltip
			})
			.on("mouseout", function() {
				d3.select("#tooltip1").classed("hidden", true); //Hide the tooltip
			});


	});


})();