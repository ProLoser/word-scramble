angular.module('app', [
  'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('welcome', {
    url: '/',
    controller: 'Welcome',
    templateUrl: 'modules/welcome.html',
  });

  $stateProvider.state('game', {
    abstract: true,
    template: '<ui-view />',
  })

  $stateProvider.state('round', {
    parent: 'game',
    url: '/round/:word',
    resolve: {

    },
    controller: 'Round',
    templateUrl: 'modules/round.html'
  })
})

.controller('Welcome', function($scope, $state){
  $scope.go = $state.go;
})

.controller('Round', function($scope, $stateParams) {
  $scope.word = $stateParams.word;
  $scope.variations = [];

  /**
   * Adds the newWord input to the list if it passes the check
   */
  $scope.add = function() {
    var word = $scope.newWord.trim();
    if ($scope.isVariation($scope.word, word)
      && !~$scope.variations.indexOf(word)
      && word !== $scope.word) {
      $scope.variations.unshift(word.toLowerCase());
    }
    $scope.newWord = '';
  };

  /**
   * Determines if the input is a variation of the round word
   * @param  {string} variation Input to check
   * @return {boolean}          Is the input a variation of letters
   */
  $scope.isVariation = function(variation) {
    variation = variation || '';
    variation = variation.toLowerCase();
    var word = $scope.word.split('');
    var valid = variation.split('').every(function(varLetter){
      var index = word.indexOf(varLetter);
      if (~index) {
        word.splice(index, 1);
        return true;
      } else {
        return false;
      }
    });
    return valid;
  };
})
