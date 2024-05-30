<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";

const config = useRuntimeConfig()
if(process.client) {
  const {data} = await useApiFetch('/menu')
  console.log(data)
}
</script>

<template>
  <div class="py-4">
    <Container>
      <HeaderLogo />
      
    </Container>
  </div>
</template>