import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Projects from "./components/Projects";

const SUGGESTED_DONATION = "3";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    // TODO: don't just fetch once; subscribe!

    await contract
      .getProjects()
      .then((res) => {
        console.log(res);
        setProjects(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, donation, projectId } = e.target.elements;

    fieldset.disabled = true;
    // TODO: optimistically update page with new message,
    // update blockchain data in background
    contract
      .Donate(
        { id: ~~parseInt(projectId.value) }, // convert to u32
        BOATLOAD_OF_GAS,
        Big(donation.value || "0")
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getProjects().then((projects) => {
          setProjects(projects);
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName);
    // wallet.requestSignIn(
    //   {
    //     contractId: nearConfig.contractName,
    //     methodNames: [contract.addMessage.name],
    //   }, //contract requesting access
    //   "NEAR Support", //optional name
    //   null, //optional URL to redirect to if the sign in was successful
    //   null //optional URL to redirect to if the sign in was NOT successful
    // );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <main>
        <header>
          <h1> Welcome! </h1>
          {currentUser ? (
            <button onClick={signOut}>Log out</button>
          ) : (
            <SignIn />
          )}
        </header>
        {currentUser ? (
          <>
            <Home projects={projects} />

            <Projects
              projects={projects}
              onSubmit={onSubmit}
              currentUser={currentUser}
            />
          </>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </main>
    </div>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    getProjects: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
