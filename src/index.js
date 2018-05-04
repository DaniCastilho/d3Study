import * as d3 from "d3";
import _ from "lodash";

(function() {
  const dataset = _.map(_.range(25), i => {
    return {
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
      r: Math.round(5 + Math.random() * 10)
    };
  });
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  const w = 500 - margin.left - margin.right;
  const h = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#chartArea")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  const xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .rangeRound([0, w]);

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickPadding(6)
    .tickSizeInner(6)
    .tickSizeOuter(12);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.y)])
    .range([h, 0]);

  const yAxis = d3.axisLeft().scale(yScale);
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0, 0)")
    .call(yAxis);
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("fill", "purple")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", d => d.r)
    .on("mouseover", function(d) {
      d3.select(this).classed("active", true);
    })
    .on("mouseout", function(d) {
      d3.select(this).classed("active", false);
    })
    .on("mousedown", function(d) {
      d3.select(this).attr("r", d.r * 2);
    })
    .on("mouseup", function(d) {
      d3.select(this).attr("r", d.r);
    });
})();
