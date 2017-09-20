var timer;
var i=0;
onmessage = function (oEvent) {
    var status=oEvent.data;
    switch (status){
        case 'start':
            postMessage(timedCount());
            timer=setInterval(function () {
                var ss=timedCount();
                postMessage(ss);
            },1000);
            break;
        case 'stop':
            if(timer && typeof timer=='number'){
                clearInterval(timer);
                i=0;
            }
            break;
        case 'pause':
            clearInterval(timer);
            break;
    }
    // if (status=='start'){
    //     postMessage(timedCount());
    //     timer=setInterval(function () {
    //         var ss=timedCount();
    //         postMessage(ss);
    //     },1000)
    // }else{
    //     if(timer && typeof timer=='number'){
    //         clearInterval(timer);
    //         i=0;
    //     }
    // }
    function timedCount() {
        i++
        return i;
    }
};
