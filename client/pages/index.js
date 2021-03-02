import Link from 'next/link'

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <div class="card mb-3">
        <svg
          class="bd-placeholder-img card-img-top"
          width="100%"
          height="180"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Placeholder: Image cap"
          preserveAspectRatio="xMidYMid slice"
          role="img"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96" />
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
            Image cap
          </text>
        </svg>

        <div class="card-body">
          <h5 class="card-title text-capitalized">{ticket.title}</h5>
          <p class="card-text">
            It's a broader card with text below as a natural lead-in to extra
            content. This content is a little longer.
          </p>
          <p class="card-text">
            PRICE:
            <small class="text-muted">{ticket.price}</small>
          </p>

          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <button
              style={{
                maxWidth: '20rem',
              }}
              type="button"
              class="btn btn-primary btn-lg btn-block"
            >
              View
            </button>
          </Link>
        </div>
      </div>
    )
  })

  //   <div class="media text-muted pt-3">
  //   <div
  //     style={{ backgroundColor: 'blue', height: '2rem', width: '2rem' }}
  //     class="mr-2 rounded"
  //   ></div>
  //   <p class="media-body pb-3 mb-0  lh-125 border-bottom border-gray">
  //     <h3 class="d-block text-gray-dark">{ticket.title}</h3>
  //     Sample Ticket Details
  //     <strong class="d-block text-gray-dark"> Price:{ticket.price}</strong>
  //     <p class="d-block text-right mt-3">
  //       <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  //         <a>View</a>
  //       </Link>
  //     </p>
  //   </p>
  // </div>

  return (
    <>
      <main
        role="main"
        class="container"
        style={{
          marginTop: '7rem',
        }}
      >
        <div class="my- p-4 bg-white rounded box-shadow">
          <h1 class="border-bottom border-gray pb-2 mb-0">Ticket List</h1>
          {ticketList}
        </div>
      </main>
    </>
  )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')

  return { tickets: data }
}

export default LandingPage
