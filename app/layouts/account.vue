<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/footer'

export default {
  components: {
    Footer
  }
}
</script>
