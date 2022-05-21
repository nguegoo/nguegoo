<template>
<div>
    <Navbar>
        <h2 class="headline">Tableau de bord</h2>
        
        <v-row class="mt-1 mb-1">
            <v-col cols="12" sm="6" md="3" lg="3" v-for="(stat, index) in statistiques" :key="index">
                <v-card class="d-flex justify-space-between">
                    <div class="pa-2">
                        <h3 class="headline mb-0" v-text="stat.title"></h3>
                        <div>temps réel</div>
                    </div>
                    <v-avatar :color="stat.color" size="62">
                        <span class="white--text text-h5">{{stat.nombre}}</span>
                    </v-avatar>
                </v-card>
            </v-col>
        </v-row>
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <h3 class="text-center grey--text">Opérations en cours / attentes</h3>
                </v-col>
                <v-col cols="12" sm="6" v-for="(op, index) in operations" :key="index" class="mb-0">
                    <v-card class="pa-2">
                        <div class="d-flex justify-space-between mb-0">
                            <h3 class="headline">{{op.title }}</h3>
                            <v-icon class="mdi-48px">{{op.icon }}</v-icon>
                        </div>
                        <div class="text-center">
                            <v-avatar color="grey" size="62">
                                <span class="text-h5">{{ op.nombre }}</span>
                            </v-avatar>
                        </div>
                        <v-card-actions>
                            <v-btn>détails</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-card class="mx-auto text-center" color="primary" dark>
                <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="value" color="rgba(255, 255, 255, .7)"  line-width="1" :labels="labels">
                            
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>

                <v-card-text>
                    <div class="text-h4 font-weight-thin">
                        Courbe de profits
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                    <v-btn block text>
                        Rapport global
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </Navbar>
</div>
</template>

<script>
import Navbar from "@/components/global/Navbar";
export default {
    name: "Dashboard",
    components: {
        Navbar
    },
    data() {
        return {
            statistiques: [{
                    title: 'Grossistes',
                    nombre: 50,
                    color: 'orange'
                },
                {
                    title: 'Clients',
                    nombre: 100,
                    color: 'indigo',
                },
                {
                    title: 'Commandes',
                    nombre: 200,
                    color: 'green'
                },
                {
                    title: 'partenaires',
                    nombre: 5,
                    color: 'primary'
                }
            ],
            operations: [{
                    title: 'Commandes',
                    nombre: 20,
                    icon: 'mdi-cart'
                },
                {
                    title: 'Livraison',
                    nombre: 15,
                    icon: 'mdi-car'
                }
            ],
            // courbe
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
            value: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
                100,
                80,
                150,
                480
            ]
        }
    },
};
</script>

<style lang="">
</style>
