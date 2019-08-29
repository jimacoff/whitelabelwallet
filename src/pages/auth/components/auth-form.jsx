/**
 * @fileoverview AuthForm for auth page.
 * @author Gabriel Womble
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextInput, AuthCheckbox } from '@codeparticle/whitelabelwallet.styleguide';
import { space2, space4 } from '@codeparticle/whitelabelwallet.styleguide/styles/layout.scss';
import { AUTH_CONSTANTS } from 'lib/constants';
import { auth } from 'e2e/constants';

const { SIGNUP } = AUTH_CONSTANTS;

export function AuthForm({
  accepted,
  confirmPassword,
  inputErrors,
  password,
  onSubmit,
  setAccepted,
  setConfirmPassword,
  setPassword,
  setUsername,
  messages,
  type,
  username,
}) {
  function onChangeHandler(e, fn) {
    if (e) {
      e.preventDefault();
    }

    fn(e.target.value);
  }

  return (
    <form onSubmit={onSubmit} data-selector={`auth.form-${type}`}>
      <TextInput
        className="auth-form-input"
        data-selector={auth.selectors.username.raw}
        hasError={inputErrors.USERNAME}
        label={messages.username}
        useAltTheme
        onChange={(e) => onChangeHandler(e, setUsername)}
        value={username}
      />
      <TextInput
        className="auth-form-input"
        data-selector={auth.selectors.password.raw}
        hasError={inputErrors.PASSWORD}
        type="password"
        useAltTheme
        label={messages.password}
        onChange={(e) => onChangeHandler(e, setPassword)}
        value={password}
      />
      {type === SIGNUP && (
        <Fragment>
          <TextInput
            className="auth-form-input"
            data-selector={auth.selectors.confirm.raw}
            hasError={inputErrors.CONFIRMED_PASSWORD}
            type="password"
            useAltTheme
            label={messages.confirmPassword}
            onChange={(e) => onChangeHandler(e, setConfirmPassword)}
            value={confirmPassword}
          />
          <div
            className="checkbox-container"
            data-selector={auth.selectors.tos.raw}
          >
            <AuthCheckbox
              checked={accepted}
              label={messages.tos}
              onChange={setAccepted}
            />
          </div>
        </Fragment>
      )}
      <input className="hidden" type="submit" />
      <style jsx>
        {`
          form {
            margin-top: ${space4};
            width: 100%;
          }

          :global(.auth-form-input) {
            margin: ${space2} 0;
          }

          .hidden {
            display: none;
          }

          .checkbox-container {
            display: flex;
            width: 100%;
          }
        `}
      </style>
    </form>
  );
}

AuthForm.propTypes = {
  confirmPassword: PropTypes.string.isRequired,
  inputErrors: PropTypes.objectOf(PropTypes.bool).isRequired,
  messages: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};