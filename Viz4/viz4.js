var format4 = d3.format(",");
var vals = ['x', 'y']; // List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1]; // Value to plot on y-axis

var margin4 = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  width = 960 - margin4.left - margin4.right,
  height = 500 - margin4.top - margin4.bottom;

  // set the ranges
         var x = d3.scaleLinear().range([0, width]);
         var y = d3.scaleLinear().range([height, 0]);

// append the svg obgect to the body of the page
var svg4 = d3.select("#Viz4")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append('g')
  .attr('class', 'map')
  .attr("transform", "translate("+margin4.left + "," + margin4.top + ")");;

  d3.csv("Viz4-1.csv", function(error, data){
          if (error) throw error;
          data.forEach(function(d){
              d.x = parseInt(d[xVal])
              d.y = parseFloat(d[yVal])
              //d.x=+d.x;
              //d.y=+d.y;
              //d[xVal]=+d[xVal]
              //d[yVal]=+d[yVal]
          });
      });
