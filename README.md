# Ember-cli-cancancan

ember-cli的一个权限插件

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Using
  1. 引入`permission-mixin`并继承;
  
          import PermissionMixin from "ember-cli-cancancan/mixins/permission-mixin";
          
          export default Ember.Route.extend(PermissionMixin, {
            .... .....
          }

  2.  routes/application.js 添加如下:

          beforeModel(transition){
            this._super(...arguments);
            let url = ".....";
            return this.initAuthorization({url: url});  
          }    
      
  3. 权限api数据结构
  
          {
              "permissions": {
                  "Order": [
                      {
                          "name": "show",
                          "route": null,
                          "describe": "订单查看"
                      }
                  ]
              },
              "is_root": false
          }    
          
  4. 鉴权 
          * router / controller / component 使用方式:
            1. cancancan("Order");
            2. cancancan("Order", "edit")
            3. cancancan("Order", "edit", {id: "xx", name: "xx", email: "xxx"}, "email")
          * hbs 使用方式:
            1.  (cancan "Order")
            2.  (cancan "Order" "edit")
            3. (cancan "Order" "edit" Object "email")
      

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
