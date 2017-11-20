const superagent = require("superagent");
const cheerio = require("cheerio");
const express = require("express");
const eventProxy = require("eventproxy");

const url = require("url")

var app = express();

app.get("/", (req, res, next) =>{
    var cnodeurl = "https://cnodejs.org/"
    superagent.get(cnodeurl)
    .end((err, sres) => {
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var topicUrls = [];
        $('#topic_list .topic_title').each((idx, element) =>{
            var title = $(element).attr("href");
            var href = url.resolve(cnodeurl, title)
            topicUrls.push(href);
        });

        topicUrls = topicUrls.slice(4,8);

        var ep = new eventProxy();
        ep.after('topic_html', topicUrls.length, function(topics) {

            topics = topics.map((topicPair) => {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                var author = $(".user_info .reply_author").eq(0).text().trim();
                var obj = {};
                obj["title"] = $(".topic_full_title").text().trim();
                obj["href"] = topicUrl;
                obj["comment1"] = $(".reply_content ").eq(0).text().trim();
                obj["author1"] = author;
                obj["score"]= '';
                return obj;
                // var self = this;
                // var userUrl = url.resolve(cnodeurl, 'user/'+author);
                // superagent.get(userUrl).end((err, sre) => {
                //     var $ = cheerio.load(sre.text);
                //     self.obj["score"] = $(".userinfo .big").eq(0).text().trim();
                //     return self.obj;
                // });

             });
            console.log('final');
            res.send(topics);
        });

        topicUrls.forEach((topicUrl)=>{
            superagent.get(topicUrl)
            .end((err, sre)=> {
                console.log('fetch url: '+topicUrl);
                ep.emit('topic_html', [topicUrl, sre.text])
           })
        });

    })
})

// app.listen(3000, ()=>{
//     console.log("yeah!")
// })
