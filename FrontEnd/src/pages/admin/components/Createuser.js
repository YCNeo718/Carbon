import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import {
  ComponentWapper,
  Componentindex,
  Componentinput,
  Componentbutton,
  Componenttitle,
  ComponentoptionWapper,
  Componentcheckbox,
  Checkbutton,
  CheckItem
} from '../style';

class Createuser extends PureComponent {
  state = {
    accessChecked: []
  };

  handleCheckButtonClick = (index) => {
    this.setState((prevState) => {
      const newAccessChecked = [...prevState.accessChecked];
      newAccessChecked[index] = !newAccessChecked[index];
      return { accessChecked: newAccessChecked };
    });
  };

  render() {
    const { accesslist } = this.props;
    const { accessChecked } = this.state;

    return (
      <ComponentWapper>
        <Componenttitle>Create User</Componenttitle>
        <ComponentoptionWapper>
          <Componentindex>User Name</Componentindex>
          <Componentinput ref={(input) => { this.user_name = input }} />
        </ComponentoptionWapper>
        <ComponentoptionWapper>
          <Componentindex>Access</Componentindex>
          <Componentcheckbox>
            {
              accesslist.map((item, index) => (
                <CheckItem key={item.id} className='name'>
                  <Checkbutton
                    onClick={() => this.handleCheckButtonClick(index)}
                    className={accessChecked[index] ? 'checked' : ''}
                  ></Checkbutton>
                  {item.name}
                </CheckItem>
              ))
            }
          </Componentcheckbox>
        </ComponentoptionWapper>
        <ComponentoptionWapper>
          <Componentbutton onClick={() => this.props.CUsendinfo(this.user_name, accessChecked)}>Create</Componentbutton>
        </ComponentoptionWapper>
      </ComponentWapper>
    )
  }

  componentDidMount() {
    this.props.getaccess();
    this.setState({ accessChecked: new Array(this.props.accesslist.length).fill(false) });
  }
}

const mapStateToProps = (state) => ({
  accesslist: state.admin.accesslist
})

const mapDisptchToProps = (dispatch) => {
  return {
    CUsendinfo(user_name, accessChecked) {
      dispatch(actionCreators.CUsendinfo(user_name.value, accessChecked));
    },
    getaccess() {
      dispatch(actionCreators.getaccess())
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(Createuser);