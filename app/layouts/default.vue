<template>
  <v-app>
    <Header />
    <v-content>
      <v-container class="pt-0 mt-1">
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  components : {
    Header,
    Footer
  }
}
</script>
