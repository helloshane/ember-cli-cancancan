import Ember from 'ember';

export default Ember.Helper.extend({
  permissionHandler: Ember.inject.service("permission-handler"),

  compute(params, hash) {
    let handler = this.get('permissionHandler');
    return handler.cancancan(...params);
  }
});