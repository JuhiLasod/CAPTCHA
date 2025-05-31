import React, { useState, useEffect } from "react";
function Home(){
  
    const [captcha, setCaptcha] = useState("");
    const [message, setMessage] = useState("");
    const [text,setText]=useState("");
    
    const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    setCaptcha(result);
    };
    const verify=()=>{
        console.log(text);
        console.log(captcha);
        if(text===captcha)
        {
            setMessage("verification successfull");
        }
        else{
            setMessage("verification failed--- re-enter captcha");
            generateCaptcha();
        }
    }
    useEffect(()=>{
        if(message)
        {
            console.log(message);
        }
    },[message]);
    useEffect(() => {
      generateCaptcha();
    }, []);

  return (
    <div>
      <div style={{
        background: "#eee",
        fontFamily: "monospace",
        fontSize: "24px",
        letterSpacing: "4px",
        padding: "10px",
        display: "inline-block"
      }}>
        {captcha}
      </div>
      <button onClick={generateCaptcha}>↻</button>
      <input
        placeholder="Enter CAPTCHA"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={verify}>verify as human</button>
      <div>{message}</div>
    </div>
  );
};
// }

export default Home;
