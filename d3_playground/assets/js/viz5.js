// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

	var circleData = [
		{ "cx": 20, "cy": 20, "radius": 20, "color": "green"},
		{ "cx": 70, "cy": 70, "radius": 20, "color": "purple"}
	];

	var rectData = [
		{ "rx": 110, "ry": 110, "height": 30, "width": 30, "color": "blue"},
		{ "rx": 160, "ry": 160, "height": 30, "width": 30, "color": "red"}
	];

	var svgContainer = d3.select("#viz5").append("svg")
										.attr("width", 200)
										.attr("height", 200);

	var circleGroup = svgContainer.append("g")
									.attr("transform", "translate(80,0)");

	var circles = circleGroup.selectAll("circle")
									.data(circleData)
									.enter()
									.append("circle");

	var circleAttributes = circles
							.attr("cx", function(d) { return d.cx; })
							.attr("cy", function(d) { return d.cy; })
							.attr("r", function(d) { return d.radius; })
							.attr("fill", function(d) { return d.color; });

	var rects = svgContainer.selectAll("rect")
									.data(rectData)
									.enter()
									.append("rect");

	var rectAttributes = rects
							.attr("x", function(d) { return d.rx; })
							.attr("y", function(d) { return d.ry; })
							.attr("height", function(d) { return d.height; })
							.attr("width", function(d) { return d.width; })
							.attr("fill", function(d) { return d.color; });
})();