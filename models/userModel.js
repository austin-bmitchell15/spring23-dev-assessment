import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true}, // user's ID
    firstName: {type: String, required: true}, // user's first name
    lastName: {type: String, required: true}, // user's last name
    email: {type: String, required: true}, // user's email
    password: {type: String, required: true}, // user's password used only in level 3 and beyond
    profilePicture: {type: String}, // pointer to user's profile picture in cloud storage --> used in Expert level
  })


  const UserModel = mongoose.model('User', userSchema);
export { UserModel };