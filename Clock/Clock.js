/**
 * Created by dmitry.sobolevsky on 09.03.2017.
 */
"use strict";
document.addEventListener("DOMContentLoaded",AddClock);

function AddClock() {

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
    var HourArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var MinuteArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var SecondArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var TextClock=document.createElement("div");

    var CurrTime= new Date;


    var svg=document.getElementsByTagName('svg')[0];

    var clock=document.createElementNS("http://www.w3.org/2000/svg",'circle');

    clock.setAttribute( "id", "clock" );
    clock.setAttribute( "cx", ClockRadius/2 );
    clock.setAttribute( "cy", ClockRadius/2 );
    clock.setAttribute( "r", ClockRadius/2 );
    clock.setAttribute( "stroke", ClockBackground );
    clock.setAttribute( "fill", ClockBackground );

    TextClock.style.marginTop="4em";
    TextClock.style.textAlign="center";
    TextClock.style.font="16px sans-serif";

    var Arrows=[HourArrow,MinuteArrow,SecondArrow];
    HourArrow.setAttribute("width",WidthOfArrow.HourArrow);
    HourArrow.setAttribute("height",HeightOfArrow.HourArrow);
    MinuteArrow.setAttribute("width",WidthOfArrow.MinuteArrow);
    MinuteArrow.setAttribute("height",HeightOfArrow.MinuteArrow);
    SecondArrow.setAttribute("width",WidthOfArrow.SecondArrow);
    SecondArrow.setAttribute("height",HeightOfArrow.SecondArrow);
    SecondArrow.setAttribute("rx",WidthOfArrow.SecondArrow);
    SecondArrow.setAttribute("ry",WidthOfArrow.SecondArrow);
    MinuteArrow.setAttribute("rx",WidthOfArrow.MinuteArrow);
    MinuteArrow.setAttribute("ry",WidthOfArrow.MinuteArrow);
    HourArrow.setAttribute("rx",WidthOfArrow.HourArrow);
    HourArrow.setAttribute("ry",WidthOfArrow.HourArrow);



    svg.appendChild(clock);
    clock.appendChild(TextClock);
//    <rect x=10 y=45 width=100 height=30  stroke='#FF0000' fill=yellow />


    for (var j=0;j<Arrows.length;j++){
        svg.appendChild(Arrows[j]);
        Arrows[j].setAttribute( "x", ClockRadius/2 );
        Arrows[j].setAttribute( "y", ClockRadius/2 );
        Arrows[j].setAttribute( "stroke", ColorOfArrows );
        Arrows[j].setAttribute( "fill", ColorOfArrows );
        console.log( Arrows[j]);



    }



    for (var  i=num;i>0; i--){
        var hour = document.createElement("span");
        hour.appendChild(document.createTextNode(i));
        var f = 2 / num * i * Math.PI;
        var left = wrap + radius * Math.sin(f) + 'px';
        var top = wrap - radius * Math.cos(f) + 'px';
        hour.style.position="absolute";
        hour.style.top=top;
        hour.style.left=left;
        //Updateclock();
        clock.appendChild(hour);
    }

    function FormatDateTime(DT)
    {
        var Hours=DT.getHours();
        var Minutes=DT.getMinutes();
        var Seconds=DT.getSeconds();
        return  Str0L(Hours,2) + ':' + Str0L(Minutes,2) + ':' + Str0L(Seconds,2);
    }

    // дополняет строку Val слева нулями до длины Len
    function Str0L(Val,Len)
    {
        var StrVal=Val.toString();
        while ( StrVal.length < Len )
            StrVal='0'+StrVal;
        return StrVal;
    }




    function Updateclock() {
        var CurrTime=new Date();
        var H =CurrTime.getHours();
        var M =CurrTime.getMinutes();
        var S=CurrTime.getSeconds();
        var HAngle=H*HourToAngle-StartAngle+(M*0.5); // перемещение часовой стрелки  с + градусы от минут часа
        HourArrow.style.transform="rotate("+HAngle+"deg)";
        var MAngle=M*MinuteToAngle-StartAngle;
        MinuteArrow.style.transform="rotate("+MAngle+"deg)";
        var SAngle=S*SecondToAngle-StartAngle;
        SecondArrow.style.transform="rotate("+SAngle+"deg)";
        var NowTime=FormatDateTime(CurrTime);
        TextClock.innerHTML=NowTime;
    }

    //setInterval(Updateclock,1000);
    document.querySelector("body").style.cssText="border:0px;margin:0px;padding:0px;"
    document.head.querySelector("style").innerHTML="span{display: flex;justify-content: center;align-items: center;height: "+RadiusOfHour+";  width:"+RadiusOfHour+";  background-color: "+ColorOfHour+";  border-radius:"+RadiusOfHour+";  font-weight: 600 ;  font-family: Arial;}";
}
