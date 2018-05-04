import * as d3 from "d3";
import _ from "lodash";

(function() {
  const dataset = _.map(_.range(25), i => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 30
    };
  });
  var margin = { top: 0, right: 0, bottom: 0, left: 0 };

  const w = 400 - margin.left - margin.right;
  const h = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#chartArea")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  var xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .rangeRound([0, w]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.y)])
    .range([h, 0]);

  var colorScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(["blue", "purple"]);

  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("fill", "purple")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))

})();
