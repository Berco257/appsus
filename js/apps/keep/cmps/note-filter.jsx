export class NoteFilter extends React.Component {

    render(){
        return(
            <form className="note-filter" onSubmit={this.onFilter}>
            {/* <label htmlFor='by-vendor'>By vendor</label>
            <input ref={this.inputRef} name='vendo' id='by-vendor' type='text' placeholder='Vendor' value={vendor} onChange={this.handleChange}/>
            <label htmlFor='min-speed'>Min speed</label> */}
            <button>Filter</button>
          </form>
        )
    }
}