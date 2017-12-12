import * as constants from './constants';
const { COUNT_STEP } = constants;

export const comments = {
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
        state.comments.loadParams.limit += state.comments.step;
    },
    [constants.TOGGLE_ORDERING](state, order) {
        if (!order) {
            state.comments.loadParams.order = null;
            state.comments.loadParams.dir = null;
        } else if (state.comments.loadParams.order == order) {
            switch (state.comments.loadParams.dir) {
                case 'asc':
                    state.comments.loadParams.dir = 'desc';
                    break;
                case 'desc':
                    state.comments.loadParams.dir = null;
                    break;
                default:
                    state.comments.loadParams.dir = 'asc';
            }
        } else {
            state.comments.loadParams.dir = 'asc';
            state.comments.loadParams.order = order;
        }
    },
    [constants.FETCH_COMMENTS__START](state) {
      state.comments.loading = true;
    },
    [constants.FETCH_COMMENTS__SUCCESS](state, {items, total}) {
      state.comments.loading = false;
      state.comments.items = items;
      state.comments.total = total;
      state.errors = [];
    },
    [constants.FETCH_COMMENTS__FAIL](state, msg) {
      state.comments.loading = false;
    },
    [constants.POST_COMMENT__START](state, cid) {},
    [constants.UPVOTE__START](state, cid) {},
    [constants.UPVOTE__SUCCESS](state, cid) {},
    [constants.DOWNVOTE__START](state, cid) {},
    [constants.DOWNVOTE__SUCCESS](state, cid) {},
}