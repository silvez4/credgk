<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="currentUser"
      color="indigo darken-4"
      v-model="drawer"
      :clipped=true
      fixed
      app
    >
    <v-list-item two-line class="px-2">
      <v-list-item-avatar>
            <img :src=currentUser.photoURL>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ currentUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list>
        <v-list-item
          router
          exact
          to="/"
        >
        <v-list-item-action>
            <v-icon> mdi-apps </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Dashboard </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
        :value="true"
        prepend-icon="mdi-piggy-bank-outline"
      >
        <template v-slot:activator>
          <v-list-item-title>Minhas Contas</v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="red" v-on:click="signOut()" block>
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      v-if="currentUser"
      color="indigo darken-4"
      :clipped-left=true
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" 
      >
      <v-icon v-if="drawer">mdi-backburger </v-icon>
    </v-app-bar-nav-icon>
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
  
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  
    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      items: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/'
        // },
        {
          icon: 'mdi-bank',
          title: 'Nubank',
          to: '/bankAccounts',
        },
        {
          icon: 'mdi-bank',
          title: 'Itaú',
          to: '#',
        },
        {
          icon: 'mdi-plus-circle-outline',
          title: 'Adicionar Conta',
          to: '#',
        },
        ],
      // miniVariant: false,
      title: 'Caderneta GK'
    }
  },
  
  computed: {
    currentUser(){
      return this.$store.state.user
    }
  },

  methods: {
    signOut() {
      this.$fire.auth.signOut();
      window.location = "/login"
    },
  }
}
</script>
