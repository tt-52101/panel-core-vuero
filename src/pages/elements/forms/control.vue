<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { ref } from 'vue'
import { useMarkdownToc } from '/@src/composable/useMarkdownToc'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const markdownContainer = ref<HTMLElement>()
const toc = useMarkdownToc(markdownContainer)

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('VControl')

const breadcrumb = [
  {
    label: 'Vuero',
    hideLabel: true,
    icon: 'feather:home',
    to: { name: 'index' },
  },
  {
    label: 'Elements',
    to: { name: 'elements' },
  },
  {
    label: 'Forms',
  },
  {
    label: 'VControl',
    to: { name: 'elements-forms-control' },
  },
]

useHead({
  title: 'VControl - Elements - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <VBreadcrumb with-icons separator="bullet" :items="breadcrumb" />

    <div class="columns">
      <div
        ref="markdownContainer"
        :class="[toc.length > 0 ? 'is-9' : 'is-12']"
        class="column doc-column"
      >
        <VControlValidationDocumentation />
        <VControlValidationRoundedDocumentation />
        <VControlValidationVeeZodDocumentation>
          <template #example>
            <DocumentationDemoFormValidation />
          </template>
        </VControlValidationVeeZodDocumentation>
        <VControlPropsDocumentation />
        <VControlSlotsDocumentation />
      </div>
      <div v-if="toc.length" class="column is-3 toc-column">
        <DocumentationToc :toc="toc" />
      </div>
    </div>
  </div>
</template>
