angular.module("MyApp",["ngAnimate"] )
  .controller("myController", function($http) {
  var ctrl = this;
  ctrl.noMatch = false;
  var api ="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&meta=&titles=&generator=search&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=";
  var cb = "&callback=JSON_CALLBACK";
  var url = "https://en.wikipedia.org/?curid=";

  ctrl.submitSearch = function() {
    document.getElementById('input').focus();
    if(ctrl.search) {
      ctrl.wikiPages = [];
      $http.jsonp(api +ctrl.search+ cb)
      .success(function(data) {
        if(data.hasOwnProperty("query")) {
        var pages = data.query.pages;
          ctrl.noMatch = false;
          angular.forEach(pages, function(value,key)  {
            ctrl.wikiPages.push({title: value.title, body: value.extract, link: url+value.pageid })
          });
        } else {
          ctrl.noMatch = true;
        }
      });
      ctrl.search = "";
    }
  }

});
