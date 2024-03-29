// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

  var n = 4, // number of layers
      m = 12, // number of samples per layer
      data = d3.layout.stack()(streamLayers(n, m, .1)),
      color = d3.interpolateRgb("#58cfe9", "#9b9cd5");

  var margin = 20,
      width = 500,
      height = 500 - .5 - margin;

  var mx = m,
      my = d3.max(data, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; }); }),
      mz = d3.max(data, function(d) { return d3.max(d, function(d) { return d.y; }); }),
      x = function(d) { return d.x * width / mx; },
      y0 = function(d) { return height - d.y0 * height / my; },
      y1 = function(d) { return height - (d.y + d.y0) * height / my; },
      y2 = function(d) { return d.y * height / mz; }; // or `my` to not rescale

  var svg13 = d3.select("#viz13").append("svg")
      .attr("width", width)
      .attr("height", height + margin);

  var layer = svg13.selectAll("#viz13 .layer")
      .data(data)
    .enter().append("g")
      .attr("class", "layer")
      .style("fill", function(d, i) { return color(i / (n - 1)); });

  var bar = layer.selectAll("#viz13 .bar")
      .data(function(d) { return d; })
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });

  bar.append("rect")
      .attr("width", x({x: .9}))
      .attr("x", 0)
      .attr("y", height)
      .attr("height", 0)
    .transition()
      .delay(function(d, i) { return i * 10; })
      .attr("y", y1)
      .attr("height", function(d) { return y0(d) - y1(d); });

  svg13.selectAll("#viz13 .label")
      .data(data[0])
    .enter().append("text")
      .attr("class", "label")
      .attr("x", x)
      .attr("y", height + 6)
      .attr("dx", x({x: .45}))
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text(function(d, i) { return i; });

  svg13.append("line")
      .attr("x1", 0)
      .attr("x2", width - x({x: .1}))
      .attr("y1", height)
      .attr("y2", height);

  d3.selectAll("#viz13 input").on("change", function change() {
    if (this.value === "grouped") transitionGrouped();
    else transitionStacked();
  });

  function transitionGrouped() {
    d3.selectAll("#viz13 .layer rect").transition()
        .duration(500)
        .delay(function(d, i) { return (i % m) * 10; })
        .attr("x", function(d, i) { return x({x: .9 * Math.floor(i / m) / n}); })
        .attr("width", x({x: .9 / n}))
      .transition()
        .attr("y", function(d) { return height - y2(d); })
        .attr("height", y2);
  }

  function transitionStacked() {
    d3.selectAll("#viz13 .layer rect").transition()
        .duration(500)
        .delay(function(d, i) { return (i % m) * 10; })
        .attr("y", y1)
        .attr("height", function(d) { return y0(d) - y1(d); })
      .transition()
        .attr("x", 0)
        .attr("width", x({x: .9}));
  }

  /* Inspired by Lee Byron's test data generator. */
  function streamLayers(n, m, o) {
    if (arguments.length < 3) o = 0;
    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < m; i++) {
        var w = (i / m - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }
    return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(streamIndex);
    });
  }

  function streamIndex(d, i) {
    return {x: i, y: Math.max(0, d)};
  }


})();
