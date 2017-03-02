var pic = document.getElementById("vimage");
var requestId;

var circle = function(x, y){
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", "0");
  c.setAttribute("fill", "red");
  c.setAttribute("stroke", "black");
  pic.appendChild(c);
}

var makeDvd = function() {
  var d = document.createElementNS("http://www.w3.org/2000/svg", 'image');
  d.setAttribute("height", 60);
  d.setAttribute("width", 90);
  d.setAttribute("x", 0);
  d.setAttribute("y", 0);
  d.setAttributeNS('http://www.w3.org/1999/xlink','href','logo_dvd.jpg');
  pic.appendChild(d);
}

var drawDotSetup = function() {
    clear();
    stop();
    var delta = 1;
    circle(250, 250);
    var drawDot = function() {
      c = document.getElementsByTagName("circle")[0];
	    radius = parseInt(c.getAttribute("r"));
      if (Math.abs(125 - (radius+delta)) > 125) { delta =  delta * -1 ; }
        radius += delta;
	       c.setAttribute("r", radius.toString());
       }

    requestId = window.setInterval(drawDot, 16);
}

var dvdSetup = function() {
    clear();
    stop();
    makeDvd();
    var right = true;
    var down = true;

    var drawDvd = function() {
	     d = document.getElementsByTagName("image")[0];
	     xcor = parseInt(d.getAttribute("x"));
	     ycor = parseInt(d.getAttribute("y"));
       if (xcor >= 400) { right = false; }
       else if (xcor <= 0) { right = true; }
       if (ycor <= 0) { down = true; }
       else if (ycor >= 400) { down = false; }
       if (right) { xcor++; }
       else  { xcor--; }
       if (down) { ycor++; }
       else { ycor--; }
	     d.setAttribute("x", xcor.toString());
	     d.setAttribute("y", ycor.toString()); }

    requestId = window.setInterval(drawDvd, 16);
}

var stop = function() { clearInterval(requestId); }

var clear = function() {
    while (pic.lastChild) {	pic.removeChild(pic.lastChild); }
}

document.getElementById("circle").addEventListener("click", drawDotSetup);
document.getElementById("dvd").addEventListener("click", dvdSetup);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("clear").addEventListener("click", clear);
