import { Step } from "@/interfaces/Step";
import { ref, computed, reactive } from "vue";

export const useSteps = (input: Step[]) => {
  const steps = ref(input);

  const currentStepIndex = computed((): number | undefined => {
    if (steps) {
      return steps.value?.findIndex((item: Step) => item.status === "current");
    }
  });

  const currentStep = computed((): Step | undefined => {
    if (steps) {
      return steps.value?.find((item: Step) => item.status === "current");
    }
  });

  const nextStep = () => {
    if (steps && currentStepIndex.value !== undefined) {
      const current = steps.value[currentStepIndex.value];
      const next = steps.value[currentStepIndex.value + 1];
      if (current && next) {
        current.status = "complete";
        next.status = "current";
      }
    }
  };

  const prevStep = () => {
    if (steps && currentStepIndex.value !== undefined) {
      const current = steps.value[currentStepIndex.value];
      const prev = steps.value[currentStepIndex.value - 1];
      if (current && prev) {
        current.status = "upcoming";
        prev.status = "current";
      }
    }
  };

  const onStep = (index: number) => {
    if (steps.value && currentStepIndex.value !== undefined) {
      const current = steps.value[currentStepIndex.value];
      const to = steps.value[index];
      if (current && to) {
        current.status = "upcoming";
        to.status = "current";
      }
    }
  };

  return { steps, currentStep, currentStepIndex, nextStep, prevStep, onStep };
};
