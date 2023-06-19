import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const inputRef = useRef();
  const [msg, setMsg] = useState("");
  //
  // optional, only to check how to avoir first load useEffect
  const firstLoad = useRef(true);
  const [firstname, setFirstname] = useState("");
  useEffect(() => {
    // if is first load, we only switch boolean value
    if (firstLoad.current) firstLoad.current = false;
    else firstLoad.current = console.warn("render en cours");
  }, [firstname]);

  const hSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.files[0] !== undefined) {
      const formData = new FormData();
      formData.append("avatar", inputRef.current.files[0]);
      axios
        .post(`${BACKEND_URL}/api/avatar`, formData)
        .then(() => setMsg("Photo uploadée !"))
        .catch((error) => {
          console.error(error);
          setMsg("Problème durant l'upload");
        });
    } else {
      setMsg("Selectionnez un fichier !");
    }
  };
  return (
    <div className="App">
      <p>{msg && msg}</p>
      <form encType="multipart/form-data" onSubmit={hSubmit}>
        {/* firstname optional, just for useEffect issue */}
        <p>
          {" "}
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </p>
        <input type="file" name="avatar" ref={inputRef} />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
