import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config'; 

class AddNote extends React.Component {

    static contextType = ApiContext;

    state = {
        nameNote: {value:''},
        folderId: {value: 1},
        content: {value: ''}
    }

    handleAddNote(nameNote, folderId, content) {
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": nameNote.value,
                "modified": new Date(),
                "folder_id": folderId.value,
                "content": content.value
            })
        })
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then(data=>{
            console.log(data)
            this.context.getNotes();
        })
        .catch(err => err.message)
    }

    validateNoteName = (event) => {
        event.preventDefault();
        const validNote = this.state.nameNote.value;
        if(validNote) {
            this.handleAddNote(this.state.nameNote, this.state.folderId, this.state.content)
            this.props.history.push('/')
        } 
    }
    
    updateName(nameNote){
        this.setState({nameNote: {value:nameNote}})   
    }
    updateFolderId(folderId){
        this.setState({folderId: {value: folderId}})
    }
    updateContent(content){
        this.setState({content: {value:content}})
    }
    


    render() {
        const styleText= {color: '#A9A9A9'}
        
        return (
            <div>
                <form onSubmit={this.validateNoteName}>
                    <label htmlFor="nameNote"><span style={styleText}> Note Name Here</span></label>
                    <input 
                    id="nameNote" 
                    type="text" 
                    aria-label="Due date for book return" 
                    aria-required="true" 
                    required
                    value={this.state.nameNote.value} 
                    onChange={e => this.updateName(e.target.value)}/>
                    <label htmlFor="folderName"><span style={styleText}>Select Here</span></label>
                        <select id='folderName' 
                        onChange={event => this.updateFolderId(event.target.value)}>
                            {this.context.folders.map(folder => {
                                return <option key={folder.id} value={folder.id}> {folder.folder_name} </option>})}
                        </select>
                    <label htmlFor="content"><span style={styleText}>Content Here</span></label>
                    <input 
                    required
                    id="content" type="text"
                    aria-label="Add the contents of your new note." 
                    aria-required="true" 
                    value={this.state.content.value}
                    onChange={e => this.updateContent(e.target.value)}
                    />
                    <button type="submit"  
                    >Add Note</button>
                </form>
            </div>
        )
    }

}

export default AddNote;