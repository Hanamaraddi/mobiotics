import User from "../models/User.js";

export const update = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },

        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can Update Only Your Account");
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has Been Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can Delete Only Your Account");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
