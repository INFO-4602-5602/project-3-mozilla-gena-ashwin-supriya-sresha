// Set tooltips
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([100, 0])
  .html(function(d) {
    return "<strong>Score: </strong><span class='details'>" + d.score + "</span>";
  })

var margin = {top: 50, right: 0, bottom: 100, left: 120},
  width = 1300 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom,
  gridSize = Math.floor(width / 10),
  legendElementWidth = gridSize * 2,
  buckets = 10,
	desc = ["Ultra Nerd", "Technically Savvy", "Average User", "Luddite", "nan"],
  parameters = ["Price", "Features", "Reliability", "User Reviews", "Convenience", "Expert Recomm.", "Privacy", "Security", "Safety", "Friend/Family Recomm."];
  // colors = ["orange","green","red","blue","yellow"],
  colors = ["#48A36D", "#56AE7C", "#64B98C", "#72C39B", "#80CEAA", "#80CCB3", "#7FC9BD", "#7FC7C6", "#7EC4CF", "#7FBBCF", "#7FB1CF", "#80A8CE", "#809ECE", "#8897CE", "#8F90CD", "#9788CD", "#9E81CC", "#AA81C5", "#B681BE", "#C280B7", "#CE80B0", "#D3779F", "#D76D8F", "#DC647E", "#E05A6D", "#E16167", "#E26962", "#E2705C", "#E37756", "#E38457", "#E39158", "#E29D58", "#E2AA59", "#E0B15B", "#DFB95C", "#DDC05E", "#DBC75F", "#E3CF6D", "#EAD67C", "#F2DE8A"],
	colors1 = ["#1d91c0","#225ea8","#253494","#081d58"],
	colors2 = ["#edf8b1","#FFEE58","#F9A825","#FF9800", "#EF6C00"],
	colors3 = ["#8897CE", "#9788CD","#AA81C5", "#CE80B0"],
	colors4 = ["#deebf7", "#9ecae1","#7FBBCF"],
	colors5 = ["#E57373", "#EF5350","#C62828"],
  dataset = "viz1.json";

var svg = d3.select("#heatmap").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var descLabels = svg.selectAll(".descLabel")
  .data(desc)
  .enter().append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", 0)
  .attr("y", function(d, i) {
    return i * gridSize;
  })
  .style("text-anchor", "end")
  .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
  .attr("class", function(d, i) {
    return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
  })
	;

var paramLabels = svg.selectAll(".paramLabel")
  .data(parameters)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  // .call(wrap, 4)
  .attr("x", function(d, i) {
    return i * gridSize;
  })
  .attr("y", 0)
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + gridSize / 2 + ", -5)")
  .attr("class", function(d, i) {
    return ((i >= 0 && i <= 9) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
  });

svg.call(tip);

function heatmapChart(dataFile) {
  d3.json(dataFile,
    function(error, data) {
			var extent = d3.extent(data, function(d) {return d.score});
			var max = extent[1];
			var min = extent[0];
			var mid = ( max + min ) / 2;
			var colorScale1 = d3.scaleQuantile()
				.domain([0, mid,
					// (d3.min(data, function(d) {return d.score;}) + d3.max(data, function(d) {return d.score;}))/2,
					 d3.max(data, function(d) {return d.score;})
				])
				.range(colors1);
			var colorScale2 = d3.scaleQuantile()
			.domain([0, mid,
				 d3.max(data, function(d) {
				return d.score;})
			])
				.range(colors2);
			var colorScale3 = d3.scaleQuantile()
			.domain([0, mid,
				 d3.max(data, function(d) {
				return d.score;})
			])
				.range(colors3);
			var colorScale4 = d3.scaleQuantile()
			.domain([0, mid,
				 d3.max(data, function(d) {
				return d.score;})
			])
				.range(colors4);
			var colorScale5 = d3.scaleQuantile()
			.domain([0, mid,
				 d3.max(data, function(d) {
				return d.score;})
			])
				.range(colors5);

      var boxes = svg.selectAll("rect")
        .data(data, function(d) {
          return d.nerd + ':' + d.params;
        });
      boxes.enter().append("rect")
        .attr("x", function(d) {
          return parameters.indexOf(d.params) * gridSize;
        })
        .attr("y", function(d) {
          return (desc.indexOf(d.nerd)) * gridSize;
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "params bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", function(d) {
          // return colorScale(d.score);
						var descNum = desc.indexOf(d.nerd)
						if (descNum == "0") return  colorScale1(d.score);
						else if (descNum == "1") return  colorScale2(d.score);
						else if (descNum == "2") return  colorScale3(d.score);
						else if (descNum == "3") return  colorScale4(d.score);
						else if (descNum == "4") return  colorScale5(d.score);
						// else return colors;
        })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "white")
        .style('stroke-width', 0.3)
        .on('mouseover', function(d) {
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke", "white")
            .style("stroke-width", 3);
        })
        .on('mouseout', function(d) {
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style("stroke-width", 0.3);
        });
    });
};
heatmapChart(dataset);

// function chooseColor(d) {
// 	var descNum = desc.indexOf(d.nerd)
// 	if (descNum == "0") return colors1;
// 	else if (descNum == "1") return colors2;
// 	else if (descNum == "2") return colors3;
// 	else if (descNum == "3") return colors4;
// 	else if (descNum == "4") return colors5;
// 	// else return colors;
// }
