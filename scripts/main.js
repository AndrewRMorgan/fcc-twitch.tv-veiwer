$(document).ready(function() {

  var users = ["freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ESL_SC2", "brunofin", "sheevergaming"];

  var offlineUsers = [];
  var onlineUsers = [];
  var closedUsers = [];

  var url, name, logo, status, color;

  pushToArrays();

  $(window).on('load', function() {
    onlyOfflineUsers();
    onlyClosedUsers();
    onlyOnlineUsers();
  });

  function pushToArrays() {
    for (var i = 0; i < users.length; i++) {
      (function(i) {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + users[i] + '?callback=?', function(data) {
          if (data.status !== 422 && data.partner == false) {
            offlineUsers.push(users[i]);
          } else if (data.status !== 422 && data.partner != false) {
            onlineUsers.push(users[i]);
          } else if (data.status === 422) {
            closedUsers.push(users[i]);
          };
        });
      })(i);
    };
  };

  function onlyOfflineUsers() {
    for (var j = 0; j < offlineUsers.length; j++) {
      (function(j) {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + offlineUsers[j] + '?callback=?', function(data) {
          if (data.status !== 422 && data.partner == false) {
            url = data.url;
            name = offlineUsers[j];
            status = 'Offline';
            if (data.logo != null) {
            logo = data.logo;
            $('<div class="offlineUsers"><div style="background: url(' + logo + '); background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>').appendTo('#containingDiv');
            } else {
            logo = "rgb(191, 191, 191)";
            $('<div class="offlineUsers"><div style="background-color:' + logo + '; background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>').appendTo('#containingDiv');
            };


          };
        });

      })(j);
    };
  };

  function onlyOnlineUsers() {
    for (var i = 0; i < onlineUsers.length; i++) {
      (function(i) {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + onlineUsers[i] + '?callback=?', function(data) {
          if (data.status !== 422 && data.partner != false) {
            url = data.url;
            name = onlineUsers[i];
            logo = data.logo;
            if (data.status.length > 40) {
              status = data.status.substr(0, 40) + "...";
            } else {
              status = data.status;
            };
            if (data.logo != null) {
            logo = data.logo;
            $('#containingDiv').prepend($('<div class="onlineUsers"><div style="background: url(' + logo + '); background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>'));
            } else {
            logo = "rgb(191, 191, 191)";
            $('#containingDiv').prepend($('<div class="onlineUsers"><div style="background-color' + logo + '; background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>'));
            };
          };
        });
      })(i);
    };
  };

  function onlyClosedUsers() {
    for (var i = 0; i < closedUsers.length; i++) {
      (function(i) {
        $.getJSON('https://api.twitch.tv/kraken/channels/' + closedUsers[i] + '?callback=?', function(data) {
          if (data.status === 422) {
            url = '#';
            name = closedUsers[i];
            status = 'Account closed';
            if (data.logo != null) {
            logo = data.logo;
            $('<div class="closedUsers"><div style="background: url(' + logo + '); background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>').appendTo('#containingDiv');
            } else {
            logo = "rgb(191, 191, 191)";
            $('<div class="closedUsers"><div style="background-color:' + logo + '; background-size: contain" class="logo"></div><div class="names"><a href="' + url + '" target="_blank">' + name + '</a></div><div class="status">' + status + '</div></div></a>').appendTo('#containingDiv');
            };
          };
        });
      })(i);
    };
  };

  $('#all').on("click", function() {
    $('#containingDiv').html('');
    onlyOfflineUsers();
    onlyClosedUsers();
    onlyOnlineUsers();
  });
  $('#offline').on("click", function() {
    $('#containingDiv').html('');
    onlyOfflineUsers();
  });
  $('#online').on("click", function() {
    $('#containingDiv').html('');
    onlyOnlineUsers();
  });
});
