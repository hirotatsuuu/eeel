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
      <v-toolbar-title><img src="/logo.png" alt="logo" style="height: 120px;"></v-toolbar-title>
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
  </v-app>
</template>


