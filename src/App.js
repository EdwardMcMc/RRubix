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
  CloneBoard=()=>{
    let newBoard=[[],[],[],[],[],[],[],[],[]]
    for(let y=0;y<9;y++)
    {
      for(let x=0;x<12;x++)
      {
        newBoard[y][x]=this.state.board[y][x]
      }
    }
    return newBoard
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
    let newBoard=this.CloneBoard();

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

  R=()=>{
    let oldBoard=this.state.board
    let newBoard=this.CloneBoard();
    this.Rotate(newBoard,7,4,true)
    for(let i=0;i<6;i++)
    {
      newBoard[i][5]=oldBoard[i+3][5]
    }
    newBoard[3][9]=oldBoard[2][5]
    newBoard[4][9]=oldBoard[1][5]
    newBoard[5][9]=oldBoard[0][5]

    newBoard[8][5]=oldBoard[3][9]
    newBoard[7][5]=oldBoard[4][9]
    newBoard[6][5]=oldBoard[5][9]
    this.setState({
      board:newBoard
    })
  }

  async r(){
    await this.R();
    await this.R();
    this.R();
  }

  U=()=>{
    let oldBoard=this.state.board
    let newBoard=this.CloneBoard();
    this.Rotate(newBoard,4,1,true);
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

  L=()=>{
    let newBoard=this.CloneBoard();
    let oldBoard=this.state.board
    this.Rotate(newBoard,1,4,true)
    for(let i=0;i<6;i++)
    {
      newBoard[i+3][3]=oldBoard[i][3]
    }
    for(let i=0;i<3;i++)
    {
      newBoard[i][3]=oldBoard[5-i][11]
    }
    for(let i=0;i<3;i++)
    {
      newBoard[5-i][11]=oldBoard[i+6][3]
    }
    this.setState({board:newBoard})
  }

  async l(){
    await this.L();
    await this.L();
    this.L();
  }

  B=()=>{
    let oldBoard=this.state.board
    let newBoard=this.CloneBoard();
    this.Rotate(newBoard,10,4,true)
    for(let i=0;i<3;i++){
      newBoard[0][i+3]=oldBoard[i+3][8]
    }
    for(let i=0;i<3;i++){
      newBoard[i+3][0]=oldBoard[0][5-i]
    }
    for(let i=0;i<3;i++){
      newBoard[8][i+3]=oldBoard[i+3][0]
    }
    for(let i=0;i<3;i++){
      newBoard[i+3][8]=oldBoard[8][5-i]
    }

    this.setState({board:newBoard})
  }

  async b(){
    await this.B();
    await this.B();
    this.B();
  }

  D=()=>{
    let oldBoard=this.state.board
    let newBoard=this.CloneBoard();
    this.Rotate(newBoard,4,7,true)
    for(let i=0;i<12;i++){
      if(i<3){
        newBoard[5][i]=oldBoard[5][i+9]
      }
      else{
        newBoard[5][i]=oldBoard[5][i-3]
      }
    }
    this.setState({board:newBoard})
  }

  async d(){
    await this.D();
    await this.D();
    this.D();
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
                  <table>
                    <tbody>
                      <tr>
                        <td className='buttonCell'>
                        <Button function={this.F} text='F'/>
                        <Button function={this.f.bind(this)} text="F'"/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button function={this.R} text='R'/>
                          <Button function={this.r.bind(this)} text="R'"/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <Button function={this.U} text='U'/>
                        <Button function={this.u.bind(this)} text="U'"/>
                        </td>          
                      </tr>
                      <tr>
                        <td>
                          <Button function={this.L} text='L'/>
                          <Button function={this.l.bind(this)} text="L'"/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button function={this.B} text='B'/>
                          <Button function={this.b.bind(this)} text="B'"/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Button function={this.D} text='D'/>
                          <Button function={this.d.bind(this)} text="D'"/>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                  
                  
                  
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
