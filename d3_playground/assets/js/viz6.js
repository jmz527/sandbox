// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

    var width, height, svg, xScale, yScale, xAxis, yAxis, xPos, yPos;
    	width = 600;
    	height = 200;

    d3.json("./assets/data/BillsDataContract.json", function(error, data) {
		if (error) throw error;

		var parsedData = { elect: [], electBen: [], gas: [], gasBen: [] };

		console.log('data', data);

		data.forEach(function(d) {
			// parsedData.elect.push(d.Electricity);
			// parsedData.electBen.push(d.ElectricBenchmark);
			// parsedData.gas.push(d.Gas);
			// parsedData.gasBen.push(d.GasBenchmark);
		});

		// console.log('parsedData', parsedData);

		xScale = d3.scale.ordinal()
					.domain(d3.range(data.length))
					.rangeRoundBands([0, width], 0.05);

		// yScale = d3.scale.linear()
		// 			.domain([0, d3.max(data)])
		// 			.range([0, height]);

	});






})();