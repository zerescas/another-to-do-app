<script setup lang="ts">
import tsLogo from '@/assets/img/achieved-with/ts-logo.webp';
import vueLogo from '@/assets/img/achieved-with/vue-logo.webp';
import primevueLogo from '@/assets/img/achieved-with/primevue-logo.webp';

interface AchievedWith {
  name?: string;
  imagePath: string;
  cssClass?: string;
}

const achievedWithItems: Array<AchievedWith> = [
  {
    name: 'TypeScript',
    imagePath: tsLogo,
    cssClass: 'achieved-with-ts',
  },
  {
    name: 'Vue',
    imagePath: vueLogo,
    cssClass: 'achieved-with-vue',
  },
  {
    name: '"Textarea" from PrimeVue',
    imagePath: primevueLogo,
    cssClass: 'achieved-with-primevue',
  },
];

function getImageAltFromImagePath(imagePath: string) {
  if (!imagePath) return '';

  return imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('.'));
}
</script>

<template>
  <div class="about-wrapper">
    <section class="achieved-with-section">
      <h2 class="title">Achieved with</h2>

      <div class="achieved-with-list">
        <div
          v-for="(achievedWithItem, index) in achievedWithItems"
          :key="index"
          class="achieved-with-item"
          :class="achievedWithItem.cssClass"
        >
          <img
            class="image"
            :src="achievedWithItem.imagePath"
            :alt="getImageAltFromImagePath(achievedWithItem.imagePath)"
          />
          <div class="name">
            {{ achievedWithItem.name }}
          </div>
        </div>
      </div>
    </section>

    <section class="made-by-section">
      Made by

      <a
        class="author-link"
        href="https://github.com/zerescas/another-to-do-app"
        target="_blank"
        data-content="zerescas"
        >zerescas</a
      >

      in 2024
    </section>
  </div>
</template>

<style scoped>
/* Common */
.about-wrapper .title {
  margin-bottom: 18px;
}

.about-wrapper section {
  margin-bottom: 36px;
}

/* "Achieved With" section */
.achieved-with-list {
  display: grid;
  flex-direction: row;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.achieved-with-item {
  align-items: center;
  background-color: #ffffffab;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 500;
  gap: 12px;
  padding: 18px;
  position: relative;
}

.achieved-with-item::before,
.achieved-with-item::after {
  border-left: solid 2px var(--theme-color-text-primary);
  border-top: solid 2px var(--theme-color-text-primary);
  content: '';
  height: 15px;
  position: absolute;
  width: 15px;
}

.achieved-with-item::before {
  left: 0;
  top: 0;
}

.achieved-with-item::after {
  bottom: 0;
  right: 0;
  transform: rotate(180deg);
}

.achieved-with-item img {
  height: 52px;
  object-fit: contain;
  width: 52px;
}

/* "Made by" section */
.made-by-section {
  font-weight: 300;
}

.author-link {
  color: var(--theme-color-tasks);
  font-weight: 800;
  text-decoration: none;
  transition: letter-spacing 0.65s ease;
}

.author-link:hover {
  letter-spacing: 2px;
}

/* Dark theme */

/* "Achieved With" section */

/* Specific classes for each item */
[data-theme='dark'] .achieved-with-ts {
  background-color: #3179c74f;
  color: #418fe2ef;
}

[data-theme='dark'] .achieved-with-vue,
[data-theme='dark'] .achieved-with-primevue {
  background-color: #46b4864d;
  color: #2fb37cd5;
}

/* "Made by" section */
[data-theme='dark'] .author-link {
  background: linear-gradient(90deg, var(--theme-color-tasks), var(--theme-color-projects));
  background-clip: text;
  color: transparent;
}
</style>
