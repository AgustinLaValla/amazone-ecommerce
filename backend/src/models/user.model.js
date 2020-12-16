import { Schema, model } from 'mongoose';
import { hash, genSalt, compare } from 'bcryptjs';

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type:String, required:true, default:false }
})

userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await genSalt(10);
    const hashed = await hash(user.password, salt);
    user.password = hashed;
    next();
});

userSchema.methods.comparePassoword = async function(password) {
    return await compare(password, this.password);
}

//Hide the password to final user
userSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
};

export default model('User', userSchema);