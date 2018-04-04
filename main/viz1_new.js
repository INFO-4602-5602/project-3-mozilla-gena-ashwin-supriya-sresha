// Set tooltips
var tip1 = d3.tip()
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

svg.call(tip1);

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
        .on("click",function(d){

          var descNum = desc.indexOf(d.nerd)
          if (descNum == "0") scale =  colorScale1;
          else if (descNum == "1") scale= colorScale2;
          else if (descNum == "2") scale= colorScale3;
          else if (descNum == "3") scale= colorScale4;
          else if (descNum == "4") scale= colorScale5;
          ready(d.nerd,d.params,scale)
        })
        .on('mouseover', function(d) {
          tip1.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke", "white")
            .style("stroke-width", 3);
        })
        .on('mouseout', function(d) {
          tip1.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style("stroke-width", 0.3);
        });
    });
};
heatmapChart(dataset);



var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([100, 0])
  .html(function(d) {
    return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Score: </strong><span class='details'>" + format(d.population) + "</span>";
  })

var margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  width = 1260 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;



var color = d3.scaleThreshold()
  .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
  .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

var path = d3.geoPath();

var svg1 = d3.select("#plot2")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append('g')
  .attr('class', 'map');

var projection = d3.geoMercator()
  .scale(130)
  .translate([width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg1.call(tip);


function ready(nerdLevel="Technically Savvy",param="User Reviews",colorScale) {

  d3.json('world_countries.json', function(error, data) {
    d3.csv('viz2.csv', function(error, population) {

  var populationById = {};

  population.forEach(function(d) {
    if (d.nerd == nerdLevel && d.params == param) populationById[d.country] = d.score;
  });
  data.features.forEach(function(d) {
    d.population = +populationById[d.properties.name]
  });

  var colors = ["#deebf7", "#9ecae1","#3182bd"];


  var extent = d3.extent(data.features, function(d) { return d.population; });
  var max = extent[1];
  var min = extent[0];
  var mid = ( max + min ) / 2;

  console.log("extent" + extent);
  var max = d3.max(data.features, function(d) {
    return d.population;
  });
  console.log(max);

  // var buckets = 10;
  // var colorScale = d3.scaleLinear()
  //   .domain([0,mid,max])
  //   .range(colors);
  //
  // // colorScale = d3.scaleOrdinal(d3.schemePastel1);
  //
  // console.log(colorScale(3830));

  svg1.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .text("hi")
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      return colorScale(d.population);
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

  svg1.append("path")
    .datum(topojson.mesh(data.features, function(a, b) {
      return a.id !== b.id;
    }))
    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path);

     });
       });
}

// ready();
