// Set tooltips
var tip41 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-7, 0])
  .html(function(d) {
    return "<strong>Count: </strong><span class='details'>" + d.Count + "</span>";
  })

var nerdiness = ["","Ultra Nerd", "Technically Savvy","Average User","Luddite","Undescribed", ""]

function lineGraph(){
// set the dimensions and margins of the graph
var margin = {top: 50, right: 20, bottom: 50, left: 70};
var width = 700 - margin.left - margin.right
var height = 450 - margin.top - margin.bottom;
var gridsize = width/6;
// set the ranges
var x = d3.scaleLinear().range([0, width]).domain([0, 6, 12]);
var y = d3.scaleLinear().range([height, 0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg4 = d3.select("#line").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+margin.left + "," + margin.top + ")");
svg4.call(tip41);
// // Get the data
d3.csv("viz4-line.csv", function(error, data){
  if (error) throw error;
  // console.log("max count"+ d3.max(data, function(d) {return +d.Count;}));
  y.domain([0, d3.max(data, function(d) {return +d.Count;})]);
  var line_values = d3.line()
            .x(function(d){return nerdiness.indexOf(d.NerdLevel)*gridsize;})
            .y(function(d){return y(d.Count);})
            //.curve(d3.curveLinear);
  var xAxis4 = d3.axisBottom(x).tickFormat(function(d, i) {
                  return nerdiness[i];
                });

svg4.append("path")
  .datum(data)
  .attr("class","line")
  .attr("stroke","#d83333")
  .attr("fill","none")
  .attr("stroke-width","2px")
  .attr("d",line_values);


  // Add the scatterplot points
  svg4.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
			.attr("fill","#800000")
      .attr("r", 5)
      .attr("cx", function(d){return nerdiness.indexOf(d.NerdLevel)*gridsize;})
      .attr("cy", function(d){return y(d.Count);})
			.on("click", function(d){
				document.getElementById("bar").innerHTML = "";
				document.getElementById("header1").innerHTML = "";
				return barChart(d.NerdLevel);})
			.on('mouseover', function(d) {
				tip41.show(d);

				d3.select(this)
					.style("opacity", 1)
					.style("stroke", "white")
					.style("stroke-width", 3);
			})
			.on('mouseout', function(d) {
				tip41.hide(d);

				d3.select(this)
					.style("opacity", 0.8)
					.style("stroke", "white")
					.style("stroke-width", 0.3);
			});


  // Add the X Axis
  svg4.append("g")
    .attr("transform","translate(0, " + height +")")
    .call(xAxis4);

  // Add the Y Axis
  svg4.append("g")
    .call(d3.axisLeft(y));

  //Add text labels
    var xLabel = svg4.append("text")
                    .attr("class", "label")
                    .text("Nerdiness")
                    .attr("x", width - 350)
                    .attr("y", height +40);

    var yLabel = svg4.append("text")
                    .attr("class", "label")
                    .text("Count")
                    .attr("x", -205)
                    .attr("y", -50)
                    .attr("transform", "rotate(-90)")
                    .style("text-anchor", "start");

 });
}

lineGraph();

var tip42 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-5, 0])
  .html(function(d) {
    return "<strong>Count: </strong><span class='details'>" + d.trustCount + "</span>";
  })
//Create a new array to store json file
var barChartData = []

var trustFactor = ["","Creators","","Friends/Family","","Govt","","Media","","Non-Profit Org.","","Unsure","","Unanswered",""];
var blank = ["","","","","","","",""];

// set the dimensions and margins of the graph
var margin = {top: 50, right: 20, bottom: 50, left: 100};
var width = 700 - margin.left - margin.right
var height = 450 - margin.top - margin.bottom;
var barPadding = 10;
var nerdGroup = "Luddite"

function nerdSelection(nerdGroup){
  var description = [];
    for (x in barChartData){
      if (barChartData[x].nerdLevel == nerdGroup) {
        description.push(barChartData[x]);
      }
    }
    return description;
}

function barChart(nerdlevel){
var firstBarChartData = nerdSelection(nerdlevel);

// set the ranges
var xScale = d3.scaleLinear()
.domain([0,7,firstBarChartData.length])
.range([0, width]);

var xScale2 = d3.scaleLinear()
.domain([0,7,firstBarChartData.length])
.range([0, width]);

var yScale = d3.scaleLinear()
.domain([0, d3.max(firstBarChartData, function(d) {
  return d.trustCount;
})])
.range([height, 0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var barsvg = d3.select("#bar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+margin.left + "," + margin.top + ")");
barsvg.call(tip42);
barsvg.selectAll("bar")
    .data(firstBarChartData)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        // console.log(xScale(i));
        // console.log(barPadding+xScale(i));
        return (barPadding + xScale(i));
    })
    .attr("width", (width / firstBarChartData.length - 20))
    .attr("y",function(d) {
        return yScale(d.trustCount);
    })
    .attr("height", function(d){
        return height - yScale(d.trustCount);
      })
      // .style("stroke","black")
      .style("fill", "#b2d8b2")
			.on('mouseover', function(d) {
				tip42.show(d);

				d3.select(this)
					.style("opacity", 1)
					.style("stroke", "white")
					.style("stroke-width", 3);
			})
			.on('mouseout', function(d) {
				tip42.hide(d);

				d3.select(this)
					.style("opacity", 0.8)
					.style("stroke", "white")
					.style("stroke-width", 0.3);
			});

      var xAxis42 = d3.axisBottom(xScale2).tickFormat(function(d, i) {
                      return trustFactor[i];
                    });
      // Add the X Axis
      barsvg.append("g")
        .attr("transform","translate(0, " + height +")")
        .call(xAxis42);

      // Add the Y Axis
      barsvg.append("g")
        .call(d3.axisLeft(yScale));
    //Add the test header
		//
		var hsvg1 = d3.select("#header1")
			.append("svg")
			.attr("width", 1260)
			.attr("height", 20)
			.append('g');
		hsvg1.append("text")
				.attr("x",300)
				.attr("y", 10)
				.attr("class", "title")
				.attr("text-anchor", "start")
				.style("font-size", "16px")
				.attr("font-weight", "bold")
				.text("Fear of privacy loss");
		hsvg1.append("text")
				.attr("x",1060)
				.attr("y", 10)
				.attr("class", "title")
				.attr("text-anchor", "start")
				.style("font-size", "16px")
				.attr("font-weight", "bold")
				.text("Nerd level: " + nerdlevel + " ");
      //Add text labels
        var xLabel = barsvg.append("text")
                        .attr("class", "label")
                        .text("Trust Factor")
                        .attr("x", width - 350)
                        .attr("y", height +40);

      // var Xlabel = barsvg.selectAll("text.xAxis")
      //              .data(firstBarChartData)
      //              .enter()
      //              .append("text")
      //              .text(function(d){return d.trust;})
      //              .style("anchor","end")
      //              .attr("y",height+20)
      //              .attr("x", function(d,i){
      //                return (i * (width/firstBarChartData.length)) + ((width/firstBarChartData.length - (barPadding*15)) /2);
      //              });


        var yLabel = barsvg.append("text")
                        .attr("class", "label")
                        .text("Count")
                        .attr("x", -200)
                        .attr("y", -50)
                        .attr("transform", "rotate(-90)")
                        .style("text-anchor", "start");
  }

d3.json('viz4-bar.json', function(error, data) {
  d3.select("#bar")
    .data(data.filter(function(d) {
      barChartData.push({
          nerdLevel: d.nerdLevel,
          trust: d.trust,
          trustCount: d.trustCount
      });
    }));
    barChart(nerdGroup);
});
