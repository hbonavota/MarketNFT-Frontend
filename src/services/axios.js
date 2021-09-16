import axios from "axios";
let instance = null;

function initialize(props) {
    instance = (props && axios.create(props)) || axios.create();
    instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  instance.defaults.headers.delete['Content-Type'] =
    'application/x-www-form-urlencoded';
    instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // instance.defaults.headers.post['Access-Control-Allow-Credentials'] = '*';
    instance.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
    instance.defaults.withCredentials = true;
  return instance;
}

const getInstance = props => instance || initialize(props);
export default getInstance;
