var margin = { top: 50, right: 0, bottom: 100, left: 120 },
	width = 1300 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom,
	gridSize = Math.floor(width / 10),
	legendElementWidth = gridSize*2,
	buckets = 10,
	// colors = ["red","blue","green","yellow"],
	colors = ["#48A36D",  "#56AE7C",  "#64B98C", "#72C39B", "#80CEAA", "#80CCB3", "#7FC9BD", "#7FC7C6", "#7EC4CF", "#7FBBCF", "#7FB1CF", "#80A8CE", "#809ECE", "#8897CE", "#8F90CD", "#9788CD", "#9E81CC", "#AA81C5", "#B681BE", "#C280B7", "#CE80B0", "#D3779F", "#D76D8F", "#DC647E", "#E05A6D", "#E16167", "#E26962", "#E2705C", "#E37756", "#E38457", "#E39158", "#E29D58", "#E2AA59", "#E0B15B", "#DFB95C", "#DDC05E", "#DBC75F", "#E3CF6D", "#EAD67C", "#F2DE8A"],
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
	function(error, data) {
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
		.attr("class", "params bordered")
		.attr("width", gridSize)
		.attr("height", gridSize)
		.style("fill", function(d) { return colorScale(d.score); });

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
