<template>
  <v-footer height="80">
    <v-container>
      <v-layout justify-center>
        <img src="@/assets/images/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome()">
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  created() {
    console.log('mobile-footer created')
  },
  methods: {
    gotoHome() {
      this.$router.push("/")
    }
  }
}
</script>