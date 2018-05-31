import React, { Component } from 'react';
import { 
	SearchBar
 } from 'antd-mobile';
import { Link } from 'react-router-dom';
import TopNavBar from './components/topNavBar';
import Footer from './components/footer';
import ListView from './components/listView';


const nowTimeStamp = Date.now();

const voteList = [
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'社区影院的名字评选'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'手表排行榜'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'最有诗意的天气'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'最普及的手机机型'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'社区影院的名字评选'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'手表排行榜'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'最有诗意的天气'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'最普及的手机机型'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'社区影院的名字评选'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'手表排行榜'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:false,title:'最有诗意的天气'},
	{initiator:'社区委员会',startDate:nowTimeStamp,endDate:nowTimeStamp,isVoted:true,title:'最普及的手机机型'},
];

const tabList = [
	{value:false,title:'待投表决'},
	{value:true,title:'已投表决'},
];



class VoteList extends Component {
  constructor(props) {  
    super(props);  
    this.state = { 
	  keyWords:'',
	  showVoted:false,
	  voteList:voteList,
	}
  }
  componentDidMount() {
	
  }

  setShowVoted = (value) =>{
    this.setState({
  	  showVoted:value,
    })
  }
  getVoteListByPageIndex(index){
	const {keyWords} = this.state;
	if(index === 3){
		return [];
	}
	return voteList.filter((vote) => vote.isVoted === this.state.showVoted && (vote.title.indexOf(keyWords) >= 0 || vote.initiator.indexOf(keyWords) >= 0));
  }
  formatDate(timeStamp,str){
	let date = new Date(timeStamp);
	return [
	  date.getFullYear(),
	  date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth(),
	  date.getDate() > 9 ? date.getDate() :'0' + date.getDate()
	].join(str);
  }
  renderHeightlightKeyWords(text,keyWords){
	return keyWords === '' ? text : text.split(keyWords).map((item,index) => {
	  return index === 0 ? item : <font key={'HeightlightKeyWords' + index}><font style={{color:'red'}}>{keyWords}</font>{item}</font>;
    })
  }
  render() {
    const {keyWords} = this.state;
    return (
	  <div>
		<TopNavBar title='投票表决' showRC/>
		<div className='mainBox'>
		  <div className='tabMenu'>
		    {tabList.map(item =>
			  <div key={item.value} onClick = {this.setShowVoted.bind(this,item.value)}>
			    <span className={item.value === this.state.showVoted?'tabActive':''}>
				  {item.title}
				</span>
			  </div>
			)}
		  </div>
		  <SearchBar
			placeholder='投票标题、发起人'
			value={keyWords}
			onChange={keyWords => {this.setState({keyWords})}}
		  />
		  <ListView
		    getListByPageIndex = {this.getVoteListByPageIndex.bind(this)}
		    style = {{top:100}}
		    className = 'listBox' 
		    data = {this.state.voteList.filter((vote) => vote.isVoted === this.state.showVoted && (vote.title.indexOf(keyWords) >= 0 || vote.initiator.indexOf(keyWords) >= 0))}
		    row ={(item,index) => 
		  	  <Link to={'/vote/page/'+index} key={'vote-item'+index}>
		  	    <div className='item'>
		  	  	  <strong>{this.renderHeightlightKeyWords(item.title,keyWords)}</strong>
		  	  	  <span>发起人：{this.renderHeightlightKeyWords(item.initiator,keyWords)}</span>
		  	  	  <span>&nbsp;</span>
		  	  	  <span>开始日期：{this.formatDate(item.startDate,'-')}</span>
		  	  	  <span>截止日期：{this.formatDate(item.endDate,'-')}</span>
		  	    </div>
		  	  </Link>
			}
		  />
		</div>

		
		<Footer pageIndex={2}/>
      </div>
    );
  }
}




export default VoteList;
