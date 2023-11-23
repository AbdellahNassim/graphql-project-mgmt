import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { GET_PROJECTS } from "@/queries/project.queries"
import { DELETE_PROJECT } from "@/mutations/project.mutations"
import { GetProjectsQuery, Project } from "@/types/project.type"
type Props = {
    projectId: string
}

function DeleteProjectButton({ projectId }: Props) {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted() {
            navigate('/')
        },
        update(cache) {
            const query = cache.readQuery<GetProjectsQuery>({ query: GET_PROJECTS })
            if (!query) return
            const projects = query.projects
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.filter((project: Project) => project.id !== projectId) }
            })

        }
    })
    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash className="icon" /> Delete
            </button>

        </div>
    )
}

export default DeleteProjectButton