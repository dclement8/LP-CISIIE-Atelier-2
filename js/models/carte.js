angular.module("carte").service("Carte",
	["$http",
		function($http)
		{
			var Carte = function(data)
			{
				/*this.id = data.id;
				this.label = data.label;
				this.todos = [];*/
			}

			Carte.prototype.modif = function()
			{
				/*$http.put("http://todos.api.netlor.fr/lists/" + this.id, '{"label": "' + document.getElementById("liste-" + this.id).value + '"}' ,{ headers : {'Authorization' : 'Token token=0cbd83dabea346dab268bf13ce476ae1'} }).then(function(response)
				{

				}, function(error) {
					console.log(error);
				});

				this.label = document.getElementById("liste-" + this.id).value;*/
			}

			return Carte;
		}
]);
