<template>
    <div class='notifications-container'>
        <transition-group name='fade'>
            <div v-for='item in notifications' v-bind:key="item.id">
                <msg :item='item' />
            </div>
        </transition-group>
    </div>
</template>

<script>
import reduxStore from '../reduxStore';

const MsgComp = {
    props: ['item'],
    template: "<div :class='classObj' @click='dismiss'>{{item.msg}}</div>",
    data() {
        return {
            classObj: {
                notification: true,
                error: this.item.type === 'error'
            }
        }
    },
    methods: {
        dismiss() {
            reduxStore.dispatch({
                type: 'RESET_NOTIFICATION',
                data: this.item.id
            });
        }
    }
}

export default {
  name: 'Notifications',
  components: {
    msg: MsgComp
  },
  data() {
    return {
        notifications: this.notifications || []
    }
  },
  mounted() {
    this.unsubscribe = reduxStore.subscribe(this._refreshState.bind(this));
  },
  destroyed() {
    this.unsubscribe();
  },
  methods: {
      _refreshState() {
          this.notifications = reduxStore.getState().notifications;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notifications-container {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 200px;
    height: 100px;
}

.notification {
    padding: 10px;
    font-size: 12px;
    margin-bottom: 5px;
    background-color: #2ECC40;
    color: #fff;
    border-radius: 3px;
    opacity: 0.7;
}

.notification.error {
    background-color: tomato;
}

.notification:hover {
    opacity: 0.95;
    cursor: pointer;
}

</style>