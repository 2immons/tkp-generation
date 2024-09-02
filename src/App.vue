<template>
  <router-view/>
</template>

<style lang="sass">
@import "src/styles/variables"
::-webkit-scrollbar
  width: 10px

::-webkit-scrollbar-track
  background-color: lighten($c-track, 10%)

::-webkit-scrollbar-thumb
  background: gray

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

*
  box-sizing: border-box
  padding: 0
  margin: 0

input, textarea
  outline: none
  -moz-appearance: none
  scrollbar-width: none

input
  font-size: inherit
input[type="date"]
  font-size: 16px

.container
  position: relative
  display: flex
  flex-direction: column
  width: 98%
</style>
