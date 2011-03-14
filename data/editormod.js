// figure out why this is being called twice sometimes.
var pad = document.querySelector("iframe#etherpad");
if (pad) {
  // figure out where to put these
  document.body.removeChild(document.querySelector(".instructions"));

  var parts = document.location.toString().split("/");
  var pagename = parts[ parts.length - 2 ];

  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.style.width = "";

  // remove htmlpad's styles
  pad.style.padding = "";
  pad.style.float = "";

  // position. wth, why won't it go relative?
  pad.style.margin = "0";
  pad.style.width = "720px";
  pad.style.position = "absolute";
  pad.style.left = "0px";
  pad.style.top = "0";

  pad.addEventListener("load", function() {
    let viewerframe = document.createElement("iframe");
    viewerframe.id = "viewer";
    viewerframe.style.width = "48%";
    viewerframe.style.height = "99%";
    viewerframe.style.position = "absolute";
    viewerframe.style.top = "0";
    viewerframe.style.left = "732px";
    document.body.appendChild(viewerframe);

    var ace = pad.contentWindow.padeditor.ace;
    var id = window.setInterval(function() {
      var txt = ace.exportText();
      if (txt.search("awaiting init") == -1) {
        window.clearInterval(id);
        viewerframe.src = "data:text/html," + txt;
      }
    }, 200);
    ace.setUserChangeNotificationCallback(function() {
      viewerframe.src = "data:text/html," + ace.exportText();
    });
  }, false);

}
