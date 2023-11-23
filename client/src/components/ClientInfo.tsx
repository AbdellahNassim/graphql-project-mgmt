import { Client } from '@/types/client.type'
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'
type Props = {
    client: Client
}

function ClientInfo({ client }: Props) {
    return (
        <>

            <h5 className='mt-5'>Client Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaIdBadge className="me-2" />
                    {client.name}
                </li>
                <li className="list-group-item">
                    <FaEnvelope className="me-2" />
                    {client.email}
                </li>
                <li className="list-group-item">
                    <FaPhone className="me-2" />
                    {client.phone}
                </li>
            </ul>

        </>
    )
}

export default ClientInfo