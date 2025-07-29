<script setup>
import Accordion from '../components/Accordion.vue';
import AccordionItem from '../components/AccordionItem.vue';

const softSkills = [
  'Problem-Solving',
  'Communication',
  'Teamwork & Collaboration',
  'Adaptability',
  'Time Management',
  'Critical Thinking',
];

const languages = [
  'English (Fluent)',
  'Spanish (Native)',
  'Brainrot (Fluent)',
];

const education = [
  {
    institution: 'University of XYZ',
    degree: 'B.Sc. in Computer Science',
    years: '2021 - 2025',
    notes: 'Focused on web development, data structures, and algorithms. Completed capstone project: [Project Name] (link to project if applicable).',
  },
  {
    institution: 'Online Course Platform',
    degree: 'Full-Stack Web Development Bootcamp',
    years: '2020',
    notes: 'Intensive 12-week program covering HTML, CSS, JavaScript, Node.js, and MongoDB.',
  },
];
</script>

<template>
  <div class="about-me-page">
    <h1 class="page-title">About Me</h1>

    <section class="about-section">
      <p class="intro-paragraph">
        Hello! I'm Rebecca Bracho, a passionate frontend developer with a keen eye for detail and a love for creating intuitive user experiences. My journey into tech began with a fascination for how design meets functionality on the web, leading me to specialize in modern JavaScript frameworks and responsive design.
      </p>
      <p class="intro-paragraph">
        I believe in clean code, continuous learning, and building accessible, performant applications. Outside of coding, I enjoy [mention a hobby or two, e.g., hiking, photography, reading sci-fi] which helps me bring a fresh perspective to my work.
      </p>
    </section>

    <section class="accordion-section">
      <h2 class="section-heading">My Profile</h2>
      <Accordion initial-open-id="soft-skills">
        <AccordionItem id="soft-skills" title="Soft Skills">
          <ul>
            <li v-for="skill in softSkills" :key="skill">{{ skill }}</li>
          </ul>
        </AccordionItem>

        <AccordionItem id="languages" title="Languages">
          <ul>
            <li v-for="lang in languages" :key="lang">{{ lang }}</li>
          </ul>
        </AccordionItem>

        <AccordionItem id="education" title="Education">
          <div v-for="edu in education" :key="edu.institution" class="education-entry">
            <h3>{{ edu.institution }}</h3>
            <p><strong>{{ edu.degree }}</strong> ({{ edu.years }})</p>
            <p>{{ edu.notes }}</p>
          </div>
        </AccordionItem>

        <!-- You could add more items like: -->
        <!-- <AccordionItem id="interests" title="Interests">
          <p>Beyond coding, I love exploring new technologies, contributing to open-source projects, and reading about cutting-edge AI developments.</p>
        </AccordionItem> -->
      </Accordion>
    </section>
  </div>
</template>

<style scoped>
.about-me-page {
  max-width: 900px; /* Adjust max-width for the page content */
  margin: 2rem auto 4rem auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 3rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 3rem;
}

.about-section {
  margin-bottom: 3rem;
}

.intro-paragraph {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.accordion-section {
  margin-bottom: 3rem;
}

.section-heading {
  font-size: 2rem;
  color: var(--color-heading);
  margin-bottom: 2rem;
  text-align: center;
}

/* content inside accordion items */
.accordion-content ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
}

.accordion-content ul li {
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
}

.education-entry {
  margin-bottom: 1.5rem;
  border-bottom: 1px dashed var(--surface-border);
  padding-bottom: 1rem;
}

.education-entry:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.education-entry h3 {
  font-size: 1.1rem;
  color: var(--color-heading);
  margin-top: 0;
  margin-bottom: 0.25rem;
}

.education-entry p {
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 0.25rem;
}

.education-entry strong {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .about-me-page {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .section-heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .intro-paragraph {
    font-size: 1rem;
  }

  .accordion-header {
    padding: 0.8rem 1rem;
    font-size: 1rem;
  }

  .accordion-content {
    padding: 0.8rem 1rem 1rem 1rem;
    font-size: 0.9rem;
  }
}
</style>