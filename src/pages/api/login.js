import axios from "axios";
import { parseCookies, setCookie } from "nookies"

export default function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(400).end({ message: "Don't think to try this." });
      }

      const { email, password } = req.body;

      const { data: response, status } = await axios.post(
        `http://localhost:8000/api/login`,
        { email, password },
        {
          headers: {
            acccept: "application/json",
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if(response.data.token) {
        setCookie({ res }, 'nextauth.token', token, {
            path: '/',
            maxAge: 60 * 60 * 1, // 1 hour
        })
      }

      return res.json({
        status: true,
        token: response.data.token,
      });
  }