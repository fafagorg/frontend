import React from 'react';





class NewComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: ''
        }

        this.changeComment = this.changeComment.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    changeComment(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    async clickAdd() {
        let result = await this.props.onAddComment(this.state, this.props.reviewId);
        if (result) {
            this.setState({
                body: '',
            });
        }
    }

    async setValue(newValue){
        this.state.score = newValue
    }

    render() {
        return (
            <table>
                <tr>
                    <th>Comentar:</th>
   


                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <td><input className="form-control" name="body" value={this.state.body} onChange={this.changeComment}></input></td>

                    <td><button data-testid="add" className="btn btn-primary" onClick={this.clickAdd}>Comment</button></td>
                </tr>
            </table>
        );
    }
}

export default NewComment;