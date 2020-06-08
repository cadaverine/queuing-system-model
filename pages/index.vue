<template>
  <section class="container">
    <header class="title">Моделирование системы массового обслуживания</header>

    <div class="buttons-group">
      <button class="button-start" @click="start">start</button>
      <button class="button-pause" @click="pause">pause</button>
      <button class="button-add" @click="addRequest">add request</button>
      <button class="button-serve" @click="serveRequest">serve request</button>
    </div>
    <div class="inputs-group">
      <div class="input-speed-group">
        <div class="input-speed-title">modeling speed:</div>
        <input type="text" class="input-speed" v-model="speed">
        <div class="input-speed-unit">x</div>
      </div>
      <div class="input-capacity-group">
        <div class="input-capacity-title">queue capacity:</div>
        <input type="text" class="input-capacity" v-model="capacity">
      </div>
      <div class="input-number-group">
        <div class="input-number-title">requests number:</div>
        <input type="text" class="input-number" v-model="maxNumber">
      </div>
    </div>
    <Queue
      :requests="requests"
      :capacity="capacity"
      :counter="counter"
    />
    <div class="stats-group">
      <div class="stats-group-lost">
        <div class="stats-lost-title">was lost:</div>
        <div class="stats-lost-value" v-text="lost"/>
      </div>
      <div class="stats-group-served">
        <div class="stats-served-title">was served:</div>
        <div class="stats-served-value" v-text="served"/>
      </div>
    </div>
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
    speed: 1,
    capacity: 10,
    lost: 0,
    served: 0,
    maxNumber: 30,
  }),
  components: {
    Queue
  },
  methods: {
    start() {
      this.counter = 1
      this.requests = []
      this.lost = 0
      this.served = 0

      this.addCycle()
      this.serveCycle()
    },
    addCycle() {
      if (this.speed < 1) {
        this.speed = 1
      }

      if (this.counter <= this.maxNumber) {
        const s = getRandom(1, 2) * 1000 / this.speed

        this.addTimeout = setTimeout(() => {
          this.addRequest()
          this.addCycle()
        }, s)
      } else {
        // this.pause()
      }
    },
    serveCycle() {
      if (this.speed < 1) {
        this.speed = 1
      }

      const s = getRandom(2, 5) * 1000 / this.speed

      this.serveTimeout = setTimeout(() => {
        this.serveRequest()
        this.serveCycle()
      }, s)
    },
    pause() {
      clearTimeout(this.addRequest)
      clearTimeout(this.serveTimeout)
    },
    addRequest() {
      if (this.requests.length < this.capacity) {
        let requestsCopy = this.requests.slice()
        requestsCopy.push(this.counter)
        this.requests = requestsCopy
      } else {
        this.lost += 1
      }

      this.counter += 1
    },
    serveRequest() {
      if (this.requests.length > 0) {
        let requestsCopy = this.requests.slice()
        requestsCopy.shift()
        this.requests = requestsCopy
        this.served += 1
      }
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
  margin: 10px;
}

.buttons-group {
  margin: 10px;
  display: flex;
  align-items: center;
}

.input-speed-group,
.input-capacity-group,
.input-number-group {
  margin: 10px;
  display: flex;
  justify-content: center;
}

.inputs-group {
  background-color: darkseagreen;
  margin: 20px;
}

.input-speed,
.input-capacity,
.input-number {
  margin-left: 5px;
  width: 40px;
  text-align: right;
}

.stats-group {
  display: flex;
}

.stats-group-lost,
.stats-group-served {
  display: flex;
  margin: 5px;
}

.stats-group-lost {
  color: red;
}

.stats-group-served {
  color: green;
}

.stats-lost-value,
.stats-served-value {
  font-weight: bold;
  margin-left: 5px;
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

