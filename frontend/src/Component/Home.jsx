import React, { useState, useEffect } from "react";

function Home() {
  // Text captcha
  const [captcha, setCaptcha] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const generateCaptcha = () => {
    setText("");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const verify = () => {
    if (text === captcha) {
      setMessage("Verification successful!");
    } else {
      setMessage("Verification failed — re-enter CAPTCHA");
      setText("");
      generateCaptcha();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Image captcha
  const [svgCaptcha, setSvgCaptcha] = useState("");
  const [userImgCaptcha, setUserImgCaptcha] = useState("");
  const [imgMessage, setImgMessage] = useState("");

  const generateImgCaptcha = async () => {
    setUserImgCaptcha("");
    const res = await fetch("http://localhost:4000/api/captcha", {
      method: "GET",
      credentials: "include"
    });
    const loaded = await res.text();
    setSvgCaptcha(loaded);
  };

  const verifyImgCaptcha = async () => {
    const res = await fetch("http://localhost:4000/api/verify-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userImgCaptcha })
    });
    const text = await res.text();
    setImgMessage(text);
    setUserImgCaptcha("");
  };

  useEffect(() => {
    generateImgCaptcha();
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", background: "#f7f7f7" }}>
      {/* Text CAPTCHA Section */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Text CAPTCHA</h2>
        <div
          style={{
            background: "#e0e0e0",
            fontFamily: "monospace",
            fontSize: "24px",
            letterSpacing: "4px",
            padding: "10px",
            display: "inline-block",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {captcha}
        </div>
        <button
          onClick={generateCaptcha}
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          ↻
        </button>
        <br />
        <input
          style={{
            padding: "10px",
            marginTop: "10px",
            marginRight: "10px",
            width: "200px",
            fontSize: "16px"
          }}
          placeholder="Enter CAPTCHA"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={verify}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Verify as Human
        </button>
        <div style={{ marginTop: "10px", fontWeight: "bold", color: "#444" }}>
          {message}
        </div>
      </div>

      <hr />

      {/* Image CAPTCHA Section */}
      <div>
        <h2>Image CAPTCHA</h2>
        <div
          style={{
            marginBottom: "10px",
            display: "inline-block",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#fff"
          }}
          dangerouslySetInnerHTML={{ __html: svgCaptcha }}
        />
        {/* <br /> */}
        <button
          onClick={generateImgCaptcha}
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          ↻
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter Captcha"
          value={userImgCaptcha}
          onChange={(e) => setUserImgCaptcha(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "200px",
            fontSize: "16px"
          }}
        />
        <button
          onClick={verifyImgCaptcha}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Verify Image CAPTCHA
        </button>
        <div style={{ marginTop: "10px", fontWeight: "bold", color: "#444" }}>
          {imgMessage}
        </div>
      </div>
    </div>
  );
}

export default Home;
