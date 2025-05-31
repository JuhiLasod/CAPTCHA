import React, { useState, useEffect } from "react";
function Home(){

    //text captcha
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

    //image captcha
    const [svgCaptcha,setSvgCaptcha]=useState('');
    const [userImgCaptcha, setUserImgCaptcha]=useState("");
    const [imgMessage,setImgMessage]=useState("");
    useEffect(()=>{
        if(imgMessage)
        {
            console.log(imgMessage);
        }
    },[imgMessage]);
    const generateImgCaptcha=async()=>{
        const res=await fetch("http://localhost:4000/api/captcha",{
            method: "GET",
        credentials: "include"
        });
        const loaded=await res.text();
        setSvgCaptcha(loaded);
    }
    const verifyImgCaptcha=async()=>{
        const res=await fetch("http://localhost:4000/api/verify-captcha",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({userImgCaptcha})
        });
        const text=await res.text();
        console.log(text);
        setImgMessage(text);
    }
    useEffect(() => {
        generateImgCaptcha();
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
      <br/>
      <hr/>
      <br/>
      <div>
      <div
        dangerouslySetInnerHTML={{ __html: svgCaptcha }}
      />
      <button onClick={generateImgCaptcha}>Refresh Captcha</button>
      <input
  type="text"
  placeholder="Enter Captcha"
  value={userImgCaptcha}
  onChange={(e) => setUserImgCaptcha(e.target.value)}
/>

      <button onClick={verifyImgCaptcha}>verify</button>
      <div>{imgMessage}</div>
    </div>
    </div>
  );
};
// }

export default Home;
