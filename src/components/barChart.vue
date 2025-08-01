<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  maxValue: {
    type: Number,
    default: 100, 
  },
  barWidth: {
    type: Number,
    default: 30, 
  },
  barSpacing: {
    type: Number,
    default: 45, 
  },
  height: {
    type: Number,
    default: 250,
  },
  padding: {
    type: Object,
    default: () => ({ top: 20, right: 30, bottom: 40, left: 50 }),
  },
});

const svgWidth = computed(() => {
  const totalBarWidth =
    props.data.length * props.barWidth +
    (props.data.length - 1) * props.barSpacing;
  return totalBarWidth + props.padding.left + props.padding.right;
});
const svgHeight = computed(() => props.height + props.padding.top + props.padding.bottom);

const chartWidth = computed(() => svgWidth.value - props.padding.left - props.padding.right);
const chartHeight = computed(() => props.height);

const yScale = computed(() => (value) => {
  return chartHeight.value - (value / props.maxValue) * chartHeight.value;
});

const bars = computed(() => {
  return props.data.map((item, index) => {
    const x =
      props.padding.left +
      index * (props.barWidth + props.barSpacing);
    const y = props.padding.top + yScale.value(item.value);
    const barHeight = chartHeight.value - yScale.value(item.value);

    return {
      id: `bar-${item.label}-${index}`,
      x,
      y,
      width: props.barWidth,
      height: barHeight,
      label: item.label,
      value: item.value,
    };
  });
});

const xAxisLabels = computed(() => {
  return bars.value.map((bar) => ({
    x: bar.x + bar.width / 2,
    y: props.padding.top + chartHeight.value + 25,
    label: bar.label,
  }));
});

const yAxisTicks = computed(() => {
  const ticks = [];
  const numTicks = 5; 
  for (let i = 0; i <= numTicks; i++) {
    const value = (props.maxValue / numTicks) * i;
    const y = props.padding.top + yScale.value(value);
    ticks.push({
      value,
      y,
      lineX1: props.padding.left - 5, 
      lineX2: props.padding.left,
      labelX: props.padding.left - 10,
      labelY: y,
    });
  }
  return ticks;
});
</script>

<template>
  <div class="bar-chart-container">
    <h2 class="chart-title">Skill Levels</h2>
    <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="bar-chart-svg">
      <line
        :x1="padding.left"
        :y1="padding.top"
        :x2="padding.left"
        :y2="padding.top + chartHeight"
        class="axis-line y-axis"
      />

      <line
        :x1="padding.left"
        :y1="padding.top + chartHeight"
        :x2="padding.left + chartWidth"
        :y2="padding.top + chartHeight"
        class="axis-line x-axis"
      />

      <g class="y-axis-ticks">
        <g v-for="(tick, index) in yAxisTicks" :key="index">
          <line
            :x1="tick.lineX1"
            :y1="tick.lineY"
            :x2="tick.lineX2"
            :y2="tick.lineY"
            class="tick-line"
          />
          <text
            :x="tick.labelX"
            :y="tick.labelY"
            text-anchor="end"
            alignment-baseline="middle"
            class="tick-label"
          >
            {{ tick.value }}
          </text>
        </g>
      </g>

      <g class="bars-group">
        <rect
          v-for="bar in bars"
          :key="bar.id"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          class="bar"
        />
        <text
          v-for="bar in bars"
          :key="`${bar.id}-value`"
          :x="bar.x + bar.width / 2"
          :y="bar.y - 5"
          text-anchor="middle"
          class="bar-value-label"
        >
          {{ bar.value }}
        </text>
      </g>

      <g class="x-axis-labels">
        <text
          v-for="label in xAxisLabels"
          :key="label.x"
          :x="label.x"
          :y="label.y"
          text-anchor="middle"
          class="x-axis-label"
        >
          {{ label.label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.bar-chart-container {
  background-color: var(--surface-card);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-width: 800px; /* Adjust max-width as needed */
  margin: 2rem auto;
  text-align: center;
}

.chart-title {
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.bar-chart-svg {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.axis-line {
  stroke: var(--surface-border);
  stroke-width: 1.5px;
}

.tick-line {
  stroke: var(--surface-border);
  stroke-width: 1px;
}

.tick-label,
.x-axis-label,
.bar-value-label {
  fill: var(--text-color);
  font-size: 0.55rem;
  font-weight: 500;
}

.bar {
  fill: var(--primary-color);
  transition: all 0.5s ease-out; 
}

html.p-dark .axis-line,
html.p-dark .tick-line {
  stroke: var(--vt-c-divider-dark-2);
}

html.p-dark .tick-label,
html.p-dark .x-axis-label,
html.p-dark .bar-value-label {
  fill: var(--vt-c-text-dark-1);
}

html.p-dark .bar {
  fill: var(--primary-color);
}

.bar {
  transform-origin: bottom center;
  transform: scaleY(0);
  animation: drawBar 1s ease-out forwards;
}

.bars-group rect:nth-child(1) { animation-delay: 0.1s; }
.bars-group rect:nth-child(2) { animation-delay: 0.2s; }
.bars-group rect:nth-child(3) { animation-delay: 0.3s; }
.bars-group rect:nth-child(4) { animation-delay: 0.4s; }
.bars-group rect:nth-child(5) { animation-delay: 0.5s; }
.bars-group rect:nth-child(6) { animation-delay: 0.6s; }
.bars-group rect:nth-child(7) { animation-delay: 0.7s; }
.bars-group rect:nth-child(8) { animation-delay: 0.8s; }

@keyframes drawBar {
  to {
    transform: scaleY(1);
  }
}
</style>