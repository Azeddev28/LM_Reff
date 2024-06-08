import axios from 'axios';
import { saveAs } from 'file-saver';

const downloadFile = async (url , fileName) => {
  console.log("url , fileName", url , fileName)
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: response.data.type });
    saveAs(blob, fileName);
  } catch (error) {
    if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }  }
};

export default downloadFile;