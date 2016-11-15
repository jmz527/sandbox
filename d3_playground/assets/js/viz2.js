// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

    //Variables
    var w, h, dataset, xScale, yScale, xAxis, yAxis, svg, xPosition, yPosition;

    //Width and height
    w = 600;
    h = 250;

    d3.csv("./assets/data/bills.csv", function(error, data) {
      if (error) throw error;

      console.log('data', data);

      dataset = data.map(function(d) {
        return d.Electricity;
      });

      console.log('dataset', dataset);

      xScale = d3.scale.ordinal()
                .domain(d3.range(data.length))
                .rangeRoundBands([0, w], 0.05);

      yScale = d3.scale.linear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);

      xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

      yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .innerTickSize(-w)
                .outerTickSize(0)
                .tickPadding(10)
                .tickFormat(d3.format(".2s"));

      //Create SVG element
      svg = d3.select("#viz2").append("svg")
              .attr("width", w)
              .attr("height", h);


      //Create bars
      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return xScale(i);
         })
         .attr("y", function(d) {
            return h - yScale(d);
         })
         .attr("width", xScale.rangeBand())
         .attr("height", function(d) {
            return yScale(d);
         })
         .attr("fill", '#58cfe9')
         .on("mouseover", function(d) {

          //Get this bar's x/y values, then augment for the tooltip
          xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
          yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

          //Update the tooltip position and value
          d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d);

            d3.select("#tooltip").classed("hidden", false); //Show the tooltip
         })
         .on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true); //Hide the tooltip
         });

      //Create labels
      svg.selectAll("text")
         .data(dataset)
         .enter()
         .append("text")
         .text(function(d) {
            return d;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
         })
         .attr("y", function(d) {
            return h - yScale(d) + 14;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "white");

    });


})();