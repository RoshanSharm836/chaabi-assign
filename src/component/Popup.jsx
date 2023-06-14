import React from "react";

function Popup({ wpm, total, correct, wronge, setWpmchecker, data }) {
  let avg = correct / total || 0;
  avg = Math.floor(avg.toFixed(2) * 100);
  return (
    <div className="Popup">
      <div className="bg">
        <span className="bgheading">
          <img
            src="https://emojiguide.com/wp-content/uploads/2021/08/Star-Eyes-emoji-Apple-version.png"
            alt="star-eye"
            width="100px"
          />{" "}
          Typing Test Complete!
        </span>
        <span>You typed the 1 Minute Typing Test.</span>
        <span>
          Correct Word's Typed<span className="highlight"> {correct}</span> &
          Wronge Word's Typed
          <span style={{ color: "rgb(248, 120, 120)" }}> {wronge}.</span>
        </span>

        <span>
          Your speed was <span className="highlight">{wpm} wpm</span> with
          <span className="highlight"> {avg}%</span> accuracy!.
        </span>
        <button className="button-59" onClick={data}>
          Reset
        </button>
      </div>
      <img src="../t.svg" alt="" width="35%" />

      <span
        onClick={() => {
          setWpmchecker(false);
        }}
      >
        X
      </span>
    </div>
  );
}

export default Popup;
