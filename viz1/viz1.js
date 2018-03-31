var margin = { top: 50, right: 0, bottom: 100, left: 30 },
	width = 960 - margin.left - margin.right,
	height = 430 - margin.top - margin.bottom,
	gridSize = Math.floor(width / 10),
	legendElementWidth = gridSize*2,
	buckets = 10,
	// colors = ["red","blue","green","yellow"],
	colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
	description = ["Ultra Nerd", "Technically Savvy", "Average User", "Luddite"],
	parameters = ["Price", "Features", "Reliability", "User Reviews", "Convenience", "Expert Recommendation", "Privacy", "Security", "Safety", "Friend or Family Recommendation"];
	dataset = "viz1.json";

	var svg = d3.select("#heatmap").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var descLabels = svg.selectAll(".descLabel")
	.data(description)
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
	.enter().append("text")
	.text(function(d) { return d; })
	.attr("x", function(d, i) { return i * gridSize; })
	.attr("y", 0)
	.style("text-anchor", "middle")
	.attr("transform", "translate(" + gridSize / 2 + ", -6)")
	.attr("class", function(d, i) { return ((i >= 0 && i <= 9) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); })
	;

var heatmapChart = function(dataFile) {
	d3.json(dataFile,
		function(d) {
			console.log(d);
			return {
			desc: d.nerd,
			params: d.params,
			score: d.score
		};
	},
	function(data, error) {console.log("params"+data.params);
		var colorScale = d3.scale.quantile()
		.domain([0, buckets - 1, d3.max(data, function (d) { return d.score; })])
		.range(colors);

		var cards = svg.selectAll("rect")
		.data(data, function(d) {return d.desc+':'+d.params;});

		// cards.append("title");
console.log("params"+data.params);
		cards.enter().append("rect")
		.attr("x", function(d) { console.log("params"+d.params);return (d.params - 1) * gridSize; })
		.attr("y", function(d) { return (d.desc - 1) * gridSize; })
		.attr("rx", 4)
		.attr("ry", 4)
		.attr("class", "hour bordered")
		.attr("width", gridSize)
		.attr("height", gridSize)
		.style("fill", colors[4]);

		cards.transition().duration(1000)
		.style("fill", function(d) { return colorScale(d.value); });

		cards.select("title").text(function(d) { return d.value; });

		cards.exit().remove();
	});
};

heatmapChart(dataset);
