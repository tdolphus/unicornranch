import Head from "next/head";
import { useEffect, useState } from "react";
import Unicorn from "./components/unicorn";

export default function Home() {
  const [unicornData, setUnicornData] = useState([]);
  const [formData, setFormData] = useState({
    unicorn: "daisy",
    location: "barn",
  });

  //Fetches current data on the location of the unicorns
  useEffect(() => {
    fetch("http://localhost:3001/unicorn-get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUnicornData(data);
      });
  }, [formData]);

  //Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/unicorn-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unicorn: formData.unicorn,
        location: formData.location,
      }),
    }).then(() => {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    });
  };

  //Handles changes in form inputs
  const handleChange = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };
  return (
    <div>
      <Head>
        <title>Ranch Ranch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Ranch Ranch</h1>
        <h2>Unicorns:</h2>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Location</th>
            </tr>
            {unicornData.map((unicorn) => {
              return (
                <Unicorn
                  key={unicorn.name}
                  location={unicorn.location}
                  color={unicorn.color}
                  name={unicorn.name}
                />
              );
            })}
          </tbody>
        </table>

        <form
          onSubmit={(e) => handleSubmit(e)}
          action="http://localhost:3001/unicorn-post"
          method="POST"
        >
          <select onChange={(e) => handleChange(e)} name="unicorn" id="unicorn">
            <option value="daisy">Daisy - Yellow</option>
            <option value="rose">Rose - Red</option>
            <option value="lily">Lily - Blue</option>
            <option value="petunia">Petunia - Green</option>
            <option value="zinnia">Zinnia - Black</option>
            <option value="pansy">Pansy - Orange</option>
            <option value="azalea">Azalea - Purple</option>
            <option value="jasmine">Jasmine - Pink</option>
            <option value="cassia">Cassia - Brown</option>
            <option value="erica">Erica - Silver</option>
            <option value="violet">Violet - Gold</option>
            <option value="iris">Iris - White</option>
          </select>

          <select
            onChange={(e) => handleChange(e)}
            name="location"
            id="location"
          >
            <option value="barn">Barn</option>
            <option value="trail">Trail</option>
            <option value="pasture">Pasture</option>
          </select>

          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
