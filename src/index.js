import * as d3 from "d3";
import _ from "lodash";

(function() {
  const dataset = _.map(_.range(30), i => Math.random() * 500);
  const w = 400;
  const h = 300;

  const svg = d3
    .select("#chartArea")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var xScale = d3
    .scaleBand()
    .domain(dataset)
    .paddingInner(0.1)
    .paddingOuter(0)
    .rangeRound([0, w]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  var colorScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(["blue", "purple"]);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d))
    .attr("y", d => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .style("height", d => yScale(d))
    .attr("fill", colorScale);
})();
