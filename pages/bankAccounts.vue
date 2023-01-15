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
      <v-dialog
      transition="dialog-bottom-transition"
      persistent
      v-model="dialog"
      max-width="70%"
      min-width="500px"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="elevation-1" color="primary" 
        v-bind="attrs"
        v-on="on"
        >Adicionar Compra</v-btn>
    
    </template>
    <v-card>
        <v-card-title class="text-h5 justify-center">
          Adicionar Comprar com o Cartão
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col>
              <v-text-field
                    label="Nome da Transação"
                    prepend-icon="mdi-rename-box-outline"
                    v-model="nameTransaction"
                    required
                  ></v-text-field>
            </v-col>
            <v-col
              >
                <v-select
                  :items="['Crédito', 'Débito']"
                  prepend-icon="mdi-credit-card-multiple-outline"
                  v-model="typeTransaction"
                  label="Tipo de Transação"
                  required
                ></v-select>
              </v-col>

            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateTransaction"
                  label="Data de Compra"
                  hint="DD/MM/YYYY"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="datePickerVal"
                show-current="false"
                locale="pt-br"
                no-title
                color="green lighten-1"
                @input="menu = false; dateTransaction = parseDate(datePickerVal); checkFields()"
              />
            </v-menu>
            </v-col>

            <v-row>
              <v-col cols="3" sm="3" xs="3">
                <v-text-field
                  v-model="qtdParcels"
                  label="Parcelas"
                  type="number"
                  prepend-icon="mdi-cash"
                />
              </v-col>

              <v-col cols="6" sm="4" xs="4">
                <v-text-field
                  v-model="valorTransaction"
                  label="Valor Total"
                  prefix="R$"
                  @click="valorTransaction = ''; valParcels = ''"
                  hint="Separe Apenas os Centavos"
                  @blur="parseMoney(valorTransaction)"
                  persistent-hint
                  required
                />
              </v-col>

              <v-col cols="6" sm="4" xs="4">
                <v-text-field
                  v-model="valParcels"
                  prefix="R$"
                  label="Valor Parcela"
                  readonly
                />
              </v-col>
            </v-row>
            
            <v-col class="red--text text-center">
              <h4>Preencha Todos os Campos Antes de Salvar</h4>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false; resetValues()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            :disabled="fieldsHasNoData"
            @click="addTransaction()"
          >
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-btn class="elevation-1" color="indigo" @click="addFunds()">Adicionar Deposito</v-btn>
    <v-btn class="elevation-1" color="success" @click="payBill()">Pagar Fatura</v-btn>
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
import { saveCompra, saveDeposito } from '@/firebase/crud'

export default {
  name: 'InspirePage',
  middleware: 'auth',

  data: () =>({
    nameTransaction: '',
    typeTransaction: '',
    valorTransaction: '',
    dateTransaction: '',
    qtdParcels: 1,
    valParcels: '',
    fieldsHasNoData: true,
    menu: false,
    datePickerVal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialog: false,
    newTransactions: {},
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
    this.dateTransaction = this.dataAtualFormatada()
  },

  watch: {
    nameTransaction(val,oldval){
      this.checkFields()
    },

    typeTransaction(val,oldval){
      this.checkFields()
    },
    dateTransaction(val,oldval){
      this.checkFields()
    },
    valorTransaction(val,oldval){
      this.checkFields()
      this.calculateParcel()
    },
    qtdParcels(val,oldval){
      this.checkFields()
      this.calculateParcel()
    },
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
     
      currentUser(){
        return this.$store.state.user
      }
    },

  methods: {
    resetValues() {
      console.log(parseFloat(this.valorTransaction).toLocaleString('pt-br', {minimumFractionDigits: 2})
      // x = Date().toLocaleString("en-GB")
      )
      this.nameTransaction = ''
      this.typeTransaction = ''
      this.valorTransaction = ''
      this.qtdParcels = 1
      this.valParcels = ''
      return
    },

    parseDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      },

    dataAtualFormatada(){
      var data = new Date(),
          dia  = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length == 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return diaF+"/"+mesF+"/"+anoF;
    },

    parseMoney (money) {
        if (!money) return null

        let regex = /^[0-9]+(,[0-9]|.[0-9]+)*$/
        let CorrectFormat = regex.test(money)
        if(CorrectFormat){
          let moneyConverted = parseFloat(money).toLocaleString('pt-br', {minimumFractionDigits: 2})
          this.valorTransaction = moneyConverted
          // console.log(this.valorTransaction)
          return 
        }
        else{
          this.valorTransaction = ''
          this.valParcels = ''
          return
        }
        return
      },

    checkFields(){
      if(this.nameTransaction != '' && this.typeTransaction != '' && this.dateTransaction != '' && this.valorTransaction != '' && this.qtdParcels != ''){
        this.fieldsHasNoData = false
      }
      else{
        this.fieldsHasNoData = true
      }
    },

    async addTransaction() {
      let dateTime = new Date().toLocaleString("pt-BR")
      
      this.newTransactions = {
          'nomeCompra': this.nameTransaction,
          'tipoCompra': this.typeTransaction,
          'dataCompra': this.dateTransaction,
          'parcelasCompra': this.qtdParcels,
          'valorCompra': this.valorTransaction,
          'valorParcelasCompra': this.valParcels,
          'criadoEm' : dateTime
      }
      // console.log(this.newTransactions)
      await saveCompra(this.newTransactions, this.currentUser.email)
      await saveDeposito(this.newTransactions, this.currentUser.email)
      

      // await setDoc(doc(db, "users", this.currentUser.email, 'compras', uuidv4()), this.newTransactions, { merge: true });

      // const q = query(collection(db, "users", this.currentUser.email, ano));

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      // });
    },

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

    calculateParcel() {
      if(this.valorTransaction != '' && this.qtdParcels != ''){
        let total = parseFloat(this.valorTransaction.replaceAll('.',''))
        console.log(total)
        this.valParcels = parseFloat(total / parseFloat(this.qtdParcels)).toLocaleString('pt-br', {minimumFractionDigits: 2})
      }
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
