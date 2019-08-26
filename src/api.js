import axios from 'axios';
const MyToken = '1c9a77a2df4ab89e34fef4b9ccad76d86c30c7ff';

export default axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {'Authorization': `Token ${MyToken}`}
});
