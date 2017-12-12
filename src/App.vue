<template>
  <div id="app">
    <notifications />
    <router-view />
  </div>
</template>

<script>
import notifications from './components/Notifications';
export default {
  name: 'app',
  components: {
    notifications
  }
}
</script>

<style>
body, html {
    padding: 0;
    margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-xsmall {
    font-size: 70%;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0
}

</style>
