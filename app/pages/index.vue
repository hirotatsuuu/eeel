<template>
  <div>
    <v-layout row wrap>
      <v-flex
        v-for="post in $store.getters['post/posts']"
        :key="post.id"
        xs12 sm6 md4
      >
        <v-card
          v-on:click="gotoPostDetail(post.pid)"
          hover
          class="ma-1"
        >
          <v-img
            :src="post.post_image_url"
            height="200px"
          >
            <v-container
              fill-height
              fluid
              pa-2
            >
              <v-layout fill-height>
                <v-flex xs12 sm6 md4 align-end flexbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text class="py-0 mt-3">
            <span class="headline" v-text="post.title"></span>
          </v-card-text>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar>
                <v-img
                  class="elevation-6"
                  :src="post.user_image_url ? post.user_image_url : sampleUserImage"
                ></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ post.username }}</v-list-tile-title>
              </v-list-tile-content>
              <v-layout
                align-center
                justify-end
                style="margin-bottom: 10px;"
              >
                <v-icon class="mr-1">favorite</v-icon>
                <span class="subheading mr-2">{{ post.like_num }}</span>
                <span class="mr-2" />
                <v-icon class="mr-1">comment</v-icon>
                <span class="subheading">{{ post.comment_num }}</span>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db, storage } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
    sampleUserImage: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
    }
  },
  mounted() {
    console.log('mounted')
    this.checkLogin()
    this.getPosts()
  },
  methods: {
    checkLogin () {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push("/account/login")
        } else {
          console.log('user', user.uid, user.email)
        }
      })
    },
    getPosts () {
      console.log('getPosts')
      const querySnapshot = db
        .collection('posts')
        .where('is_start', '==', true)
        .onSnapshot(querySnapshot => {
          var posts = []
          console.log('querySnapshot', querySnapshot)
          querySnapshot.forEach(doc => {
            console.log('title: ', doc.data())
            const post = doc.data()
            post.pid = doc.id
            posts.push(post)
          })
          this.$store.commit('post/setPosts', posts)
        })
    },
    gotoPostDetail(pid) {
      this.$store.commit('post/setPid', pid)
      this.$router.push("/posts/" + pid)
    },
  }
}
</script>
