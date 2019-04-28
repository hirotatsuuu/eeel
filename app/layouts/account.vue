<template>
  <v-app>
    <v-content>
      <v-container>
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
import Footer from '@/components/footer'
import MobileFooter from '@/components/mobile-footer'

export default {
  data() {
    return {
      width: window.innerWidth
    }
  },
  components: {
    Footer,
    MobileFooter
  }
}
</script>
