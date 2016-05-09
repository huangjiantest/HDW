$(function(){
	var regionTabs = document.getElementById("regionTabs").getElementsByTagName("li");
	var a = document.getElementById("regionTabs").getElementsByTagName("a");
	for (var i = 0 ; i < regionTabs.length ; i++ ) {
		(function(){
			var p = i;
			regionTabs[i].onclick = function(){
				for (var j = 0 ; j < regionTabs.length ; j++ ) {
					regionTabs[j].style.background = "#f4f3f0";
					a[j].style.color = "black";
				}
				regionTabs[p].style.background = "#94C0BE";
				a[p].style.color = "white";
			}
		})();
	}
});
