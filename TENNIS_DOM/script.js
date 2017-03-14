/**
 * Created by dmitry.sobolevsky on 14.03.2017.
 */
"use strict"
var AreaH=
{
    Width : 400,
    Height : 300,
    Background:"#f0ee7e",
    TeamLeft :0,
    TeamRight :0,
    goal: false,
    DirectionX:1,
    DirectionY:1,
    BlockLeft:{
        PosX : 0,
        PosY : 0,
        SpeedY : 30,
        Width : 15,
        Height: 100,
        color: "#09aa57"
    },
    BlockRight:{
        PosX : 0,
        PosY : 0,
        SpeedY : 30,
        Width : 15,
        Height: 100,
        color: "#191497"
    }

};
var BallH=
{
    PosX : 0,
    PosY : 10,
    SpeedX : 2,
    SpeedY : 2,
    AccelX : 0,
    AccelY : 0.5,
    Width : 50,
    Height: 50,
    color: "#f02137",


    Create : function () {
        //Area
        var Area=document.createElement('div');
        Area.style.width=AreaH.Width + "px";
        Area.style.height=AreaH.Height + "px";
        Area.style.border="1px solid black";
        Area.style.position="relative";
        Area.style.background=AreaH.Background;

        var Counter=document.createElement('div');
        Counter.id="counter";
        Counter.style.fontSize="40px";
        Counter.style.display="inline-block";
        Counter.style.marginLeft="2em";
        Counter.style.fontFamily="arial";
        var TextCounter=document.createTextNode("0:0");
        Counter.appendChild(TextCounter);


        //Ball
        var BallObj=document.createElement('div');
        BallObj.style.background=BallH.color;
        BallObj.id="Ball";
        BallH.PosY=AreaH.Height/2-BallH.Height/2;
        BallH.PosX=AreaH.Width/2-BallH.Width/2;
        BallObj.style.width=BallH.Width + "px";
        BallObj.style.height=BallH.Height + "px";
        BallObj.style.borderRadius=BallH.Width/2 + "px";
        BallObj.style.position="absolute";
        Area.appendChild(BallObj);

        //Left
        var LeftBlock=document.createElement('div');
        LeftBlock.style.width=AreaH.BlockLeft.Width +"px";
        LeftBlock.style.height=AreaH.BlockLeft.Height +"px";
        LeftBlock.style.background=AreaH.BlockLeft.color;
        LeftBlock.style.left=AreaH.BlockLeft.PosX+"px";
        LeftBlock.style.position="absolute";
        LeftBlock.style.top=AreaH.Height/2 -AreaH.BlockLeft.Height/2+"px";
        AreaH.BlockLeft.PosY=AreaH.Height/2 -AreaH.BlockLeft.Height/2;
        Area.appendChild(LeftBlock);

        //Right
        var RightBlock=document.createElement('div');
        RightBlock.style.width=AreaH.BlockRight.Width +"px";
        RightBlock.style.height=AreaH.BlockRight.Height+"px";
        RightBlock.style.background=AreaH.BlockRight.color;
        RightBlock.style.left=AreaH.Width-AreaH.BlockRight.Width + "px";
        RightBlock.style.position="absolute";
        RightBlock.style.top=AreaH.Height/2 -AreaH.BlockRight.Height/2+"px";
        AreaH.BlockRight.PosY=AreaH.Height/2 -AreaH.BlockRight.Height/2;
        AreaH.BlockRight.PosX=AreaH.Width-AreaH.BlockRight.Width;
        Area.appendChild(RightBlock);

        document.querySelector("body").appendChild(Counter);
        document.querySelector("body").appendChild(Area);
        document.addEventListener("keydown",InputKey,false);
        document.addEventListener("keydown",InputKey2,false);



        function InputKey(EO) //left
        {
            EO=EO||window.event;
            var PressedChar=EO.keyCode;
            switch (PressedChar){
                case 16:
                    if(AreaH.BlockLeft.PosY>0) {
                        console.log(AreaH.BlockLeft.PosY);
                        AreaH.BlockLeft.PosY-=AreaH.BlockLeft.SpeedY;
                        requestAnimationFrame(function () {
                            LeftBlock.style.top=Math.round(AreaH.BlockLeft.PosY) +"px";
                        })
                    }
                    break;

                case 17:

                    if(AreaH.BlockLeft.PosY< (AreaH.Height-AreaH.BlockLeft.Height) ) {
                        console.log(AreaH.BlockLeft.PosY);
                        AreaH.BlockLeft.PosY+=AreaH.BlockLeft.SpeedY;
                        requestAnimationFrame(function () {
                            LeftBlock.style.top=Math.round(AreaH.BlockLeft.PosY) +"px";
                        })
                    }
                    break;
            }
            if(AreaH.BlockLeft.PosY> (AreaH.Height-AreaH.BlockLeft.Height) ){
                AreaH.BlockLeft.PosY=AreaH.Height-AreaH.BlockLeft.Height;
            }
            if(AreaH.BlockLeft.PosY<0) {
                AreaH.BlockLeft.PosY=0;
            }
        }
        function InputKey2(EO) //right
        {
            EO=EO||window.event;

            var PressedChar=EO.keyCode;
            console.log(PressedChar);
            switch (PressedChar){


                case 38:

                    if(AreaH.BlockRight.PosY>0) {
                        console.log(AreaH.BlockRight.PosY);
                        AreaH.BlockRight.PosY-=AreaH.BlockRight.SpeedY;
                        requestAnimationFrame(function () {
                            RightBlock.style.top=Math.round(AreaH.BlockRight.PosY) +"px";
                        })
                    } else {
                        AreaH.BlockRight.PosY=0;
                    }
                    break;

                case 40:
                    if(AreaH.BlockRight.PosY< (AreaH.Height-AreaH.BlockRight.Height) ) {
                        console.log(AreaH.BlockRight.PosY);
                        AreaH.BlockRight.PosY+=AreaH.BlockRight.SpeedY;
                        requestAnimationFrame(function () {
                            RightBlock.style.top=Math.round(AreaH.BlockRight.PosY) +"px";
                        })
                    } else {
                        AreaH.BlockRight.PosY=AreaH.Height-AreaH.BlockRight.Height;
                    }
                    break;
            }
            if(AreaH.BlockRight.PosY> (AreaH.Height-AreaH.BlockRight.Height) ){
                AreaH.BlockRight.PosY=AreaH.Height-AreaH.BlockRight.Height;
            }
            if(AreaH.BlockRight.PosY<0) {
                AreaH.BlockRight.PosY=0;
            }

        }


    },
    Update : function() {
        var BallObj=document.querySelector("#Ball");
        BallObj.style.left = Math.round(this.PosX) + "px";
        BallObj.style.top = Math.round(this.PosY) + "px";

    }
};



