import { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import Sound from "../assests/keysound.wav";
import wrong from "../assests/wrong.wav";
import Keyboard from "./Keyboard";
export default function Input() {
  let data =
    "asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; f j d k s l a ; f j d k s l a ; f j d k s l a ; f j d k s l a ; a ; s l d k f j a ; s l d k f j a ; s l d k f j a ; s l d k f j asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; f j d k s l a ; f j d k s l a ; f j d k s l a ; f j d k s l a ; a ; s l d k f j a ; s l d k f j a ; s l d k f j a ; s l d k f jasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; f j d k s l a ; f j d k s l a ; f j d k s l a ; f j d k s l a ; a ; s l d k f j a ; s l d k f j a ; s l d k f j a ; s l d k f j";
  let arr = data.split("");
  const [keysPressed, setKeysPressed] = useState([]);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wronge, setWronge] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [min, setMin] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [wpmchecker, setWpmchecker] = useState(false);
  const [answer, setAnswer] = useState(1);
  const textarea = useRef();

  let avg = correct / count || 0;
  avg = Math.floor(avg.toFixed(2) * 100);

  useEffect(() => {
    if (seconds > 0 && isActive) {
      // timer function code
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds === 0) {
      // to calculate wpm and other thing
      setAnswer(Math.floor(keysPressed.join("").split(" ").length / min)); // making array of words and finding length and wpm
      setWpmchecker(true);
      textarea.current.value = "";
      console.log("answer", answer);
      setIsActive(false);
    }
  }, [seconds, isActive]);

  useEffect(() => {
    keyboardcheck();
  }, [count]);

  // keyboard
  function keyboardcheck() {
    // let keys = document.querySelectorAll(".keyboard div span");
    let typing = document.querySelector(".box");
    let char = typing.querySelectorAll("span")[count].innerHTML; // to select all span, And [count ] used for acesses indiviusal span
    console.log(char, count);
    if (char !== " " && char !== ";") {
      document.querySelector(`.${char}`).classList.add("keycorrect");
    } else if (char === " ") {
      document.querySelector(`.space`).classList.add("keycorrect");
    } else if (char === ";") {
      document.querySelector(`.semi`).classList.add("keycorrect");
    }
  }

  // play sounf

  function play() {
    new Audio(Sound).play();
  }
  function playwrong() {
    new Audio(wrong).play();
  }

  // this function is used to reset

  function reset() {
    setIsActive(false);
    setKeysPressed([]);
    setCount(0);
    setCorrect(0);
    setSeconds(60);
    setWronge(0);

    clearkey();
    setWpmchecker(false);
    textarea.current.value = "";
    let cssc = document.querySelectorAll(".wronge");
    let cssw = document.querySelectorAll(".correct");

    cssc.forEach((el) => el.classList.remove("wronge"));
    cssw.forEach((el) => el.classList.remove("correct"));
  }

  // this is the main function were we check which character user is typing from keyboard

  function handleKeyDown(event) {
    const { key } = event; // there is a key present in a onkeypress event to know which key is pressred

    if (key !== "Shift" && key !== "Enter") {
      setCount((count) => count + 1);
      setKeysPressed((keysPressed) => [...keysPressed, key]);
      checker(key, count);
    }
    if (!isActive) {
      // it is used to start timer automatically
      setIsActive(true);
    }
  }

  function clearkey() {
    let array = document.querySelectorAll(".keycorrect", ".keywronge");
    if (array.length > 0 && count !== 0) {
      console.log("yes");
      for (let i = 0; i < array.length; i++) {
        array[i].classList.remove("keycorrect", "keywronge");
      }
    }
  }

  function checker(key) {
    let typing = document.querySelector(".box");
    let char = typing.querySelectorAll("span")[count]; // to select all span, And [count ] used for acesses indiviusal span
    console.log("key", key);
    if (key !== "Backspace") {
      // if it is not backspace we are checking and adding correct and wronge classes to style each spam
      if (key === arr[count]) {
        play(); // for sound
        char.classList.add("correct");
        if (key !== " " && key !== ";") {
          document.querySelector(`.${key}`).classList.remove("keycorrect");
        } else {
          document.querySelector(`.space`).classList.remove("keycorrect");
        }
        setCorrect(correct + 1);
      } else {
        clearkey(); // if we press wronge charcter then it will clear the suggestion
        playwrong();
        char.classList.add("wronge");
        setWronge(wronge + 1);
      }
    } else {
      // if we press backspce then
      clearkey();
      setCount(count - 1);
      let char = typing.querySelectorAll("span")[count - 1]; // -1 is for o based indexing
      if (char.classList.value === "correct") {
        // check which class it is then decrement that state
        setCorrect(correct - 1);
        char.classList.remove("correct");
      } else {
        setWronge(wronge - 1);
      }
      char.classList.remove("wronge");
    }
  }

  return (
    <div className="container">
      <div className="box">
        {arr.map((el, i) => {
          return <span key={i}>{el}</span>;
        })}
      </div>
      <div className="Ans">
        <div>
          <span>Correct Words:{correct}</span>
          <span>Wronge Words:{wronge}</span>
          <span>accuracy:{avg}%</span>
          <span>Total Words:{count}</span>
          {wpmchecker ? <span>Wpm:{answer}</span> : ""}
          <span>Timer:{seconds}'s</span>
          <div>
            <label style={{ padding: "0 5px" }} htmlFor="">
              Set Time
            </label>
            <select
              style={{ padding: "5px" }}
              name="time"
              id="time"
              onChange={(e) => {
                setSeconds(e.target.value * 60);
                setMin(e.target.value); // for
              }}
            >
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
      {/* <div className="box">{keysPressed}</div> */}

      <div className="box-input">
        <textarea
          id="tetxarea"
          name="tetxarea"
          ref={textarea}
          placeholder="Start typing.... "
          onKeyDown={(e) => {
            handleKeyDown(e, count);
          }}
        ></textarea>

        {!wpmchecker ? (
          <button className="button-59" onClick={reset}>
            Reset
          </button>
        ) : (
          ""
        )}
      </div>
      <Keyboard />
      <audio id="alarm">
        <source src="../keysound.wav" />
      </audio>
      {wpmchecker ? (
        <Popup
          data={reset}
          correct={correct}
          wronge={wronge}
          wpm={answer}
          setWpmchecker={setWpmchecker}
          total={count}
        />
      ) : (
        ""
      )}
    </div>
  );
}
