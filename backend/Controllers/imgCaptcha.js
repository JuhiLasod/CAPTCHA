import svgCaptcha from "svg-captcha";

const imgCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 3,
    color: true,
    ignoreChars: '0oO1ilI'
  });

  req.session.captcha = captcha.text;

  res.type("svg");
  res.status(200).send(captcha.data);
};

export default imgCaptcha;
