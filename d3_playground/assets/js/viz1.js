// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here



    //Width and height
    w = 685;
    h = 200;
    padding = 30;

    var dataset = [
          [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
          [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
          [600, 150]
          ];

    //Create scale functions
    var xScale = d3.scale.linear()
             .domain([0, d3.max(dataset, function(d) { return d[0]; })])
             .range([padding, w - padding * 2]);

    var yScale = d3.scale.linear()
             .domain([0, d3.max(dataset, function(d) { return d[1]; })])
             .range([h - padding, padding]);

    var rScale = d3.scale.linear()
             .domain([0, d3.max(dataset, function(d) { return d[1]; })])
             .range([2, 5]);

    //Define X axis
    var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);

    //Define Y axis
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5)
            .innerTickSize(-w)
            .outerTickSize(0)
            .tickPadding(10);

    //Create SVG element
    var svg = d3.select("#viz1")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Create circles
    svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
        return xScale(d[0]);
     })
     .attr("cy", function(d) {
        return yScale(d[1]);
     })
     .attr("r", function(d) {
        return rScale(d[1]);
     });

    //Create labels
    svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function(d) {
        return d[0] + "," + d[1];
     })
     .attr("x", function(d) {
        return xScale(d[0]);
     })
     .attr("y", function(d) {
        return yScale(d[1]);
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "red");

    // //Create circles
    // svg.selectAll("circle")
    //    .data(dataset)
    //    .enter()
    //    .append("circle")
    //    .attr("cx", function(d) {
    //       return xScale(d[0]);
    //    })
    //    .attr("cy", function(d) {
    //       return yScale(d[1]);
    //    })
    //    .attr("r", function(d) {
    //       return rScale(d[1]);
    //    });

    // //Create labels
    // svg.selectAll("text")
    //    .data(dataset)
    //    .enter()
    //    .append("text")
    //    .text(function(d) {
    //       return d[0] + "," + d[1];
    //    })
    //    .attr("x", function(d) {
    //       return xScale(d[0]);
    //    })
    //    .attr("y", function(d) {
    //       return yScale(d[1]);
    //    })
    //    .attr("font-family", "sans-serif")
    //    .attr("font-size", "11px")
    //    .attr("fill", "red");

    //Create X axis
    svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

    //Create Y axis
    svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);



})();