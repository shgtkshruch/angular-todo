(function() {
  angular.module('App', []).controller('MainController', [
    '$scope', '$filter', function($scope, $filter) {
      var originalTitle, where;
      $scope.todos = [];
      $scope.newTitle = '';
      $scope.addTodo = function() {
        $scope.todos.push({
          title: $scope.newTitle,
          done: false
        });
        return $scope.newTitle = '';
      };
      $scope.filter = {
        done: {
          done: true
        },
        remaining: {
          done: false
        }
      };
      $scope.currentFilter = null;
      $scope.changeFilter = function(filter) {
        return $scope.currentFilter = filter;
      };
      where = $filter('filter');
      $scope.$watch('todos', function(todos) {
        var length;
        length = todos.length;
        $scope.allCount = length;
        $scope.doneCount = where(todos, $scope.filter.done).length;
        return $scope.remainingCount = length - $scope.doneCount;
      }, true);
      originalTitle = null;
      $scope.editing = null;
      $scope.editTodo = function(todo) {
        originalTitle = todo.title;
        return $scope.editing = todo;
      };
      $scope.doneEdit = function(todoForm) {
        if (todoForm.$invalid) {
          $scope.editing.title = orig;
        }
        return $scope.editing = originalTitle = null;
      };
      $scope.checkAll = function() {
        var state;
        state = !!$scope.remainingCount;
        return angular.forEach($scope.todos, function(todo) {
          return todo.done = state;
        });
      };
      $scope.removeDoneTodo = function() {
        return $scope.todos = where($scope.todos, $scope.filter.remaining);
      };
      return $scope.removeTodo = function(currentTodo) {
        return $scope.todos = where($scope.todos, function(todo) {
          return currentTodo !== todo;
        });
      };
    }
  ]).directive('mySelect', [
    function() {
      return function(scope, $el, attrs) {
        return scope.$watch(attrs.mySelect, function(val) {
          if (val) {
            return $el[0].select();
          }
        });
      };
    }
  ]);

}).call(this);
