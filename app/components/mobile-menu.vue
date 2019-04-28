<template>
  <div>
    <v-speed-dial
      v-model="fab"
      bottom
      left
      hover
      fixed
      fab
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          white
          fab
        >
          <v-icon>menu</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        color="green"
        v-on:click="gotoMyAccount"
      >
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        v-on:click="gotoHome"
      >
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="purple"
      >
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="yellow"
      >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mail</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        v-on:click="gotoSettings"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-btn
      dark
      fab
      bottom
      right
      fixed
      v-on:click="gotoCreatePost"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  data() {
    return {
      fab: '',
      user: this.$store.getters['user/user']
    }
  },
  computed: {
    ...mapGetters({
      getUser: ['user/user']
    }),
  },
  created () {
    console.log('mobile-menu created', this.user)
    this.$store.subscribe((mutation, state) => {
      this.user = this.getUser
    })
  },
  methods: {
    gotoHome() {
      this.$router.push("/")
    },
    gotoCreatePost() {
      this.$router.push("/posts/create")
    },
    gotoMyAccount () {
      console.log('gotoMyAccount', this.user)
      this.$router.push("/users/" + this.user.uid)
    },
    gotoSettings() {
      this.$router.push("/settings")
    }
  }
}
</script>