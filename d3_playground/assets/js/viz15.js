// self executing function here
(function() {
   // your page initialization code here
   // the DOM will be available here


   /* DATA
   **************************************************************/
   var OGdata = {
      "BranchKey": "99bfc1bb-0486-4c96-a5b8-6073bf7386c8",
      "BranchName": "My Branch",
      "IssuesTable": [
        {
          "IssueType": "Data Quality",
          "BranchTimespan": "1.00:12:00",
          "BranchHours": "24 hrs",
          "PortfolioAvgTimespan": "1.09:14:00",
          "PoftolioAverage": "33 hrs"
        },
        {
          "IssueType": "Lighting",
          "BranchTimespan": "04:01:03",
          "BranchHours": "4 hrs",
          "PortfolioAvgTimespan": "1.19:01:00",
          "PoftolioAverage": "43 hrs"
        },
        {
          "IssueType": "Heating",
          "BranchTimespan": "2.06:43:00",
          "BranchHours": "54 hrs",
          "PortfolioAvgTimespan": "23:05:00",
          "PoftolioAverage": "23 hrs"
        },
        {
          "IssueType": "Cooling",
          "BranchTimespan": "1.00:32:00",
          "BranchHours": "24 hrs",
          "PortfolioAvgTimespan": "5.13:54:00",
          "PoftolioAverage": "133 hrs"
        }
      ],
      "IssuesChart": [
        {
          "DataPoints": [
            {
              "Timestamp": "2016-06-30T23:57:45.6497658Z",
              "UnixTimestamp": 1467331065,
              "Value": 3
            },
            {
              "Timestamp": "2016-07-30T23:57:45.6497658Z",
              "UnixTimestamp": 1469923065,
              "Value": 4
            },
            {
              "Timestamp": "2016-08-30T23:57:45.6497658Z",
              "UnixTimestamp": 1472601465,
              "Value": 1
            },
            {
              "Timestamp": "2016-09-30T23:57:45.6497658Z",
              "UnixTimestamp": 1475279865,
              "Value": 1
            },
            {
              "Timestamp": "2016-10-30T23:57:45.6497658Z",
              "UnixTimestamp": 1477871865,
              "Value": 0
            },
            {
              "Timestamp": "2016-11-30T23:57:45.6497658Z",
              "UnixTimestamp": 1480550265,
              "Value": 2
            }
          ],
          "IssueType": "Data Quality"
        },
        {
          "DataPoints": [
            {
              "Timestamp": "2016-06-30T23:57:45.6502664Z",
              "UnixTimestamp": 1467331065,
              "Value": 10
            },
            {
              "Timestamp": "2016-07-30T23:57:45.6502664Z",
              "UnixTimestamp": 1469923065,
              "Value": 9
            },
            {
              "Timestamp": "2016-08-30T23:57:45.6502664Z",
              "UnixTimestamp": 1472601465,
              "Value": 11
            },
            {
              "Timestamp": "2016-09-30T23:57:45.6502664Z",
              "UnixTimestamp": 1475279865,
              "Value": 17
            },
            {
              "Timestamp": "2016-10-30T23:57:45.6502664Z",
              "UnixTimestamp": 1477871865,
              "Value": 7
            },
            {
              "Timestamp": "2016-11-30T23:57:45.6502664Z",
              "UnixTimestamp": 1480550265,
              "Value": 3
            }
          ],
          "IssueType": "Lighting"
        },
        {
          "DataPoints": [
            {
              "Timestamp": "2016-06-30T23:57:45.6502664Z",
              "UnixTimestamp": 1467331065,
              "Value": 7
            },
            {
              "Timestamp": "2016-07-30T23:57:45.6502664Z",
              "UnixTimestamp": 1469923065,
              "Value": 8
            },
            {
              "Timestamp": "2016-08-30T23:57:45.6502664Z",
              "UnixTimestamp": 1472601465,
              "Value": 5
            },
            {
              "Timestamp": "2016-09-30T23:57:45.6502664Z",
              "UnixTimestamp": 1475279865,
              "Value": 0
            },
            {
              "Timestamp": "2016-10-30T23:57:45.6502664Z",
              "UnixTimestamp": 1477871865,
              "Value": 0
            },
            {
              "Timestamp": "2016-11-30T23:57:45.6502664Z",
              "UnixTimestamp": 1480550265,
              "Value": 1
            }
          ],
          "IssueType": "Heating"
        },
        {
          "DataPoints": [
            {
              "Timestamp": "2016-06-30T23:57:45.6502664Z",
              "UnixTimestamp": 1467331065,
              "Value": 0
            },
            {
              "Timestamp": "2016-07-30T23:57:45.6502664Z",
              "UnixTimestamp": 1469923065,
              "Value": 0
            },
            {
              "Timestamp": "2016-08-30T23:57:45.6502664Z",
              "UnixTimestamp": 1472601465,
              "Value": 1
            },
            {
              "Timestamp": "2016-09-30T23:57:45.6502664Z",
              "UnixTimestamp": 1475279865,
              "Value": 4
            },
            {
              "Timestamp": "2016-10-30T23:57:45.6502664Z",
              "UnixTimestamp": 1477871865,
              "Value": 3
            },
            {
              "Timestamp": "2016-11-30T23:57:45.6502664Z",
              "UnixTimestamp": 1480550265,
              "Value": 1
            }
          ],
          "IssueType": "Cooling"
        }
      ]
    };

   /* DATA AUGMENTATION
   **************************************************************/

    var layers, samples;
        layers = OGdata.IssuesChart.length;
        rows = OGdata.IssuesChart[0].DataPoints.length;

    for (var i = 0; i < rows; i++) {
      var stackMark = 0;

      // console.log(i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i);
      // console.log(OGdata.IssuesChart[0].DataPoints[i]);
      // console.log(OGdata.IssuesChart[1].DataPoints[i]);
      // console.log(OGdata.IssuesChart[2].DataPoints[i]);
      // console.log(OGdata.IssuesChart[3].DataPoints[i]);
      // console.log(i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i);

      // console.log(OGdata.IssuesChart[0].DataPoints[i].Value);
      OGdata.IssuesChart[0].DataPoints[i].x = i;
      OGdata.IssuesChart[0].DataPoints[i].y = OGdata.IssuesChart[0].DataPoints[i].Value;
      OGdata.IssuesChart[0].DataPoints[i].y0 = stackMark;

      stackMark += OGdata.IssuesChart[0].DataPoints[i].Value;

      // console.log(OGdata.IssuesChart[1].DataPoints[i].Value);
      OGdata.IssuesChart[1].DataPoints[i].x = i;
      OGdata.IssuesChart[1].DataPoints[i].y = OGdata.IssuesChart[1].DataPoints[i].Value;
      OGdata.IssuesChart[1].DataPoints[i].y0 = stackMark;

      stackMark += OGdata.IssuesChart[1].DataPoints[i].Value;

      // console.log(OGdata.IssuesChart[2].DataPoints[i].Value);
      OGdata.IssuesChart[2].DataPoints[i].x = i;
      OGdata.IssuesChart[2].DataPoints[i].y = OGdata.IssuesChart[2].DataPoints[i].Value;
      OGdata.IssuesChart[2].DataPoints[i].y0 = stackMark;

      stackMark += OGdata.IssuesChart[2].DataPoints[i].Value;

      // console.log(OGdata.IssuesChart[3].DataPoints[i].Value);
      OGdata.IssuesChart[3].DataPoints[i].x = i;
      OGdata.IssuesChart[3].DataPoints[i].y = OGdata.IssuesChart[3].DataPoints[i].Value;
      OGdata.IssuesChart[3].DataPoints[i].y0 = stackMark;


      // console.log(i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i +"+"+i);
    }


    var mock = [
      OGdata.IssuesChart[0].DataPoints,
      OGdata.IssuesChart[1].DataPoints,
      OGdata.IssuesChart[2].DataPoints,
      OGdata.IssuesChart[3].DataPoints
    ]


    /* Vars
    **************************************************************/
    var n, m, data, color, margin, width, height, mx, my, mz, x, xd, y0, y1, y2, wrap, svg, layer, bar;
        n = 4;
        m = mock[0].length;
        data = d3.layout.stack()(mock);
        color = d3.interpolateRgb("#58cfe9", "#9b9cd5");

        margin = 20;
        width = 500;
        height = 500 - .5 - margin;

        mx = m;
        my = d3.max(data, function(d) { return d3.max(d, function(d) { return d.y0 + d.y; }); });
        mz = d3.max(data, function(d) { return d3.max(d, function(d) { return d.y; }); });
        x = function(d) { return d.x * width / mx; };
        xd = function(d) { var ts = new Date(d.Timestamp); return ts.getMonth().toString()+"/"+ts.getFullYear().toString().slice(2)};
        y0 = function(d) { return height - d.y0 * height / my; };
        y1 = function(d) { return height - (d.y + d.y0) * height / my; };
        y2 = function(d) { return d.y * height / mz; }; // or `my` to not rescale

    /* D3
    **************************************************************/
    wrap = d3.select("#viz15")
            .attr("style", "max-width:"+width+"px;max-height:"+ (height + margin) +"px;")
            .append("div")
            .classed("svg-container", true); //container class to make it responsive

    svg = wrap.append("svg")
            // .attr("style", "border: 1px solid red")
            //responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 600 600")
            //class to make it responsive
            .classed("svg-content-responsive", true);

    layer = svg.selectAll("#viz15 .layer")
        .data(data)
      .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i / (n - 1)); });

    bar = layer.selectAll("#viz15 .bar")
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

    svg.selectAll("#viz15 .label")
        .data(data[0])
      .enter().append("text")
        .attr("class", "label")
        .attr("x", x)
        .attr("y", height + 6)
        .attr("dx", x({x: .45}))
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text(function(d, i) { return xd(d); });

    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width - x({x: .1}))
        .attr("y1", height)
        .attr("y2", height);

    d3.selectAll("#viz15 input").on("change", function change() {
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    });

    function transitionGrouped() {
      d3.selectAll("#viz15 .layer rect").transition()
          .duration(500)
          .delay(function(d, i) { return (i % m) * 10; })
          .attr("x", function(d, i) { return x({x: .9 * Math.floor(i / m) / n}); })
          .attr("width", x({x: .9 / n}))
        .transition()
          .attr("y", function(d) { return height - y2(d); })
          .attr("height", y2);
    }

    function transitionStacked() {
      d3.selectAll("#viz15 .layer rect").transition()
          .duration(500)
          .delay(function(d, i) { return (i % m) * 10; })
          .attr("y", y1)
          .attr("height", function(d) { return y0(d) - y1(d); })
        .transition()
          .attr("x", 0)
          .attr("width", x({x: .9}));
    }

})();
