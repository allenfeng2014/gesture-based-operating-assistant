/*global chrome*/
chrome.storage.sync.get(["appActive"], (result) => {
  console.log(result.appActive);
});
$("#start-app").click(() => {
  chrome.storage.sync.set({ appActive: true }, () => {
    console.log("active set to true");
  });
});
$("#stop-app").click(() => {
  chrome.storage.sync.set({ appActive: false }, () => {
    console.log("active set to false");
  });
});
