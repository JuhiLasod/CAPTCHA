const verifyCaptcha=async(req,res)=>{
    const { userImgCaptcha } = req.body;
  if (req.session.captcha === userImgCaptcha) {
     return res.send("Verified");
  }
  else{
    return res.send("Wrong CAPTCHA");
  }
   
};
export default verifyCaptcha;