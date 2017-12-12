export default {
    comments: state => state.comments.items.slice(0, state.comments.limit),
    count: state => state.comments.items.length,
    loading: state => state.comments.loading,
    order: state => state.comments.loadParams.order,
    orderDirection: state => state.comments.loadParams.dir,
    total: state => state.comments.total
}