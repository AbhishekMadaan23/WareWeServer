const User = require("../models/user");

const router = require("express").Router();

//fetching all users
router.get("/", async (req, res) => {
  try {
    const savedUser = await User.find();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send("error in fetching all users", err);
  }
});

//fetching a user with id
router.get("/:id", async (req, res) => {
  try {
    const savedUser = await User.findById(req.params.id);
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//saving a user
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
  });

  try {
    const savedUser = await user.save();
    const { password, ...others } = savedUser._doc;
    res.send(others);
  } catch (err) {
    res.status(400).send("error in saving user", err);
  }
});

//updating a user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("error in updating user", err);
  }
});

//deleting a user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("error in deleting user", error);
  }
});

module.exports = router;
