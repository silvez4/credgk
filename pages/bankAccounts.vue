<template>
  <v-row>
    <v-col class="text-center">
      <v-layout row wrap>
        <v-row no-gutters justify="space-around">
          <v-card v-for="(item, index) in cards" :key="index" class="ma-2" md="6">
                <v-card-title class="card-title mb-1 justify-center">{{item.title}}</v-card-title>
                <v-card-text v-bind:class="checkDebt(index)">{{ item.value == parseFloat(item.value) ? 'R$ ' : ''}}{{item.value}}</v-card-text>
            </v-card>
        </v-row>
      </v-layout>
      
      <template>
        <v-row justify="space-around" class="mt-6">
          <AddCompraBtn />
          <AddDepositBtn />    
          <SacarDinheiroBtn />
          <PayFaturaBtn />
        </v-row>
        <TransactionsTable />
      </template>
    </v-col>
  </v-row>
</template>

<script>
// import { salvarCompra, salvarDeposito, retirarDeposito, pagarFatura } from '@/firebase/crud'

export default {
  name: 'InspirePage',
  middleware: 'auth',

  components: {
    AddCompraBtn: () => import('@/components/AddCompraBtn.vue'),
    AddDepositBtn: () => import('@/components/AddDepositBtn.vue'),
    SacarDinheiroBtn: () => import('@/components/SacarDinheiroBtn.vue'),
    PayFaturaBtn: () => import('@/components/PayFaturaBtn.vue'),
    TransactionsTable: () => import('@/components/TransactionsTable.vue')
  },

  data: () =>({
    cards: [
      {
        "title": "Total em Conta",
        "value": "150.00",
      },
      {
        "title": "Limite Total",
        "value": "300.00",
      },
      {
        "title": "Fatura do Mês",
        "value": "155.00",
      },
      {
        "title": "Limite Disponivel",
        "value": "",
      },
      {
        "title": "Data Fechamento da Fatura",
        "value": "02/01/2023",
      },
      {
        "title": "Data Vencimento da Fatura",
        "value": "08/01/2023",
      },
    ],
    
  }),

  async mounted() {
    this.checkDif()
  },

  // watch: {
  //   nameTransaction(val,oldval){
  //     this.checkFields()
  //   },
  // },

  computed: {
      currentUser(){
        return this.$store.state.user
      }
    },

  methods: {

    parseDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      },

    dataAtualFormatada(){
      let data = new Date(),
          dia  = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length == 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return diaF+"/"+mesF+"/"+anoF;
    },

    checkDebt(index) {
      if(this.cards[index].title == "Total em Conta"){
        return 'card-title green--text'
      } else if(this.cards[index].title == "Fatura do Mês"){
          return 'card-title red--text lighten-1' 
        }
      return this.cards[index].value < 0 ? 'card-title red--text' : 'card-title blue--text'
    },


    checkDif() {
      this.cards[3].value = (parseFloat(this.cards[1].value) - parseFloat(this.cards[2].value)).toFixed(2)
    }
  }
}
</script>
<style scoped>
 .card-title{
  font-size: clamp(1rem, 2.5vw, 2rem); 
 }
</style>
