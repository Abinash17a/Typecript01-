//Schema for users
import mongoose,{ Schema,model,Document } from "mongoose";
interface User extends Document{
    username:string;
    email:string;
    password:string;
}

const userSchema: Schema<User> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other fields as needed
});
const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;