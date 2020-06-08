<template>
    <div
        class="queue-container"
        :style="{ minWidth: capacity * 20 + 2 + 'px' }"
    >
        <div class="queue-body">
            <Request
                v-for="(request, i) in requests"
                :key="i"
                :number="request"
            />
        </div>
    </div>
</template>

<script>
import Request from '~/components/Request.vue'

export default {
    props: {
        requests: {
            type: Array,
            default: () => ([])
        },
        counter: {
            type: Number,
            default: 0,
        },
        capacity: {
            type: Number,
            default: 10,
        }
    },
    components: {
        Request,
    },
}
</script>

<style scoped>
    .queue-container {
        min-height: 22px;
        border: 1px dashed darkslategrey;
    }

    .queue-body {
        display: flex;
        flex-direction: row-reverse;
    }
</style>