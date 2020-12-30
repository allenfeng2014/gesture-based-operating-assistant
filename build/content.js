console.log("content script running");
const pointer = $("<img />", {
  id: "pointer",
  src:
    "data:image/png;base64,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",
});
pointer.css({
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "50px",
  height: "50px",
  "z-index": "99",
});
pointer.appendTo($("body"));
$("#pointer").hide();

if (document.title === "Gesture-Based OA") {
  let operationsTrained = [];
  chrome.storage.sync.get(["gestures"], (result) => {
    try {
      result.gestures.forEach((gesture) => {
        operationsTrained.push(gesture.operation);
      });
    } catch (error) {
      console.log("no trained operation");
    }
    operationsTrained.forEach((operation) => {
      $(`#trainStatus-${operation}`).text("trained");
    });
  });
  chrome.storage.sync.get(["gestureNicknames"], (result) => {
    try {
      Object.keys(result.gestureNicknames).forEach((operation) => {
        $(`#nicknameInput-${operation}`).val(
          result.gestureNicknames[operation]
        );
      });
    } catch (error) {
      console.log("nickname not found");
    }
  });
}
