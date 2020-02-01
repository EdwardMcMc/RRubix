import React from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import ColorPicker from './components/ColorPicker'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      board:[
        [null,null,null,'g' ,'g' ,'g' ,null,null,null,null,null,null],
        [null,null,null,'g' ,'g' ,'g' ,null,null,null,null,null,null],
        [null,null,null,'g' ,'g' ,'g' ,null,null,null,null,null,null],
    
        ['r' ,'r' ,'r' ,'w' ,'w' ,'w' ,'o' ,'o' ,'o' ,'y' ,'y' ,'y' ],
        ['r' ,'r' ,'r' ,'w' ,'w' ,'w' ,'o' ,'o' ,'o' ,'y' ,'y' ,'y' ],
        ['r' ,'r' ,'r' ,'w' ,'w' ,'w' ,'o' ,'o' ,'o' ,'y' ,'y' ,'y' ],
    
        [null,null,null,'b' ,'b' ,'b' ,null,null,null,null,null,null],
        [null,null,null,'b' ,'b' ,'b' ,null,null,null,null,null,null],
        [null,null,null,'b' ,'b' ,'b' ,null,null,null,null,null,null],
      ],
      selectedColor:'w',
    }
  }

  

  F=(Board)=>{
    let oldBoard=this.state.board

    //cloning board (not as a reference)
    let newBoard=[[],[],[],[],[],[],[],[],[]]
    for(let y=0;y<9;y++)
    {
      for(let x=0;x<12;x++)
      {
        newBoard[y][x]=oldBoard[y][x]
      }
    }

    newBoard[2][3]=oldBoard[5][2]
    newBoard[2][4]=oldBoard[4][2]
    newBoard[2][5]=oldBoard[3][2]

    newBoard[3][2]=oldBoard[6][3]
    newBoard[4][2]=oldBoard[6][4]
    newBoard[5][2]=oldBoard[6][5]

    newBoard[6][3]=oldBoard[5][6]
    newBoard[6][4]=oldBoard[4][6]
    newBoard[6][5]=oldBoard[3][6]

    newBoard[5][6]=oldBoard[2][5]
    newBoard[4][6]=oldBoard[2][4]
    newBoard[3][6]=oldBoard[2][3]

    newBoard[3][3]=oldBoard[5][3]
    newBoard[4][3]=oldBoard[5][4]
    newBoard[5][3]=oldBoard[5][5]
    newBoard[5][4]=oldBoard[4][5]
    newBoard[5][5]=oldBoard[3][5]
    newBoard[4][5]=oldBoard[3][4]
    newBoard[3][5]=oldBoard[3][3]
    newBoard[3][4]=oldBoard[4][3]


    this.setState({board:newBoard})
  }

  async f(){
    await this.F();
    await this.F();
    this.F();
  } 

  changeColor = (x,y) => {
    console.log('change color')
    let newBoard=this.state.board
    console.log('newboard')
    newBoard[y][x]=this.state.selectedColor
    this.setState({board:newBoard})
    console.log('stateset');
  }

  setColor =(setColor) =>{
    if(setColor!==undefined)
    {
      this.setState({selectedColor:setColor})
    console.log('set:'+setColor+'selec:'+this.state.selectedColor)
    }
    
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>RRubix</h1>
          
        </header>
        <body clgitssName='App-body'>
        <Board board={this.state.board}changeColor={this.changeColor}/>
          <ColorPicker selectedColor={this.state.selectedColor} setColor={this.setColor}/>
          {/* <button onClick={this.F()}>F</button> */}
          <button onClick={this.F}>F</button>
          <button onClick={this.f.bind(this)}>f</button>
        </body>
      </div>
    );
  }

  
}

export default App;
