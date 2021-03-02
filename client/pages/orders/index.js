const OrderIndex = ({ orders }) => {
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
      {orders.length > 0 ? (
        <ul style={{ listStyle: 'none' }}>
          {orders.map((order) => {
            return (
              <li
                key={order.id}
                style={{
                  width: '20rem',
                  margin: '3rem 0',
                }}
              >
                <div class="media text-muted pt-3">
                  <div
                    style={{
                      backgroundColor: 'blue',
                      height: '2rem',
                      width: '2rem',
                    }}
                    class="mr-2 rounded"
                  ></div>
                  <p class="media-body pb-3 mb-0  lh-125 border-bottom border-gray">
                    <h3 class="d-block text-gray-dark">{order.ticket.title}</h3>
                    Sample Ticket Details
                    <strong class="d-block text-gray-dark">
                      Status:{order.status}
                    </strong>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <h5>Theres nothing here.</h5>
      )}
    </div>
  )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders')

  return { orders: data }
}

export default OrderIndex
