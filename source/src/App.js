/*global chrome*/
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import FingerPoseEstimator from "fingerpose/src/FingerPoseEstimator";
import * as fp from "fingerpose";

chrome.storage.sync.set({ appActive: false }, () => {
  console.log("active set to false");
});

function App() {
  const webcamRef = useRef(null);
  let intervalID = null;
  let handDetector = {};
  let handDetected = {};
  const estimator = new FingerPoseEstimator({});

  const detectHandpose = async (handDetector, operation) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const hand = await handDetector.estimateHands(video);
      if (hand.length > 0) {
        handDetected = estimator.estimate(hand[0].landmarks);
        console.log(handDetected);
        if (operation !== "test") {
          gestureSamples[operation].push(handDetected);
          sampleCount += 1;
          document.getElementById(
            `sampleCount-${operation}`
          ).innerText = `Samples Captured: ${sampleCount}`;
        }
        //const gestureEstimated = await gestureEstimator.estimate(
        //  hand[0].landmarks,
        //  8
        //);
        //console.log(gestureEstimated.gestures[0]);
      } else {
        console.log("hand not detected");
      }
    }
  };

  const startDetector = async (operation) => {
    if (!intervalID) {
      intervalID = setInterval(
        () => detectHandpose(handDetector, operation),
        500
      );
      console.log("detector started");
    } else {
      console.log("detector already in progress");
    }
  };

  const stopDetector = async () => {
    if (intervalID) {
      clearInterval(intervalID);
      console.log("detector stopped");
      intervalID = null;
    } else {
      console.log("no detector in progress");
    }
  };

  let gestureSamples = {};
  let sampleCount = 0;
  const startTraining = async (e) => {
    let operation = e.target.id.split("-")[1];
    sampleCount = 0;
    gestureSamples[operation] = [];
    startDetector(operation);
  };
  const stopTraining = async (e) => {
    let operation = e.target.id.split("-")[1];
    stopDetector();
    console.log(gestureSamples[operation]);
    generateDescription(operation);
    document.getElementById(`trainStatus-${operation}`).innerHTML =
      "data captured, save if you want";
  };

  let gestures = [];
  let gestureDescriptions = {};
  let gestureNicknames = {};

  const generateDescription = (operation) => {
    gestureDescriptions[operation] = [];
    for (let finger of [0, 1, 2, 3, 4]) {
      let description = {
        curls: {
          values: [],
          weights: [],
        },
        directions: {
          values: [],
          weights: [],
        },
      };
      for (let prop of ["curls", "directions"]) {
        let propSamples = [];
        let counts = [];
        let weights = [];
        for (let i = 0; i < gestureSamples[operation].length; i++) {
          propSamples.push(gestureSamples[operation][i][prop][finger]);
        }
        let values = [...new Set(propSamples)];
        values.forEach(() => {
          counts.push(0);
          weights.push(0);
        });
        propSamples.forEach((val) => {
          counts[values.indexOf(val)] += 1;
        });
        let maxCount = Math.max(...counts);
        counts.forEach((count, index) => {
          weights[index] = count / maxCount;
          if (count / maxCount === 0) {
            console.log("!!!!!!!!!!!!!!!!!!weight 0", values, counts);
          }
        });
        description[prop] = { values, weights };
      }
      gestureDescriptions[operation].push(description);
    }
    console.log(gestureDescriptions[operation]);
  };

  const operations = [
    "scrollUp",
    "scrollDown",
    "togglePointer",
    "pointerLeft",
    "pointerRight",
    "pointerUp",
    "pointerDown",
    "pointerClick",
    "goBackPage",
    "goForwardPage",
  ];

  const saveGesture = (e) => {
    let operation = e.target.id.split("-")[1];
    chrome.storage.sync.get(["gestures"], (result) => {
      if (result.gestures.length > 0) {
        gestures = result.gestures.filter((description) => {
          return description.operation !== operation;
        });
      }
      gestures.push({
        operation,
        gestureDescriptions: gestureDescriptions[operation],
      });
      document.getElementById(`trainStatus-${operation}`).innerText = "trained";
      console.log("new gestures", gestures);
      chrome.storage.sync.set({ gestures });
    });
  };

  const deleteGesture = (e) => {
    let operation = e.target.id.split("-")[1];
    chrome.storage.sync.get(["gestures"], (result) => {
      if (result.gestures.length > 0) {
        gestures = result.gestures.filter((description) => {
          return description.operation !== operation;
        });
      }
      document.getElementById(`trainStatus-${operation}`).innerText =
        "untrained";
      console.log("new gestures", gestures);
      chrome.storage.sync.set({ gestures });
    });
  };

  const saveNickname = (e) => {
    let operation = e.target.id.split("-")[1];
    chrome.storage.sync.get(["gestureNicknames"], (result) => {
      if (result.gestureNicknames) {
        gestureNicknames = result.gestureNicknames;
      } else {
        gestureNicknames = {};
      }
      gestureNicknames[operation] = document.getElementById(
        `nicknameInput-${operation}`
      ).value;
      chrome.storage.sync.set({ gestureNicknames });
    });
  };

  const loadHandposeModel = async () => {
    handDetector = await handpose.load();
    console.log("handpose model loaded");
  };

  const styles = {
    operationBlock: {
      display: "block",
      fontSize: 14,
    },
    button: {
      margin: "0px 5px",
    },
    interfaceTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: "5px",
    },
  };

  loadHandposeModel();

  return (
    <div className="App">
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          style={{
            position: "fixed",
            margin: "auto",
            top: "20px",
            left: "50%",
            right: 0,
            textAlign: "center",
            width: 560,
            height: 400,
          }}
        />
      </div>
      <div id="detector-test">
        <button onClick={() => startDetector("test")}>Start Detector</button>
        <button onClick={stopDetector}>Stop Detector</button>
      </div>
      {operations.map((operation) => (
        <div id={`interface-${operation}`}>
          <div style={styles.interfaceTitle}>
            <span style={{ display: "inline-block", width: "140px" }}>
              {operation}:
            </span>
            <span
              id={`trainStatus-${operation}`}
              style={{
                fontWeight: "normal",
                marginLeft: "5px",
                backgroundColor: "#DAE1E6",
              }}
            >
              untrained
            </span>
            <span
              id={`nickname-${operation}`}
              style={{ marginLeft: "10px" }}
            ></span>
          </div>
          <div style={styles.operationBlock}>
            <span id={`sampleCount-${operation}`} style={{ minWidth: "135px" }}>
              Samples Captured: {sampleCount}
            </span>
            <button
              id={`trainStart-${operation}`}
              style={styles.button}
              onClick={startTraining}
            >
              Start Training
            </button>
            <button
              id={`trainStop-${operation}`}
              style={styles.button}
              onClick={stopTraining}
            >
              Stop Training
            </button>
            <button
              id={`saveGesture-${operation}`}
              style={styles.button}
              onClick={saveGesture}
            >
              Save Gesture
            </button>
            <button
              id={`deleteGesture-${operation}`}
              style={styles.button}
              onClick={deleteGesture}
            >
              Delete Gesture
            </button>
            <input
              type="text"
              id={`nicknameInput-${operation}`}
              style={{ width: "100px" }}
            ></input>
            <button
              id={`saveNickname-${operation}`}
              style={styles.button}
              onClick={saveNickname}
            >
              Save Nickname
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          chrome.storage.sync.set({ gestures: {} });
        }}
      >
        !!! Delete Model !!!
      </button>
    </div>
  );
}

export default App;
