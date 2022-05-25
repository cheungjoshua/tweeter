// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

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
  });
});
