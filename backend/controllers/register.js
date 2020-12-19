export const register = (bcrypt, db, saltRounds) => (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      if (err) throw new Error(err);

      await db.transaction(async (trx) => {
        const [loginEmail] = await db("login")
          .insert({ hash, email })
          .returning("email")
          .transacting(trx);

        const [user] = await db("users")
          .insert({ name, email: loginEmail })
          .returning("*")
          .transacting(trx);

        res.status(201).json(user);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json("Unable to register given user!");
    }
  });
};
