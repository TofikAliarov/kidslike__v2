import axios from 'axios';
import * as queryString from 'query-string';

export async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_SECRET_CLIENT_CODE,
      redirect_uri: `http://kidslike-v2.top/login`,
      grant_type: 'authorization_code',
      code,
    },
  });
  return data.access_token;
}

export async function getGoogleUserInfo(access_token) {
  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: `http://kidslike-v2.top/login`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
