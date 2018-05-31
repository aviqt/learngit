import React, { Component } from 'react';
import $ from 'jquery';

let interval;
class ListView extends Component{
  constructor(props) {  
    super(props);  
    this.state = { 
	  showCount:this.props.getListByPageIndex?10000:0,
	  bottomText:'Loading...',
	  pageIndex:1,
	  isEnd:false,
	  list:this.props.data
	}
  }
  componentDidMount() {
	interval = setInterval(() => {
	  if($(this.node).height() + $(this.node).scrollTop() >= $(this.node)[0].scrollHeight - 10 && !this.state.isEnd){
		if(this.props.getListByPageIndex){
		  let newList = this.props.getListByPageIndex(this.state.pageIndex);
		  if(newList.length === 0){
		    this.setState({
		  	  bottomText:'没有更多数据',
			  isEnd:true,
		    });
		  }else{
			this.setState({
			  pageIndex:this.state.pageIndex + 1 ,
			  list:this.state.list.concat(newList),
			});
		  }
		}else{
		  this.setState({
	  	    showCount:this.state.showCount + ( this.props.pageSize ? this.props.pageSize : 5 ) ,
		    bottomText:this.state.showCount < this.props.data.length ? 'Loading...' : '没有更多数据'
	      });
		}
	    
	  }
	},100)
  }
  componentWillReceiveProps() {
    this.node.scrollTo(0,0);
	this.initShowCount();
  }
  initShowCount(){
	this.setState({
	  showCount:this.props.getListByPageIndex?10000:0,
	  bottomText:'Loading...',
	  isEnd:false,
	  pageIndex:1,
	  list:this.props.data
	});
  }
  componentWillUnmount(){
	clearInterval(interval);
  }
  render(){
	return (
	  <div 
	    ref={node => this.node = node} 
		className={this.props.className}
		style={this.props.style}
	  >
		{this.state.list.slice(0,this.state.showCount).map(this.props.row)}
		<div className='listLoading'>{this.props.data.length!==0?this.state.bottomText:'没有相关数据'}</div>
	  </div>
	);
  }
}


export default ListView;
