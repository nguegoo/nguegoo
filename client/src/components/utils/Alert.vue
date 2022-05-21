<template>
  <v-alert
    border="right"
    colored-border
    :type="type"
    elevation="2"
    v-if="show"
    >
      {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: ['type', 'show', 'message']
}
</script>