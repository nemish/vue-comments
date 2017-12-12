import * as constants from './constants';
import {
    notification
} from '../reduxStore';

const { API_URL, BASE_API_URL } = constants;

const fetchComments = (commit, state) => {
    if (!state.comments.loading) {
        commit(constants.FETCH_COMMENTS__START);

        let url = API_URL;
        const { loadParams } = state.comments;
        const queryString = Object.keys(loadParams).filter(key => !!loadParams[key]).map(key => `${key}=${loadParams[key]}`).join('&');
        if (queryString.length) {
            url += '?' + queryString;
        }
        return fetch(url)
            .then(resp => resp.json())
            .then(items => {
                commit(constants.FETCH_COMMENTS__SUCCESS, items);
                notification('Комментарии загружены');
            })
            .catch(resp => {
                commit(constants.FETCH_COMMENTS__FAIL, 'Ошибка при загрузке комментариев');
                notification('Ошибка при загрузке комментариев', 'error');
            });
    }
}


const vote = (commit, state, conf) => {
    const { startAction, successAction, payload } = conf;
    commit(startAction, payload);
    return fetch(`${BASE_API_URL}/comments/vote`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        fetchComments(commit, state);
        commit(successAction);
    })
}


export default {
    fetchCommentsAction({ commit, state }) {
        fetchComments(commit, state);
    },
    toggleOrdering({ commit, state }, reqData) {
        const { order } = reqData;
        commit(constants.TOGGLE_ORDERING, order);
        fetchComments(commit, state);
    },
    upVote({ commit, state }, cid) {
        vote(commit, state, {
            startAction: constants.UPVOTE__START,
            successAction: constants.UPVOTE__SUCCESS,
            payload: {
                operation: 1,
                cid
            }
        });
    },
    downVote({ commit, state }, cid) {
        vote(commit, state, {
            startAction: constants.DOWNVOTE__START,
            successAction: constants.DOWNVOTE__SUCCESS,
            payload: {
                operation: -1,
                cid
            }
        });
    },
    loadMore({ commit, state }) {
        commit(constants.SHIFT_LIMIT);
        fetchComments(commit, state);
    },
    postComment({ commit, state }, payload) {
        commit(constants.POST_COMMENT__START, payload);
    }
}