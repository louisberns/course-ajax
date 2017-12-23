(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

    });

    //Unsplash API

    //const searchedForText = 'hippos';
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 161dff19cfe9a526711acbca66464c975c7ae77fbfe56cb3598f397a4ee69265')
    unsplashRequest.onload = addImage;

    unsplashRequest.send()

    function addImage() {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data && data.results && data.results[0]) {
        const firstImage = data.results[0];

          htmlContent = `<figure>
              <img src="${firstImage.urls.regular}" alt="${searchedForText}">
              <figcaption${searchedForText} by ${firstImage.user.name}</figcaption>
          </figure>`;
      } else {
        htmlContent = '<div class="error-no-image"> No images available</div>';
      }

      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    //NY TIMES API
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=eb05406cb11b47cca1b29ef60306ea4b`);
    articleRequest.send();

    function addArticles () {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data.response && data.response.docs && data.response.docs.length > 1) {
        htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
            </li>`
          ).join('') + '</ul>';
      } else {
        htmlContent = '<div class="error-no-articles"> No articles available</div>';
      }

      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();
