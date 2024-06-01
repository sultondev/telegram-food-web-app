<script setup lang="ts">
type menuListItem = {
  value: string
  label: string
}
interface Props {
  list: menuListItem[]
  modelValue: menuListItem
}

interface Emits {
  (e: 'update:modelValue', value: menuListItem): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

function setItem(data: menuListItem) {
  emits('update:modelValue', data)
}

const menuList = computed(() => {
  return props.list.map((item) => ({
    ...item,
    classes: `${item.value === props.modelValue.value && 'active-item' } cursor-pointer text-nowrap text-xl`
  }))
})
</script>

<template>
  <ul class="overflow-x-scroll no-scrollbar flex gap-8 text-nowrap scroll">
    <li v-for="item in menuList" :class="item.classes" @click="setItem(item)">
      {{item.label}}
    </li>
  </ul>
</template>

<style scoped>
.active-item {
  @apply underline;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>