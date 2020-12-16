import axios from 'axios';
import _ from "lodash";
const getParentData = async (page) => {
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    url: `http://wp.anantkprajapati.com/test/?action=getParent&page=${page}`
  };
  try {
    const response = await axios(options);
    return response
  } catch (error) {
    console.error(error);
  }
}

const getChildData = async (childId) => {
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    url: `http://wp.anantkprajapati.com/test/?action=getChild&parent=${childId}`
  };
  try {
    const response = await axios(options);
    const responseData = _.get(response, "data.data");
    return responseData
  } catch (error) {
    console.error(error);
  }
}

const sortParentData = async (sortDirections) => {
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    url: `http://wp.anantkprajapati.com/test/?action=getParent&order=${sortDirections}`
  };
  try {
    const response = await axios(options);
    const responseData = _.get(response, "data.data");
    return responseData
  } catch (error) {
    console.error(error);
  }
}

export { getParentData, getChildData, sortParentData }