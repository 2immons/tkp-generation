<template>
  <Header />
  <main>
    <InputForm />
  </main>
</template>

<script setup lang="ts">
import InputForm from "@/components/InputForm.vue";
import Header from "@/components/Header.vue"

</script>

<style scoped lang="sass">
main
  display: flex
  justify-content: center
</style>