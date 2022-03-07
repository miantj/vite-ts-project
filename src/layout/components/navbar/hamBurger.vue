<script setup lang="ts">
import { ref } from "vue";
// import { useEpThemeStoreHook } from "/@/store/modules/epTheme";
export interface Props {
  isActive: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
});

const fillColor = ref<string>("");

const emit = defineEmits<{
  (e: "toggleClick"): void;
}>();

const toggleClick = () => {
  emit("toggleClick");
};
</script>

<template>
  <div
    :class="classes.container"
    :title="props.isActive ? '点击折叠' : '点击展开'"
    @click="toggleClick"
 
  >
  
  </div>
</template>

<style module="classes" scoped>
.container {
  padding: 0 15px;
}
</style>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.is-active {
  transform: rotate(180deg);
}
</style>
