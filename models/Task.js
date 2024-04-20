const taskSchema = new Schema({
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;
