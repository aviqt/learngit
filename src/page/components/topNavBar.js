import React, { Component } from 'react';
import { 
	ActionSheet,
	NavBar,
	Icon
 } from 'antd-mobile';
import { Link } from 'react-router-dom';


const logoImg = require('../../images/antb.png');
const iconHome = require('../../icon/home.svg');
const iconPlus = require('../../icon/plus.svg');
class TopNavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
		title:this.props.title,
		showRC:this.props.showRC?this.props.showRC:false,
		showLC:this.props.showLC?this.props.showLC:false,
		back:this.props.back?this.props.back:-1
	}
  }
  showActionSheet = () => {
    const BUTTONS = [<div className='actionSheetBtn'><img src={logoImg} alt={logoImg}/>投票广场置顶</div>, '发送给朋友', '复制链接', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      //destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
      //message: 'I am description, description, description',
      //maskClosable: true,
      //'data-seed': 'logId',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
  render() {
    return (
	  <div style={{height:45}}>
	    <NavBar
	      mode='light'
	      leftContent = {this.state.showLC?[
	  	    this.state.back==='0'?<img key='navbar_l_tohome' onClick={()=>{window.location.href = '/';}} src={iconHome} alt={iconHome} style={{height:30}}/>
			:<Icon key='navbar_l' type='left' color='white' onClick={()=>{window.history.go(this.state.back)}}/>
	      ]:[]}
	      rightContent = {this.state.showRC?[
	  	    <Link to='/vote/add'  key='navbar_r_addVote'><img src={iconPlus} alt={iconPlus} style={{height:30}}/></Link>
	      ]:[]}
	      style={{backgroundColor:'#18a3fe',height:45,position:'fixed',top:0,left:0,right:0,zIndex:10}}
	    >
	  	<span style={{color:'white',fontSize:20}}>{this.state.title}</span>
	    </NavBar>
	  </div>
    );
  }
}

export default TopNavBar;
