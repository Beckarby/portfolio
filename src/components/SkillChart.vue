<script setup>
import { computed } from 'vue';

const props = defineProps({
  skills: {
    type: Array,
    required: true,
    // default: () => [
    //   { name: 'Vue.js', level: 5 },
    //   { name: 'CSS', level: 4 },
    //   { name: 'JavaScript', level: 5 },
    //   { name: 'Node.js', level: 3 },
    //   { name: 'Databases', level: 4 },
    //   { name: 'API Design', level: 4 },
    //   { name: 'Problem Solving', level: 5 },
    //   { name: 'Communication', level: 4 },
    // ],
  },
  maxLevel: {
    type: Number,
    default: 5,
  },
});

const size = 300; // SVG viewBox size (width and height)
const center = size / 2; // Center point of the SVG
const radius = center * 0.8; // Radius for the outermost circle/polygon

// Number of skills determines the number of axes/sides of the polygon
const numSkills = computed(() => props.skills.length);
const angleSlice = computed(() => (Math.PI * 2) / numSkills.value); // Angle between each axis

// function to calculate point coordinates for a given angle and distance from center 
const getCoordinates = (angle, distance) => {
  const x = center + distance * Math.cos(angle);
  const y = center + distance * Math.sin(angle);
  return `${x},${y}`;
};

// --- Grid Lines ---
const gridLevels = computed(() => {
  const levels = [];
  // For 5 levels: 1 (inner) to 5 (outer)
  for (let i = 1; i <= props.maxLevel; i++) {
    const levelRadius = (radius / props.maxLevel) * i;
    const points = [];
    for (let j = 0; j < numSkills.value; j++) {
      const angle = angleSlice.value * j - Math.PI / 2; // We subtract PI/2 to start from top
      points.push(getCoordinates(angle, levelRadius));
    }
    levels.push(points.join(' '));
  }
  return levels;
});

// Axis Lines 
const axisLines = computed(() => {
  const lines = [];
  for (let i = 0; i < numSkills.value; i++) {
    const angle = angleSlice.value * i - Math.PI / 2;
    lines.push(getCoordinates(angle, radius));
  }
  return lines;
});

// Skill Labels
const skillLabels = computed(() => {
  return props.skills.map((skill, i) => {
    const angle = angleSlice.value * i - Math.PI / 2;
    // Slightly extend the label position beyond the max radius
    const labelRadius = radius + 25;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);

    let textAnchor = 'middle';
    if (Math.abs(angle) < Math.PI / 6 || Math.abs(angle - Math.PI * 2) < Math.PI / 6) {
      textAnchor = 'middle'; 
    } else if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
      textAnchor = 'end'; 
    } else {
      textAnchor = 'start';
    }

    // Small vertical adjustment for readability
    let dy = 0;
    // if (Math.abs(angle + Math.PI / 2) < 0.1) dy = -5; // Top
    // if (Math.abs(angle - Math.PI / 2) < 0.1) dy = 15; // Bottom

    return {
      x,
      y,
      textAnchor,
      dy: dy,
      name: skill.name,
    };
  });
});

// --- Data Polygon (The filled skill shape) ---
const dataPolygonPoints = computed(() => {
  return props.skills
    .map((skill, i) => {
      const levelRadius = (radius / props.maxLevel) * skill.level;
      const angle = angleSlice.value * i - Math.PI / 2;
      return getCoordinates(angle, levelRadius);
    })
    .join(' ');
});
</script>

<template>
  <div class="radar-chart-container">
    <h2 class="chart-title">My Skills</h2>
    <svg :viewBox="`0 0 ${size} ${size}`" class="radar-chart-svg">
      <!-- Grid Lines -->
      <g class="grid-lines">
        <polygon
          v-for="(points, index) in gridLevels"
          :key="index"
          :points="points"
          class="grid-polygon"
          :class="`grid-polygon-${index}`"
        />
      </g>

      <!-- Axis Lines -->
      <g class="axis-lines">
        <line
          v-for="(point, index) in axisLines"
          :key="index"
          :x1="center"
          :y1="center"
          :x2="point.split(',')[0]"
          :y2="point.split(',')[1]"
          class="axis-line"
        />
      </g>

      <!-- Skill Labels -->
      <g class="skill-labels">
        <text
          v-for="(label, index) in skillLabels"
          :key="index"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.textAnchor"
          :dy="label.dy"
          class="skill-label"
        >
          {{ label.name }}
        </text>
      </g>

      <!-- Data Polygon -->
      <g class="data-polygon-group">
        <polygon :points="dataPolygonPoints" class="data-polygon-fill" />
        <polyline :points="dataPolygonPoints" class="data-polygon-stroke" />
        <!-- Skill Level Points -->
        <circle
          v-for="(skill, index) in skills"
          :key="`point-${index}`"
          :cx="getCoordinates(angleSlice * index - Math.PI / 2, (radius / maxLevel) * skill.level).split(',')[0]"
          :cy="getCoordinates(angleSlice * index - Math.PI / 2, (radius / maxLevel) * skill.level).split(',')[1]"
          r="4"
          class="skill-point"
        />
      </g>
    </svg>
    <div class="chart-legend">
      <span>1 = Beginner</span>
      <span>5 = Expert</span>
    </div>
  </div>
</template>

<style scoped>
.radar-chart-container {
  background-color: var(--surface-card);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  margin: 2rem auto;
  text-align: center;
}

.chart-title {
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.radar-chart-svg {
  display: block; 
  width: 100%; 
  height: auto;
  margin: 0 auto;
  overflow: visible; 
}


.grid-polygon {
  fill: none;
  stroke: var(--surface-border); 
  stroke-width: 1px;
}

/* Axis Lines */
.axis-line {
  stroke: var(--surface-border);
  stroke-width: 1px;
}

/* Skill Labels */
.skill-label {
  fill: var(--text-color); 
  font-size: 0.9rem;
  font-weight: 500;
}

/* Data Polygon */
.data-polygon-fill {
  fill: var(--primary-color);
  opacity: 0.4; 
  transition: fill 0.3s ease, opacity 0.3s ease; 
}

.data-polygon-stroke {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 2px;
}

.skill-point {
  fill: var(--primary-color);
  stroke: var(--surface-card);
  stroke-width: 2px;
}

html.p-dark .grid-polygon,
html.p-dark .axis-line {
  stroke: var(--vt-c-divider-dark-2);
}

html.p-dark .skill-label {
  fill: var(--vt-c-text-dark-1);
}

html.p-dark .data-polygon-fill {
  fill: var(--primary-color); 
  opacity: 0.5;
}

html.p-dark .data-polygon-stroke {
  stroke: var(--primary-color);
}

html.p-dark .skill-point {
  fill: var(--primary-color);
  stroke: var(--surface-card);
}

.chart-legend {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: center;
  gap: 1rem;
}


.data-polygon-fill, .data-polygon-stroke, .skill-point {
  transform-origin: center center;
  transform: scale(0);
  animation: drawPolygon 1.5s ease-out forwards;
}

@keyframes drawPolygon {
  to {
    transform: scale(1);
  }
}

</style>