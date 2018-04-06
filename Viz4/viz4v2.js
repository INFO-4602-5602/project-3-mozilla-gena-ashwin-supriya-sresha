var nerdiness = ["","Ultra Nerd", "Technically Savvy","Average User","Luddite","Undescribed", ""]



function lineGraph(){
// set the dimensions and margins of the graph
var margin = {top: 50, right: 20, bottom: 30, left: 100};
var width = 760 - margin.left - margin.right
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
  .attr("stroke","#7fc1c2")
  .attr("fill","none")
  .attr("stroke-width","2px")
  .attr("d",line_values);


  // Add the scatterplot points
  svg4.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
			.attr("fill","#006a6c")
      .attr("r", 5)
      .attr("cx", function(d){return nerdiness.indexOf(d.NerdLevel)*gridsize;})
      .attr("cy", function(d){return y(d.Count);})
			.on("click", function(d){
				document.getElementById("bar").innerHTML = "";
				return barChart(d.NerdLevel);});


  // Add the X Axis
  svg4.append("g")
    .attr("transform","translate(0, " + height +")")
    .call(xAxis4);

  // Add the Y Axis
  svg4.append("g")
    .call(d3.axisLeft(y));
//
  //Add text labels
    var xLabel = svg4.append("text")
                    .attr("class", "label")
                    .text("Nerdiness")
                    .attr("x", width - 60)
                    .attr("y", height -10);

    var yLabel = svg4.append("text")
                    .attr("class", "label")
                    .text("Count")
                    .attr("x", -250)
                    .attr("y", -50)
                    .attr("transform", "rotate(-90)")
                    .style("text-anchor", "start");

 });
}

lineGraph();
//Create a new array to store json file
var barChartData = []

var trustFactor = ["creators","friends/fam","govt","media","orgs","unsure","unanswered"];
// set the dimensions and margins of the graph
var margin = {top: 50, right: 20, bottom: 30, left: 100};
var width = 750 - margin.left - margin.right
var height = 450 - margin.top - margin.bottom;
var barPadding = 5;
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
.domain([0,firstBarChartData.length])
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
barsvg.selectAll("bar")
    .data(firstBarChartData)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("width", width / firstBarChartData.length - barPadding)
    .attr("y",function(d) {
        return yScale(d.trustCount);
    })
    .attr("height", function(d){
        return height - yScale(d.trustCount);
      })
      .style("fill", "pink");

      var xAxis4 = d3.axisBottom(xScale).tickFormat(function(d, i) {
                      return trustFactor[i];
                    });
      // Add the X Axis
      barsvg.append("g")
        .attr("transform","translate(0, " + height +")")
        .call(xAxis4);

      // Add the Y Axis
      barsvg.append("g")
        .call(d3.axisLeft(yScale));
    //
      //Add text labels
        var xLabel = barsvg.append("text")
                        .attr("class", "label")
                        .text("Trust Factor")
                        .attr("x", width - 60)
                        .attr("y", height - 10);

        var yLabel = barsvg.append("text")
                        .attr("class", "label")
                        .text("Count")
                        .attr("x", -250)
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
