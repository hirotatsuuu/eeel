<template>
  <div>
    <!-- $store.state経由で状態の取得 -->
    <p>store: {{this.$store.state.sample.hogeFromStore}}</p>
    <!-- $store.dispatch経由でactionを呼び出す -->
    <button v-on:click="$store.dispatch('sample/writeHoge', '値を書き換えます')">Test</button>
    <!-- コンポーネントのScript経由で利用することも可能 -->
    <button v-on:click="testMethod()">Test2</button>
  </div>
</template>

<script>
export default {
  methods: {
    // Scriptからも参照可能
    testMethod: function() {
      console.log(this.$store.state.sample.hogeFromStore)
      this.$store.dispatch('sample/writeHoge', 'メソッドからの書き換え')
      console.log(this.$store.state.sample.hogeFromStore)
    }
  }
}
</script>