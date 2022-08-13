<template>
  <v-row justify="center">
    <v-dialog
      v-model="simpleDialog"
      max-width="290"
      persistent
    >
      <v-card class="pa-3">
        <v-card-title class="headline">
         {{ title }}
        </v-card-title>
         <slot>no content</slot>
         <v-card-actions>
           <v-btn @click="hide" class="bg-color2" rounded>Fermer</v-btn>
         </v-card-actions>
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
<style scoped>
.bg-color2 {
  background-color: #4568DC !important;
  color: white;
}
</style>
