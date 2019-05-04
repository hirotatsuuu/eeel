<template>
  <div>
    <v-layout class="ma-1">
      <v-flex
        v-if="this.pid && this.pid == this.checkPid"
      >
        <!-- 挑戦詳細 -->
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
                <div v-if="post.uid === this.$store.getters['user/user'].uid">
                  <v-icon class="mr-1" :color="post.like_num !== 0 ? 'red' : 'gray'">favorite</v-icon>
                  <span class="mb-3" style="font-size: 1.5rem;">
                    <span :style="post.like_num !== 0 ? 'color: red;' : 'color: gray;'">
                      {{ post.like_num }}
                    </span>
                  </span>
                </div>
                <div v-else-if="this.post.likes ? this.post.likes.indexOf(this.$store.getters['user/user'].uid) === -1 : true">
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

        <!-- 応援コメントをする -->
        <div v-if="post.uid !== this.$store.getters['user/user'].uid && !isComment">
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
        </div>

        <!-- 寄せられたコメント -->
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
        <div
          v-else
          v-for="comment in comments"
          :key="comment.cid"
          style="margin: 5px;"
        >
          <v-card v-if="!(!!comment.reply)" class="pb-1">
            <v-card-text>
              <div v-show="!isEditComment || editKey !== comment.cid">
                {{ comment.comment }}
              </div>
              <div v-show="isEditComment && editKey === comment.cid">
                <v-textarea
                  v-model="editComment"
                  label="「ありがとう」を伝えましょう"
                  box
                  outline
                  auto-grow
                  rows="5"
                  counter="1000"
                  maxlength="1000"
                ></v-textarea>
                <v-layout justify-center align-center text-xs-center>
                  <v-flex class="pb-3">
                    <v-btn
                      round
                      outline
                      large
                      v-on:click="doEditComment(comment.cid)"
                    >
                      <strong>編集</strong>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>
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

                <div v-if="post.uid === $store.getters['user/user'].uid">
                  <v-btn
                    icon
                    v-on:click="!comment.is_like ? doLikeComment(comment.cid) : undoLikeComment(comment.cid)"
                  >
                    <v-icon :color="comment.is_like ? 'red' : 'grey darken-1'">favorite</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    v-on:click="changeReplyComment(comment.cid)"
                    :disabled="comment.is_reply"
                  >
                    <v-icon
                      :color="comment.is_reply ? 'blue' : 'grey darken-1'"
                    >mode_comment</v-icon>
                  </v-btn>
                </div>
                <div v-else-if="comment.uid === $store.getters['user/user'].uid">
                  <v-btn icon style="pointer-events:none;">
                    <v-icon :color="comment.is_like ? 'red' : 'grey darken-1'">favorite</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    v-on:click="changeEditComment(comment.cid, comment.comment)"
                  >
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    v-on:click="doDeleteComment(comment.cid)"
                    :disabled="comment.is_reply"
                  >
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </div>
              </v-list-tile>
            </v-card-actions>

            <!-- リプライコメント表示 -->
            <div
              v-for="replyComment in comments"
              :key="replyComment.cid"
              class="mx-3 mb-1"
            >
              <v-card v-if="comment.cid === replyComment.reply">
                <v-card-text>
                  <div v-show="!isEditReply || editKey !== replyComment.cid">
                    {{ replyComment.comment }}
                  </div>
                  <div v-show="isEditReply && editKey === replyComment.cid">
                    <v-textarea
                      v-model="editReply"
                      label="「ありがとう」を伝えましょう"
                      box
                      outline
                      auto-grow
                      rows="5"
                      counter="1000"
                      maxlength="1000"
                    ></v-textarea>
                    <v-layout justify-center align-center text-xs-center>
                      <v-flex class="pb-3">
                        <v-btn
                          round
                          outline
                          large
                          v-on:click="doEditReply(replyComment.cid)"
                        >
                          <strong>編集</strong>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar>
                      <v-img
                        class="elevation-6"
                        :src="replyComment.image_url"
                      ></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ replyComment.username }}</v-list-tile-title>
                    </v-list-tile-content>

                    <div v-if="(post.uid === $store.getters['user/user'].uid || $store.getters['user/user'].uid === comment.uid) && $store.getters['user/user'].uid !== replyComment.uid">
                      <v-btn
                        icon
                        v-on:click="!replyComment.is_like ? doLikeComment(replyComment.cid) : undoLikeComment(replyComment.cid)"
                      >
                        <v-icon :color="replyComment.is_like ? 'red' : 'grey darken-1'">favorite</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-on:click="changeReplyComment(comment.cid)"
                        :disabled="replyComment.is_reply"
                      >
                        <v-icon color="grey darken-1">mode_comment</v-icon>
                      </v-btn>
                    </div>
                    <div v-else-if="$store.getters['user/user'].uid === replyComment.uid">
                      <v-btn icon style="pointer-events:none;">
                        <v-icon :color="replyComment.is_like ? 'red' : 'grey darken-1'">favorite</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-on:click="changeEditReply(replyComment.cid, replyComment.comment)"
                      >
                        <v-icon color="grey darken-1">edit</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-on:click="doDeleteComment(replyComment.cid, replyComment.reply)"
                        :disabled="replyComment.is_reply"
                      >
                        <v-icon color="grey darken-1">delete</v-icon>
                      </v-btn>
                    </div>
                  </v-list-tile>
                </v-card-actions>
              </v-card>
            </div>

            <!-- リプライコメントフォーム -->
            <v-slide-y-transition v-if="!(!!comment.reply)">
              <v-card-text v-show="isReplyComment && replyCommentKey === comment.cid">
                <v-textarea
                  v-model="reply"
                  label="「ありがとう」を伝えましょう"
                  box
                  outline
                  auto-grow
                  rows="5"
                  counter="1000"
                  maxlength="1000"
                ></v-textarea>
                <v-layout justify-center align-center text-xs-center>
                  <v-flex class="pb-3">
                    <v-btn
                      round
                      outline
                      large
                      v-on:click="doReplyComment(comment.cid)"
                    >
                      <strong>返信する</strong>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase, { db, getTimestamp, getIncrement, getDecrement } from '~/plugins/firebase'

