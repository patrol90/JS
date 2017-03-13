/**
 * Created by dmitry.sobolevsky on 29.01.2017.
 */
"use strict";



function THashStorage()
{
    var self=this;
    var storage={};


    self.AddValue=function(Key,Value)
    {

      storage[Key]=Value;

    };

    self.GetValue=function(Key){
        return storage[Key];
    };

    self.DeleteValue=function(Key){

        if (storage[Key]!=undefined) {
            delete storage[Key];
            return true;
        } else {

            return false;
        }
    };

    self.GetKeys=function(){
        var all_keys=[];
        for (var key in storage) {
            all_keys.push(key);
        }
            return all_keys;

    };

}
