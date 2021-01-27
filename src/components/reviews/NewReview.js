import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';



class NewReview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            score: 1,
            description: ''
        }

        this.changeReview = this.changeReview.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    changeReview(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    async clickAdd() {
        let result = await this.props.onAddReview(this.state);
        if (result) {
            this.setState({
                title: '',
                score: 1,
                description: ''
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
                    <th>Title</th>
                    <th>Score</th>
                    <th>Description</th>


                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <td><input className="form-control" name="title" value={this.state.title} onChange={this.changeReview}></input></td>
                    <td>
                     
                        <Rating
            name="customized-empty"
            defaultValue={1}
            precision={1}
            onChange={(event, newValue) => {
                this.state.score= newValue
              }}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
                        </td>
                    <td><input className="form-control" name="description" value={this.state.description} onChange={this.changeReview}></input></td>
                    <td><button data-testid="add" className="btn btn-primary" onClick={this.clickAdd}>Add Review</button></td>
                </tr>
            </table>
        );
    }
}

export default NewReview;