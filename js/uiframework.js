// Base Javascript UI functionality.

// Display View Passed In
var showView = function(viewToShow) {
    for(var view in views) {
        if(view === viewToShow) {
            document.getElementById(viewToShow).className = "";
            views[view].setup();
        } else {
            document.getElementById(view).className = "hiddenView";
        }
    }
}

// Debugging Assitance (HTML Errors)
var showError = function(view, message){
     document.getElementById(view+"Error").innerHTML = message;
}

// Inject Title Section into Section
var setTitleSection = function(section, content){
    document.getElementById(section).innerHTML= content;
    if (content===""){
        document.getElementById(section).style.display = "none";
    } else {
        document.getElementById(section).style.display = "inline";
    }
};

// Inject Title, left aligned
var setTitleLeft = function(content){
    setTitleSection("titleLeft", content);
};

// Mouse Listener for left aligned title
var titleLeftClick = function() {};

// Inject Title, center aligned
var setTitleCenter = function(content){
    setTitleSection("titleCenter", content);
};

// Mouse Listener for center aligned title
var titleCenterClick = function() {};

// Inject Title, right aligned
var setTitleRight = function(content){
    setTitleSection("titleRight", content);
};

// Mouse Listener for right aligned title
var titleRightClick = function() {};