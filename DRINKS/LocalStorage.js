/**
 * Created by dmitry.sobolevsky on 29.01.2017.
 */
"use strict";



function TLocalStorage (name)
{
    var self=this;
    self.name=name;
    self.buttons=[{name:"create",func:"AddValue",text:"ввод информации об элементе"},{name:"show",func:"Rekurs",text:"получение информации о элементе"},{name:"delete",func:"DeleteValue",text:"удаление информации о элементе"},{name:"show_all",func:"GetKeys",text:"перечень всех элементов"}];
    self.storage={};

    self.SaveLocalStorage=function (obj) {
        localStorage.setItem(self.name,JSON.stringify(obj));

    };
    self.LoadLocalStorage=function () {
        var obj=JSON.parse(localStorage.getItem(self.name));
        return obj;
    };
    if(self.LoadLocalStorage()){
        self.storage=self.LoadLocalStorage();
    }


    self.AddValue=function(Key,Value)
    {
      self.storage[Key]=Value;
      self.SaveLocalStorage(self.storage);
    };

    self.GetValue=function(Key){
        return self.storage[Key];
    };

    self.DeleteValue=function(Key){

        if (self.storage[Key]!=undefined) {
            delete self.storage[Key];
            self.SaveLocalStorage(self.storage);
            return true;
        } else {

            return false;
        }
    };

    self.GetKeys=function(){
        var all_keys=[];
        for (var key in self.storage) {
            all_keys.push(key);
        }
            return all_keys;

    };


    self.Rekurs=function(ob){
        var desc="";

        if (typeof ob == "object") {
            for (var key in ob) {

                if (typeof ob[key] == "object") {//если значение ключа - обьект то вызываем рекурсивную функцию
                    self.Rekurs(ob[key]);

                } else {
                    desc+= key+': '+ob[key]+'\n';
                }
            }

        } else {
            desc+=ob;
        }

        return desc;

    };
    
    self.AddName=function (text) {
        var name='';
        while (name.length===0){
            name=prompt(text);
        }
        return name;
    };
    self.AddInfo=function (name1,text1,name2,text2) {
        var info={};
        info[name1]=(confirm(text1))?"да":"нет";
        info[name2]=prompt(text2);
        return info;


    };





    self.CreateButtons=function() {
        var container=document.createElement("div");
        container.classList.add("container");
        var h1Text=document.createTextNode(self.name);
        container.appendChild(h1Text);

        for(var i=0;i<self.buttons.length;i++){
            var button= document.createElement("button");
            button.id=self.name+'-'+self.buttons[i].name;
            button.classList.add("myButton");
            button.appendChild(document.createTextNode(self.buttons[i].text));
            container.appendChild(button);
        }
        document.querySelector('body').appendChild(container);
    };


}



function CreateControllersForDrink (name) {

    document.getElementById('DRINKS-create').onclick = function(){
        name.AddValue(name.AddName("Введите имя напитка"),name.AddInfo("Алкогольный","Напиток алкогольный?","Рецепт","Рецепт напитка:"));
    };
    document.getElementById('DRINKS-show').onclick = function(){

        var result=name.Rekurs(name.GetValue(name.AddName("Какой напиток показать?")));
        (result=='undefined')?alert("Такой напиток не найден"):alert(result);

    };
    document.getElementById('DRINKS-delete').onclick = function(){
        if(name.DeleteValue(name.AddName("Какой напиток удалить?"))){
            alert ("Напиток удален");
        }else {
            alert("Такой напиток не найден")
        }
    };
    document.getElementById('DRINKS-show_all').onclick = function(){
        if (name.GetKeys().length!=0){
            alert(name.GetKeys());
        } else {
            alert("Нет элементов");
        }
    };


};


function CreateControllersForFood (name) {

    document.getElementById('FOOD-create').onclick = function(){
        name.AddValue(name.AddName("Введите имя блюда"),name.AddInfo("Постное","Блюдо постное?","Рецепт","Рецепт блюда:"));
    };
    document.getElementById('FOOD-show').onclick = function(){

        var result=name.Rekurs(name.GetValue(name.AddName("Какое блюдо показать?")));
        (result=='undefined')?alert("Такое блюдо не найдено"):alert(result);

    };
    document.getElementById('FOOD-delete').onclick = function(){
        if(name.DeleteValue(name.AddName("Какое блюдо удалить?"))){
            alert ("Блюдо удалено");
        }else {
            alert("Нет такого блюда")
        }
    };
    document.getElementById('FOOD-show_all').onclick = function(){
        if (name.GetKeys().length!=0){
            alert(name.GetKeys());
        } else {
            alert("Нет блюд");
        }
    };


};
