const SignUp = async (_req, res) => {
  res.send("Signup");
};

const LogIn = async (_req, res) => {
  res.send("LogIn");
};
const LogOut = async (_req, res) => {
  res.send("LogOut");
};

export { SignUp, LogIn, LogOut };
