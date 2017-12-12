import Vuex from 'vuex';
import Vue from 'vue';
import createLogger from 'vuex/dist/logger';
import {
    COUNT_STEP
} from './constants';

import getters from './getters';
import actions from './actions';
import mutations, {
    commentsState
} from './mutations';

Vue.use(Vuex);

const comments = {
    state: commentsState,
    getters,
    mutations,
    actions
};

export const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    comments
  }
});