angular.module("carte")
	.controller("carteController", ["$scope", "$http",
	function($scope, $http)
	{
		$scope.tab = [];

		{
			response.data.forEach(function(data)
			{
				var newListe = new Liste(data);
				$scope.tab.push(newListe);
			});
		},
		function(error) {
			console.log(error);

		/*$scope.create = function() {
			$http.post("api/" , '{"label": "' + document.getElementById("liste-createbox").value + '"}', { headers : {'Authorization' : 'Token token=0cbd83dabea346dab268bf13ce476ae1'} }).then(function(response)
			{
				var newListe = new Liste(response.data);
				$scope.tab.push(newListe);
				document.getElementById("liste-createbox").value = "";
			},function(error)
			{
				console.log(error);
			});
		};*/
	}
]);
