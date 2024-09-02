<script setup lang="ts">

</script>

<template>
  <header>
    <div class="container">
      <img src="../assets/Logo.png" alt="">
      <h1>DocsGeneration</h1>
    </div>
  </header>
</template>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Junge&display=swap')

header
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 75px
  margin: 60px 0 30px 0
  background: rgba(238, 238, 238, 0.7)

.container
  margin-left: 100px

h1
  text-align: start
  font-weight: 400
  font-size: 32px
  line-height: 38.89px
  font-family: 'Junge', sans-serif

img
  position: absolute
  opacity: 10%
  height: 140px
  z-index: 1
  top: 50%
  transform: translateY(-50%)
</style>