function $(id) {
    return document.getElementById(id);
}

var isChecking = false;
var checksFailed = 0;
var failureMessages = ["", "Double checking...", "Third time's the charm..."];

function setToMaybe() {
    isChecking = true;

    $("yeslink").style.color = "#FF9000";
    $("status").style.color = "#FF9000";
    $("menutest--link").style.color = "#FF9000";

    $("menutest--link").innerHTML = "MAYBE";
    $("yeslink").innerHTML = "MAYBE";
    $("yessub").innerHTML = "Just a moment, I'm checking...";
    $("status").innerHTML = "currently being tested.";
    $("status_description").innerHTML = "Hold on just a sec.";
    $("yeslink").setAttribute("class", "");

    $("yestime").innerHTML = "Calling the mothership...";
}

function setToYes() {

    $("yeslink").style.color = "green";
    $("status").style.color = "green";
    $("menutest--link").style.color = "green";

    $("menutest--link").innerHTML = "YES!";
    $("yeslink").innerHTML = "YES!";
    $("yessub").innerHTML = "Your Internet is Working!";
    $("status").innerHTML = "is working!";

    $("status_description").innerHTML = "Go out and explore the wonders of the web, or click here to test again!";
    //alert("Confirmed connection!");

    if (!locationLookup) {
        locationLookup = true;

        var ipString = $("currentIP").innerHTML;
        var ip = ipString.substring(ipString.lastIndexOf(" ") + 1);
        //alert("Looking up " + 'http://www.geoplugin.net/json.gp?ip=' + ip + '&jsoncallback=setLocation');

        var script = document.createElement('script');
        script.src = 'https://freegeoip.net/json/' + ip + '?callback=setLocation';

        document.getElementsByTagName('head')[0].appendChild(script);
    }
    setLinks();
}

function setLocation(data) {
    //alert(data.geoplugin_city);
    var locationDesc = "Your <b>approximate location</b> (based on IP): " + data.city + ", " + data.region_name + ' ' + data.zip_code + ", " + data.country_name;
    $("location").innerHTML = locationDesc;
    $("location").setAttribute("style", "");
}
function setStatus(loadTime) {
    $("yestime").textContent = `The mothership responded in ${loadTime} ms.`;
}

function setToNo() {
    checksFailed = 0;
    $("yestime").innerHTML = "The mothership didn't respond :(";

    $("yeslink").style.color = "#eb0000";
    $("status").style.color = "#eb0000";
    $("menutest--link").style.color = "#eb0000";

    $("menutest--link").innerHTML = "NO!";
    $("yeslink").innerHTML = "NO!";
    $("yessub").innerHTML = "Something's Wrong!";
    $("status").innerHTML = "isn't working!";

    $("status_description").innerHTML = "Continue reading for more information on how to troubleshoot your connection, or click here to test again.";
    setLinks();
}

function setLinks() {
    setTimeout(function() {
        isChecking = false;
        $("yeslink").setAttribute("class", "grow");
        var linkA = $("status_description");
        $("status_description").innerHTML = linkA.innerHTML.replace("click here to test again", "<a href=\"javascript:void(0)\" onclick=\"runTest()\" title=\"Test again!\">click here to test again</a>");
    }, 500);
}
