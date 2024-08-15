javascript:(function(clear=false){ 
  var intervalId = window.myDashboardInterval;
  if(clear || intervalId){
    clearInterval(intervalId);
    delete window.myDashboardInterval;
  }
  if(!clear){
    window.myDashboardInterval = setInterval(function(){
      var targetTitle = "MY NEW DASHBOARD";
      var dashboardTitleElement = document.querySelector('[id^="Dashboard_Selector"]');
      var dashboardTitle = dashboardTitleElement != null ? dashboardTitleElement.textContent.trim() : "";
      var refreshButton = document.querySelector('[id="RefreshDashboard-button"]');
      if (refreshButton != null && dashboardTitle == targetTitle) refreshButton.click();
    }, 10000);
  }
})(false);