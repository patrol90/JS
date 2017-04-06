/**
 * Created by dmitry.sobolevsky on 05.04.2017.
 */
"use strict";

function TClockViewDOM (name,gmt) {

    TClock.call(this);
    var self=this;

    self.SetGMT(gmt);
    var ClockRadius=230;
    var ClockBackground="#fcca66";
    var num = 12; // Число часов
    var wrap = 100; // Размер часов для расположения картинок
    var radius = 90; // Радиус нашего круга
    var ColorOfArrows="black";
    var ColorOfHour="#48b382";
    var RadiusOfHour="30px";
    var ArrowsTransformOrigin="7";
    var WidthOfArrow={HourArrow:"10",MinuteArrow:"7",SecondArrow:"3"};
    var HeightOfArrow={HourArrow:"70",MinuteArrow:"90",SecondArrow:"100"};
    var SecondToAngle=6;
    var MinuteToAngle=6;
    var HourToAngle=30;
    var StartAngle=180;
    var ArrowsOpacity="0.9";
    var HourArrow=document.createElement("div");
    var MinuteArrow=document.createElement("div");
    var SecondArrow=document.createElement("div");
    var TextClock=document.createElement("div");

    var container=document.createElement("div");
    container.classList.add('container');
    container.style.height=ClockRadius*1.2+"px";
    container.style.width=ClockRadius*1.2+"px";

    var clock=document.createElement("div");
    document.head.querySelector("style").innerHTML="#clock span{display: flex;justify-content: center;align-items: center;height: "+RadiusOfHour+";  width:"+RadiusOfHour+";  background-color: "+ColorOfHour+";  border-radius:"+RadiusOfHour+";  font-weight: 600 ;  font-family: Arial;}.container{float:left;}*{font-family:Arial;font-weight:600;}.container>span {font-weight:100;font-size:13px}";

    var ButtonStart= document.createElement("button");
    var ButtonStop= document.createElement("button");
    var NameOfContainer=document.createElement("span");
    NameOfContainer.appendChild(document.createTextNode(name));
    ButtonStart.style.margin="0 5px 10px 5px";
    ButtonStop.style.margin="0 5px 10px 5px";
    ButtonStart.appendChild(document.createTextNode("старт"));
    ButtonStop.appendChild(document.createTextNode("стоп"));
    ButtonStart.addEventListener('click',self.Start,false);
    ButtonStop.addEventListener('click',self.Stop,false);





    clock.setAttribute( "id", "clock" );
    clock.style.cssText="width:"+ClockRadius+"px;height:"+ClockRadius+"px;border-radius:"+ClockRadius+"px;background:"+ClockBackground+";position:absolute;";
    TextClock.style.marginTop="4em";
    TextClock.style.textAlign="center";
    TextClock.style.font="16px Arial";
    TextClock.style.fontWeight="600";

    HourArrow.style.width=WidthOfArrow.HourArrow + "px";
    HourArrow.style.height=HeightOfArrow.HourArrow + "px";
    MinuteArrow.style.width=WidthOfArrow.MinuteArrow + "px";
    MinuteArrow.style.height=HeightOfArrow.MinuteArrow + "px";
    SecondArrow.style.width=WidthOfArrow.SecondArrow + "px";
    SecondArrow.style.height=HeightOfArrow.SecondArrow + "px";

    var Arrows=[HourArrow,MinuteArrow,SecondArrow];

    container.appendChild(clock);
    container.insertBefore(ButtonStart,clock);
    container.insertBefore(ButtonStop,clock);
    container.insertBefore(NameOfContainer,clock);
    clock.appendChild(TextClock);
    document.querySelector("body").appendChild(container);



    for (var j=0;j<Arrows.length;j++){
        clock.appendChild(Arrows[j]);
        Arrows[j].style.background=ColorOfArrows;
        Arrows[j].style.position="absolute";
        Arrows[j].style.top=clock.offsetHeight/2 -ArrowsTransformOrigin +"px";
        Arrows[j].style.left=clock.offsetWidth/2 -Arrows[j].offsetWidth/2 +"px";
        Arrows[j].style.zIndex="10";
        Arrows[j].style.opacity=ArrowsOpacity;
        Arrows[j].style.borderRadius=Arrows[j].style.height;
        Arrows[j].style.transformOrigin="center" +" " + ArrowsTransformOrigin + "px";
    }
    var UpdateClock =function () {
        var HAngle=self.Hour*HourToAngle-StartAngle+(self.Minutes*0.5); // перемещение часовой стрелки  с + градусы от минут часа
        HourArrow.style.transform="rotate("+HAngle+"deg)";
        var MAngle=self.Minutes*MinuteToAngle-StartAngle;
        MinuteArrow.style.transform="rotate("+MAngle+"deg)";
        var SAngle=self.Seconds*SecondToAngle-StartAngle;
        SecondArrow.style.transform="rotate("+SAngle+"deg)";
        var NowTime=Str0L(self.Hour,2) + ':' + Str0L(self.Minutes,2) + ':' + Str0L(self.Seconds,2);
        TextClock.innerHTML=NowTime;
        requestAnimationFrame(UpdateClock);

    };

    for (var  i=num;i>0; i--){
        var hour = document.createElement("span");
        hour.appendChild(document.createTextNode(i));
        var f = 2 / num * i * Math.PI;
        var left = wrap + radius * Math.sin(f) + 'px';
        var top = wrap - radius * Math.cos(f) + 'px';
        hour.style.position="absolute";
        hour.style.top=top;
        hour.style.left=left;
        UpdateClock();
        clock.appendChild(hour);
    }


    // дополняет строку Val слева нулями до длины Len
    function Str0L(Val,Len)
    {
        var StrVal=Val.toString();
        while ( StrVal.length < Len )
            StrVal='0'+StrVal;
        return StrVal;
    }

    UpdateClock();
  }
TClockViewDOM.prototype = Object.create(TClock.prototype);
TClockViewDOM.prototype.constructor=TClockViewDOM; // рекомендуется
