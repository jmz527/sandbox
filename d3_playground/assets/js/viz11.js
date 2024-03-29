// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

  var width = 960,
      height = 700,
      radius = Math.min(width, height) / 2;

  var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
      .range([0, radius]);

  var color = d3.scale.category20c();

  var svg = d3.select("#viz11").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  var partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 1; });

  var arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var node; // Keep track of the node that is currently being displayed as the root.

  d3.json("/assets/data/space.json", function(error, root) {

    var legend = svg.selectAll("rect")
          .data(root)
          .enter()
          .append("rect")
          .attr("width", 30)
          .attr("height", 30)
          .attr("class", "legend")
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); });

    node = root;
    var path = svg.datum(root).selectAll("path")
        .data(partition.nodes)
      .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on("click", click)
        .each(stash);

    d3.selectAll("input").on("change", function change() {
      var value = this.value === "count"
          ? function() { return 1; }
          : function(d) { return d.size; };

      path
        .data(partition.value(value).nodes)
        .transition()
        .duration(1000)
        .attrTween("d", arcTweenData);

    });

    function click(d) {
      node = d;
      path.transition()
        .duration(1000)
        .attrTween("d", arcTweenZoom(d));
    }

  });

  d3.select(self.frameElement).style("height", height + "px");

  // Setup for switching data: stash the old values for transition.
  function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
  }

  // When switching data: interpolate the arcs in data space.
  function arcTweenData(a, i) {
    var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    function tween(t) {
      var b = oi(t);
      a.x0 = b.x;
      a.dx0 = b.dx;
      return arc(b);
    }

    if (i == 0) {
     // If we are on the first arc, adjust the x domain to match the root node
     // at the current zoom level. (We only need to do this once.)
      var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
      return function(t) {
        x.domain(xd(t));
        return tween(t);
      };

    } else {
      return tween;
    }
  }

  // When zooming: interpolate the scales.
  function arcTweenZoom(d) {
    var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
    return function(d, i) {
      return i
          ? function(t) { return arc(d); }
          : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }

})();
