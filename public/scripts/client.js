const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    let result = createTweetElement(tweet);
    $("#tweets-container").prepend(result);
  }
};

const createTweetElement = function (tweet) {
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
              <p class="text-body">${tweet.content.text}</p>
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
    if (msg.length > 0 && msg.length < 140) {
      let form = $(this);
      let actionUrl = form.attr("action");

      $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(),
        success: function (data) {
          console.log(data);
        },
      });
      this.reset();
    } else {
      alert("tweet cannot be empty or over 140");
    }
  });
});
