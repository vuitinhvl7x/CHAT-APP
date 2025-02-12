import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const myUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: myUserId } }).select(
      "-password"
    );
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSideBar: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    return res(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    //todo: realtime func gonne be here socket.io
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
