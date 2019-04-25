<template>
  <div>
      <h1>新しい挑戦をはじめる</h1>
      <v-text-field
        v-model="title"
        label="title"
      ></v-text-field>
      <v-text-field
        v-model="contents"
        label="contents"
      ></v-text-field>
      <v-btn
        v-on:click="doCreatePost"
      >作成</v-btn>
      <v-btn
        v-on:click="getPosts"
      >取得</v-btn>
  </div>
</template>

<script>
import firebase, { db, getTimestamp } from '~/plugins/firebase'

export default {
  layout: 'header',
  middleware: 'authenticated',
  data() {
    return {
      title: 'はじめての挑戦',
      contents: '世界一周します',
      img: 'url'
    }
  },
  mounted() {
    console.log('mounted', this.$store.getters['user/user'])
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/login")
      } else {
        console.log('user', user.uid, user.email)
      }
    })
  },
  methods: {
    getPosts () {
      const querySnapshot = db
        .collection('posts')
        .where('is_start', '==', true)
        .onSnapshot(querySnapshot => {
          var posts = [];
          querySnapshot.forEach(doc => {
            console.log('title: ', doc.data().title)
            posts.push(doc.data().title);
          });
        });
    },
    doCreatePost() {
      console.log('doCreatePost', this.$store.getters['user'])
      const post = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        img: this.img,
        title: this.title,
        contents: this.contents,
        likes: null,
        comments: null,
        comment_num: 0,
        like_num: 0,
        is_start: true,
        is_fin: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp(),
      }
      db.collection("posts").add(post)
        .then(function () {
          console.log("create post")
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    }
  }
}
</script>
