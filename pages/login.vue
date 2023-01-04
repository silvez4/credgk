<template>
  <div>
    <v-container>
      <h1>Bem Vindo <span v-if="currentUser">{{ currentUser.displayName }}</span></h1>
      
      <v-card v-if="!currentUser" elevation="4">
        <SignIn />
      </v-card>
      <v-btn v-on:click="snackbar = true">
        nack
      </v-btn>
      <v-btn v-on:click="teste()">
        teste
      </v-btn>
      <v-card v-if="currentUser" elevation="4" class="text-center mt-5">
        <h2>Usuario já Logado</h2>
        <v-btn
            color="red"
            class="mt-3"
            v-on:click="signOut()"
          >
            Sair
          </v-btn>
      </v-card>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :vertical=true
      elevation="24"
      color="red accent-2"
    >
      {{ acessDeniedText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue';

export default {
  data: () => ({
    snackbar: false,
    acessDeniedText: 'Realize Login Parar Acessar o Dashboard',
    timeout: 4000,
    rota: 'ol'
  }),

  computed: {
    currentUser(){
      return this.$store.state.user
    }
  },

  watch: {
    rota(newV){
      // console.log(old)
      console.log(newV)
    },
  },

  components: {
    SignIn
  },

  methods: {
    signOut() {
      this.$fire.auth.signOut();
      window.location = "/login"
    },

    route() {
      this.snackbar = true;
    },

    teste() {
      this.rota = 'novo'
      // this.route()
      console.log(window.$nuxt)
      console.log(this.$nuxt.context)
      console.log(this.$nuxt.context.route.name)
    }
  },
  
}
</script>
