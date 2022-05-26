//Logic Ajax the tweet display

// Logic for after get the data from server
const renderTweets = function (tweets) {
  // empty the old tweet
  $("#tweets-container").empty();
  //loop thought the new data
  for (let tweet of tweets) {
    //call function for each
    let result = createTweetElement(tweet);
    //add the tweet one by one
    $("#tweets-container").prepend(result);
  }
};

// Function sanitize any XXS to string
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Create the template for the tweet
const createTweetElement = function (tweet) {
  // use sanitize function for input field data
  let escapetxt = escape(tweet.content.text);
  // template with html tag
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
  // return the tamplate
  return $tweet;
};

// Load tweets with get method from server
const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((data) => renderTweets(data));
};

$("document").ready(() => {
  // Get tweet from server everytime load the page
  loadTweets();
  // Ajax: send tweet to server
  $("form").submit(function (event) {
    event.preventDefault();
    let msg = $("textarea").val();
    if (msg.length === 0) {
      $(".textEmpty").fadeIn("slow");
    }
    // if text more than 140 chars and less than 0 send error
    // else submit the tweet and send to server
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
      // empty the text field after submit
      this.reset();
      // reset the counter back to 140
      $("output.counter").text(140);
    }
  });
});
