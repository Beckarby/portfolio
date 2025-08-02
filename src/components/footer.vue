<script setup>
import { Linkedin, Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-vue-next';


const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rebecca-bracho-b06920259/',
    icon: Linkedin
  },
  {
    name: 'GitHub', 
    url: 'https://github.com/Beckarby',
    icon: Github
  }
];
</script>

<template>
  <footer class="app-footer" role="contentinfo">
    <div class="footer-content">
      <div class="footer-section brand-section">
        <div class="brand">
          <h2 class="brand-name">Rebecca Bracho</h2>
          <p class="brand-subtitle">Computer Engineering Student</p>
        </div>
        <p class="copyright">
          &copy; 2025 Rebecca Bracho. All rights reserved.
        </p>
      </div>

      <div class="footer-section contact-section">
        <h3 class="section-title">Get In Touch</h3>
        <div class="contact-list">
          <a 
            :href="`mailto:rebeccabracho05@gmail.com`" 
            class="contact-item"
            aria-label="Send email"
          >
            <Mail class="contact-icon" />
            <span>rebeccabracho05@gmail.com</span>
          </a>
          <a 
            :href="`tel:58 4246780066`" 
            class="contact-item"
            aria-label="Call phone number"
          >
            <Phone class="contact-icon" />
            <span>58 4246780066</span>
          </a>
          <div class="contact-item">
            <MapPin class="contact-icon" />
            <span>Maracaibo, Venezuela</span>
          </div>
        </div>
      </div>

      <div class="footer-section social-section">
        <h3 class="section-title">Connect</h3>
        <div class="social-grid">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <component :is="social.icon" class="social-icon" />
            <span class="social-name">{{ social.name }}</span>
            <ExternalLink class="external-icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color, #333);
  position: relative;
  overflow: hidden;
  background: dark gray;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.brand-section {
  align-items: flex-start;
}

.brand {
  margin-bottom: 1.5rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted, #666);
  margin: 0;
  font-weight: 500;
}

.copyright {
  font-size: 0.875rem;
  margin: 0;
  color: var(--text-muted, #666);
  line-height: 1.5;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color, #333);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 2rem;
  height: 2px;
  background: var(--primary-color, #3b82f6);
  border-radius: 1px;
}

.contact-list {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.contact-icon {
  width: 1rem;
  height: 1rem;
  color: var(--primary-color, #3b82f6);
  flex-shrink: 0;
}

.social-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary-color, #3b82f6);
  flex-shrink: 0;
}

.social-name {
  font-weight: 500;
  font-size: 0.875rem;
  flex-grow: 1;
}

.external-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--text-muted, #666);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover .external-icon {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.05);
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-note {
  font-size: 0.75rem;
  color: var(--text-muted, #666);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  font-size: 0.75rem;
  color: var(--text-muted, #666);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color, #3b82f6);
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .brand-section {
    grid-column: 1 / -1;
    text-align: center;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem 1.5rem;
  }
  
  .brand-section {
    grid-column: 1;
    text-align: center;
  }
  
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .contact-section,
  .social-section {
    align-items: center;
    text-align: center;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 1.25rem;
  }
  
  .social-grid {
    width: 100%;
    max-width: 280px;
  }
  
  .contact-item,
  .social-link {
    justify-content: center;
  }
}

</style>