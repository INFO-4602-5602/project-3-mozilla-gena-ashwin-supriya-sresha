
var margin = {top: 20, right: 20, bottom: 50, left:100};
var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var gridsize = width/5;

var svg31 = d3.select("#distcurve").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var tickLabels = ["","Ultra Nerd", "Technically Savvy", "Average User", "Luddite"," "];

d3.json("viz3_true.json" , function(error,data){

          if(error) throw error;
          var xScale = d3.scaleLinear().range([0, width]).domain([0, 5, 10]);

          var yScale = d3.scaleLinear().range([height, 0]);

          yScale.domain([0, d3.max(data, function(d){return d.Count;})]);



          var xAxis = d3.axisBottom(xScale).tickFormat(function(d, i) {
                return tickLabels[i];
              });

          svg31.append("g")
              .attr("transform","translate(0," + height + ")")
              .call(xAxis);

          svg31.append("g")
              .call(d3.axisLeft(yScale));

          var xLabel = svg31.append("text")
                          .attr("class","label")
                          .text("Nerdiness")
                          .attr("x",width - 350)
                          .attr("y",height + 40 );

          var yLabel = svg31.append("text")
                          .attr("class","label")
                          .text("Count")
                          .attr("x", -175)
                          .attr("y", -50 )
                          .attr("transform","rotate(-90)")
                          .style("text-anchor","start");

          // svg31.selectAll("circle")
          //     .data(data)
          //     .enter()
          //     .append("circle")
          //     .attr("r",5)
          //     .attr("cx", function(d){ return tickLabels.indexOf(d.Nerdness)*gridsize;})
          //     .attr("cy", function(d){ return yScale(d.Count);})
          //     .attr("fill","green");

        var line = d3.line()
                  .x(function(d, i) { return tickLabels.indexOf(d.Nerdness)*gridsize; })
                  .y(function(d) { return yScale(d.Count); })
                  .curve(d3.curveMonotoneX);

          svg31.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("fill","none")
              .attr("stroke","green")
              .attr("stroke-width","2px")
              .attr("d", line);
            svg31.append("text")
            		.attr("transform", "translate(" + (width-120) + "," + (height-60) + ")")
            		.attr("dy", ".35em")
            		.attr("text-anchor", "start")
            		.style("fill", "green")
            		.text("True");


});

d3.json("viz3_pred.json" , function(error,data){

          if(error) throw error;
          var xScale = d3.scaleLinear().range([0, width]).domain([0, 5, 10]);

          var yScale = d3.scaleLinear().range([height, 0]);

          yScale.domain([0, d3.max(data, function(d){return d.Count;})]);

          var xAxis = d3.axisBottom(xScale).tickFormat(function(d, i) {
                return tickLabels[i];
              });

          // svg31.selectAll("circle")
          //     .data(data)
          //     .enter()
          //     .append("circle")
          //     .attr("r",5)
          //     .attr("cx", function(d){ return tickLabels.indexOf(d.Nerdness)*gridsize;})
          //     .attr("cy", function(d){ return yScale(d.Count);})
          //     .attr("fill","green");

        var line = d3.line()
                  .x(function(d, i) { return tickLabels.indexOf(d.Nerdness)*gridsize; })
                  .y(function(d) { return yScale(d.Count); })
                  .curve(d3.curveMonotoneX);

          svg31.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("fill","none")
              .attr("stroke","red")
              .attr("stroke-width","2px")
              .attr("d", line);

            svg31.append("text")
            		.attr("transform", "translate(" + (width-40) + "," + (height-60) + ")")
            		.attr("dy", ".35em")
            		.attr("text-anchor", "start")
            		.style("fill", "red")
            		.text("Predicted");
});

function mapdist(count)
{
  // alert("came here");
  // alert(count);

  var nerdlevel = 0;
  if(count >= 6)
        nerdlevel = 1;
    else if(count>=3 && count<6)
        nerdlevel = 2;
    else if(count>=1 && count<3)
        nerdlevel = 3;
    else
        nerdlevel = 4;
var yScale = d3.scaleLinear().range([height, 0]);

d3.json("viz3_pred.json" , function(error,data){
  yScale.domain([0, d3.max(data, function(d){return d.Count;})]);
    var countterms = 0;
    var found = 0;
    for (var i = 0;i<data.length;i++)
    {
      var obj = data[i]
      for (var key in obj) {
        console.log("this" + key + " " + obj[key]);
          if(obj[key] == tickLabels[nerdlevel])
          {
              found = 1;
          }
          if(found == 1 && key == "Count")
          {
            countterms = obj[key];
            found = 0;
          }
      }
    }
    console.log(countterms);
    var circle = svg31.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r",5)
        .attr("cx", nerdlevel*gridsize)
        .attr("cy", yScale(countterms))
        .attr("fill","red");


        var text = svg31.append("text");
                           //Add the text attributes
        var textLabels = text.attr("x",  (nerdlevel*gridsize)+0.2)
                .attr("y", yScale(countterms+0.2))
                .text("You are here")
                 .attr("fill", "red");
  });

}
