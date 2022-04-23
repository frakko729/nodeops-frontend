<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";

interface Props {
  x: Array<any>;
  y: Array<any>;
  z?: Array<any>;
  width?: number;
  height?: number;
  xPadding?: number;
}

const {
  x,
  y,
  z,
  width = 100,
  height = 30,
  xPadding = 0.6,
} = defineProps<Props>();

const svgRef = ref();

const xRange = [0, width];

const yDomain: any = [0, d3.max(y)];
const yRange = [height, 0];

const xScale = d3.scaleBand(new d3.InternSet(x), xRange).padding(xPadding);
const yScale = d3.scaleLinear(yDomain, yRange);

onMounted(() => {
  const svg = d3
    .select(svgRef.value)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%;");

  let g = svg.append("g");
  g.selectAll("bars")
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
    .data(z ?? [])
    .attr("class", (i: any): string => {
      const d =
        "fill-current bars opacity-50 group-hover:opacity-100 transition-opacity";
      if (i === 1) {
        return d + " text-green-500";
      } else if (i === 2) {
        return d + " text-yellow-500";
      } else if (i === 3) {
        return d + " text-red-500";
      }
      return "";
    });
});
</script>

<template>
  <svg ref="svgRef"></svg>
</template>
