import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function Form({ onSubmit, currentUser, projectId }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Donate, {currentUser.accountId}!</p>

        <p>
          <label htmlFor="donation">Donate to keep this service :</label>
          <input
            autoComplete="off"
            defaultValue={"3"}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="3"
            step="1"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>

        <input id="projectId" defaultValue={projectId} hidden />

        <button type="submit">Donate</button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
