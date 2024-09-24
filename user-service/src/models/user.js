import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['owner', 'employee'], default: 'owner' },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
