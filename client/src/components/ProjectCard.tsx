import { Project } from '@/types/project.type'
type Props = {
    project: Project
}

function ProjectCard({ project }: Props) {
    return (
        <div className='col-md-4'>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <a href={`/projects/${project.id}`} className="btn btn-sm btn-outline-secondary">View</a>
                        </div>
                    </div>
                    <p className='small mt-2'>Status <strong>{project.status}</strong></p>
                </div>
            </div>

        </div >
    )
}

export default ProjectCard