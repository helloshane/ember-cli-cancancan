export function initialize(app) {
  app.inject("component", "permissionHandler", "service:permission-handler")
  app.inject("controller", "permissionHandler", "service:permission-handler")
  app.inject("route", "permissionHandler", "service:permission-handler")
  app.inject("helper:cancan", "permissionHandler", "service:permission-handler")
}

export default {
  name: 'app-permission',
  initialize: initialize
};
