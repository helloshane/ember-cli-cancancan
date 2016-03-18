import Ember from 'ember';
  
const { isBlank,  isPresent } = Ember;
export default Ember.Service.extend({
  _data: null,
  _isAuthorization: false,

  setPermissionData(pers){
    this._data = pers;
  },

  getPermissionData(){
    return this._data;
  },

  setIsAuthorization(flag){
    this._isAuthorization = flag;
  },

  getIsAuthorization(){
    return this._isAuthorization;
  },

  initAuthorizationProcess(data, flag){
    this.setPermissionData(data);
    this.setIsAuthorization(flag)
  },

  hasAuthorization(){
    return isPresent(this._data);
  },

  isAdmin(){
    return this.hasAuthorization() && this._data.is_root;
  },

  permissionList(key){
    let result = this._data.permissions;
    if(key){
      return result[key];
    }
    return result;
  }, 

  canHandleResource(resource){
    return isPresent(this.permissionList(resource));
  },

  canHandleAction(resource, action){
    let resAccess = this.canHandleResource(resource);
    let compareResult = false;
    if(resAccess){
      let _pers = this.permissionList(resource);
      compareResult = _pers.any( (_per) => {
        return _per.name === action;
      })
    }
    return compareResult;
  },

  isMySelfResource(target, key){
    let user = this.sessionStore.user;
    let identity = user.email || user.mail;
    return target[key] === identity;
  },

  canHandleActionByMyself(resource, action, target, key){
    let isMe = this.isMySelfResource(target, key);
    if(!isMe){
     return this.canHandleAction(resource, action); 
    }
    return true;
  },

  cancancan(){
    if( this.isAdmin() ) return true;
    let result = false, len = arguments.length;
    switch(  len ){
      case 1:
        result = this.canHandleResource(...arguments);
        break;

      case 2:
        result = this.canHandleAction(...arguments);
        break;

      case 4:
        result = this.canHandleActionByMyself(...arguments);
        break;

      default:
        console.info(" illegal Authorization process ... ");
    }
    return result;
  },

});
