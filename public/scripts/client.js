const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (let tweet of tweets) {
    let result = createTweetElement(tweet);
    $("#tweets-container").prepend(result);
  }
};

// Function sanitize any XXS to string
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  // use sanitize function for input field data
  let escapetxt = escape(tweet.content.text);

  let $tweet = $(` <article class="tweet">
                  <header class="tweet-header">
                    <div class="userLogo">
                      <div class="pic">
                        <img src="${tweet.user.avatars}" />
                      </div>
                      <div class="fullName">${tweet.user.name}</div>
                    </div>
                    <div class="userName">${tweet.user.handle}</div>
                  </header>
                  <body class="tweet-body">
                    <p class="text-body">${escapetxt}</p>
                    <div class="line"></div>
                  </body>
                  <footer class="tweet-footer">
                    <div class="day">${timeago.format(tweet.created_at)}</div>
                    <div class="icons">
                      <i class="fa-solid fa-flag"></i>
                      <i class="fa-solid fa-retweet"></i>
                      <i class="fa-solid fa-heart"></i>
                    </div>
                  </footer>
                </article>`);

  return $tweet;
};

const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((data) => renderTweets(data));
};

$("document").ready(() => {
  loadTweets();
  $("form").submit(function (event) {
    event.preventDefault();
    let msg = $("textarea").val();
    if (msg.length === 0) {
      $(".textEmpty").fadeIn("slow");
    }
    if (msg.length > 0 && msg.length < 140) {
      let form = $(this);
      let actionUrl = form.attr("action");
      console.log(this);
      $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(),
        success: loadTweets,
      });
      this.reset();
    }
  });
});
