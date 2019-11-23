const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  node: state => state.tree.node,
  routes: state => state.menu.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  dblData: state => state.list.dblData,
  clickData: state => state.list.clickData,
  selections: state => state.list.selections,
}
export default getters
