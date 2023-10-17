<script>
export default {
  data() {
    return {
      count: 0,
      text: ''
    }
  },
  
  methods: {
    onInput(e){
      this.text = e.target.value
    },
    increment() {
      // update component state
      this.count++
    }
  },
  props: {
    msg: String
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card bg-black text-white">
    <button type="button" @click="increment">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <input :value="text" @input="onInput">
    {{ text }}
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
