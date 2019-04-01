var menuNavbar;

window.onload  = function() {
    if (window.pageYOffset == 0 && document.documentElement.clientWidth >= 768)
    {
        header.style.background = "transparent";
        header.style.padding = "10px 50px";
    }
    else
    {
        header.style.background = "#272a33";
        header.style.padding = "5px 50px";
    }
    menuNavbar = document.getElementsByClassName("nav-link");//getElementById("myNavbar").getElementsByTagName("a");

}

window.onresize = function() {
	if (window.pageYOffset == 0 && document.documentElement.clientWidth >= 768)
    {
        header.style.background = "transparent";
        header.style.padding = "10px 50px";
    }
    else
    {
        header.style.background = "#272a33";
        header.style.padding = "5px 50px";
    }
}

window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    var header = document.getElementById("header");
    if (window.pageYOffset == 0 && document.documentElement.clientWidth >= 768)
    {
        header.style.background = "transparent";
        header.style.padding = "10px 50px";
    }
    else
    {
        header.style.background = "#272a33";
        header.style.padding = "5px 50px";
    }
  }

$(document).ready(function(){
    $("#header").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
/*

menuNavbar.onclick = function() {
    console.log(menuNavbar.attr("href") + " 456");
    window.location.hash = document.getElementsByTagName("a").attr("href");
}
*/

  $(function(){
    $('a[href^="#"]').on('click', function(event) {
      event.preventDefault();
      
      var sc = $(this).attr("href");
          
    if (sc == "#top")
    {
        $('html, body').animate({scrollTop: 0}, 1000);
    }
    else
    {
        dn = $(sc).offset().top;
        $('html, body').animate({scrollTop: dn - 100}, 1000);
    }
    });
  });
