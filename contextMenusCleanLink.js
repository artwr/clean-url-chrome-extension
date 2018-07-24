// Copyright (c) 2018 Arthur Wiedmer. All rights reserved.

function cleanURL(url) {
  var part1= url.substring(0, url.lastIndexOf('/') + 1);
  var part2= url.substring(url.lastIndexOf('/') + 1);
  //2- get the part before '?'
  var part2BeforeQueryString= part2.split("?")[0];  

  return part1 + part2BeforeQueryString;
}

// Generic OnClick callback from the basic chrome extension.

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  console.log("cleanURL: " + cleanURL(info.linkUrl));
}


function openCleanURLInNewTabOnClick(info, tab) {
  var cleanedUpURL = cleanURL(info.linkUrl);
  chrome.tabs.create({ url: cleanedUpURL });
}

function openCleanURLInIncognitoOnClick(info, tab) {
  var cleanedUpURL = cleanURL(info.linkUrl);
  chrome.windows.create({"url": cleanedUpURL, "incognito": true});
}


// function copyCleanURLOnClick(info, tab) {
//   var linkURL = info.linkURL;
//   chrome.tabs.create(object createProperties, function callback)
// }

var cleanURLMenuId = chrome.contextMenus.create({"title": "Clean URL", "contexts":["link"]});

var OpenMenuId = chrome.contextMenus.create({"title": "Open in new tab without params", "parentId": cleanURLMenuId, "contexts":["link"],
                                     "onclick": openCleanURLInNewTabOnClick});

var OpenMenuId = chrome.contextMenus.create({"title": "Open in Incognito without params", "parentId": cleanURLMenuId, "contexts":["link"],
                                     "onclick": openCleanURLInIncognitoOnClick});

/* var CopyMenuId = chrome.contextMenus.create({"title": "Copy URL without params", "parentId": cleanURLMenuId, "contexts":["link"],
                                     "onclick": genericOnClick});
*/

