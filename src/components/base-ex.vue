<!-- <template></template> -->

<script setup lang="ts">
import { ref } from 'vue';

// 1
// 2

interface Props {
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
});

// old 3

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="sass">
</style>
