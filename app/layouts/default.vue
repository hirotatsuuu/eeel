<template>
  <v-app>
    <div v-if="width > 825">
      <Header />
    </div>
    <div v-else>
      <MobileMenu />
    </div>
    <v-content>
      <v-container class="pt-0 mt-1">
        <nuxt />
      </v-container>
    </v-content>
    <div v-if="width > 825">
      <Footer />
    </div>
    <div v-else>
      <v-footer height="80">
        <v-container>
          <v-layout justify-center>
            <img src="@/assets/images/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome()">
          </v-layout>
        </v-container>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import MobileMenu from '@/components/mobile-menu'

export default {
  data() {
    return {
      width: window.parent.screen.width
    }
  },
  components : {
    Header,
    Footer,
    MobileMenu
  },
  created() {
    console.log('window.parent.screen.width', )
  },
  methods: {
      gotoHome() {
        this.$router.push("/")
      }
    }
}
</script>