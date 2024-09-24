import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: String,
    phone: String,
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);
export default Business;
