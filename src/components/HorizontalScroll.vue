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
const activeIdx = ref(0)

const menuList = computed(() => {
  return props.list.map((item) => ({
    ...item,
    classes: `${item.value === props.modelValue.value && 'active-item' } py-1 px-2.5 cursor-pointer text-nowrap text-xl`
  }))
})

function setItem(data: menuListItem, val: number) {
  activeIdx.value = val
  emits('update:modelValue', data)
}
function trackNext() {
  if(activeIdx.value !== props.list.length) {
    activeIdx.value += 1
    emits('update:modelValue', props.list[activeIdx.value])
  }
}

function trackPrev() {
  if(activeIdx.value !== 0) {
    activeIdx.value -= 1
    emits('update:modelValue', props.list[activeIdx.value])
  }
}

</script>

<template>
  <div class="flex items-center gap-2">
    <Button :unstyled="true" v-if="activeIdx >= 1" class="px-2" @click="trackPrev">
      <Icon name="mingcute:left-line" />
    </Button>
    <ul class="overflow-x-scroll relative no-scrollbar flex gap-8 text-nowrap scroll">
      <li v-for="(item, index) in menuList" :style="{'white-space': 'nowrap'}" :class="item.classes" @click="setItem(item, index)">
        {{item.label}}
      </li>
    </ul>
    <Button :unstyled="true" v-if="list.length - 1 !== activeIdx" class="px-2" @click="trackNext">
      <Icon name="mingcute:right-line" />
    </Button>
  </div>
</template>

<style scoped>
.active-item {
  @apply bg-orange-400
  text-white
    rounded-lg
  ;
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