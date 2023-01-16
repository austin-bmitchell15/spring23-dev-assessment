import mongoose from "mongoose"

const trainingSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true}, // training log's id
    date: {type: Date, required: true}, // date of training log
    description: {type: String, required: true}, // description of training log
    hours: {type: Number, required: true}, // number of hours the training log records
    animal: {type: mongoose.Schema.Types.ObjectId, required: true}, // animal this training log corresponds to
    user: {type: mongoose.Schema.Types.ObjectId, required: true}, // user this training log corresponds to
    trainingLogVideo: {type: String}, // pointer to training log video in cloud storage --> used in Expert level
})


  const TrainingModel = mongoose.model('Training', trainingSchema);
export { TrainingModel };