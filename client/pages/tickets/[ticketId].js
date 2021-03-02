import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  })

  return (
    <div
      class="card-deck mb-3 text-center"
      style={{
        height: '80vh',
        marginTop: '4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        class="card mb-4 box-shadow"
        style={{ maxWidth: '30rem', maxHeight: '30rem' }}
      >
        <div class="card-header">
          <h4 class="my-0 text-capitalize">{ticket.title}</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            Price: <small class="text-muted"> ${ticket.price}</small>
          </h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Sample ticket details 1</li>
            <li>Sample ticket details 2</li>
            <li>Sample ticket details 3</li>
            <li>Sample ticket details 4</li>
          </ul>
          <button
            type="button"
            class="btn btn-lg btn-block btn-outline-primary"
            onClick={() => doRequest()}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query
  const { data } = await client.get(`/api/tickets/${ticketId}`)

  return { ticket: data }
}

export default TicketShow
