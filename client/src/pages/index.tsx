import React, { FC, useState } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import "./index.css";

const initialValues: IFormValue = {
  clientId: "",
  petName: "",
  species: "",
};

const IndexPage: FC = () => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = "https://16a9fit4l9.execute-api.us-east-2.amazonaws.com/prod/";

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Values ===> ", JSON.stringify(values, null, 2));

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      console.log("ApiGateway Response: ", JSON.stringify(json, null, 2));
      setValues(initialValues);
    } catch (err) {
      console.log(
        "Error submitting lab report: ",
        JSON.stringify(err, null, 2)
      );
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <SEO title="Home" />
      <h1 style={{ textAlign: "center" }}>Send Lab Report</h1>
      <div className="container">
        <form onSubmit={onSubmit}>
          <label htmlFor="clientId">Client ID</label>
          <input
            id="clientId"
            name="clientId"
            value={values.clientId}
            onChange={onChangeHandler}
          />
          <br />
          <label htmlFor="petName">Pet Name</label>
          <input
            id="petName"
            name="petName"
            value={values.petName}
            onChange={onChangeHandler}
          />
          <br />
          <label htmlFor="species">Species</label>
          <input
            id="species"
            name="species"
            value={values.species}
            onChange={onChangeHandler}
          />
          <br />
          <button disabled={isSubmitting}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default IndexPage;

interface IFormValue {
  clientId: string;
  petName: string;
  species: string;
}
