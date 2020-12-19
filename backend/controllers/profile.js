export const profile = (db) => async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.select("*").from("users").where({ id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json("Not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Error while getting the user!");
  }
};
