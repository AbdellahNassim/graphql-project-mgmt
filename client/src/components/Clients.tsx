import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "@/queries/client.queries";
import Spinner from "./Spinner";
import { Client } from "@/types/client.type";
function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS)
    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
    const clientsRows = data.clients.map((client: Client) => {
        return <ClientRow key={client.id} client={client} />
    })
    return (
        <>

            {!loading && !error &&

                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsRows}
                    </tbody>
                </table>

            }

        </>
    )
}

export default Clients