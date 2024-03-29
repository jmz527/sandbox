// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

  var canvas = d3.select("#viz8").append("svg")
        .attr("width", 600)
        .attr("height", 600);

  var data = [10, 50, 80];

  var group = canvas.append("g")
        .attr("transform", "translate(300, 300)");

  var r = 300;
  var color = d3.scale.ordinal()
        .range(["red", "blue", "orange"]);
  // var p = Math.PI * 2;

  var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(r);

  var pie = d3.layout.pie()
        .value(function(d) { return d; });

  var arcs = group.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs.append("path")
          .attr("d", arc)
          .attr("fill", function(d) { return color(d.data); });

      arcs.append("text")
          .attr("transform", function(d) { return "translate("+arc.centroid(d)+")"})
          .attr("text-anchor", "middle")
          .attr("font-size", "1.5em")
          .text(function(d) { return d.data });

})();
