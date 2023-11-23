import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '@/mutations/client.mutations'
import { GET_CLIENTS } from '@/queries/client.queries'
import { Client } from '@/types/client.type'
import { GET_PROJECTS } from '@/queries/project.queries'
type Props = {
    client: Client
}


function ClientRow({ client }: Props) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id
        },
        // refetchQueries: [{ query: GET_CLIENTS }]
        // update(cache, { data: { deleteClient } }) {
        //     const query = cache.readQuery<ClientQuery>({ query: GET_CLIENTS })
        //     if (!query) return
        //     const { clients } = query
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter(client => client.id !== deleteClient.id)
        //         }
        //     })
        // }
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    })
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button onClick={() => deleteClient()} className="btn btn-danger btn-sm"><FaTrash /></button>
            </td>
        </tr>
    )
}

export default ClientRow