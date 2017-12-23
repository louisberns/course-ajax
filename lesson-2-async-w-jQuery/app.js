/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
          headers: {
            Authorization: 'Client-ID 161dff19cfe9a526711acbca66464c975c7ae77fbfe56cb3598f397a4ee69265'
          }
        }).done(addImage);
    });

    /*searchedForText = 'games';
    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        Authorization: 'Client-ID 161dff19cfe9a526711acbca66464c975c7ae77fbfe56cb3598f397a4ee69265'
      }
    }).done(addImage);*/

    function addImage(data) {
      let htmlContent = '';
      //const data = JSON.parse(this.responseText);

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
