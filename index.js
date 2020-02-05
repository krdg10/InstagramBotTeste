const instagramPosts = require('instagram-posts');
const instagramSave = require('instagram-save');
const instory = require('instory');

var fs = require('fs'),
request = require('request');

//função que faz download de imagem/video a partir de url
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    var type =  res.headers['content-type'];
    type = type.substring(type.indexOf("/") + 1);

    request(uri).pipe(fs.createWriteStream(filename+'.'+type)).on('close', callback);
  });
};

(async () => {
    //pega urls dos stories. posição [0] é o ultimo storie postado no ar
    instory('nickiminaj').then(res => {
        //console.log(res);
        download(res.story[0], new Date().getTime(), function(){
            console.log('done');
        });
       
    })

    //baixa posts do instagram. instagrampost pega a url e instagramsave salva a partir dela. [0] é o ultimo post feito.
    await instagramPosts('cristiano', {count: 1})
        .then(response => {
            instagramSave(response[0].url, 'results').then(res => {
                console.log(res.file);
            });
        });
})
();



