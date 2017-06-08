$(document).ready(function() {

  let users = ["freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ESL_SC2", "brunofin", "sheevergaming"];

  let offlineUsers = [];
  let onlineUsers = [];
  let closedUsers = [];
  let i = 0;
  let url, name, logo, status, color;

  pushToArrays();

  $(window).on('load', function() {
    onlyOfflineUsers();
    onlyClosedUsers();
    onlyOnlineUsers();
  });

//There is a 404 error for the user brunofin whose account should show us as closed.

//The accounts (online, offline, closed) are also not showing up straight away.

  function pushToArrays() {
    for (i = 0; i < users.length; i++) {
      (function(i) {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + users[i] + '?callback=?', function(data) {
          if (data.status !== 404 && data.partner == false) {
            offlineUsers.push(users[i]);
          } else if (data.status !== 404 && data.partner != false) {
            onlineUsers.push(users[i]);
          } else if (data.status === 404) {
            closedUsers.push(users[i]);
          };
        });
      })(i);
    };
  };

  function onlyOfflineUsers() {
    for (i = 0; i < offlineUsers.length; i++) {
      (function(i) {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + offlineUsers[i] + '?callback=?', function(data) {
          if (data.status !== 404 && data.partner == false) {
            url = data.url;
            name = data.display_name;
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
      })(i);
    };
  };

  function onlyOnlineUsers() {
    for (var i = 0; i < onlineUsers.length; i++) {
      (function(i) {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + onlineUsers[i] + '?callback=?', function(data) {
          if (data.status !== 404 && data.partner != false) {
            url = data.url;
            name = data.display_name;
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
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + closedUsers[i] + '?callback=?', function(data) {
          if (data.status === 404) {
            url = '#';
            name = data.display_name;
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
