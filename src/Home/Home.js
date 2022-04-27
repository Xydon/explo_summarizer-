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

function Home() {
  const HeadingRef = React.createRef(null);
  const [show, setShow] = useState(false);

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
            <textarea className="input-area" placeholder="enter your text" ></textarea>
            <p className='submit-btn' >summarize</p>
          </div>
          <div className="display-box"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
