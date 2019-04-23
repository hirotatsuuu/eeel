<template>
  <div>
    <nuxt />
    <v-footer
      height="auto"
      light
      fixed
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          <img src="/logo.png" alt="logo" style="height: 35px;">
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'eeelについて',
        'ガイドライン',
        'プライバシーポリシー',
        '利用規約',
        'Twitter'
      ]
    })
  }
</script>