<template>
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
</template>

<script>
import { salvarCompra } from '@/firebase/crud'

export default {
  name: 'Adicionar Compra',

  data: () =>({
    nameTransaction: '',
    typeTransaction: '',
    valorTransaction: '',
    dateTransaction: '',
    qtdParcels: 1,
    valParcels: '',
    // valorDeposito: '',
    newTransactions: {},
    fieldsHasNoData: true,
    // hasNoDepositData: true,
    menu: false,
    datePickerVal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialog: false,
    // depositoDialog: false,
    // saqueDialog: false,
  }),

  async mounted() {
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
      currentUser(){
        return this.$store.state.user
      }
  },

  methods: {
    resetValues() {
      console.log(parseFloat(this.valorTransaction).toLocaleString('pt-br', {minimumFractionDigits: 2})
      )
      this.nameTransaction = ''
      this.typeTransaction = ''
      this.valorTransaction = ''
      this.qtdParcels = 1
      this.valParcels = ''
    },

    parseDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
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

    parseMoney (money) {
        if (!money) return null

        let regex = /^[0-9]+(,[0-9]|.[0-9]+)*$/
        let CorrectFormat = regex.test(money)
        if(CorrectFormat){
          let moneyConverted = parseFloat(money.replaceAll(',', '.')).toLocaleString('pt-br', {minimumFractionDigits: 2})
          this.valorTransaction = moneyConverted
        }
        else{
          this.valorTransaction = ''
          this.valParcels = ''
        }
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
          'valorCompra': this.valorTransaction.replaceAll(',', '.'),
          'valorParcelasCompra': this.valParcels.replaceAll(',', '.'),
          'criadoEm' : dateTime
      }
      await salvarCompra(this.newTransactions, this.currentUser.email)
    },

    calculateParcel() {
      if(this.valorTransaction != '' && this.qtdParcels != ''){
        let total = parseFloat(this.valorTransaction.replaceAll(',', '.'))
        console.log(total)
        this.valParcels = parseFloat(total / parseFloat(this.qtdParcels)).toLocaleString('pt-br', {minimumFractionDigits: 2})
      }
    },
  }
}
</script>