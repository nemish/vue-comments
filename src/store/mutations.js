import * as constants from './constants';
const { COUNT_STEP } = constants;

export const commentsState = {
    items: [],
    total: 0,
    step: COUNT_STEP,
    loading: false,
    loadParams: {
        limit: COUNT_STEP,
        order: null,
        dir: null
    }
};

export default {
    [constants.SHIFT_LIMIT](state) {
        state.loadParams.limit += state.step;
    },
    [constants.TOGGLE_ORDERING](state, order) {
        if (!order) {
            state.loadParams.order = null;
            state.loadParams.dir = null;
        } else if (state.loadParams.order == order) {
            switch (state.loadParams.dir) {
                case 'asc':
                    state.loadParams.dir = 'desc';
                    break;
                case 'desc':
                    state.loadParams.dir = null;
                    break;
                default:
                    state.loadParams.dir = 'asc';
            }
        } else {
            state.loadParams.dir = 'asc';
            state.loadParams.order = order;
        }
    },
    [constants.FETCH_COMMENTS__START](state) {
      state.loading = true;
    },
    [constants.FETCH_COMMENTS__SUCCESS](state, {items, total}) {
      state.loading = false;
      state.items = items;
      state.total = total;
    },
    [constants.FETCH_COMMENTS__FAIL](state, msg) {
      state.loading = false;
    },
    [constants.POST_COMMENT__START](state, payload) {
        console.log(constants.POST_COMMENT__START, payload);
    },
    [constants.POST_COMMENT__SUCCESS](state, payload) {
        console.log(constants.POST_COMMENT__SUCCESS, payload);
    },
    [constants.UPVOTE__START](state, cid) {},
    [constants.UPVOTE__SUCCESS](state, cid) {},
    [constants.DOWNVOTE__START](state, cid) {},
    [constants.DOWNVOTE__SUCCESS](state, cid) {},
}