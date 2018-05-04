import * as d3 from "d3";
import _ from "lodash";

(function() {
  const dataset = _.map(_.range(30), i => Math.random() * 500);
  const margin = { top: 20, right: 0, bottom: 30, left: 30 };
  const w = 400 - margin.left - margin.right;
  const h = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#chartArea")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
    .scaleQuantile()
    .domain([0, 10, dataset.length - 15])
    .range(["blue", "purple", "pink", "green"]);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", xScale)
    .attr("y", d => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .style("height", yScale)
    .attr("fill", (d, i) => colorScale(i));
})();
