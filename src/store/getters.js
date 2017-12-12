export default {
    comments: state => state.items.slice(0, state.limit),
    count: state => state.items.length,
    loading: state => state.loading,
    order: state => state.loadParams.order,
    orderDirection: state => state.loadParams.dir,
    total: state => state.total
}