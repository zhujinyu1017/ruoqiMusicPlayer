/**
 * Created by zhujinyu on 2017/9/16.
 */
var w;

function startWorker(){
    if(typeof(Worker)!=="undefined"){
        if(typeof(w)=="undefined"){
            w=new Worker("./js/front/demo_workers.js");
        }
        w.postMessage("start");
    }
    else{
        document.getElementById("lrc").innerHTML="暂无歌词！";
    }
}
function stopWorker() {
    w.postMessage("stop"); // start the worker.
}
startWorker();
w.addEventListener("message", function (ev) {
    console.log(ev.data);
}, false);
