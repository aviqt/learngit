import React, { Component } from 'react';
import {
	WingBlank,
	Carousel
} from 'antd-mobile';
import TopNavBar from './components/topNavBar';
import  './mock/mock';
import $ from 'jquery';


class NoticeDetail extends Component {
  constructor(props) {  
    super(props);  
    this.state = { 
	  noticeId:props.match.params.noticeId,
	  notice:[],
	  loading:true,
	  imgHeight:1
	}
  }
  
  componentDidMount(){
    this.getVoteData()
  }
  
  getVoteData(){
	let that = this;
	$.ajax({
	  url        : '/api/vote',   
	  dataType   : 'json',   
	  async      : true, 
	  data       : {},    
	  type       : 'GET',  
	  success: function(data) {
		let notice = {
		  title:data.title,
		  content:data.describe,
		  imgSrcList:data.imgSrcList,
		  date:data.endDate,
		  creator:'社区委员会',
		  type:'小区通知',
		};
	    console.log(notice);
		that.setState({
		  loading:false,
		  notice:notice
		})
	  }
	})
  }

  formatDate(timeStamp,str){
	let date = new Date(timeStamp);
	return [
	  date.getFullYear(),
	  date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth(),
	  date.getDate() > 9 ? date.getDate() :'0' + date.getDate()
	].join(str);
  }
  render() {
    if(this.state.loading){
  	  return (
  	  	<div>loading</div>
  	  )
    }
	const {notice} = this.state;

	
    return (
	  <div>
		<TopNavBar title={notice.type} showLC/>
		<div className='mainBox' style={{bottom:0}}>
		  <WingBlank>
	        <div style={style.title}>{notice.title + this.state.noticeId}</div>
	        <div style={style.titleUnderLine}></div>
		    <Carousel autoplay={false} infinite>
		      {notice.imgSrcList.map(val =>
		  	  <img 
		  	    key={val.src}
		  	    src={val.src} 
		  	    alt={notice.imgSrc} 
		  	    style={{height:this.state.imgHeight}}
		  		onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
		  	  />
		      )}
		    </Carousel>
	  
	        <div style={style.affix}>
			  <span style={{float:'right'}}>{notice.creator}</span>
			  发文日期：{this.formatDate(notice.date,'-')}
			</div>
	        <div style={style.content}>
	          {notice.content} <br />
	        </div>

		  </WingBlank>
		</div>
	    
      </div>
    );
  }
}
const style ={
  title:{
  	textAlign:'center',
	lineHeight:'28px',
  	fontSize:16,
  	marginTop:16,
  },
  titleUnderLine:{
  	borderTop:'1px solid #aaa',
  	width:80,
  	margin:'5px auto',
  	height:5
  },
  img:{
  	width:'100%',
  },
  content:{
  	color:'#333',
  	fontSize:14,
  	textIndent:'2em',
  	lineHeight:'22px',
  },
  
  affix:{
	color:'#999',
	lineHeight:'25px',
	margin:'5px 0'
  },
  
}
export default NoticeDetail;
