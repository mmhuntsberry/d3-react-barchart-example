import * as d3 from "d3";
import { getAverageNumberOfViewers, getTotalNumberOfViewers } from "../utils";

// Set up MARGINs render axis
// Create MARGINs around our chart so we have
// room for our axis'
const MARGIN = { TOP: 10, RIGHT: 50, BOTTOM: 100, LEFT: 100 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, data, setData, query1, query2) {
    this.svg = d3
      .select(element)
      .append("svg")
      // Create MARGINs around our chart
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.RIGHT})`);

    // Labels
    this.xLabel = this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle");

    this.yLabel = this.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Number of Viewers");

    // Append group el to display both axes
    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    // Append group el to display both axes
    this.yAxisGroup = this.svg.append("g");

    d3.csv(
      "https://raw.githubusercontent.com/mmhuntsberry/d3-next-app/main/data/data.csv"
    ).then((data) => {
      this.data = data;
      this.update(data, this.setData, "Program Title", "Number of Viewers");
    });
  }

  update(data, setData, query1, query2) {
    this.data = data;
    this.setData = setData;
    this.query1 = query1;
    this.query2 = query2;
    this.setData(this.data);

    let res = [];

    switch (this.query2) {
      case "Number of Viewers":
        res = getTotalNumberOfViewers(this.query1, this.data);
        break;
      case "Average Number of Viewers":
        res = getAverageNumberOfViewers(this.query1, this.data);
        break;
      default:
        break;
    }

    const y = d3
      .scaleLinear()
      // Get max viewers - Comes in as string,
      // needs to be coerced to a num.
      .domain([0, d3.max(res, (d) => d[this.query2])])
      // Flip left axis values to ascend
      // rather than to descend by default.
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(res.map((d) => d[this.query1]))
      .range([0, WIDTH])
      .padding(0.1);

    const xAxisCall = d3.axisBottom(x);
    this.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    this.yAxisGroup.transition().duration(500).call(yAxisCall);

    // Data join
    // Tells D3 what array of data we want to
    // associate with our shapes.
    const rects = this.svg.selectAll("rect").data(res);

    this.xLabel.text(this.query1);

    // Exit
    // Removes any elements on the screen
    // that don't exist in the new data.
    rects
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .remove();

    // Update
    // Udpates the shapes the exist in the new array
    // of data and also exist on the screen.
    rects
      .transition()
      .duration(500)
      .attr("x", (d, i) => x(d[this.query1]))
      .attr("y", (d) => y(d[this.query2]))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d[this.query2]));

    // ENTER
    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(d[this.query1]))
      .attr("width", x.bandwidth)
      .attr("fill", "#767A89")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      // The svg coordinate system starts at 0,0
      // making bars hang from top of canvas
      // we can take the height of the canvas
      // subract the amount of the bar and
      // set each bar at the bottom of the chart.
      .attr("height", (d) => HEIGHT - y(d[this.query2]))
      .attr("y", (d) => y(d[this.query2]));
  }
}

export default D3Chart;
