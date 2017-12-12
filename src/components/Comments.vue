<template>
    <div class='comments-container'>
        <comments-stats />
        <div style="margin-top: 5px;">
            <button class="pure-button pure-button-primary button-xsmall"
                    v-bind:disabled='loading'
                    @click="fetchComments">
                загрузить еще
            </button>
            <button v-if='count'
                    class="pure-button button-xsmall"
                    v-bind:disabled='loading'
                    @click="fetchCommentsOrderByRating">
                <i v-if='isOrderByRating' :class="orderingClass"></i>
                По рейтингу
            </button>
            <button v-if='count'
                    class="pure-button button-xsmall"
                    v-bind:disabled='loading'
                    @click="fetchCommentsOrderById">
                <i v-if='isOrderById' :class="orderingClass"></i>
                По порядку
            </button>
            <button v-if='count'
                    class="pure-button button-xsmall"
                    v-bind:disabled='loading'
                    @click="fetchError">
                Запрос с ошибкой
            </button>
        </div>
        <div class='comments-list' v-for="item in comments">
            <comment :item="item" />
            <hr />
        </div>
        <div style="margin-top: 5px;">
            <button class="pure-button button-xsmall" @click="loadMore">
                {{ loading ? 'загружаем...' : 'загрузить еще' }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import comment from './Comment';
import CommentsStats from './CommentsStats';
import reduxStore, { notification } from '../reduxStore';

export default {
  name: 'Main',
  components: {
    comment,
    'comments-stats': CommentsStats
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    loadMore() {
        this.$store.dispatch('loadMore');
    },
    fetchComments() {
        if (this.count > 0) {
            this.loadMore();
        } else {
            this.$store.dispatch('fetchCommentsAction');
        }
    },
    fetchCommentsOrderByRating() {
        this.$store.dispatch('toggleOrdering', {order: 'rating'})
    },
    fetchCommentsOrderById() {
        this.$store.dispatch('toggleOrdering', {order: 'id'})
    },
    fetchError() {
        notification('Запрос выполнен с ошибкой', 'error');
    }
  },
  computed: {
    ...mapGetters([
        'comments',
        'count',
        'loading',
        'order',
        'orderDirection'
    ]),
    orderingClass() {
        return this.orderDirection === 'asc' ? 'fa fa-angle-up' : 'fa fa-angle-down';
    },
    isOrderByRating() {
        return this.orderDirection && this.order === 'rating';
    },
    isOrderById() {
        return this.orderDirection && this.order === 'id';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
    margin-top: 10px;
    width: 500px;
    padding: 10px;
    border: 1px solid #ddd;
}

.comments-list {
    margin-top: 10px;
}

.comments-list hr {
    border-bottom: 2px solid #3D9970;
    opacity: 0.4;
}

</style>