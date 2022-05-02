import React, { useEffect, useState } from "react";
import "./Home.css";

function WriteText(displayText, text, indx, target) {
  if (indx > text.length - 1) return;
  displayText += text[indx];
  // update target
  target.current.innerText = displayText;
  setTimeout(() => {
    WriteText(displayText, text, indx + 1, target);
  }, 100);
}

async function PostText(text, type) {
  let dataToSend = JSON.stringify({ text });
  console.log(dataToSend);
  let data = await fetch(`http://localhost:5000/api/summarize/${type ? 'True' : 'False'}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataToSend,
  });
  data = await data.json();
  return data.data;
}

function Home() {
  const HeadingRef = React.createRef(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [sumType, setSumType] = useState(true); 
  useEffect(() => {
    WriteText("", "Text Summarizer", 0, HeadingRef);
  }, []);

  return (
    <div>
      {/* header */}
      <div className="header-container">
        <p className="header-logo">TextSum</p>
        <p className="header-left">how it works?</p>
      </div>
      {/* section */}
      <div className="content-section">
        <div className="content-heading">
          <p className="heading-text" ref={HeadingRef}></p>
          <div className="content-heading-lower">
            <div className="content-heading-underline"></div>
            <p className="subheading-text">{"blazing fast"}</p>
          </div>
        </div>

        <div className="box-container">
          <div className="input-box-container">
            <textarea
              className="input-area"
              placeholder="enter your text"
              value={text}
              onChange={(t) => setText(t.target.value)}
            ></textarea>
            <div className="bottom-ribbon">
              <p
                className="submit-btn"
                onClick={() => {
                  setSummary("-1");
                  PostText(text, sumType).then((data) => setSummary(data));
                }}
              >
                summarize
              </p>
              <p className={`summary-option ${sumType ? 'focus-option' : ''}`} onClick={() => {
                setSumType(true); 
              }}>tf-idf</p>
              <p className={`summary-option ${!sumType ? 'focus-option' : ''}`} onClick={() => {
                setSumType(false); 
              }}>pagerank</p>
            </div>
          </div>
          <div
            className={`display-box ${
              summary === "-1" ? "display-box-modif" : ""
            }`}
          >
            {summary == "-1" ? (
              <img src={require("./loader.png")} id="loader" />
            ) : (
              summary
            )}
            {/* <img src={require("./loader.png")} id="loader"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
