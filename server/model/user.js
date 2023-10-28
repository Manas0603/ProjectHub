import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match:   /^\d{5}@iiitu\.ac\.in$/,
},

  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for the password
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function(value) {
  //       // Use a function to access 'this' and compare with the 'password' field
  //       return value === this.password;
  //     },
  //     message: 'Passwords do not match',
  //   },
  // },
  // You can add more fields related to users if needed
});

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Create the User model
const User = mongoose.model('user', userSchema);

// Export the User model
export default User;

