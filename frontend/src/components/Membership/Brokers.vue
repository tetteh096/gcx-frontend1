<script setup lang="ts">
import { isDarkMode } from '../../utils/darkMode'
</script>

<template>
  <div class="rounded-2xl p-6 border" :class="isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'">
    <h2 class="text-2xl font-bold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Brokers</h2>
    <p :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Information about licensed brokers operating on GCX.</p>
  </div>
</template>


