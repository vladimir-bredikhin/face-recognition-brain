export const signin = (bcrypt, db) => async (req, res) => {
  const { email, password } = req.body;

  try {
    const [{ hash }] = await db("login").select("hash").where({ email });

    const passwordMatches = await bcrypt.compare(password, hash);

    if (passwordMatches) {
      const [user] = await db("users").select("*").where({ email });

      res.json(user);
    } else {
      res.status(401).json("Error logging in with given credentials!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};