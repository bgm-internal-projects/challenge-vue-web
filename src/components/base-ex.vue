<!-- <template></template> -->

<script setup lang="ts">
import { ref } from 'vue';

// 1
// 2
// 3
// 4

// 5

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="sass">
</style>
