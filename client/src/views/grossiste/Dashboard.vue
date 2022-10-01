<template>
<main>
    <global :selectedItem="0">
        <v-container fluid>
            <v-card-title>Données et statisques</v-card-title>
            <v-row class="pa-2">
                <v-col cols="12" md="8">
                    <v-row>
                        <v-col cols="6" md="6" sm="5" v-for="hist in [1, 2]" :key="hist">
                            <v-card class="mx-auto">
                                    <div>Histogramme des</div>
                                    <v-sparkline :labels="labels" :value="values" color="primary" line-width="10" padding="16"
                                    type="bar"></v-sparkline>
                               
                                <v-card-actions>
                                    <v-btn text color="primary" @click="reveal = true">
                                        Details
                                    </v-btn>
                                </v-card-actions>
                                <v-expand-transition>
                                    <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
                                        <v-card-text class="pb-0">
                                            <p class="text-h4 text--primary">
                                                DETAILS
                                            </p>
                                            <p>contenu...</p>
                                        </v-card-text>
                                        <v-card-actions class="pt-0">
                                            <v-btn text color="primary" @click="reveal = false">
                                                Fermer
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card class="mx-auto" elevation="5">
                                <p class="text-h4 text--primary font-weight-thin text-center">
                                    Courbe d'évaluation des ventes
                                </p>
                                <v-sparkline :labels="labels" :value="values" color="primary" line-width="2" padding="16"></v-sparkline>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-col>
                <v-col cols="12" md="4">
                    <v-date-picker class="mt-1" v-model="picker" elevation="15" full-width></v-date-picker>
                   <div class="text-center mt-4">
                     <v-icon class="primary--text mdi-24px">mdi-chart-multiple</v-icon>
                      <h2 class="primary--text">
                        Explorez vos différentes statistiques en selectionnant
                        une date
                    </h2>
                   </div>
                </v-col>
            </v-row>
        </v-container>
    </global>
</main>
</template>

<script>
import Global from "@/components/admin/Global";

export default {
    created() {
        const token = localStorage.getItem('token')
        console.log(token)
        if(token == null) {
          this.$router.push({ path: '/grossiste/authentication' })
        }else {
          this.$store.dispatch('setToken', localStorage.getItem('token'))
          this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
          this.user = JSON.parse(localStorage.getItem('user'))
        }
    },
    data() {
        return {
            reveal: false,
            user: {
                nom: 'test',
                email: 'test@gmail.com'
            },
            picker: null,
            value: 0,
            interval: {},
            labels: [
                '12am',
                '3am',
                '6am',
                '9am',
                '12pm',
                '3pm',
                '6pm',
                '9pm',
            ],
            values: [
                200,
                675,
                410,
                390,
                310,
                460,
                250,
                240,
            ]
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    mounted() {
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0)
            }
            this.value += 10
        }, 1000)
    },
    name: "Dashboard",
    components: {
        Global,
    },
}
</script>

<style scoped>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
.text-color1 {
  color: #B06AB3!important;
}
</style>
