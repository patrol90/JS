/**
 * Created by dmitry.sobolevsky on 09.03.2017.
 */
"use strict";

function TClockViewCanvas  (name,gmt) {
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
    var RadiusOfHour="30";
    var HeightOfFontHour="16";
    var ArrowsTransformOrigin="7";
    var WidthOfArrow={HourArrow:"10",MinuteArrow:"7",SecondArrow:"3"};
    var HeightOfArrow={HourArrow:"70",MinuteArrow:"90",SecondArrow:"100"};
    var SecondToAngle=6*Math.PI/180;
    var MinuteToAngle=1/10*Math.PI/180;
    var HourToAngle=1/120*Math.PI/180;
    var StartAngle=180;
    var ArrowsOpacity="0.85";

    var BodyArea=document.createElement("div");
    BodyArea.style.position="relative";
    BodyArea.classList.add("container");
    BodyArea.style.height=ClockRadius*1.2+"px";
    BodyArea.style.width=ClockRadius*1.2+"px";

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
    BodyArea.appendChild(ButtonStart);
    BodyArea.appendChild(ButtonStop);
    BodyArea.appendChild(NameOfContainer);



    var BackgroundArea=document.createElement('canvas');
    BackgroundArea.setAttribute("width",ClockRadius);
    BackgroundArea.setAttribute("height",ClockRadius);

    var Area=document.createElement('canvas');
    Area.setAttribute("width",ClockRadius);
    Area.setAttribute("height",ClockRadius);
    Area.style.position="absolute";
    Area.style.left="0px";
    Area.style.zIndex="10";
    Area.id='area';

    BodyArea.appendChild(BackgroundArea);
    BodyArea.appendChild(Area);

    var Context = BackgroundArea.getContext('2d');
    Context.fillStyle=ClockBackground;
    Context.beginPath();
    Context.arc(ClockRadius/2,ClockRadius/2, ClockRadius/2, 0,Math.PI*2, false);
    Context.fill();

    var Context2 = Area.getContext('2d');



    for (var  i=num;i>0; i--){

        var f = 2 / num * i * Math.PI;
        var left = wrap + radius * Math.sin(f)  ;
        var top = wrap - radius * Math.cos(f) ;

        Context.fillStyle=ColorOfHour;
        Context.beginPath();
        Context.arc(left+RadiusOfHour/2,top+RadiusOfHour/2, RadiusOfHour/2, 0,Math.PI*2, false);
        Context.fill();
        Context.fillStyle='black';
        Context.font='bold '+HeightOfFontHour+'px Arial';
        Context.textAlign="center";
        Context.textBaseline='middle';
        Context.fillText(i,left+RadiusOfHour/2,top+RadiusOfHour/2);
        Context.strokeStyle='red';
        Context.lineWidth=20;

    }




    function Str0L(Val,Len)
    {
        var StrVal=Val.toString();
        while ( StrVal.length < Len )
            StrVal='0'+StrVal;
        return StrVal;
    }




    var UpdateClock =function () {

        var HAngle=self.Hour*3600*HourToAngle+self.Minutes*60*HourToAngle;//-StartAngle+(M*0.5); // перемещение часовой стрелки  с + градусы от минут часа
        var MAngle=self.Minutes*60*MinuteToAngle;//-StartAngle;
        var SAngle=self.Seconds*SecondToAngle;//-StartAngle;

        Context2.clearRect (0, 0, ClockRadius, ClockRadius);

        line(HAngle,HeightOfArrow.HourArrow,WidthOfArrow.HourArrow);
        line(MAngle,HeightOfArrow.MinuteArrow,WidthOfArrow.MinuteArrow);
        line(SAngle,HeightOfArrow.SecondArrow,WidthOfArrow.SecondArrow);

        Context2.textAlign='center';
        Context2.textBaseline='middle';
        Context2.fillStyle = 'black';

        Context2.font='bold '+HeightOfFontHour+'px Arial';
        Context2.fillText(Str0L(self.Hour,2) + ':' + Str0L(self.Minutes,2) + ':' + Str0L(self.Seconds,2),ClockRadius/2,70);

    };

    function line(pos,r,w){
        Context2.lineWidth=w||1;
        Context2.lineCap='round';
        Context2.beginPath();
        //Context2.globalAlpha=ArrowsOpacity;
        Context2.moveTo(ClockRadius/2,ClockRadius/2);
        Context2.lineTo(ClockRadius/2+r*Math.cos(pos-Math.PI/2),
            ClockRadius/2+r*Math.sin(pos-Math.PI/2));
        Context2.stroke();
        Context2.closePath();
    }
    setInterval(UpdateClock,500);


    document.querySelector("body").style.cssText="border:0px;padding:0px;max-width:900px;margin:1em auto;";
    document.querySelector("body").appendChild(BodyArea);
}
TClockViewCanvas.prototype = Object.create(TClock.prototype);
TClockViewCanvas.prototype.constructor=TClockViewCanvas; // рекомендуется