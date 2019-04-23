// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  // 'hogeFromStore' という名前の状態を管理する
  hogeFromStore: 'Hello, Vuex!'
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  // ここでは hogeFromStore の状態（値）を変更する処理を定義
  setHogeFromStore(state, value) {
    state.hogeFromStore = value
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  writeHoge(context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setHogeFromStore', value)
  }
}