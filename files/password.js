(function (doc) {
    var passwordInput = doc.getElementById("password-box"),
        timeDiv = doc.getElementById("password-time"),
        checksList = doc.getElementById("password-checks");

    // Code to render the time returned by HSIMP
    var renderTime = function (time, input) {
      if (!time) {
        timeDiv.innerHTML = "";
        return;
      }
      timeDiv.innerHTML = "<p class='h6 ml-1 mb-1'>It would take a computer about</p>" + time + " <p class='h6 ml-1'>to crack your password</p>" || "";
    };

    // Code to output the checks returned by HSIMP
    var renderChecks = function (checks, input) {
        checksList.innerHTML = "";

        for (var i = 0, l = checks.length; i < l; i++) {
            var li = doc.createElement("li"),
                title = doc.createElement("h2"),
                message = doc.createElement("p");
                switch (checks[i].level) {
                  case "warning":
                    li.className = "p-3 m-1 password password--warning";
                    break;
                  case "achievement":
                    li.className = "p-3 m-1 password password--achievement";
                    break;
                  case "notice":
                    li.className = "p-3 m-1 password password--notice";
                    break;
                  default:
                    li.className = "p-3 m-1 password";
                }

            title.innerHTML = checks[i].name;
            li.appendChild(title);

            message.innerHTML = checks[i].message;
            li.appendChild(message);

            checksList.appendChild(li);
        }
    };

    // Setup the HSIMP object
    var attachTo = hsimp({
      options: {
        calculationsPerSecond: 10e9, // 10 billion calculations per second
        good: 31557600e9, // 1 billion years
        ok: 31557600e3 // 1 thousand years
      },
      outputTime: renderTime,
      outputChecks: renderChecks
    });

    // setup custom values for "instantly"/"forever"
    hsimp.setDictionary({
      "instantly": "Immediately",
      "forever": "Aaaaaaaaaaaaaaaages",
    });

    // Run the HSIMP
    attachTo(passwordInput);

    var passwordInput = document.getElementById("password-box");

    passwordInput.addEventListener("keyup", function(event){
      const value = event.target.value.toLowerCase();
      if (value.search('younique') >= 0) {
        console.log('YES');
        var li = doc.createElement("li");
        li.className = "p-3 m-1 password password--younique list-unstyled";
        li.innerHTML = '<h2 style="font-weight: bold; font-size: 20px;">Your password is too unique</h2><p style="font-size: 1rem">Your password should never contain your name!</p>';
        document.getElementById("password-time").appendChild(li);
      }
    });
}(this.document));