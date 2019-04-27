<template>
  <v-footer
    height="auto"
    app
  >
    <v-container mx-auto>
      <v-layout wrap>
        <v-flex xs9>
          <v-btn
            v-for="link in links"
            :key="link.title"
            :href="link.url"
            class="ml-0 mr-3"
            target="_blank"
            flat
            round
            style="text-transform: none;"
          >
            {{ link.title }}
          </v-btn>
        </v-flex>
        <v-spacer />
          <div style="cursor: pointer;">
            <img src="@/assets/images/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome()">
          </div>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          title: 'eeelについて',
          url: '/about',
        },
        {
          title: 'Twitter',
          url: 'https://twitter.com/hirotatsuuu',
        }
      ]
    }),
    methods: {
      gotoHome() {
        this.$router.push("/")
      }
    }
  }
</script>
