// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here

   // Sunburst dimensions
   var width = 750;
   var height = 600;
   var radius = Math.min(width, height) / 2;

   // Breadcrumb dimensions
   var bread = {
    w: 75, h: 30, s: 3, t: 10
   };

   // Color map
   var colors = {
    "home": "#5687d1",
    "product": "#7b615c",
    "search": "#de783b",
    "account": "#6ab975",
    "other": "#a173d1",
    "end": "#bbbbbb"
  };

  var totalSize = 0;

  var vis = d3.select("#viz18").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("id", "container")
        .attr("transform", "translate("+ width / 2 +","+ height / 2 +")")

  var partition = d3.layout.partition()
        .size([2 * Math.PI, radius * radius])
        .value(function(d) { return d.size });

  var arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y); })
        .outerRadius(function(d) { return Math.sqrt(d.y * d.dy); });

  // d3.text and d3.parseRows so we don't need a header row
  d3.text("/assets/data/visit-sequences.csv", function(text) {
    var csv = d3.csv.parseRows(text);
    var json = buildHierarchy(csv);
    createVisualization(json);
  });

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initBreadcrumbTrail();

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

  // Fade all but the current sequence, and show it in the breadcrumb trail.
  function mouseover(d) {
    console.log("mouseover");

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  var sequenceArray = getAncestors(d);
  updateBread(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);


  }

  // Restore everything to full opacity when moving off the visualization.
  function mouseleave(d) {
    console.log("mouseleave");


  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");

  }

  // Return array of all ancestor nodes, excluding root
  function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  function initBreadcrumbTrail() {
    // Add svg area
    var trail = d3.select("#sequence").append("svg:svg")
          .attr("width", width)
          .attr("height", 50)
          .attr("id", "trail");
    // Add end label
    trail.append("svg:text")
          .attr("id", "endlabel")
          .style("fill", "#000");
  }

  // Generate string describing points of breadcrumb polygon
  function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w + ",0");
    points.push(b.w + b.t + "," + (b.h / 2));
    points.push(b.w + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost crumb - don't include 6th vertex
      points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
  }

  // Update breadcrumb trail
  function updateBread(nodeArr, precentageStr) {

    //Data join
    var g = d3.select("#trail")
    .selectAll("g")
    .data(nodeArr, function(d) { return d.name + d.depth; });

    // Add breadcrumb and label
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) { return colors[d.name]; });

    entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) {return d.name; });

    // Set position for entering and updating nodes
    g.attr("transform", function(d, i) {
      return "translate("+ i * (b.w +b.s) +", 0)";
    })

    // Remove exiting nodes.
    g.exit().remove();

    // Update percentage at the end
    d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArr.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(precentageStr);

    // Make breadcrumb trail visible
    d3.select("#trail")
        .style("visibility", "");
  }

  // Transform CSV into hierarchical structure suitable for partition layout.
  function buildHierarchy(csv) {
    var root = {"name": "root", "children": []};
    for (var i = 0; i < csv.length; i++) {
      var sequence = csv[i][0];
      var size = +csv[i][1];
      if(isNaN(size)) { // if header row
        continue;
      }
      var parts = sequence.split("-");
      var currentNode = root;
      for (var j = 0; j < parts.length; j++) {
        var children = currentNode["children"];
        var nodeName = parts[j];
        var childNode;

        if (j + 1 < parts.length) { // Not yet at the end
          var foundChild = false;
          for (var k = 0; k < children.length; k++) {
            if (children[k]["name"] == nodeName) {
              childNode = children[k];
              foundChild = true;
              break;
            }
          }

          if (!foundChild) { // If we don't already have it, create child node
            childNode = {"name": nodeName, "children": []};
            children.push(childNode);
          }
          currentNode = childNode;

        } else { // Reached the end
          childNode = {"name": nodeName, "size": size};
          children.push(childNode);
        }
      }
    }
    return root;
  }

})();
