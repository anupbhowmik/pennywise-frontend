import axios from "axios"
import toast from "react-hot-toast"
import { navigate } from 'wouter/use-browser-location'

export const regularApiRequest = async ({ url, method, reqBody = {} }) => {
  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  try {
    if (method.toUpperCase() === "GET") {
      const response = await axios.get(url, { headers: requestHeaders })
      console.log("resp", response.data)
      return response
    } else if (method.toUpperCase() === "POST") {
      const response = await axios.post(url, reqBody, {
        headers: requestHeaders,
      })
      console.log("resp", response.data)

      return response
    } else if (method.toUpperCase() === "PUT") {
      const response = await axios.put(url, reqBody, {
        headers: requestHeaders,
      })
      console.log("resp", response.data)

      return response
    } else if (method.toUpperCase() === "DELETE") {
      const response = await axios.delete(url, { headers: requestHeaders })

      console.log("resp", response.data)

      return response
    }
  } catch (error) {
    console.log(error)
    toast.error("Request Failed")
    navigate("/login")
  }
}
