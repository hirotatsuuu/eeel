<template>
  <div>
    <v-layout class="ma-1">
      <v-flex
        v-if="this.pid && this.pid == this.checkPid"
      >
        <v-card class="mb-5">
          <v-img
            :src="this.post.post_image_url"
            height="300"
          >
          </v-img>
          <v-card-title>
            <span
              class="title"
            >{{ this.post.title }}</span>
          </v-card-title>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar
                v-if="post.user_image_url"
              >
                <v-img
                  class="elevation-6"
                  :src="post.user_image_url"
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
                <div v-if="this.post.likes ? this.post.likes.indexOf(this.$store.getters['user/user'].uid) === -1 : true">
                  <v-btn
                    round
                    outline
                    color="red"
                    v-on:click="doCheer"
                    :disabled="isCheerButtonDisabled"
                  >
                    <v-icon>favorite</v-icon>
                    <strong style="margin-left: 3px;">応援する</strong>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    round
                    :dark="!isCheerButtonDisabled"
                    color="red"
                    v-on:click="undoCheer"
                    :disabled="isCheerButtonDisabled"
                  >
                    <v-icon>favorite</v-icon>
                    <strong style="margin-left: 3px;">応援済み</strong>
                  </v-btn>
                </div>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
          <v-card-text>
            <span style="white-space:pre-wrap; word-wrap:break-word;">{{ this.$store.getters['post/post'] ? this.$store.getters['post/post'].contents : null }}</span>
          </v-card-text>
        </v-card>

        <v-layout justify-center align-center text-xs-center>
          <v-flex>
            <span
              class="title"
            >応援コメントをする</span>
          </v-flex>
        </v-layout>
        <v-divider class="mx-5 mb-3"/>
        <v-card class="mb-5">
          <v-card-text>
            <v-textarea
              v-model="comment"
              label="応援メッセージを送りましょう"
              box
              outline
              auto-grow
              rows="5"
              counter="1000"
              maxlength="1000"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center align-center text-xs-center>
              <v-flex class="pb-3">
                <v-btn
                  round
                  outline
                  large
                  color="red"
                  v-on:click="doComment"
                  :disabled="!(!!comment) || isCommentButtonDisabled"
                >
                  <strong>がんばれ！</strong>
                </v-btn>
              </v-flex>
            </v-layout>
            </v-card-actions>
        </v-card>

        <v-layout justify-center align-center text-xs-center>
          <v-flex>
            <span
              class="title"
            >寄せられた応援</span>
          </v-flex>
        </v-layout>
        <v-divider class="mx-5 mb-3"/>
        <v-layout
          v-if="comments.length == 0"
          justify-center
          align-center
          text-xs-center
          class="mb-3"
        >
          <v-flex>
            <span style="color: gray;">まだ応援コメントはありません</span>
          </v-flex>
        </v-layout>
        <v-card
          v-for="comment in comments"
          :key="comment.cid"
          style="margin: 5px;"
        >
          <v-card-text>
            <div>{{ comment.comment }}</div>
          </v-card-text>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  :src="comment.image_url"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ comment.username }}</v-list-tile-title>
              </v-list-tile-content>

              <v-layout
                align-center
                justify-end
              >
                <v-btn
                  icon
                  v-on:click="!comment.is_like ? doLikeComment(comment.cid) : undoLikeComment(comment.cid)"
                >
                  <v-icon :color="comment.is_like ? 'red': 'grey darken-1'">favorite</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db, getTimestamp } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      post: '',
      pid: '',
      checkPid: '',
      isCheerButtonDisabled: true,
      comment: '',
      isCommentButtonDisabled: true,
      comments: []
    }
  },
  created() {
    console.log('mounted')
    this.$store.subscribe((mutation, state) => {
      console.log('subscribe', this.pid, this.checkPid)
      this.pid = this.$store.getters['post/pid']
      this.post = this.$store.getters['post/post']
      this.pid ? !this.checkPid ? this.getPost() : null : null
    })
    this.pid = this.$store.getters['post/pid']
    this.post = this.$store.getters['post/post']
    this.pid ? !this.checkPid ? this.getPost() : null : null
  },
  destoryed () {
    this.$store.commit(['post/setPost'], null)
    this.$store.commit(['post/setPid'], null)
  },
  methods: {
    getPost () {
      console.log('getPost', this.pid)
      db.collection('posts').doc(this.pid).get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc, doc.data(), this.$store.getters['post/post'])
            doc.id == this.pid ? this.$store.commit('post/setPost', doc.data()) : null
            this.checkPid = doc.id

            db.collection('posts').doc(this.pid).collection('comments')
              .onSnapshot(commentsSnapshot => {
                console.log('comments onSnapshot')
                const comments = []
                commentsSnapshot.forEach(cDoc => {
                  const comment = cDoc.data()
                  comment.cid = cDoc.id
                  comments.push(comment)
                })
                this.comments = comments
                this.isCheerButtonDisabled = false
                this.isCommentButtonDisabled = false
                console.log('get Comments', this.comments)
              })
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
          }
        }).catch(function(error) {
          console.log("Error getting document:", error)
        })
    },
    doCheer () {
      console.log('doCheer')
      this.isCheerButtonDisabled = true
      const updatePostObj = {
        like_num: firebase.firestore.FieldValue.increment(1),
        likes: firebase.firestore.FieldValue.arrayUnion(this.$store.getters['user/user'].uid)
      }
      db.collection("posts").doc(this.pid).update(updatePostObj)
        .then(() => {
          console.log('doCheer Done!!!')
          this.getPost()
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    undoCheer () {
      console.log('undoCheer')
      this.isCheerButtonDisabled = true
      const updatePostObj = {
        like_num: firebase.firestore.FieldValue.increment(-1),
        likes: firebase.firestore.FieldValue.arrayRemove(this.$store.getters['user/user'].uid)
      }
      db.collection("posts").doc(this.pid).update(updatePostObj)
        .then(() => {
          console.log('undoCheer Cry....')
          this.getPost()
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    doComment () {
      console.log('doComment')
      if (!this.comment) {
        return 0
      }
      this.isCommentButtonDisabled = true
      const updatePostObj = {
        comment_num: firebase.firestore.FieldValue.increment(1)
      }
      const addCommentObj = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        image_url: this.$store.getters['user/user'].userImage,
        comment: this.comment,
        reply: null,
        is_like: false,
        is_hide: false,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        update_at: firebase.firestore.FieldValue.serverTimestamp()
      }
      const addCommentRef = db.collection("posts").doc(this.pid).collection("comments")
      const updatePostRef = db.collection("posts").doc(this.pid)

      addCommentRef.add(addCommentObj)
        .then(acDoc => {
          console.log("add comment", acDoc.id)
          updatePostRef.update(updatePostObj)
            .then(doc => {
              console.log("update post")
              this.isCommentButtonDisabled = false
              this.comment = ''
              this.getPost()
            })
            .catch(error => {
              console.log('update post', error)
            })
        })
        .catch(error => {
          console.log('add comment', error)
        })
    },
    doLikeComment (cid) {
      console.log('doLikeComment')
      db.collection("posts").doc(this.pid).collection("comments").doc(cid).update({
        is_like: true
      })
        .then(doc => {
          this.getPost()
        })
        .catch(error => {
          console.log('doLikeComment error', error)
        })
    },
    undoLikeComment (cid) {
      console.log('undoLikeComment')
      db.collection("posts").doc(this.pid).collection("comments").doc(cid).update({
        is_like: false
      })
        .then(doc => {
          this.getPost()
        })
        .catch(error => {
          console.log('undoLikeComment error', error)
        })
    }
  }
}
</script>
