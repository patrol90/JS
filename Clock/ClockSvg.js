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
    var TextLenHour ="12";
    var RadiusOfHour="30";
    var ArrowsTransformOrigin="7";
    var WidthOfArrow={HourArrow:"10",MinuteArrow:"7",SecondArrow:"3"};
    var HeightOfArrow={HourArrow:"70",MinuteArrow:"90",SecondArrow:"100"};
    var SecondToAngle=6;
    var MinuteToAngle=6;
    var HourToAngle=30;
    var StartAngle=180;
    var ArrowsOpacity="0.8";
    var HourArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var MinuteArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var SecondArrow=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var TextClock=document.createElementNS("http://www.w3.org/2000/svg",'text');
    var CurrTime= new Date;


    var svg=document.getElementsByTagName('svg')[0];
    var clock=document.createElementNS("http://www.w3.org/2000/svg",'circle');

    clock.setAttribute( "id", "clock" );
    clock.setAttribute( "cx", ClockRadius/2 );
    clock.setAttribute( "cy", ClockRadius/2 );
    clock.setAttribute( "r", ClockRadius/2 );
    clock.setAttribute( "stroke", ClockBackground );
    clock.setAttribute( "fill", ClockBackground );


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
    svg.appendChild(TextClock);



    for (var  i=num;i>0; i--){

        var hour=document.createElementNS("http://www.w3.org/2000/svg",'circle');
        var text=document.createElementNS("http://www.w3.org/2000/svg",'text');


        text.appendChild(document.createTextNode(i));

        var f = 2 / num * i * Math.PI;
        var left = wrap + radius * Math.sin(f) ;
        var top = wrap - radius * Math.cos(f) ;
        hour.style.top=top;
        hour.style.left=left;

        hour.setAttribute( "cx", left + RadiusOfHour/2);
        hour.setAttribute( "cy", top + RadiusOfHour/2 );
        hour.setAttribute( "r", RadiusOfHour/2 );
        hour.setAttribute( "stroke", ColorOfHour );
        hour.setAttribute( "fill", ColorOfHour );
        text.setAttribute("textLength",TextLenHour);
        text.setAttribute("lengthAdjust","spacing");
        if (i>9){ //костыль на варавнивание текста :)

            text.setAttribute("x",left + RadiusOfHour/2-TextLenHour/2-2);
            text.setAttribute("y",top + RadiusOfHour/2 +TextLenHour/2 );
        } else {
            text.setAttribute("x",left + RadiusOfHour/2-TextLenHour/2+1);
            text.setAttribute("y",top + RadiusOfHour/2 +TextLenHour/2 );
        }
        Updateclock();

        svg.appendChild(hour);
        svg.appendChild(text);

    }

    for (var j=0;j<Arrows.length;j++){
        svg.appendChild(Arrows[j]);
        Arrows[j].setAttribute( "x", ClockRadius/2 - Arrows[j].getBBox().width/2 );
        Arrows[j].setAttribute( "y", ClockRadius/2 -ArrowsTransformOrigin );
        Arrows[j].setAttribute( "fill", ColorOfArrows );
        Arrows[j].setAttribute( "fill-opacity", ArrowsOpacity );
        Arrows[j].setAttribute( "fill-opacity", ArrowsOpacity );
        Arrows[j].style.transformOrigin="center" +" " + ArrowsTransformOrigin + "%";
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
        TextClock.setAttribute('x', ClockRadius/2 -TextClock.getBBox().width/2 );
        TextClock.setAttribute('y',ClockRadius/3);
    }

    setInterval(Updateclock,1000);
    document.querySelector("body").style.cssText="border:0px;margin:0px;padding:0px;"
    document.head.querySelector("style").innerHTML="body > svg > text{font-weight: 600 ;  font-family: Arial;}";


}