import axios from "../axios";
const loginUser = async (user) => {
  try {
    const data = await axios().post("/login", {
      username: user.username,
      password: user.password,
      // cart:user.cart
    });
    return data.data;
  } catch (error) {
    return null;
  }
};

export default loginUser;
