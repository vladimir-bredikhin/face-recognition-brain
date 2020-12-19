export const detect = (clarifai, model, db) => async (req, res) => {
  const { userId, imageUrl } = req.body;

  const {
    outputs: [{ data }],
  } = await clarifai.models.predict(model, imageUrl);

  try {
    const [user] = await db("users")
      .where({ id: userId })
      .increment("entries", 1)
      .returning("*");

    if (user) {
      res.json({ user, data });
    } else {
      res.status(404).json("User not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Error updating user entries!");
  }
};
