<template>
  <v-app>
    <v-toolbar
      fixed
      app
    >
      <v-btn
        icon
      >
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>mail</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title>
        <img src="/logo.png" alt="logo" style="height: 35px;">
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
      >
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn
        icon
      >
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      height="auto"
      light
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex
          lighten-2
          py-3
          text-xs-center
          xs12
        >
          <img src="/logo.png" alt="logo" style="height: 35px;">
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {

  }
</script>