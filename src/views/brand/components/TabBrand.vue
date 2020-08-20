<template>
  <div>
    <div>{{title}}</div>
    <Hello v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      defult: ''
    }
  },
  components: {
    Hello: () => import('./Hello')
  }
}
</script>
