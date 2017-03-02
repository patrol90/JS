"use strict"
document.addEventListener("DOMContentLoaded", start,false);
function start() {
    var counter=0;
    var mouseOffset;

    console.log('>');
    var arr=document.querySelectorAll(".container img");
    for(var i=0;i<arr.length;i++){
        arr[i].addEventListener("mousedown",Mouse_Down,false);
        arr[i].addEventListener("mouseup",Mouse_Up,false);

    }

    function Mouse_Down(EO) {
        if (EO.which != 1) {
            return;
        } else {
            counter++;
            EO=EO||window.event;
            EO.preventDefault();
            var DragElement=EO.target;
            DragElement.style.position="absolute";
            DragElement.style.left= DragElement.offsetLeft + "px";
            DragElement.style.top= DragElement.offsetTop + "px";
            DragElement.style.zIndex=counter;
            DragElement.addEventListener("mousemove",Mouse_Move,false);
            DragElement.classList.add("move");
        }
        mouseOffset = getMouseOffset(DragElement, EO);


    }
    function Mouse_Up(EO) {
        EO=EO||window.event;
        EO.preventDefault();
        var DragElement=EO.target;
        DragElement.removeEventListener("mousemove", Mouse_Move,false)
        DragElement.classList.remove("move");
        DragElement.classList.add("basic");


    }
    function Mouse_Move(EO) {
        EO=EO||window.event;
        EO.preventDefault();
        var DragElement=EO.target;
        DragElement.style.left=EO.pageX - mouseOffset.x +"px";
        DragElement.style.top=EO.pageY -mouseOffset.y+ "px";
        console.log(EO);
    }
    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }
    function getMouseOffset(elem, EO) {
        var docPos	= getCoords(elem);
        return {x:EO.pageX - docPos.left, y:EO.pageY - docPos.top};
    }



}
