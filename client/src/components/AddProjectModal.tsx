import { FormEventHandler, useEffect, useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '@/mutations/project.mutations'
import { GET_PROJECTS } from '@/queries/project.queries'
import { GetProjectsQuery } from '@/types/project.type'
import { GET_CLIENTS } from '@/queries/client.queries'
import { ClientQuery } from '@/types/client.type'
export type Status = "new" | "progress" | "done"
function AddProjectModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<Status | "">("new")
    const [clientId, setClientId] = useState("")

    const { loading, error, data } = useQuery<ClientQuery>(GET_CLIENTS)
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            name,
            description,
            status,
            clientId
        },
        update(cache, { data: { addProject } }) {
            const query = cache.readQuery<GetProjectsQuery>({ query: GET_PROJECTS })
            if (!query) return
            const projects = query.projects
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.concat([addProject]) }
            })
        }
    })
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (!name || !description || !status) {
            alert('Please fill in all fields')
            return
        }
        addProject()
        setName('')
        setDescription('')
        setStatus("new")
        setClientId(data?.clients[0].id || "")
    }
    useEffect(() => {
        if (loading || error) return
        if (data?.clients.length) {
            setClientId(data.clients[0].id)
        }
    }, [loading, data, error])
    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <div className="d-flex align-items-center">
                    <FaList className="me-2" />
                    <span>New Project</span>
                </div>
            </button>
            <div className="modal fade" id='addProjectModal' aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input onChange={e => setName(e.target.value)} value={name} type="text" id='name' name='name' className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className='form-label'>Description</label>
                                    <textarea onChange={e => setDescription(e.target.value)} value={description} id='description' name='description' className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className='form-label'>Status</label>
                                    <select value={status} className='form-select' name="status" id="status" onChange={e => {
                                        setStatus(e.currentTarget.value as Status)
                                    }}>
                                        <option selected={status === "new"} value="new">Not Started</option>
                                        <option selected={status === "progress"} value="progress">In Progress</option>
                                        <option selected={status === "done"} value="done">Done</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientId" className='form-label'>Client</label>
                                    {loading ? <p>Loading...</p> :
                                        <select value={clientId} className='form-select' name="clientId" id="clientId" onChange={e => {
                                            setClientId(e.currentTarget.value)
                                        }}>
                                            {data?.clients.map(client => (
                                                <option key={client.id} value={client.id}>{client.name}</option>

                                            ))}
                                        </select>}
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

export default AddProjectModal