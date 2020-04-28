

function main() {
    const ks = Object.keys(data);

    let quizzes = document.getElementById("quizList");
    quizzes.innerHTML = "";
    quizzes.style.display = "";

    for (let i = 0; i < 1000; i++) {
        let entry = document.createElement("li");

        const rs = randRangeList(0, ks.length, 2);
        const a = ks[rs[0]];
        const b = ks[rs[1]];

        entry.innerHTML = "Can we guess your favourite " + a + " if you answer these questions about " + b + "?";
        entry.onclick = function () {
            quizzes.style.display = "none";
            quiz(a, b);
        };

        quizzes.appendChild(entry);
    }
}

function quiz(resultType, topic) {
    let quiz = document.getElementById("quiz");
    quiz.style.display = "";

    question(resultType, topic, 1);
}

function question(resultType, topic, n) {
    let quiz = document.getElementById("quiz");
    quiz.innerHTML = "<p>Question " + n + ": Which is your favorite out of these " + topic + "?</p>";

    quiz.onclick = function() {
        if (n < 5) {
            question(resultType, topic, n + 1);
        } else {
            quiz.innerHTML = "";
            showResult(resultType);
        }
    }

    let ps = data[topic];
    let rs = randRangeList(0, ps.length, 4);
    console.log(rs);


    for (r in rs) {
        if(r == 2) { quiz.appendChild(document.createElement("figure")); }
        let fig = document.createElement("figure");
        let figCaption = document.createElement("figcaption");
        let caption = document.createTextNode(ps[rs[r]]);
        figCaption.appendChild(caption);
        let img = document.createElement("img");
        img.className = "option";
        getImageOf(img, ps[rs[r]]);
        fig.appendChild(img);
        fig.appendChild(figCaption);
        quiz.appendChild(fig);
    }

}

function createParams(prop, titles) {
    return {
        origin: "*",
        action: "query",
        format: "json",
        prop: prop,
        titles: titles,
        redirects: true
    };
}

function addParams(url, params) {
    return url + "?" + Object.keys(params).map((param) => { return param + "=" + params[param]; }).join("&");
}

function getImageOf(img, thing) {
    const api = "https://en.wikipedia.org/w/api.php";

    const params = createParams("images", thing);

    fetch(addParams(api, params))
        .then((response) => { return response.json(); })
        .then(async (response) => {
            var pages = response.query.pages;
            for (var page in pages) {
                const images = await Promise.all(pages[page].images.map((img) => {
                    let params = createParams("imageinfo", img.title);
                    params.iiprop = "url";
                    params.redirects = true;

                    return fetch(addParams(api, params))
                            .then((response) => { return response.json(); })
                            .then((response) => {
                                const pages = response.query.pages;
                                return Object.keys(pages).map((page) => {
                                    return pages[page].imageinfo[0].url;
                                });
                            });
                }));
                let images2 = filterExclusion(images);
                img.src = images2[randRange(0, images2.length)];
            }
        });
}

function showResult(type) {
    let quiz = document.getElementById("quiz");
    quiz.style.display = "none";

    let result = document.getElementById("result");
    let ps = data[type];
    result.innerHTML = "You got: " + ps[randRange(0, ps.length)] + "!";

    result.onclick = function() {
        result.innerHTML = "";
        main();
    }
}
