$("#closechat").click(function() {
  $("div.chatbox").toggleClass( "close-chat");
  
});

$("#chatmessage").click(function() {
  $("div.chatbox").removeClass( "close-chat");
  
  if($('div.chatbox').hasClass('minimize-chat')){
      $('div.chatbox').removeClass('minimize-chat');
  }

  if($('div.chatter-wrap').hasClass('close-chat')) {
    $('div.chatter-wrap').removeClass('close-chat');
    $('div.stick').removeClass('stick-bottom');
  }

});

$(".chat-header").click(function() {
  $("div.chatbox").toggleClass( "minimize-chat");
  $("div.stick").toggleClass("stick-bottom");
  $("div.chatter-wrap").toggleClass( "close-chat");
});


var height = 0;
$('div.speech-col p').each(function(i, value){
    height += parseInt($(this).height());
});

height += '';

$('.speech-col').animate({scrollTop: height});

    var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init () {
    var text = document.getElementById('chatwrite');
    function resize () {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change',  resize);
    observe(text, 'cut',     delayedResize);
    observe(text, 'paste',   delayedResize);
    observe(text, 'drop',    delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
}

init();



//This is for the FORM PROGRESS BAR

$(function() {
 
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
 
$(".next").click(function(){
if(animating) return false;
animating = true;
 
current_fs = $(this).parent();
next_fs = $(this).parent().next();
 
//activate next step on progressbar using the index of next_fs
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
 
//show the next fieldset
next_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale current_fs down to 80%
scale = 1 - (1 - now) * 0.2;
//2. bring next_fs from the right(50%)
left = (now * 50)+"%";
//3. increase opacity of next_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({'transform': 'scale('+scale+')'});
next_fs.css({'left': left, 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 
//this comes from the custom easing plugin
easing: 'easeInOutBack'
});
});
 
$(".previous").click(function(){
if(animating) return false;
animating = true;
 
current_fs = $(this).parent();
previous_fs = $(this).parent().prev();
 
//de-activate current step on progressbar
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
 
//show the previous fieldset
previous_fs.show(); 
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now, mx) {
//as the opacity of current_fs reduces to 0 - stored in "now"
//1. scale previous_fs from 80% to 100%
scale = 0.8 + (1 - now) * 0.2;
//2. take current_fs to the right(50%) - from 0%
left = ((1-now) * 50)+"%";
//3. increase opacity of previous_fs to 1 as it moves in
opacity = 1 - now;
current_fs.css({'left': left});
previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
}, 
duration: 800, 
complete: function(){
current_fs.hide();
animating = false;
}, 
//this comes from the custom easing plugin
easing: 'easeInOutBack'
});
});
 
$(".submit").click(function(){
return false;
})
 
});