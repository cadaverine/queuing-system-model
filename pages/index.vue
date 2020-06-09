<template>
  <section class="container">
    <header class="title">Моделирование системы массового обслуживания</header>

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
      <div class="input-input-param-group">
        <div class="input-input-param-title">input params (Uniform):</div>
        <input type="text" class="input-input-param" v-model="inputParamFrom">
        <input type="text" class="input-input-param" v-model="inputParamTo">
      </div>
      <div class="input-output-param-group">
        <div class="input-output-param-title">output param (Poisson):</div>
        <input type="text" class="input-output-param" v-model="outputParam">
      </div>
    </div>

    <div class="buttons-group">
      <button class="button-start" @click="start">start</button>
      <button class="button-stop" @click="stop">stop</button>
      <button class="button-add" @click="addRequest">add request</button>
      <button class="button-serve" @click="serveRequest">serve request</button>
    </div>

    <Queue
      :requests="requests"
      :capacity="capacity"
      :counter="counter"
    />
    <div class="stats-group">
      <div class="stats-group-lost">
        <div class="stats-lost-title">were lost:</div>
        <div class="stats-lost-value" v-text="lost"/>
      </div>
      <div class="stats-group-served">
        <div class="stats-served-title">were served:</div>
        <div class="stats-served-value" v-text="served"/>
      </div>
    </div>
  </section>
</template>

<script>
import Queue from '~/components/Queue.vue'
import { getRandom, getPoissonRandom } from '~/assets/utils'

export default {
  data: () => ({
    requests: [],
    counter: 1,
    speed: 5,
    capacity: 30,
    lost: 0,
    served: 0,
    maxNumber: 60,
    timeoutsIDs: [],
    inputParamFrom: 4,
    inputParamTo: 16,
    outputParam: 3,
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
        const delay = getRandom(this.inputParamFrom, this.inputParamTo) * 1000 / this.speed

        this.timeoutsIDs.push(
          setTimeout(() => {
            this.addRequest()
            this.addCycle()
          }, delay)
        )
      }
    },
    serveCycle() {
      if (this.speed < 1) {
        this.speed = 1
      }

      const delay = getPoissonRandom(this.outputParam) * 1000 / this.speed

      this.timeoutsIDs.push(
        setTimeout(() => {
          this.serveRequest()
          this.serveCycle()
        }, delay)
      )
    },
    stop() {
      for (let id of this.timeoutsIDs) {
        clearTimeout(id)
      }
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
.input-number-group,
.input-input-param-group,
.input-output-param-group {
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
.input-number,
.input-input-param,
.input-output-param {
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

