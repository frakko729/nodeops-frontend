<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";

interface Props {
  x: Array<any>;
  y: Array<any>;
  width?: number; // the outer width of the chart, in pixels
  height?: number; // the outer height of the chart, in pixels
  marginTop?: number; // the top margin, in pixels
  marginRight?: number; // the right margin, in pixels
  marginBottom?: number; // the bottom margin, in pixels
  marginLeft?: number; // the left margin, in pixels
  xPadding?: number; // amount of x-range to reserve to separate bars
  yType?: any; // y-scale type
  yFormat?: string; // a format specifier string for the y-axis
}

const {
  x,
  y,
  width = 1024,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
  xPadding = 0.1,
  yType = d3.scaleLinear,
  yFormat = "d",
} = defineProps<Props>();

const xRange = [marginLeft, width - marginRight]; // [left, right]
const xDomain = new d3.InternSet(x); // an array of (ordinal) x-values
const yRange = [height - marginBottom, marginTop]; // [bottom, top]
const yDomain = [0, d3.max(y) == 0 ? 100 : d3.max(y)]; // [ymin, ymax]

const svgRef = ref();

// Construct scales, axes, and formats.
const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);

const yScale = yType(yDomain, yRange);
const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
const yAxis = d3.axisLeft(yScale).ticks(height / 100, yFormat);

onMounted(() => {
  const svg = d3
    .select(svgRef.value)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%;");

  // Generate lines
  let lines = svg.append("g");
  lines
    .attr("transform", `translate(${marginLeft},0)`)
    .attr("class", "fill-current text-gray-600 text-base")
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("class", "fill-current text-gray-200 font-inter")
    );

  // Generate bars
  let bars = svg.append("g");
  bars
    .selectAll("bars")
    .data(y)
    .join("rect")
    .attr("y", (y: any) => yScale(y))
    .attr("height", (i: number) => {
      return yScale(0) - yScale(i);
    })
    .data(x)
    .attr("x", (x: string): any => {
      return xScale(x);
    })
    .attr("width", xScale.bandwidth())
    .attr(
      "class",
      "fill-current text-gray-700 opacity-75 hover:opacity-100 transition-all"
    )
    .append("title")
    .text((d, i) => `${y[i]} requests on ${d}`);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .attr("class", "fill-current text-gray-600 text-base font-inter")
    .call(xAxis);
});
</script>

<template>
  <div
    v-if="x.length === 0 || y.length === 0"
    class="p-8 text-xl text-center text-gray-600"
  >
    Currently are no chart data available.
  </div>
  <svg v-else ref="svgRef"></svg>
</template>
