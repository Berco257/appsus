import { noteService } from '../services/note.service.js';


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
        console.log(notes);
        return(
            <section className="keep-app">
                <h1>Keep app</h1>
                {/* <note-preview/> */}
            </section>
        )
    }
}