var margin = { top: 50, right: 0, bottom: 100, left: 120 },
	width = 1300 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom,
	gridSize = Math.floor(width / 10),
	legendElementWidth = gridSize*2,
	buckets = 10,
	// colors = ["red","blue","green","yellow"],
	colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
	desc = ["Ultra Nerd", "Technically Savvy", "Average User", "Luddite","nan"],
	parameters = ["Price", "Features", "Reliability", "User Reviews", "Convenience", "Expert Recomm.", "Privacy", "Security", "Safety", "Friend/Family Recomm."];
	dataset = "viz1.json";

	var svg = d3.select("#heatmap").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var descLabels = svg.selectAll(".descLabel")
	.data(desc)
	.enter().append("text")
	.text(function (d) { return d; })
	.attr("x", 0)
	.attr("y", function (d, i) { return i * gridSize; })
	.style("text-anchor", "end")
	.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
	.attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); })
	;

var paramLabels = svg.selectAll(".paramLabel")
	.data(parameters)
	.enter()
	.append("text")
	.text(function(d) { return d; })
	// .call(wrap, 4)
	.attr("x", function(d, i) { return i * gridSize; })
	.attr("y", 0)
	.style("text-anchor", "middle")
	.attr("transform", "translate(" + gridSize / 2 + ", -5)")
	.attr("class", function(d, i) { return ((i >= 0 && i <= 9) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); })
	;

function heatmapChart(dataFile) {
	d3.json(dataFile,
	// 	function(d) {
	// 		// console.log(d);
	// 		return {
	// 		desc: d.nerd,
	// 		params: d.params,
	// 		score: d.score
	// 	};
	// },
	function(data) {
		// console.log("params");
		var colorScale = d3.scaleQuantile()
		.domain([0, buckets - 1, d3.max(data, function (d) { return d.score; })])
		.range(colors);
		console.log(colorScale);
		var cards = svg.selectAll("rect")
		.data(data, function(d) {return d.nerd+':'+d.params;});

		cards.append("title");
		console.log("params");
		cards.enter().append("rect")
		.attr("x", function(d) {
				return parameters.indexOf(d.params)*gridSize;
			})
		.attr("y", function(d) { return (desc.indexOf(d.nerd))*gridSize; })
		.attr("rx", 4)
		.attr("ry", 4)
		.attr("class", "hour bordered")
		.attr("width", gridSize)
		.attr("height", gridSize)
		.style("fill", colors[5]);

		cards.transition().duration(1000)
		.style("fill", function(d) { return colorScale(d.score); });

		cards.select("title").text(function(d) { return d.score; });

		cards.exit().remove();
	});
};


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}

heatmapChart(dataset);
