/* global chrome*/
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import FingerPoseEstimator from "fingerpose/src/FingerPoseEstimator";
import * as fp from "fingerpose";

const video = document.querySelector("#backgroundVideo");
// turn off app at start up
chrome.storage.sync.set({ appActive: false });

// gesture object trained by user
let gestures = [];
let gestureEstimator = null;
let descriptions = [];

chrome.storage.onChanged.addListener((changes) => {
  if (Object.keys(changes).includes("appActive")) {
    chrome.storage.sync.get(["appActive"], (result) => {
      console.log("changed value", result.appActive);
      if (!result.appActive) {
        // stop gesture OA, stop video steam
        clearInterval(intervalID);
        if (video.srcObject) {
          let mediaTracks = video.srcObject.getTracks();
          mediaTracks.forEach((track) => track.stop());
          alert("Gesture-Based OA stopped.");
        }
      } else {
        // start gesture OA
        chrome.storage.sync.get(["gestures"], (result) => {
          descriptions = result.gestures;
          console.log("loaded gesture descriptions: ", descriptions);
          gestures = [];

          descriptions.forEach((description) => {
            let { operation, gestureDescriptions } = description;
            let gesture = new fp.GestureDescription(operation);

            const fingers = ["Thumb", "Index", "Middle", "Ring", "Pinky"];
            const fingerCurls = ["NoCurl", "HalfCurl", "FullCurl"];
            const fingerDirects = [
              "VerticalUp",
              "VerticalDown",
              "HorizontalLeft",
              "HorizontalRight",
              "DiagonalUpRight",
              "DiagonalUpLeft",
              "DiagonalDownRight",
              "DiagonalDownLeft",
            ];
            gestureDescriptions.forEach((description, i) => {
              description.curls.values.forEach((curl, j) => {
                gesture.addCurl(
                  fp.Finger[fingers[i]],
                  fp.FingerCurl[fingerCurls[curl]],
                  description.curls.weights[j]
                );
              });
              description.directions.values.forEach((dir, j) => {
                gesture.addDirection(
                  fp.Finger[fingers[i]],
                  fp.FingerDirection[fingerDirects[dir]],
                  description.directions.weights[j]
                );
              });
            });
            gestures.push(gesture);
          });
          gestureEstimator = new fp.GestureEstimator(gestures);

          loadMediaStream(video);
          startGestureOA();
          alert("Gesture-Based OA started.\nPlease refresh current page.");
        });
      }
    });
  }
});

function loadMediaStream(video) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: { ideal: 560 },
          height: { ideal: 400 },
        },
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let intervalID = null;
const startGestureOA = async () => {
  const handDetector = await handpose.load();
  console.log("handpose handDetector loaded");
  intervalID = setInterval(
    () => detectHandpose(handDetector, gestureEstimator),
    500
  );
};

let handDetected = {};
const estimator = new FingerPoseEstimator({});

const scripts = {
  scrollUp: {
    code: "window.scrollTo(window.scrollX, window.scrollY-100);",
  },
  scrollDown: {
    code: "window.scrollTo(window.scrollX, window.scrollY+100);",
  },
  togglePointer: {
    code: [
      "$('#pointer').toggle();",
      "$('#pointer').css({left: '50%', top: '50%'});",
    ].join(""),
  },
  pointerUp: {
    code: [
      "if ($('#pointer').is(':visible')) {",
      "  $('#pointer').animate({top: '-=30'}, 1);",
      "}",
    ].join(""),
  },
  pointerDown: {
    code: [
      "if ($('#pointer').is(':visible')) {",
      "  $('#pointer').animate({top: '+=30'}, 1);",
      "}",
    ].join(""),
  },
  pointerLeft: {
    code: [
      "if ($('#pointer').is(':visible')) {",
      "  $('#pointer').animate({left: '-=30'}, 1);",
      "}",
    ].join(""),
  },
  pointerRight: {
    code: [
      "if ($('#pointer').is(':visible')) {",
      "  $('#pointer').animate({left: '+=30'}, 1);",
      "}",
    ].join(""),
  },
  pointerClick: {
    code: [
      "if ($('#pointer').is(':visible')) {",
      "  let position = $('#pointer').position();",
      "  $('#pointer').hide();",
      "  document.elementFromPoint(",
      "    position.left + 25, position.top + 25",
      "    ).click();",
      "  $('#pointer').show();",
      "}",
    ].join(""),
  },
  goBackPage: {
    code: "history.back();",
  },
  goForwardPage: {
    code: "history.forward();",
  },
};

let pointerVisible = false;
let prevTabID = null;
const detectHandpose = async (handDetector) => {
  const hand = await handDetector.estimateHands(video);
  if (hand.length > 0) {
    handDetected = estimator.estimate(hand[0].landmarks);
    console.log(JSON.stringify(handDetected));
    const gestureEstimated = await gestureEstimator.estimate(
      hand[0].landmarks,
      7.5
    );

    if (gestureEstimated.gestures.length > 0) {
      chrome.windows.getLastFocused(
        {
          populate: true,
        },
        (window) => {
          for (let tab of window.tabs) {
            if (tab.active) {
              if (tab.id !== prevTabID) {
                pointerVisible = false;
                console.log("tab changed");
                chrome.tabs.executeScript(tab.id, {
                  code: [
                    "$('#pointer').css({top:'50%', left:'50%'});",
                    "$('#pointer').hide();",
                  ].join(""),
                });
                prevTabID = tab.id;
              }
              let gestures = gestureEstimated.gestures.filter((gesture) => {
                if (pointerVisible) {
                  return gesture.name.includes("ointer");
                } else {
                  return !gesture.name.includes("pointer");
                }
              });
              if (gestures.length > 0) {
                if (gestures[0].name === "togglePointer") {
                  pointerVisible = !pointerVisible;
                  console.log("pointerVisible: ", pointerVisible);
                }
                chrome.tabs.executeScript(tab.id, scripts[gestures[0].name]);
                console.log(gestures[0].name);
              }
              break;
            }
          }
        }
      );
    }
  } else {
    console.log("hand not detected");
  }
};

function Background() {}

export default Background;
