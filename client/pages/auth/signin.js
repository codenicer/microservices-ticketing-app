import { useState, useEffect } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  return (
    <div
      class="card-deck mb-3 text-center"
      style={{
        height: '80vh',
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <form
        onSubmit={onSubmit}
        class="form-signin"
        style={{
          width: '30rem',
        }}
      >
        <img class="mb-4" alt="" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          class="form-control mb-3"
          placeholder="Email address"
          required
          autofocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="inputPassword" class="sr-only">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="inputPassword"
          class="form-control mb-3"
          placeholder="Password"
          required
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        {errors}
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2020 - 2021</p>
      </form>
    </div>
  )
}
