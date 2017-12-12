<template>
    <div class='comments-stats-container'>
        <div>Комментарии: {{ count }} из {{ total }}</div>
        <div>Сортировка: {{ orderDisplay }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import comment from './Comment';

export default {
  name: 'CommentsStats',
  computed: {
    ...mapGetters([
        'count',
        'loading',
        'order',
        'orderDirection',
        'total'
    ]),
    orderDisplay() {
        if (!this.orderDirection) {
            return 'нет';
        }
        let msg = 'по ID';
        if (this.order === 'rating') {
            msg = 'по рейтингу';
        }
        return `${msg} ${this.orderDirection === 'asc' ? 'по убыванию' : 'по возрастанию'}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments-stats-container {
    text-align: left;
}
</style>


