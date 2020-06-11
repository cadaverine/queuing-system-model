<template>
  <section class="container">
    <header class="title">Queuing system modeling</header>

    <div class="inputs-table">
      <div class="input-title">modeling speed (factor):</div>
      <input type="text" v-model="speed">

      <div class="input-title">queue capacity:</div>
      <input type="text" v-model="capacity">

      <div class="input-title">requests number:</div>
      <input type="text" v-model="maxNumber">

      <div class="input-title">input params (Uniform):</div>
      <div>
        <input type="text" v-model="inputParamFrom">
        <input type="text" v-model="inputParamTo">
      </div>

      <div class="input-title">output param (Poisson):</div>
      <input type="text" v-model="outputParam">
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

    <div class="stats-table">
      <div class="stats-title">were lost:</div>
      <div class="stats-value stats-value" v-text="stats.lost"/>
      <div class="stats-title">were served:</div>
      <div class="stats-value  stats-value" v-text="stats.served"/>
      <div class="stats-title">average service time (s):</div>
      <div class="stats-value  stats-value" v-text="stats.serviceTime.toFixed(1)"/>
      <div class="stats-title">average waiting time (s):</div>
      <div class="stats-value  stats-value" v-text="stats.waitingTime.toFixed(1)"/>
      <div class="stats-title">lost probability (%):</div>
      <div class="stats-value  stats-value" v-text="stats.lostProbability.toFixed(1)"/>
      <div class="stats-title">service probability (%):</div>
      <div class="stats-value  stats-value" v-text="stats.serviceProbability.toFixed(1)"/>
    </div>
  </section>
</template>

<script>
import Queue from '~/components/Queue.vue'
import { getRandom, getPoissonRandom } from '~/assets/utils'

export default {
  data: () => ({
    requests: [],
    counter: 0,
    speed: 5,
    capacity: 30,
    lost: 0,
    served: 0,
    maxNumber: 60,
    timeoutsIDs: [],
    inputParamFrom: 4,
    inputParamTo: 16,
    outputParam: 3,
    stats: {
      lost: 0,
      served: 0,
      serviceTime: 0,
      waitingTime: 0,
      lostProbability: 0,
      serviceProbability: 0,
    }
  }),
  components: {
    Queue
  },
  methods: {
    start() {
      this.counter = 0
      this.requests = []
      this.stats = {
        lost: 0,
        served: 0,
        serviceTime: 0,
        waitingTime: 0,
        lostProbability: 0,
        serviceProbability: 0,
        serviceTimes: [],
        waitingTimes: [],
      }

      this.addCycle()
      this.serveCycle()
    },
    addCycle() {
      if (this.speed < 1) {
        this.speed = 1
      }

      if (this.counter <= this.maxNumber) {
        const random = getRandom(this.inputParamFrom, this.inputParamTo)
        const delay = random * 1000 / this.speed

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

      const random = getPoissonRandom(this.outputParam)
      const delay = random * 1000 / this.speed

      this.timeoutsIDs.push(
        setTimeout(() => {
          this.serveRequest(random)
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
        // requestsCopy.push(this.counter)
        requestsCopy.push({
          index: this.counter + 1,
          createdAt: Date.now()
        })
        this.requests = requestsCopy
      } else {
        this.stats.lost += 1
        this.stats.lostProbability = this.stats.lost / (this.counter / 100)
      }

      this.counter += 1
    },
    serveRequest(random) {
      if (this.requests.length > 0) {
        let requestsCopy = this.requests.slice()
        let request = requestsCopy.shift()
        this.requests = requestsCopy

        // update stats
        this.stats.served += 1
        this.stats.serviceTimes.push(random)
        this.stats.serviceTime = this.stats.serviceTimes.reduce((a, b) => a + b) / this.stats.served

        this.stats.waitingTimes.push((Date.now() - request.createdAt) * this.speed / 1000)
        this.stats.waitingTime = this.stats.waitingTimes.reduce((a, b) => a + b) / this.stats.served

        this.stats.serviceProbability = this.stats.served / (this.counter / 100)
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
  font-size: 25px;
  margin-bottom: 30px;
}

.buttons-group {
  margin: 10px;
  display: flex;
  align-items: center;
}

input {
  margin: 4px;
  border-radius: 4px;
  margin-left: 5px;
  width: 40px;
  text-align: right;
}

button {
  font-size: 13px;
}

.input-title {
  width: 185px;
  text-align: left;
  margin: 4px;
  height: 23px;
}

.inputs-table {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #90E0EF;
  /* color: white; */
  border-radius: 4px;
  padding: 5px;
}

.stats-table {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #90E0EF;
  border-radius: 4px;
  padding: 5px;
}

.stats-title,
.stats-value {
  margin: 4px;
  height: 23px;
}

.stats-title {
  text-align: left;
}

.stats-group {
  display: flex;
  flex-direction: column;
  margin: 5px;
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


button {
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:8px 15px;
  margin: 5px;
	text-decoration:none;
}
button:hover {
	/* background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%); */
	background-color:#408c99;
}
button:active {
	position:relative;
	top:1px;
}

</style>

