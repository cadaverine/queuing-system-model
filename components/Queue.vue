<template>
    <div class="queue-container">
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
        }
    },
    components: {
        Request,
    },
}
</script>

<style scoped>
    .queue-container {
        min-width: 504px;
        min-height: 22px;
        border: 1px dashed darkslategrey;
    }

    .queue-body {
        display: flex;

        flex-direction: row-reverse;
    }
</style>