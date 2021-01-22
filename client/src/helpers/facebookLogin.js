import * as queryString from 'query-string';
import axios from 'axios';

export async function getAccessTokenFacebook(code) {
  const { data } = await axios({
    url: 'https://graph.facebook.com/v9.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.REACT_APP_FACEBOOK_ID,
      redirect_uri: `${process.env.REACT_APP_ALLOWED_ORIGIN}/login`,
      client_secret: process.env.REACT_APP_FACEBOOK_SECRET_CODE,
      code,
    },
  });
  // console.log(data); // { access_token, token_type, expires_in }
  return data.access_token;
}

export async function getFacebookUserData(accesstoken) {
  const { data } = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: accesstoken,
    },
  });
  // console.log(data); // { id, email, first_name, last_name }
  return data;
}

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_FACEBOOK_ID,
  redirect_uri: `${process.env.REACT_APP_ALLOWED_ORIGIN}/login`,
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

export const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${stringifiedParams}`;
