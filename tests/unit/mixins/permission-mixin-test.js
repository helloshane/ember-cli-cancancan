import Ember from 'ember';
import PermissionMixinMixin from '../../../mixins/permission-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | permission mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PermissionMixinObject = Ember.Object.extend(PermissionMixinMixin);
  var subject = PermissionMixinObject.create();
  assert.ok(subject);
});
