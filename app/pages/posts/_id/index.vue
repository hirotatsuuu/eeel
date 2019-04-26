<template>
  <div>
    <v-layout justify-center>
      <v-flex
        v-if="this.$store.getters['post/post']"
      >
        <v-card>
          <v-img
            :src="this.$store.getters['post/post'].post_image_url"
            height="300"
          >
          </v-img>
          <v-card-title>
            <span
              class="title"
            >{{ this.$store.getters['post/post'] ? this.$store.getters['post/post'].title : null }}</span>
          </v-card-title>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar
                v-if="this.$store.getters['post/post'].user_image_url"
              >
                <v-img
                  class="elevation-6"
                  :src="this.$store.getters['post/post'].user_image_url"
                ></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ this.$store.getters['post/post'].username }}</v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-layout
                align-center
                justify-end
              >
                <v-btn
                  flat
                  v-on:click="doCheer"
                >
                  <v-icon>favorite</v-icon>
                  <strong style="margin-left: 3px;">応援する</strong>
                </v-btn>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
          <v-card-text>
            <span style="white-space:pre-wrap; word-wrap:break-word;">{{ this.$store.getters['post/post'] ? this.$store.getters['post/post'].contents : null }}</span>
          </v-card-text>
        </v-card>
        <v-card style="margin-top: 15px;">
          <v-card-title>
            <span
              class="title"
              style="margin-right: 10px;"
            >コメント</span>
            <v-divider />
          </v-card-title>
          <v-card-text>
            <v-card style="margin: 5px;">
              <v-card-text>
                <div>// コメント内容</div>
              </v-card-text>
              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Evan You</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout
                    align-center
                    justify-end
                  >
                    <v-icon class="mr-1">favorite</v-icon>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>
            <v-card style="margin: 5px;">
              <v-card-text>
                <div>// コメント内容</div>
              </v-card-text>
              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Evan You</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout
                    align-center
                    justify-end
                  >
                    <v-icon class="mr-1">favorite</v-icon>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>
            <v-card style="margin: 5px;">
              <v-card-text>
                <div>// コメント内容</div>
              </v-card-text>
              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Evan You</v-list-tile-title>
                  </v-list-tile-content>

                  <v-layout
                    align-center
                    justify-end
                  >
                    <v-icon class="mr-1">favorite</v-icon>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db } from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  data() {
    return {
      post: this.$store.getters['post/post']
    }
  },
  mounted() {
    console.log('mounted')
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
    this.getPost()
  },
  methods: {
    getPost () {
      console.log('getPost', this.$store.getters['post/pid'])
      const querySnapshot = db
        .collection('posts')
        .doc(this.$store.getters['post/pid'])
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.$store.commit('post/setPost', doc.data())
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    doCheer () {

    }
  }
}
</script>
