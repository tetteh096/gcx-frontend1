<template>
  <div v-if="activeCategory === categoryKey">
    <section class="py-12">
      <div class="text-center mb-16">
        <h2 
          class="text-4xl font-bold mb-6 transition-colors duration-300"
          :class="isDarkMode ? 'text-white' : 'text-slate-900'"
        >
          {{ title }}
        </h2>
        <p 
          class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
        >
          {{ description }}
        </p>
      </div>
      
      <!-- Partnership Cards Grid -->
      <PartnershipGrid 
        :items="partnershipItems" 
        :is-dark-mode="isDarkMode" 
      />
      
      <!-- Category Cards -->
      <div v-if="categoryCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PartnershipCategory
          v-for="card in categoryCards"
          :key="card.title"
          :title="card.title"
          :description="card.description"
          :tags="card.tags"
          :icon-path="card.iconPath"
          :icon-bg-class="card.iconBgClass"
          :tag-classes="card.tagClasses"
          :is-dark-mode="isDarkMode"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PartnershipGrid from './PartnershipGrid.vue';
import PartnershipCategory from './PartnershipCategory.vue';

interface PartnershipItem {
  imageSrc: string;
  title: string;
}

interface CategoryCard {
  title: string;
  description: string;
  tags: string[];
  iconPath: string;
  iconBgClass: string;
  tagClasses: string;
}

interface Props {
  categoryKey: string;
  activeCategory: string;
  title: string;
  description: string;
  partnershipItems: PartnershipItem[];
  categoryCards?: CategoryCard[];
  isDarkMode: boolean;
}

defineProps<Props>();
</script>
