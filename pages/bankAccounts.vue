<template>
  <v-row>
    <v-col class="text-center">
      <v-layout row wrap>
        <!-- <v-flex v-for="(item, index) in cards" :key="index" xs4 xs=".flex-column">
          <v-card class="ma-2">
              <v-card-title class="card-title mb-1 justify-center">{{item.title}}</v-card-title>
              <v-card-text v-bind:class="checkDebt(index)">{{item.value}}</v-card-text>
          </v-card>
        </v-flex> -->
        <v-row no-gutters justify="space-around">
          <v-card v-for="(item, index) in cards" :key="index" class="ma-2" md="6">
                <v-card-title class="card-title mb-1 justify-center">{{item.title}}</v-card-title>
                <v-card-text v-bind:class="checkDebt(index)">{{ item.value == parseFloat(item.value) ? 'R$ ' : ''}}{{item.value}}</v-card-text>
            </v-card>
        </v-row>
      </v-layout>
      
<template>
  <v-row justify="space-around" class="mt-6">
    <v-btn class="elevation-1" color="primary" @click="addPurchase">Adicionar Compra</v-btn>
    <v-btn class="elevation-1" color="indigo" @click="addPurchase">Adicionar Deposito</v-btn>
    <v-btn class="elevation-1" color="success" @click="addPurchase">Pagar Fatura</v-btn>
  </v-row>
    <v-data-table
      :headers="headers"
      :items="credito"
      item-key="name"
      class="elevation-1 mt-6"
      :search="search"
      :custom-filter="filterOnlyLowerText"
    >
    <template v-slot:item.valorParcela="{ item }">
          <span
            :title="item.valorParcela"
          >
          {{ item.valorTotal == parseFloat(item.valorTotal) ? parseFloat(parseFloat(item.valorTotal) / parseFloat(item.parcelamento)).toFixed(2) : 'Valor Não Inserido'}}
        </span>
    </template>
    <template v-slot:item.valorTotal="{ item }">
          <span
            :title="item.valorTotal"
          >
          {{ item.valorTotal == parseFloat(item.valorTotal) ? parseFloat(item.valorTotal).toFixed(2) : 'Valor Não Inserido'}}
        </span>
    </template>
    
      <!-- <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>
      <v-icon small @click="deleteItem(item)"> delete </v-icon>
    </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="2"></td>
        </tr>
      </template> -->
    </v-data-table>
  
</template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  middleware: 'auth',
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
    search: '',
    calories: '',
    credito: [
      {
        name: 'GBarbosa',
        parcelamento: 1,
        valorTotal: 356.30,
        valorParcela: 0,
        tipo: 'Débito',
        data: '02/01/2023',
      },
      {
        name: 'Cinema',
        parcelamento: 2,
        valorTotal: 250.00,
        valorParcela: '',
        tipo: 'Crédito',
        data: '01/01/2023',
      },
      {
        name: 'HAVAN',
        parcelamento: 6,
        valorTotal: 1600.57,
        valorParcela: '',
        tipo: 'Crédito',
        data: '12/12/2022',

      },
      {
        name: 'Cupcake',
        parcelamento: 1,
        valorTotal: '',
        valorParcela: '',
        tipo: 'Débito',
        data: '12/12/2022',
      },
    ]
  }),

  mounted() {
    this.checkDif()
  },
  computed: {
    headers () {
        return [
          {
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Parcelamento (Vezes)',
            align: 'center',
            value: 'parcelamento',
          },
          { 
            text: 'Valor Parcelas (R$)', 
            align: 'center',
            value: 'valorParcela',
          },
          { 
            text: 'Valor Total (R$)', 
            align: 'center',
            value: 'valorTotal',
          },
          
          { 
            text: 'Tipo de Compra', 
            align: 'center',
            value: 'tipo',
          },
          { 
            text: 'Data Compra', 
            align: 'center',
            value: 'data',
            // formatter: formatCurrency
          },
        ]
      },
    },

  methods: {
    filterOnlyLowerText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
      },

      formatCurrency (value) {
        return "$ " + (value / 100).toFixed(2);
      },

      addPurchase(){
        return console.log('adicionar compra')
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
      // let regex = /[+-]?\d+(\.\d+)?/g;
      // let valConta = this.cards[0].value.match(regex).map(function(v) { return parseFloat(v); })
      // let valDebt = this.cards[1].value.match(regex).map(function(v) { return parseFloat(v); })
      // this.cards[2].value = "R$ " + parseFloat(valConta - valDebt).toFixed(2)
      // this.cards[2].value = parseFloat(this.cards[4].value).toFixed(2)

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
