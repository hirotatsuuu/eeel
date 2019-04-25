<template>
  <div>
    <v-layout justify-center>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <v-card
                v-on:click="gotoChallenge"
                hover
                style="margin: 5px"
              >
                <v-img
                  :src="card.src"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar>
                      <v-img
                        class="elevation-6"
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>hirotatsu</v-list-tile-title>
                    </v-list-tile-content>
                    <v-layout
                      align-center
                      justify-end
                      style="margin-bottom: 10px;"
                    >
                      <v-icon class="mr-1">favorite</v-icon>
                      <span class="subheading mr-2">256</span>
                      <span class="mr-2" />
                      <v-icon class="mr-1">comment</v-icon>
                      <span class="subheading">45</span>
                    </v-layout>
                  </v-list-tile>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-layout>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  data: () => ({
    cards: [
      { title: 'サンプル', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: 'とりま', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: '作ってみた', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      { title: 'あああ', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: '世界一周します', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: '嫌いなピーマン食べてみます', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: '会社を退職します', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'ブログ初めてみます', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
    ]
  }),
  mounted() {
    console.log('mounted')
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
  },
  methods: {
    gotoChallenge() {
      this.$router.push("/challenge")
    }
  }
}
</script>
