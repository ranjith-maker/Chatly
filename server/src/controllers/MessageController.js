import Message from '../models/MessageModel.js'
import Conversation from '../models/ConversationModel.js'
import  AppError, {catchAsync} from '../utils/CustomError.js'
import { uploadImagetoCloudinary } from '../utils/ImageUploader.js'
import {io} from '../socket/socket.js'




export const sendMessage = catchAsync(async (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const { message } = req.body;


  

  if (!receiverId) {
    throw new AppError("Receiver is required", 400);
  }

  if (!message && !req.file) {
    throw new AppError("Message or image is required", 400);
  }

  // 1. Handle image upload
  let image;
  if (req.file) {
    const result = await uploadImagetoCloudinary(req.file);
    image = result.secure_url;
  }


  // 2. Create message
  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    message: message || "",
    image: image || "",
  });

  // 3. Create roomId (VERY IMPORTANT)
  const roomId = [senderId.toString(), receiverId.toString()]
    .sort()
    .join("-");

  // 4. Find or create conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [newMessage._id],
    });
  } else {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  // 5. SOCKET BROADCAST (ROOM-BASED)
  io.to(roomId).emit("newMessage", newMessage);

  // 6. RESPONSE
  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});



export const getMessage = catchAsync(async(req,res,next)=>{

const senderId = req.user._id
const {receiverId} = req.params

if (!receiverId) {
    throw new AppError("Receiver is required", 400);
   }

const convo = await Conversation.findOne({ 
    participants : {$all : [ senderId, receiverId  ]  }
}).populate('messages')

if(!convo){
    throw new AppError('No Convo Exist, Start chatting',400)
}

return res.status(200).json({
    success : true,
    data : convo
})


})














