var margin = { top: 50, right: 0, bottom: 100, left: 30 },
	width = 960 - margin.left - margin.right,
	height = 430 - margin.top - margin.bottom,
	gridSize = Math.floor(width / 24),
	legendElementWidth = gridSize*2,
	buckets = 9,
	colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
	description = ["Ultra Nerd", "Technically Savvy", "Average User", "Luddite"],
	parameters = ["Price", "Features", "Reliability", "User Reviews", "Convenience", "Expert Recommendation", "Privacy", "Security", "Safety", "Friend or Family Recommendation"];
	dataset = "viz1.json";

	var svg = d3.select("#heatmap").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
