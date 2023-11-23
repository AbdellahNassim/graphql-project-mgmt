import { useParams, Link } from "react-router-dom"
import Spinner from "@/components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "@/queries/project.queries"
import { GetProjectQuery, Project as ProjectType } from "@/types/project.type"
import ClientInfo from "@/components/ClientInfo"
import DeleteProjectButton from "@/components/DeleteProjectButton"
import EditProject from "@/components/EditProject"
function Project() {
    const { id } = useParams()
    const { loading, error, data } = useQuery<GetProjectQuery>(GET_PROJECT, {
        variables: { id }
    })
    if (loading) return <Spinner />
    if (error) return <p>Something wrong happened</p>
    const project = data?.project as ProjectType
    return (
        <div className="mx-auto w-75 card p-5 d-flex flex-row align-items-start">
            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{project.status}</p>
                <ClientInfo client={project.client} />
                <EditProject project={project} />
                <DeleteProjectButton projectId={project.id} />
            </div>
            <Link to={`/`} className="btn btn-light ms-auto d-inline w-10">Go back</Link>


        </div>
    )
}

export default Project