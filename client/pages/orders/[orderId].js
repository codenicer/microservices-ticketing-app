import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [order])

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
      {timeLeft < 0 ? (
        <h1 className="text-danger">ORDER EXPIRED</h1>
      ) : (
        <div>
          <h5 className="text-info">Time left to pay: {timeLeft} seconds</h5>
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey={
              'pk_test_51IQUUBE7WbYRwDrHjvgY6S2tezMtwQKCPZEjJ5K5VYpcAoTdI4dsY34l4m4SB9GUg1eq8eeL9XZilGqiHYoGYTaU00qp8l77Wy'
            }
            amount={order.ticket.price * 100}
            email={currentUser.email}
          />
          {errors}
        </div>
      )}
    </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query
  const { data } = await client.get(`/api/orders/${orderId}`)

  return { order: data }
}

export default OrderShow
