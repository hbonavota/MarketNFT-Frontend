import axios from "../axios";
const loginUser = async (user) => {
  try {
    const data = await axios().post("http://localhost:8001/login", {
      username: user.username,
      password: user.password,
    });
    return data.data;
  } catch (error) {
    return null;
  }
};

export default loginUser;
