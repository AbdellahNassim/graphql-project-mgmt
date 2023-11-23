import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "@/queries/project.queries"
import ProjectCard from "./ProjectCard"
import { GetProjectsQuery } from "@/types/project.type"
function Projects() {
    const { loading, error, data } = useQuery<GetProjectsQuery>(GET_PROJECTS)
    if (loading) return <Spinner />
    if (error || !data) return <p>Something went wrong</p>
    return (
        <div className="mt-4">
            {data.projects.length > 0 ? (<div className="row">
                {data.projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>) : (<p>No Projects</p >)}
        </div>
    )
}

export default Projects