"use-strict";
angular.module("MyApp",["ngAnimate"] )
  .controller("myController", function($http) {
  var ctrl = this;
  ctrl.noMatch = false;
  ctrl.showMore = false;
  var api ="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&meta=&titles=&generator=search&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=";
  var cb = "&callback=JSON_CALLBACK";
  var url = "https://en.wikipedia.org/?curid=";
  var continueApi = "";
  var lastCall = "";

  ctrl.submitSearch = function() {
    document.getElementById('input').focus();
    ctrl.showMore = false;
    lastCall = "";
    if(ctrl.search) {
      ctrl.wikiPages = [];
      lastCall = api +ctrl.search;
      $http.jsonp(api +ctrl.search+ cb)
      .success(function(data) {
        //console.log(data);
        if(data.hasOwnProperty("query")) {
        var pages = data.query.pages;
          ctrl.noMatch = false;
          //console.log(lastCall);
          if(data.hasOwnProperty("continue")) {
            continueApi = "&continue="+data.continue.continue+"&gsroffset="+data.continue.gsroffset;
            ctrl.showMore = true;
          }
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

  ctrl.showMoreResult = function() {
    ctrl.showMore = false;
    //console.log(lastCall);
    $http.jsonp(lastCall+continueApi+cb)
    .success(function(data) {
      if(data.hasOwnProperty("query")) {
        //console.log(data);
        var pages = data.query.pages;
        if(data.hasOwnProperty("continue")) {
          continueApi = "&continue="+data.continue.continue+"&gsroffset="+data.continue.gsroffset;
          ctrl.showMore = true;
        }
        angular.forEach(pages, function(value,key)  {
          ctrl.wikiPages.push({title: value.title, body: value.extract, link: url+value.pageid })
        });
      }
    });
  }

});
