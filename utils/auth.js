import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
// set up cookies
const cookies = new Cookies();

export async function handleAuthSSR(ctx) {
  let token = null;

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }
  else {
    // we dont have request info aka Client Side
    token = cookies.get('token')
  }

  let apiUrl = `http://localhost:${process.env.PORT}/auth`;
  if (process.env.NODE_ENV === 'production') apiUrl = `${process.env.API_URL}/auth`;
  try {
    const response = await axios.get(apiUrl, { headers: { 'Authorization': token } });
    // dont really care about response, as long as it not an error
    console.log("token ping:", response.data.msg)
  } catch (err) {
    // in case of error
    console.log(err.response.data.msg);
    console.log("redirecting back to main page");
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/'
      })
      ctx.res.end()
    } else {
      Router.push('/')
    }
  }
}