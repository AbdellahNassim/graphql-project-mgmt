import { FormEventHandler, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '@/mutations/client.mutations'
import { GET_CLIENTS } from '@/queries/client.queries'
import { ClientQuery } from '@/types/client.type'
function AddClientModal() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState("")

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            email,
            phone
        },
        update(cache, { data: { addClient } }) {
            const query = cache.readQuery<ClientQuery>({ query: GET_CLIENTS })
            if (!query) return
            const clients = query.clients
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.concat([addClient]) }
            })
        }
    })
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!name || !email || !phone) {
            alert('Please fill in all fields')
            return
        }
        addClient()
        setName('')
        setEmail('')
        setPhone('')
    }
    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className="me-2" />
                    <span>Add Client</span>
                </div>
            </button>

            <div className="modal fade" id="addClientModal" tabIndex={-1} aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input onChange={e => setName(e.target.value)} value={name} type="text" id='name' name='name' className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" id='email' name='email' className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className='form-label'>Phone</label>
                                    <input onChange={e => setPhone(e.target.value)} value={phone} type="tel" id='phone' name='phone' className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <button data-bs-dismiss='modal' type="submit" className="btn btn-secondary">Submit</button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientModal