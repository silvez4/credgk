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
              >Pagar Fatura</v-btn>
          
          </template>
          <v-card>
              <v-card-title class="text-h5 justify-center">
                Abater Valor da Fatura
              </v-card-title>
              <v-card-text>
                <v-container>
                      <v-text-field
                        v-model="valorDeposito"
                        label="Valor a Pagar"
                        prefix="R$"
                        @click="valorDeposito = ''"
                        hint="Separe Apenas os Centavos"
                        @blur="parseMoney(valorDeposito)"
                        persistent-hint
                        required
                      />
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-alert
                        dense
                        shaped
                        outlined
                        :value="alertError"
                        type="error"
                      >
                        Digite um valor <strong>numérico</strong>
                      </v-alert>
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
                  @click="sendFatura()"
                >
                  Adicionar
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
import { pagarFatura } from '@/firebase/crud'

export default {
  name: 'Pagar Fatura',


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

    async sendFatura() {
      this.depositoDialog = false
      await pagarFatura(this.valorDeposito, this.currentUser.email)
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