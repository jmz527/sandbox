// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

   var canvas = d3.select("#viz9").append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("g")
          .attr("transform", "translate(50, 50)");

    var tree = d3.layout.tree()
        .size([400, 400]);

    d3.json("/assets/data/flare.json", function(data) {
      var nodes = tree.nodes(data);
      // console.log(nodes);
      var links = tree.links(nodes);
      // console.log(links);

      var node = canvas.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate("+d.y+","+d.x+")"; });

          node.append("circle")
            .attr("r", 5)
            .attr("fill", "steelblue");

          node.append("text")
            // .attr("transform", "translate(5, 3)")
            .text(function(d) { return d.name; });

          var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y, d.x]});

          canvas.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
              .attr("class", "link")
              .attr("fill", "none")
              .attr("stroke", "#333")
              .attr("d", diagonal);

    });


})();
