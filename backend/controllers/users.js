export const users = (db) => async (req, res) => {
  try {
    res.json(await db("users").select("*"));
  } catch (err) {
    console.log(err);
    res.status(400).json("Unable to get users!");
  }
};
