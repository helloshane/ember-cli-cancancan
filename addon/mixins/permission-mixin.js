import Ember from 'ember';

const { isBlank, isPresent } = Ember;
export default Ember.Mixin.create({

    initAuthorization(settings){
      let { url } = settings;
      return this.fetchPermissions(url);
    },

    hadAuthorized(){
      let data = this.permissionHandler.getPermissionData(), flag = this.permissionHandler.getIsAuthorization();
      return isPresent(data) && flag;
    },

    fetchPermissions(url){
      let that = this;
      return this.queryPermissionsByEmail(url).then(function(res) {
        that.permissionHandler.initAuthorizationProcess(res, true);
      }, function (error) {
        console.error(`[ember-cli-cancancan] request permissions by user email error: ${error}`);
      })
    },

    //
    queryPermissionsByEmail(request){
      return new Ember.RSVP.Promise(function(resolve, reject){
        Ember.$.ajax(request , {
          success: function(res){
            resolve(res);
          },
          error: function(error){
            reject(error);
          }
        })  // end  ajax
      }) // end rsvp
    },

    // 
    storePermission(storageNP, data){
      let _store = window.localStorage || localStorage;
      if(  _store ){
        _store.setItem(storageNP, null);
        _store.setItem(storageNP, JSON.stringify(data));
      }else{
        window[storageNP] = data;
      }
      return data;
    },

    // 
    getStorePermissions(){
      let _store = window.localStorage || localStorage;
      if(  _store ){
        let data = _store.geItem(storageNP);
        return JSON.parse(data);
      }else{
        return window[storageNP];
      }
    },



});
