import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import { Badge } from 'react-bootstrap'

const NewTicket = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  })

  const onSubmit = (event) => {
    event.preventDefault()

    doRequest()
  }

  const onBlur = () => {
    const value = parseFloat(price)

    if (isNaN(value)) {
      return
    }

    setPrice(value.toFixed(2))
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
      }}
    >
      <h2 class="display-2 text-primary">Sell You Ticket Now!</h2>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Ticket Name</label>
          <input
            class="form-control"
            id="exampleInputEmail1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticketname"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            class="form-control"
            placeholder="Price"
          />
        </div>
        {errors}
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTicket

{
  /* 
<form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div> */
}
