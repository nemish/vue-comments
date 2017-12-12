<template>
    <div class="comment-wrapper">
        <div class='comment' @click='toggleReply'>
            <div class="comment-info">
                <div v-if='item.parentId'>Ответ на комментарий ID# {{ item.parentId }}</div>
                #ID: {{ item.id }}. {{ item.name }}
            </div>
            <div class="comment-body">
                {{ item.body }}
            </div>
            <div class="comment-social">
                Rating: {{ item.rating }}
                <span class='vote' @click.stop='upVote'>up</span>
                <span class='vote' @click.stop='downVote'>down</span>
            </div>
        </div>
        <transition name='fade'>
            <div v-if='showReply' class='comment-reply'>
                <form class='pure-form pure-form-stacked' v-on:submit.prevent>
                    <textarea v-model='reply' class="pure-input" placeholder="Ответить..."></textarea>
                    <button class="pure-button pure-button-primary button-xsmall"
                            v-bind:disabled='commentError'
                            @click="postComment(item)">
                        Ответить
                    </button>
                </form>
            </div>
        </transition>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Comment',
  props: ['item'],
  data() {
    return {
        showReply: this.showReply,
        reply: '',
    };
  },
  methods: {
    postComment(item) {
        this.$store.dispatch('postComment', {
            parentId: item.id,
            text: this.reply
        });
        this.reply = '';
    },
    upVote(event) {
        this.$store.dispatch('upVote', this.item.id);
    },
    downVote(event) {
        this.$store.dispatch('downVote', this.item.id);
    },
    toggleReply(event) {
        this.showReply = !this.showReply;
    }
  },
  computed: {
    commentError() {
        return this.reply.length === 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.comment {
    padding: 10px;
}

.vote {
    opacity: 0.6;
}

.vote:hover {
    cursor: pointer;
    opacity: 0.8;
}

.comment-reply {
    text-align: right;
    padding: 0 10px;
}

.comment:hover {
    background-color: #F0FFF0;
    cursor: pointer;
}

.comment-info {
    text-align: left;
    color: #3D9970;
    font-size: 12px;
}

.comment-social {
    text-align: left;
    color: #008B45;
    font-size: 12px;
    font-weight: bold;
}


.comment-body {
    text-align: left;
}

textarea {
    width: 100%;
}

</style>