/**
 * Created by dllo on 17/8/9.
 */
var webpage = require('webpage');
var page    = webpage.create();
var fs      = require('fs');
phantom.outputEncoding = 'utf-8';

page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg);
};


page.open('https://www.douban.com/',function (status) {
    if (status === 'success'){
        console.log('成功');

        page.includeJs('https://code.jquery.com/jquery-3.2.1.min.js',function () {


            setTimeout(function () {
                var arrString = page.evaluate(function () {
                    var arr = [];
                    $('.main li .video-cover>a').each(function (index, element) {

                        var b = $(element).css('background-image').replace('url(','').replace(')','');
                        arr.push(b)
                    });
                    return arr;
                });
                // console.log(arrString);
                fs.write('./arr.json',arrString,'w');
                phantom.exit(0);
            },1000);
        });
        
    }else {
        console.log('失败');
        phantom.exit(0)
    }
});