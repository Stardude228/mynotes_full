import React from "react"
import { Link } from "react-router-dom"
import { ReactComponent as AddItem } from "../assets/add.svg"

function AddButton() {
    return (
        <Link to="/note/new" className="floating-button">
            <AddItem />
        </Link>
    )
}

export default AddButton
