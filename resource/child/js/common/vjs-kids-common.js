videojs.options.flash.swf = "https://cdn.bootcss.com/video.js/5.20.4/video-js.swf";
var player = videojs("kids-video", {
    "controls": true,
    "autoplay": false,
    "preload": "auto",
    "loop": false,
    controlBar: {
        captionsButton: false,
        chaptersButton: false,
        playbackRateMenuButton: true,
        LiveDisplay: false,
        subtitlesButton: false,
        remainingTimeDisplay: false,
        progressControl: true,
        volumeMenuButton: {
            inline: true,
            vertical: false
        },//竖着的音量条
        fullscreenToggle: true
    }

},function () {

    var newEl= document.createElement('div');
    newEl.className= 'kids-remaining-time vjs-time-control vjs-control';
    newEl.id= 'kids-remaining-time';
    newEl.innerHTML = '<div class="kids-remaining-time-display">00:00 / 00:00</div>';
    var controlBar = document.getElementsByClassName('vjs-control-bar')[0];
    insertBeforeNode = document.getElementsByClassName('vjs-duration')[0];
    controlBar.insertBefore(newEl,insertBeforeNode);
    var time_refresh=setInterval(function () {
        document.getElementsByClassName('kids-remaining-time-display')[0].innerHTML=sec_to_time(player.currentTime())+' / '+sec_to_time(player.duration());
    },1000);
    if(player.currentTime()===player.duration()){
        clearInterval(time_refresh);
    }
});
player.on('play',function(){
    document.getElementsByClassName('vjs-big-play-button')[0].style.display='none';
});
/** 时间秒数格式化 **/
function sec_to_time(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = Math.floor(s % 60);
        if(hour < 10) {
            t = "";
        } else {
            t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
}