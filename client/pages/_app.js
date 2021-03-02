import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
// import 'bootstrap/dist/js/bootstrap.bundle.min'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />

        <title>Ticketing</title>
      </head>
      <body class="bg-light">
        <Header currentUser={currentUser} />

        <Component currentUser={currentUser} {...pageProps} />
      </body>
    </>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    )
  }

  return {
    pageProps,
    ...data,
  }
}

export default AppComponent
