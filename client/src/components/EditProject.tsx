import { Project } from "@/types/project.type"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { UPDATE_PROJECT } from "@/mutations/project.mutations"
import { Status } from "./AddProjectModal"
type Props = {
    project: Project
}
function getEnumKeyFromString(key: string): Status {
    switch (key) {
        case "Not Started":
            return "new"
        case "In Progress":
            return "progress"
        case "Done":
            return "done"
        default:
            return "new"
    }

}
function EditProject({ project }: Props) {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState<Status>(getEnumKeyFromString(project.status))

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project.id,
            name,
            description,
            status
        },
        update(cache, { data: { updateProject } }) {
            cache.modify({
                id: cache.identify(project),
                fields: {
                    name() { return updateProject.name },
                    description() { return updateProject.description },
                    status() { return updateProject.status }
                }
            })
        }
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !description || !status) {
            alert('Please fill in all fields')
            return
        }
        updateProject()
    }

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit} >
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
                    <button data-bs-dismiss='modal' type="submit" className="btn btn-secondary">Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditProject