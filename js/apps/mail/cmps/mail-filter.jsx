export class MailFilter extends React.Component {
    state = {
        filterBy: {
            folder: 'search',
            phrase: '',
            isRead: 'all',
        }
    }
    componentDidUpdate() {
        if (this.props.folder !== this.state.filterBy.folder) {
            this.setState(prevState => ({ filterBy: { ...prevState.filterBy, folder: this.props.folder } }))
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.loadMails(this.state.filterBy)
        })
    }

    render() {
        return (
            <section className="filter">
                <input type="search" name="phrase" id="phrase" value={this.state.filterBy.phrase}
                    onChange={this.handleChange} placeholder="Start typing to search..." />
                <select name="folder" id="folder" value={this.state.filterBy.folder} onChange={this.handleChange}>
                    <option value="search">All</option>
                    <option value="inbox">Inbox</option>
                    <option value="starred">Starred</option>
                    <option value="sent">Sent</option>
                    <option value="draft">Draft</option>
                    <option value="trash">Trash</option>
                </select>
                <select name="isRead" id="isRead" value={this.state.filterBy.isRead} onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value={true}>Read</option>
                    <option value={false}>Unread</option>
                </select>
            </section>
        )
    }
}
