<template>
  <section class="container">
    <header class="title">Моделирование системы массового обслуживания</header>

    <div class="buttons-group">
      <button class="button-start" @click="start">start</button>
      <button class="button-pause" @click="pause">pause</button>
      <button class="button-add" @click="addRequest">add request</button>
      <button class="button-serve" @click="serveRequest">serve request</button>
    </div>
    <Queue
      :requests="requests"
      :counter="counter"
    />
  </section>
</template>

<script>
import Queue from '~/components/Queue.vue'
import { delay, getRandom } from '~/assets/utils'

export default {
  data: () => ({
    requests: [],
    counter: 1,
    addTimeout: 0,
    serveTimeout: 0,
  }),
  components: {
    Queue
  },
  methods: {
    start() {
      this.addCycle()
      this.serveCycle()
    },
    addCycle() {
      const s = getRandom(1, 2) * 1000

      this.addTimeout = setTimeout(() => {
        this.addRequest()
        this.addCycle()
      }, s)
    },
    serveCycle() {
      const s = getRandom(2, 5) * 1000

      setTimeout(() => {
        this.serveTimeout = this.serveRequest()
        this.serveCycle()
      }, s)
    },
    pause() {
      clearTimeout(this.addRequest)
      clearTimeout(this.serveTimeout)
    },
    addRequest() {
      let requestsCopy = this.requests.slice()
      requestsCopy.push(this.counter)
      this.requests = requestsCopy
      this.counter += 1

      console.log(this.requests)
    },
    serveRequest() {
      let requestsCopy = this.requests.slice()
      requestsCopy.shift()
      this.requests = requestsCopy

      console.log(this.requests)
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 20px;
  color: #35495e;
  letter-spacing: 1px;
}

.buttons-group {
  min-height: 100px;
  display: flex;
  align-items: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

