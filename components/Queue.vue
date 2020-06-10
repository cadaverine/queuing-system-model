<template>
    <div
        class="queue-container"
        :style="{ minWidth: capacity * 20 + 20 + 'px' }"
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
        height: 26px;
        background-color: #48CAE4;
        padding: 0 2px;
        border-radius: 4px;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .queue-body {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
</style>