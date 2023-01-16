<template>
  <v-data-table
      v-if="compras != ''"
      :headers="headers"
      :items="compras"
      item-key="compras.id"
      class="elevation-1 mt-6"
    >
    <template v-slot:item.nomeCompra="{ item }">
          <span
            :title="item.nomeCompra"
          >
          {{ item.nomeCompra }}
        </span>
    </template>
    <template v-slot:item.parcelasCompra="{ item }">
          <span
            :title="item.parcelasCompra"
          >
          {{ item.parcelasCompra }}
        </span>
    </template>
    <template v-slot:item.valorParcelasCompra="{ item }">
          <span
            :title="item.valorParcelasCompra"
          >
          {{ item.valorParcelasCompra != '' ? 'R$ ' + parseFloat(item.valorParcelasCompra).toFixed(2) : 'Valor Não Inserido'}}
        </span>
    </template>
    <template v-slot:item.valorCompra="{ item }">
          <span
            :title="item.valorCompra"
          >
          {{ item.valorCompra != '' ? 'R$ ' + parseFloat(item.valorCompra).toFixed(2) : 'Valor Não Inserido'}}
        </span>
    </template>
    </v-data-table>
</template>

<script>
import { lerCompras } from '@/firebase/crud'

export default {
  name: 'TransactionsTable',

  data: () =>({
    search: '',
    calories: '',
    compras: '',
  }),

  async created() {
    this.fetchItems()
  },

  computed: {
    currentUser(){
      return this.$store.state.user
    },

    headers () {
        return [
          {
            text: 'Nome',
            align: 'center',
            sortable: false,
            value: 'nomeCompra',
          },
          {
            text: 'Parcelamento (Vezes)',
            align: 'center',
            value: 'parcelasCompra',
          },
          { 
            text: 'Valor Parcelas (R$)', 
            align: 'center',
            value: 'valorParcelasCompra',
          },
          { 
            text: 'Valor Total (R$)', 
            align: 'center',
            value: 'valorCompra',
          },
          
          { 
            text: 'Tipo de Compra', 
            align: 'center',
            value: 'tipoCompra',
          },
          { 
            text: 'Data Compra', 
            align: 'center',
            value: 'dataCompra',
            // formatter: formatCurrency
          },
        ]
      },
  },

  methods: {

    async fetchItems(){
      this.compras = await lerCompras(this.currentUser.email)
    },

    filterOnlyLowerText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
      },
  }
}
  
</script>