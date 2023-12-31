import './SelectProject.css'
import { useState, useEffect } from 'react'

function SelectProject({setProjName, setFiles, readFilesLocally}){
    const [projects, setProjects] = useState([])
    const [selectedProj, setSelectedProj] = useState("")

    useEffect(() => {
        let projects = localStorage.getItem("projects")
       
        if(projects != null){
            projects = JSON.parse(projects)
            console.log(projects)
            setProjects(projects)
            setSelectedProj(projects[0])
        }
    }, [])

    function handleSelectProj(){
        
        setProjName(selectedProj)
        localStorage.setItem("currentProj", selectedProj)
        setFiles(readFilesLocally())
        console.log(selectedProj + " - selectedproj dialog")
        
        let selectProjDialog = document.querySelector('.SelectProject')
        selectProjDialog.close()
    }

    function handleShowCreateProj(){
        let selectProjDialog = document.querySelector('.SelectProject')
        selectProjDialog.close()
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.showModal()
    }

    function handleCreateProj(){
        let projects = localStorage.getItem("projects")
        if(projects == null){
            projects = []
        }
        projects = JSON.parse(projects)
        projects.push(selectedProj)
        console.log(projects)
        localStorage.setItem("projects", JSON.stringify(projects))
        let project = {
            name: selectedProj,
            files: []
        }
        localStorage.setItem("projects-" + selectedProj, JSON.stringify(project))
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.close()
        setProjName(selectedProj)
        localStorage.setItem("currentProj", selectedProj)
        setFiles(readFilesLocally())
    }

    return (
        <>
        <dialog className="SelectProject">
            <div className="SelectProjectTitle">Select Project</div>
            <select className="SelectProjectSelect" onChange={(e) => setSelectedProj(e.target.value)}>
                {projects.map((proj) => {
                    return <option key={proj} value={proj}>{proj}</option>
                })}
            </select>
            <button className="SelectProjectButton" onClick={handleSelectProj}>Select</button>
            <br />
            <button className="CreateProjectButton" onClick={handleShowCreateProj}>Create Project</button>
        </dialog>
       
        </>
    )
}

export default SelectProject