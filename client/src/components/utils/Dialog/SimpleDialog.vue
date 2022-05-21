<template>
  <v-row justify="center">
    <v-dialog
      v-model="simpleDialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
         {{ title }}
        </v-card-title>

         <slot></slot>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'SimpleDialog',
  props: ['simpleDialog', 'title'],
  methods: {
    hide () {
      this.$emit('hide-dialog')
    }
  },
}
</script>