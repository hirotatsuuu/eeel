<template>
  <div>
    <nuxt />
    <v-footer
      height="auto"
      fixed
    >
      <v-container mx-auto>
        <v-layout wrap>
          <v-flex xs9>
            <v-btn
              v-for="link in links"
              :key="link.title"
              :href="link.href"
              class="ml-0 mr-3"
              target="_blank"
              flat
            >
              {{ link.title }}
            </v-btn>
          </v-flex>
          <v-spacer />
            <div style="cursor: pointer;">
              <img src="/logo.png" alt="logo" style="height: 35px;" v-on:click="gotoHome()">
            </div>
        </v-layout>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {
          title: 'eeelについて',
          url: '',
        },
        {
          title: 'ガイドライン',
          url: '',
        },
        {
          title: 'プライバシーポリシー',
          url: '',
        },
        {
          title: '利用規約',
          url: '',
        },
        {
          title: 'Twitter',
          url: '',
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