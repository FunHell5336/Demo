import axios from "axios";

const btn = document.getElementById("load");
const output = document.getElementById("output");

btn.onclick = async () => {
  try {
    const res = await axios.get("http://backend:3000/users");
    output.textContent = JSON.stringify(res.data, null, 2);
  } catch (err) {
    output.textContent = "Error loading data";
    console.error(err);
  }
};
