//Create a new array to store json file
var barChartData = []


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 660 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom;
var barPadding = 1;
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


      // Add the X Axis
      barsvg.append("g")
        .attr("transform","translate(0, " + height +")")
        .call(d3.axisBottom(xScale));

      // Add the Y Axis
      barsvg.append("g")
        .call(d3.axisLeft(yScale));
    //
      //Add text labels
        var xLabel = barsvg.append("text")
                        .attr("class", "label")
                        .data(firstBarChartData)
                        .enter()
                        .text(function(d) {
                          return d.trust;
                        })
                        .attr("x", width - 20)
                        .attr("y", height - 10);
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
