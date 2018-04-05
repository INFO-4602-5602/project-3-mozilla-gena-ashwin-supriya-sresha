// // First, we will create some constants to define non-data-related parts of the visualization
// var w = 700; // Width of our visualization
// var h = 500; // Height of our visualization
// var xOffset = 40; // Space for x-axis labels
// var yOffset = 100; // Space for y-axis labels
// var margin = 10; // Margin around visualization
var nerdiness = ["Undescribed", "Luddite","Average User","Technically Savvy", "Ultra Nerd"]
// var vals = ['Nerdlevel Number', 'Count']; // List of data attributes
// var xVal = "vals[0]; // Value to plot on x-axis"
var xVal = "NerdlevelNumber"
// var yVal = vals[1]; // Value to plot on y-axis
var yVal = "Count"


// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg4 = d3.select("#line").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+margin.left + "," + margin.top + ")");

var line_values = d3.line()
          .x(function(d){return x(d[xVal]);})
          .y(function(d){return x(d[yVal]);})
          .curve(d3.curveLinear);

//
// // Get the data
d3.csv("Viz4-1.csv", function(error, data){
  if (error) throw error;


data.sort(function(a,b){
  return d3.ascending(a.x,b.x);
});
  // Scale the range of the data
x.domain([-2,d3.max(data, function(d) {return d[xVal];})]);
y.domain([0, d3.max(data, function(d) {return d[yVal];})]);

svg4.append("Path")
  .datum(data)
  .attr("class","line")
  .attr("stroke","#66FF66")
  .attr("fill","none")
  .attr("stroke-width","10px")
  .attr("d",line_values);


  // Add the scatterplot points
  svg4.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function(d){return x(d[xVal]);})
      .attr("cy", function(d){return y(d[yVal]);});
    //  .attr("fill","pink")
    //  .transition()
    //  .ease(d3.easeBounce)
    //  .duration(4000);
      //.attr("r", function(d){return d["TFIDF"];});

  // Add the X Axis
  svg4.append("g")
    .attr("transform","translate(0, " + height +")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg4.append("g")
    .call(d3.axisLeft(y));
//
  //Add text labels
    var xLabel = svg.append("text")
                    .attr("class", "label")
                    .text(xVal)
                    .attr("x", width - 20)
                    .attr("y", height - 10);
//
//     var yLabel = svg.append("text")
//                     .attr("class", "label")
//                     .text(yVal)
//                     .attr("y", -10)
//                     .attr("transform", "rotate(90)")
//                     .style("text-anchor", "start");
//
 });
//
// // A function to retrieve the next value in the vals list
// function getNextVal(val) {
// 	return vals[(vals.indexOf(val) + 1) % vals.length];
// };
//
// // A function to change what values we plot on the x-axis
// function setXval(val) {
// 	// Update xVal
// 	xVal = val;
// 	// Update the axis
// 	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
// 				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
// 	xAxis.scale(xScale);
// 	xAxisG.call(xAxis);
// 	xLabel.text(xVal);
// 	// Update the points
//
// };
//
// // A function to change what values we plot on the y-axis
// function setYval(val) {
// 	// Update yVal
// 	yVal = val;
// 	// Update the axis
// 	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
// 				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
// 	yAxis.scale(yScale);
// 	yAxisG.call(yAxis);
// 	yLabel.text(yVal);
// 	// Update the points
//
// };