export default {
  middleware: 'authenticated',
  data() {
    return {
      post: '',
      pid: '',
      checkPid: '',
      isCheerButtonDisabled: true,
      isCommentButtonDisabled: true,
      comment: '',
      comments: [],
      reply: '',
      replyCommentKey: '', // コメント返信フォームを表示するかのフラグ
      isReplyComment: false,
      editKey: '',
      isComment: false,
      isEditComment: false,
      editComment: '',
      isEditReply: false,
      editReply: '',
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
      db.collection('posts').doc(this.pid).onSnapshot(doc => {
          if (doc.exists) {
            // console.log("Document data:", doc, doc.data(), this.$store.getters['post/post'])
            doc.id == this.pid ? this.$store.commit('post/setPost', doc.data()) : null
            this.checkPid = doc.id

            const commentsRef = db.collection('posts').doc(this.pid).collection('comments')
            commentsRef.onSnapshot(cDoc => {
                // console.log('comments empty', cDoc.empty)
                if(!cDoc.empty) {
                  commentsRef.orderBy('created_at', 'asc').get()
                    .then(commentsSnapshot => {
                      // console.log('comments onSnapshot')
                      const comments = []
                      commentsSnapshot.forEach(cDoc => {
                        const comment = cDoc.data()
                        comment.cid = cDoc.id
                        comments.push(comment)
                      })
                      this.comments = comments
                      this.checkIsComment()
                      this.isCheerButtonDisabled = false
                      this.isCommentButtonDisabled = false
                      // console.log('get Comments', this.comments)
                    })
                } else {
                  this.isComment = false
                  this.isCheerButtonDisabled = false
                  this.isCommentButtonDisabled = false
                }
              })
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
          }
        })
    },
    checkIsComment () {
      console.log('checkIsComment')
      this.comments.some(comment => {
        if (comment.uid === this.$store.getters['user/user'].uid) {
          this.isComment = true
          return true
        } else {
          this.isComment = false
        }
      })
    },
    doCheer () {
      console.log('doCheer')
      this.isCheerButtonDisabled = true
      const updatePostObj = {
        like_num: getIncrement(),
        likes: firebase.firestore.FieldValue.arrayUnion(this.$store.getters['user/user'].uid),
        update_at: getTimestamp()
      }
      db.collection("posts").doc(this.pid).update(updatePostObj)
        .then(() => {
          console.log('doCheer Done!!!')
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    undoCheer () {
      console.log('undoCheer')
      this.isCheerButtonDisabled = true
      const updatePostObj = {
        like_num: getDecrement(),
        likes: firebase.firestore.FieldValue.arrayRemove(this.$store.getters['user/user'].uid),
        update_at: getTimestamp()
      }
      db.collection("posts").doc(this.pid).update(updatePostObj)
        .then(() => {
          console.log('undoCheer Cry....')
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
        comment_num: getIncrement(),
        update_at: getTimestamp()
      }
      const addCommentObj = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        image_url: this.$store.getters['user/user'].userImage,
        comment: this.comment,
        reply: null,
        is_reply: false,
        is_like: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp()
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
      console.log('doLikeComment', cid)
      const updateObj = {
        is_like: true,
        update_at: getTimestamp()
      }
      db.collection("posts").doc(this.pid).collection("comments").doc(cid).update(updateObj)
        .then(doc => {
        })
        .catch(error => {
          console.log('doLikeComment error', error)
        })
    },
    undoLikeComment (cid) {
      console.log('undoLikeComment')
      const updateObj = {
        is_like: false,
        update_at: getTimestamp()
      }
      db.collection("posts").doc(this.pid).collection("comments").doc(cid).update(updateObj)
        .then(doc => {
        })
        .catch(error => {
          console.log('undoLikeComment error', error)
        })
    },
    changeReplyComment (cid) {
      console.log('changeReplyComment')
      this.replyCommentKey = cid
      this.isReplyComment = !this.isReplyComment
      this.reply = ''
    },
    doReplyComment (cid) {
      console.log('doReplyComment')
      const updatePostObj = {
        comment_num: getIncrement(),
        update_at: getTimestamp()
      }
      const addReplyCommentObj = {
        uid: this.$store.getters['user/user'].uid,
        username: this.$store.getters['user/user'].username,
        image_url: this.$store.getters['user/user'].userImage,
        comment: this.reply,
        reply: cid,
        is_reply: false,
        is_like: false,
        is_hide: false,
        created_at: getTimestamp(),
        update_at: getTimestamp()
      }
      const updateCommentObj = {
        is_reply: true,
        update_at: getTimestamp()
      }

      const addCommentRef = db.collection("posts").doc(this.pid).collection("comments")
      const updatePostRef = db.collection("posts").doc(this.pid)
      const updateCommentRef = db.collection("posts").doc(this.pid).collection("comments")
      const getLatestByCidRef = db.collection("posts").doc(this.pid).collection("comments").where('reply', '==', cid).orderBy('created_at', 'desc').limit(1)

      updatePostRef.update(updatePostObj)
        .then(doc => {
          console.log("update post")
          getLatestByCidRef.get()
            .then(glDoc => {
              console.log('get latest', glDoc)
              if (glDoc.empty) {
                updateCommentRef.doc(cid).update(updateCommentObj)
                  .then(ucDoc => {
                    addCommentRef.add(addReplyCommentObj)
                      .then(acDoc => {
                        console.log("add comment", acDoc.id)
                        this.reply = ''
                        this.isReplyComment = !this.isReplyComment
                      })
                  })
              } else {
                glDoc.forEach(glSnap => {
                  console.log('glSnap', glSnap.id)
                  updateCommentRef.doc(glSnap.id).update(updateCommentObj)
                    .then(ucDoc => {
                      console.log("update comment", ucDoc)
                      addCommentRef.add(addReplyCommentObj)
                        .then(acDoc => {
                          console.log("add comment", acDoc.id)
                          this.reply = ''
                          this.isReplyComment = !this.isReplyComment
                        })
                    })
                })
            }
            })
            .catch(error => {
              console.log('update post', error)
            })
        })
        .catch(error => {
          console.log('add comment', error)
        })
    },
    changeEditComment (cid, comment) {
      console.log('changeEditComment')
      this.editKey = cid
      this.isEditComment = !this.isEditComment
      this.editComment = comment
    },
    doEditComment (cid) {
      console.log('doEditComment', cid, this.editComment)
      const updateObj = {
        comment: this.editComment,
        update_at: getTimestamp()
      }

      const updateCommentRef = db.collection("posts").doc(this.pid).collection("comments")

      updateCommentRef.doc(cid).update(updateObj)
        .then(() => {
          console.log('update comment done!!!')
          this.isEditComment = !this.isEditComment
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    doDeleteComment (cid, reply) {
      console.log('doDeleteComment', reply)

      const updatePostObj = {
        comment_num: firebase.firestore.FieldValue.increment(-1),
        update_at: getTimestamp()
      }
      const updateCommentObj = {
        is_reply: false,
        update_at: getTimestamp()
      }

      const getOldestByReplyRef = !!reply ? db.collection("posts").doc(this.pid).collection("comments").where('reply', '==', reply).orderBy('created_at', 'asc').limit(1) : null

      db.collection("posts").doc(this.pid).update(updatePostObj)
        .then(() => {
          console.log('decrement posts')
          db.collection("posts").doc(this.pid).collection("comments").doc(cid).delete()
            .then(() => {
              console.log('delete Cry....')
              if (!!reply) {
                getOldestByReplyRef.get()
                  .then(goDoc => {
                    console.log('get Oldest', goDoc)
                    if (goDoc.empty) {
                      db.collection("posts").doc(this.pid).collection("comments").doc(reply).update(updateCommentObj)
                    } else {
                      goDoc.forEach(goSnap => {
                        console.log('goSnap.id', goSnap.id)
                        db.collection("posts").doc(this.pid).collection("comments").doc(goSnap.id).update(updateCommentObj)
                      })
                    }
                  })
              } else {
                db.collection("posts").doc(this.pid).collection("comments").doc(cid).update(updateCommentObj)
              }
            })
            .catch(function (error) {
              console.log('error post: ', error)
            })
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    changeEditReply (cid, reply) {
      console.log('changeEditReply')
      this.editKey = cid
      this.isEditReply = !this.isEditReply
      this.editReply = reply

    },
    doEditReply (cid) {
      console.log('doEditReply')
      const updateObj = {
        comment: this.editReply,
        update_at: getTimestamp()
      }
      const updateCommentRef = db.collection("posts").doc(this.pid).collection("comments")

      updateCommentRef.doc(cid).update(updateObj)
        .then(() => {
          console.log('update reply done!!!')
          this.isEditReply = !this.isEditReply
        })
        .catch(function (error) {
          console.log('error post: ', error)
        })
    },
    doDeleteReply (cid, reply) {
      console.log('doDeleteReply')
    },
  }
}
</script>
