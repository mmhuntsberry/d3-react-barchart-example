import * as d3 from "d3";
const data = [];
class D3Chart {
  constructor(element) {
    console.log(element);
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    const rects = svg.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 50)
      .attr("y", 50)
      .attr("width", 25)
      .attr("height", (d) => d)
      .attr("fill", "grey");
  }
}

export default D3Chart;