function Start()
{
    AreaH.DirectionX=getRandomInt(0,1);
    AreaH.DirectionY=getRandomInt(0,1);

    if (AreaH.goal){
        AreaH.goal=false;
        BallH.PosX=AreaH.Height/2-BallH.Height/2;
        BallH.PosY=AreaH.Width/2-BallH.Width/2;
        requestAnimationFrame(Tick);
    } else {
        // плавное движение - от 25 кадр/сек
        requestAnimationFrame(Tick);
    }

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function Tick()
{
    if (!AreaH.goal) {


        BallH.SpeedX += BallH.AccelX;
        if (AreaH.DirectionX){
            BallH.PosX += BallH.SpeedX;
        } else {
            BallH.PosX -= BallH.SpeedX;
        }



        // вылетел ли мяч правее стены?
        if (BallH.PosX + BallH.Width > AreaH.Width) {
            //BallH.SpeedX=-BallH.SpeedX;
            BallH.PosX = AreaH.Width - BallH.Width;
            AreaH.TeamLeft++;
            document.querySelector("#counter").innerHTML = AreaH.TeamLeft + ":" + AreaH.TeamRight;
            AreaH.goal=true;
        }

        // вылетел ли мяч левее стены?
        if (BallH.PosX < 0) {
            //BallH.SpeedX=-BallH.SpeedX;
            BallH.PosX = 0;
            AreaH.TeamRight++;
            document.querySelector("#counter").innerHTML = AreaH.TeamLeft + ":" + AreaH.TeamRight;
            AreaH.goal=true;
        }



        if (AreaH.DirectionY) {
            BallH.PosY += BallH.SpeedY;
        } else {
            BallH.PosY -= BallH.SpeedY;
        }



        // вылетел ли мяч ниже пола?
        if (BallH.PosY + BallH.Height > AreaH.Height) {
            BallH.SpeedY = -BallH.SpeedY;
            BallH.PosY = AreaH.Height - BallH.Height;
        }
        // вылетел ли мяч выше  потолка?
        if (BallH.PosY  < 0) {
            BallH.PosY = 0;
            BallH.SpeedY = -BallH.SpeedY;
        }

        console.log(BallH.PosY);


        BallH.Update();

        var BallRight = BallH.PosX + BallH.Width;
        var BallBottom = BallH.PosY + BallH.Height;



        if (BallH.PosX < (AreaH.BlockLeft.PosX + AreaH.BlockLeft.Width) && BallH.PosY > AreaH.BlockLeft.PosY && BallH.PosY < (AreaH.BlockLeft.PosY + AreaH.BlockLeft.Height) || BallH.PosX < (AreaH.BlockLeft.PosX + AreaH.BlockLeft.Width)&& (BallH.PosY+BallH.Height)>AreaH.BlockLeft.PosY && BallH.PosY<AreaH.BlockLeft.PosY) {

            BallH.SpeedX = -BallH.SpeedX;
            BallH.PosX = AreaH.BlockLeft.Width;

        }

        if (BallRight > AreaH.BlockRight.PosX && BallH.PosY > AreaH.BlockRight.PosY && BallH.PosY < (AreaH.BlockRight.PosY + AreaH.BlockRight.Height ) || BallRight > AreaH.BlockRight.PosX && (BallH.PosY+BallH.Height)>AreaH.BlockRight.PosY && BallH.PosY<AreaH.BlockRight.PosY ) {

            BallH.SpeedX = -BallH.SpeedX;
            BallH.PosX = AreaH.Width - AreaH.BlockRight.Width - BallH.Width;
        }
        requestAnimationFrame(Tick);

    } else {
        alert("Goaal!");
        if(confirm("Are you ready?")){
            Start();
        }

    }



}
BallH.Create();
BallH.Update();
