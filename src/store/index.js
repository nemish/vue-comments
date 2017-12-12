import Vuex from 'vuex';
import Vue from 'vue';
import createLogger from 'vuex/dist/logger';
import {
    COUNT_STEP
} from './constants';

import getters from './getters';
import actions from './actions';
import mutations, {
    comments
} from './mutations';

Vue.use(Vuex);

const state = {
    comments
};

export const store = new Vuex.Store({
  plugins: [createLogger()],
  state,
  getters,
  mutations,
  actions
});