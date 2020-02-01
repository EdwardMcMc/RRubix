import React from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import ColorPicker from './components/ColorPicker'
import Button from './components/Button';

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

  Rotate(board,x,y,clockwise)
  {
    let topLeft=board[y-1][x-1]
    let top=board[y-1][x]
    let topRight=board[y-1][x+1]
    let right=board[y][x+1]
    let bottomRight=board[y+1][x+1]
    let bottom=board[y+1][x]
    let bottomLeft=board[y+1][x-1]
    let left=board[y][x-1]

    if(clockwise){
      board[y-1][x-1]=bottomLeft
      board[y+1][x-1]=bottomRight
      board[y+1][x+1]=topRight
      board[y-1][x+1]=topLeft

      board[y-1][x]=left
      board[y][x-1]=bottom
      board[y+1][x]=right
      board[y][x+1]=top

    }
    else{
      board[y-1][x-1]=bottomRight
      board[y+1][x-1]=bottomLeft
      board[y+1][x+1]=topLeft
      board[y-1][x+1]=topRight

      board[y-1][x]=right
      board[y][x-1]=top
      board[y+1][x]=left
      board[y][x+1]=bottom
    }

    return board
  }

  F=()=>{
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

    this.Rotate(newBoard,4,4,true)


    this.setState({board:newBoard})
  }

  async f(){
    await this.F();
    await this.F();
    this.F();
  } 

  U=()=>{
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

    this.Rotate(newBoard,4,1,true)
    for(let i=0;i<12;i++)
    {
      if(i<9){
        newBoard[3][i]=oldBoard[3][i+3]
      }
      else{
        newBoard[3][i]=oldBoard[3][i-9]
      }
    }
    
    this.setState({
      board:newBoard
    })
  }

  async u(){
    await this.U();
    await this.U();
    this.U();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          RRubix
        </header>
        <body className='App-body'>
          <table>
            <tbody>
              <tr className='boardAndButtons'>
                <td>
                  <Button function={this.F} text='F'/>
                  <Button function={this.f.bind(this)} text="F'"/>
                  <Button function={this.U} text='U'/>
                  <Button function={this.u.bind(this)} text="U'"/>
                </td>
                <td>
                <Board board={this.state.board}changeColor={this.changeColor}/>  
                </td>
              </tr>
            </tbody>
          </table>
          <ColorPicker selectedColor={this.state.selectedColor} setColor={this.setColor}/>
        </body>
      </div>
    );
  }

  
}

export default App;
