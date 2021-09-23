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
    // console.log('DALE MOSTRAME ESE ERROR POR FAVOR', error)
    return 400;
  }
};

export default loginUser;
