<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="breadcrumb-nav" aria-label="Navegación de migas de pan">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <RouterLink v-if="item.path" :to="item.path" class="breadcrumb-link">
          {{ item.label }}
        </RouterLink>
        <span v-else class="breadcrumb-current">{{ item.label }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator">›</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-nav {
  margin-bottom: var(--spacing-md);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.breadcrumb-link {
  color: var(--color-gray-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-sep-blue);
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--color-gray-900);
  font-weight: var(--font-weight-medium);
}

.breadcrumb-separator {
  color: var(--color-gray-400);
  user-select: none;
}
</style>
