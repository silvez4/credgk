<template>
  <v-dialog
            transition="dialog-bottom-transition"
            persistent
            v-model="depositoDialog"
            max-width="30%"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="elevation-1" color="indigo" 
              v-bind="attrs"
              v-on="on"
              >Adicionar Deposito</v-btn>
          
          </template>
          <v-card>
              <v-card-title class="text-h5 justify-center">
                Adicionar Dinheiro na Conta
              </v-card-title>
              <v-card-text>
                <v-container>
                      <v-text-field
                        v-model="valorDeposito"
                        label="Valor Deposito"
                        prefix="R$"
                        @click="valorDeposito = ''"
                        hint="Separe Apenas os Centavos"
                        @blur="parseMoney(valorDeposito)"
                        persistent-hint
                        required
                      />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="depositoDialog = false; valorDeposito = ''"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  :disabled="hasNoDepositData"
                  @click="addDeposito()"
                >
                  Adicionar
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
import { salvarDeposito } from '@/firebase/crud'

export default {
  name: 'Adicionar Deposito',

  data: () =>({
    valorDeposito: '',
    depositoDialog: false,
    hasNoDepositData: true,
    alertError: false,
  }),

  watch: {
    valorDeposito(val,oldval){
      this.checkFieldDeposit()
    },

    alertError(val){
      this.timerAlertError()
    },
    
  },

  computed: {
      currentUser(){
        return this.$store.state.user
      }
  },

  methods: {
    timerAlertError(){
      setTimeout(()=>{
        this.alertError=false
      },5000)
    },

    checkFieldDeposit(){
      if(this.valorDeposito != ''){
        this.hasNoDepositData = false
      }
      else{
        this.hasNoDepositData = true
      }

    },

    async addDeposito() {
      this.depositoDialog = false
      await salvarDeposito(this.valorDeposito, this.currentUser.email)
      this.valorDeposito = ''
    },

    parseMoney (money) {
        if (!money) return null

        let regex = /^[0-9]+(,[0-9]|.[0-9]+)*$/
        let CorrectFormat = regex.test(money)
        if(CorrectFormat){
          let moneyConverted = parseFloat(money.replaceAll(',', '.')).toLocaleString('pt-br', {minimumFractionDigits: 2})
          this.valorDeposito = moneyConverted 
        }
        else{
          this.valorDeposito = ''
          this.alert = true
        }
      },
  }
}
</script>