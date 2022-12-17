import React from 'react'
import { Link } from 'react-router-dom'

// Function that shows the date of the note
let getDate = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

// Function that shortens the title if it is too long
let getTitle = (note) => {
    const title = note.body.split("\n")[0]
    if (title.length > 25){
        return title.slice(0, 25)
    }
    return title
}

// Function that show the content of the note
let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll("\n", " ")
    content = content.replaceAll(title, "")
    if (content.length > 25) {
        return content.slice(0,25)
    } else {
        return content
    }
}

const ListItem = ({note}) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getDate(note)}</span>{getContent(note)}</p>
            </div>
        </Link>
    )
}

export default ListItem
