import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true}, // animal's ID
    name: {type: String, required: true}, // animal's name
    hoursTrained: {type: Number, required: true}, // total number of hours the animal has been trained for
    owner: {type: mongoose.Schema.Types.ObjectId, required: true}, // id of the animal's owner
    dateOfBirth: {type: Date}, // animal's date of birth
    profilePicture: {type: String}, // pointer to animal's profile picture in cloud storage --> used in Expert level
})


  const AnimalModel = mongoose.model('Animal', animalSchema);
export { AnimalModel };