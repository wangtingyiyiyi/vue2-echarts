<template>
  <h3>{{title}}</h3>
</template>

<script>
export default {
  name: 'ModuleTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
