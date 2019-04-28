<template>
  <v-app>
    <div v-if="width > 825">
      <Header />
    </div>
    <div v-else>
      <MobileMenu />
    </div>
    <v-content>
      <v-container class="pa-0 my-0">
        <nuxt />
      </v-container>
    </v-content>
    <div v-if="width > 825">
      <Footer />
    </div>
    <div v-else>
      <MobileFooter />
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import MobileMenu from '@/components/mobile-menu'
import MobileFooter from '@/components/mobile-footer'

export default {
  data() {
    return {
      width: window.parent.screen.width
    }
  },
  components : {
    Header,
    Footer,
    MobileMenu,
    MobileFooter
  },
  created() {
    console.log('default created')
    console.log('window.parent.screen.width', window.parent.screen.width)
  },
  methods: {
    gotoHome() {
      this.$router.push("/")
    }
  }
}
</script>