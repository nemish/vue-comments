<template>
    <div class='main-container'>
        <current-user />
        <comments v-if='user.name' />
    </div>
</template>

<script>
import comments from './Comments';
import user from './CurrentUser';

export default {
  name: 'Main',
  data() {
    const { user } = this.$reduxStore.getState();
    return {
        user,
        isRedux: true
    }
  },
  methods: {
    _refreshState() {
        this.user = this.$reduxStore.getState().user;
    },
  },
  components: {
    comments,
    'current-user': user
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

</style>