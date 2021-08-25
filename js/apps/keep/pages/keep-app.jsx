import { noteService } from '../services/note.service.js';
import {NoteList} from '../cmps/note-list.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'

export class KeepApp extends React.Component{
    state = {
        notes: [],
    }
    componentDidMount(){
        this.loadNotes();
    }

    loadNotes = ()=> {
        let notes = noteService.query();
        this.setState({ notes });
    }

    render(){
        const {notes} = this.state;
        if (notes.length===0) return <div>loading...</div>
        return(
            <section className="keep-app">
                <h1>Keep app</h1>
                <NoteEdit loadNotes = {this.loadNotes}/>
                <NoteList notes={notes}/>
            </section>
        )
    }
}