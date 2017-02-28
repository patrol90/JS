"use strict"
document.addEventListener("DOMContentLoaded", start,false);
function start() {
    var counter=0;
    console.log('>');
    var arr=document.querySelectorAll(".container img");
    for(var i=0;i<arr.length;i++){
        arr[i].addEventListener("mousedown",Mouse_Down,false);
        arr[i].addEventListener("mouseup",Mouse_Up,false);

    }

    function Mouse_Down(EO) {
        counter++;
        EO=EO||window.event;
        EO.preventDefault();
        console.log(EO);
        var DragElement=EO.target;
        DragElement.style.position="absolute";
        DragElement.style.left= DragElement.offsetLeft + "px";
        DragElement.style.top= DragElement.offsetTop + "px";
        DragElement.style.zIndex=counter;
        console.log(DragElement.offsetLeft);
        if (EO.which != 1) { // если клик правой кнопкой мыши
            return; // то он не запускает перенос
        } else {
            DragElement.addEventListener("mousemove",Mouse_Move,false);
        }

        function Mouse_Move(EO) {
            EO=EO||window.event;
            EO.preventDefault();
            console.log(EO.pageX);
            var DragElement=EO.target;
            var shiftX = EO.pageX - getCoords(DragElement).left;
            var  shiftY = EO.pageY - getCoords(DragElement).top;
            DragElement.style.left=EO.pageX - shiftX +"px";
            DragElement.style.top=EO.pageY -shiftY+ "px";


        }

    }
    function Mouse_Up(EO) {
        EO=EO||window.event;
        EO.preventDefault();
        var DragElement=EO.target;
        DragElement.removeEventListener("mousemove", Mouse_Move,false)

    }

    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }


}
