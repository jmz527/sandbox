// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

	//Variables
	var margin, width, height, x0, x1, y0, xAxis, yAxis, svg, electGroup, gasGroup, xPosition, yPosition;

	//Width and height
    margin = {top: 20, right: 20, bottom: 30, left: 40};
	width = 600 - margin.left - margin.right;
	height = 250 - margin.top - margin.bottom;

	d3.csv("./assets/data/bills.csv", function(error, data) {
	  if (error) throw error;

	var dataset = { dates: [], elect: [], electBen: [], gas: [], gasBen: [] };
	var dates = [];

	data.forEach(function(d, i) {
		dataset.elect.push(d.Electricity);
		dataset.electBen.push(d.ElectricBenchmark);
		dataset.gas.push(d.Gas);
		dataset.gasBen.push(d.GasBenchmark);
		dataset.dates.push(d.Date);
	});

	var max = d3.max([  d3.max(dataset.elect), d3.max(dataset.electBen),
						d3.max(dataset.gas), d3.max(dataset.gasBen) ]);

	// console.log('dates', dates);
	console.log('dataset', dataset);
	// console.log('max:', max);

	x0 = d3.scale.ordinal().domain(dataset.dates);

    x1 = d3.scale.ordinal()
      			.domain(dataset.dates)
				.rangeRoundBands([margin.left, width], 0.05);

	y0 = d3.scale.linear()
				.domain([0, max])
				.range([height, 0]);

	xAxis = d3.svg.axis()
				.scale(x1)
				.orient("bottom");

	yAxis = d3.svg.axis()
				.scale(y0)
				.orient("left")
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
    .attr("transform", "translate(0," + (height + margin.top) + ")")
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

	// electGroup = svg.selectAll("g.elect")
	// 				.data(dataset.dates)
	// 				.enter()
	// 				.append("g")
	// 				.attr("class", "elect")
	// 				.attr("transform", function(d) { return "translate("+( x1(d) )+",0)" });


	// gasGroup = svg.selectAll("g.gas")
	// 				.data(dataset.dates)
	// 				.enter()
	// 				.append("g")
	// 				.attr("class", "gas")
	// 				.attr("transform", function(d) { return "translate("+( x1(d) )+",0)" });


	// //Create bars
	// svg.selectAll("rect.elect")
	// 	.data(dataset.elect)
	// 	.enter()
	// 	.append("rect")
	// 	.attr("class", "elect")
	// 	.attr("x", function(d, i) { return x0(i) })
	// 	.attr("y", function(d) { return height - y0(d) + margin.top })
	// 	.attr("width", x0.rangeBand() / 2)
	// 	.attr("height", function(d) { return y0(d) })
	// 	.attr("fill", '#58cfe9');

	// //Create bars
	// svg.selectAll("rect.gas")
	// 	.data(dataset.dates)
	// 	.enter()
	// 	.append("rect")
	// 	.attr("class", "gas")
	// 	.attr("x", function(d, i) { return x0(d) + (x0.rangeBand() / 2) })
	// 	.attr("y", function(d) { return height - y0(d) + margin.top })
	// 	.attr("width", x0.rangeBand() / 2)
	// 	.attr("height", function(d) { return y0(d) })
	// 	.attr("fill", '#ccc');

      // //Create labels
      // svg.selectAll("text")
      //    .data(dataset.elect)
      //    .enter()
      //    .append("text")
      //    .text(function(d) {
      //       return d;
      //    })
      //    .attr("text-anchor", "middle")
      //    .attr("x", function(d, i) {
      //       return x0(i) + x0.rangeBand() / 2;
      //    })
      //    .attr("y", function(d) {
      //       return height - y0(d) + 14;
      //    })
      //    .attr("font-family", "sans-serif")
      //    .attr("font-size", "11px")
      //    .attr("fill", "white");

	});



})();