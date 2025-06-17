import UserModel from "../model/user.model.mjs";

const AuthService = {

  /**
   * registerUser()
   * Registers a new user with the provided information.
   * @param {email, password} - User's info.
   * @return {Promise<UserModel>} - Newly registered user.
   * @throw {Error} - If the passwords do not match or if the email is already registered.
   */
  async registerUser(email, password) {    

    const newUser = new UserModel({
        email,
        password
    });

    try {
      await newUser.save();
      return newUser;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Email is already registered");
        }
        throw new Error(error.message);
    }
  },

  /**
   * loginUser()
   * Logs in a user with the provided email and password.
   * @param {email, password} - The user's email and password.
   * @return {Promise<UserModel>} - A promise that resolves to the logged-in user.
   * @throw {Error} - If the email or password is invalid or if the user is not found.
   */
  async loginUser(email, password) {
    try {
      const user = await UserModel.findOne({ email: email });

      if (user) {
        const isValidPassword = await user.comparePassword(password);
  
        if (isValidPassword) {
          return user;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default AuthService;
