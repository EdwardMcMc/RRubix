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
    let newBoard=this.state.board
    newBoard[y][x]=this.state.selectedColor
    this.setState({board:newBoard})
  }

  setColor =(setColor) =>{
    if(setColor!==undefined)
    {
      this.setState({selectedColor:setColor})
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
    await this.F();
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
    await this.R();
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
    await this.U();
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
    await this.L();
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
    await this.B();
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
    await this.D();
  }

  async Solve(){
    await this.whitecross();
    await this.whiteCorners();
  }

  async whitecross(){
    let sideChecked=false
    let sequence=''

    //move white side pieces that are oriented wrong
      if(this.state.board[2][4]==='w'||(this.state.board[3][4]==='w'&&this.state.board[2][4]!=='g')){
        await this.U();sequence+='U';
        await this.U();sequence+='U';
      }
      if(this.state.board[4][6]==='w'||(this.state.board[4][5]==='w'&&this.state.board[4][6]!=='o')){
        await this.R();sequence+='R';
        await this.R();sequence+='R';
      }
      if(this.state.board[6][4]==='w'||(this.state.board[5][4]==='w'&&this.state.board[6][4]!=='b')){
        await this.D();sequence+='D';
        await this.D();sequence+='D';
      }
      if(this.state.board[4][2]==='w'||(this.state.board[4][3]==='w'&&this.state.board[4][2]!=='r')){
        await this.L();sequence+='L';
        await this.L();sequence+='L';
      }
    
    //move white pices from rear side that aref rear side
    sideChecked=false;
    while(!sideChecked)
    {

      if( this.state.board[4][9]==='w'|| this.state.board[3][10]==='w'|| this.state.board[4][11]==='w'|| this.state.board[5][10]==='w'){
        if( this.state.board[4][9]==='w'&& this.state.board[4][8]==='o')
        {
            await this.R(); sequence+='R';
            await this.R(); sequence+='R';
        }
        else if( this.state.board[3][10]==='w'&& this.state.board[0][4]==='g')
        {
          await this.U(); sequence+='U';
          await this.U(); sequence+='U';
        }
        else if( this.state.board[4][11]==='w'&& this.state.board[4][0]==='r'){
          await this.L(); sequence+='L';
          await this.L(); sequence+='L';
        }
        else if( this.state.board[5][10]==='w'&& this.state.board[8][4]==='b')
        {
          await this.D(); sequence+='D';
          await this.D(); sequence+='D';
        }
        else{
          await this.B(); sequence+='B';
        }
      }

    //checking rear side for white pieces facing non-rear sides
      else if( this.state.board[4][8]==='w'|| this.state.board[0][4]==='w'|| this.state.board[4][0]==='w'|| this.state.board[8][4]==='w'){
        if(this.state.board[4][8]==='w'&&this.state.board[4][9]==='b')
        {
          await this.R(); sequence+='R';
          await this.d(); sequence+='d';
          await this.r(); sequence+='r';
        }
        else if(this.state.board[0][4]==='w'&&this.state.board[3][10]==='o')
        {
          await this.U(); sequence+='U';
          await this.r(); sequence+='r';
          await this.u(); sequence+='u';
        }
        else if(this.state.board[4][0]==='w'&&this.state.board[4][11]==='g')
        {
          await this.L(); sequence+='L';
          await this.u(); sequence+='u';
          await this.l(); sequence+='l';
        }
        else if(this.state.board[8][4]==='w'&&this.state.board[5][10]==='r')
        {
          await this.D(); sequence+='D';
          await this.l(); sequence+='l';
          await this.d(); sequence+='d';
        }
        else{
          await this.B(); sequence+='B';
        }
      }
      else if( this.state.board[1][3]==='w'||this.state.board[1][5]==='w'|| this.state.board[3][7]==='w'||this.state.board[5][7]==='w'|| this.state.board[7][5]==='w'||this.state.board[7][3]==='w'|| this.state.board[5][1]==='w'||this.state.board[3][1]==='w'){
        //moving pieces from non rear side to rear side
        if(this.state.board[1][5]==='w'||this.state.board[3][7]==='w'){
          await this.R();sequence+='R';
          await this.B();sequence+='B';
          await this.r();sequence+='r';
        }
         else if(this.state.board[5][7]==='w'||this.state.board[7][5]==='w'){
          await this.D();sequence+='D';
          await this.B();sequence+='B';
          await this.d();sequence+='d';
        }
        else if(this.state.board[7][3]==='w'||this.state.board[5][1]==='w'){
          await this.L();sequence+='L';
          await this.B();sequence+='B';
          await this.l();sequence+='l';
        }
        else if(this.state.board[3][1]==='w'||this.state.board[1][3]==='w'){
          await this.U();sequence+='U';
          await this.B();sequence+='B';
          await this.u();sequence+='u';
        } 
      }
      else{
        sideChecked=true;
      }
    }
    // if(this.opstimiseSequence(sequence)===sequence){
    //   console.log("Optimized: "+sequence);
    // }
    // else{
    //   if(sequence!==''){
    //     console.log(sequence)
    //     console.log("Optimized: "+this.opstimiseSequence(sequence));
    //   }
    // }
    console.log(sequence);
  }

async whiteCorners(){
  let sideChecked=false;
  let sequence='';
  
  while(!sideChecked){
    //moving white corners that are incorectly oriented to rear side
    if((this.state.board[3][2]==='w'||this.state.board[2][3]==='w')||(this.state.board[3][3]==='w'&&this.state.board[2][3]!=='g')){
      await this.l(); sequence+='l';
      await this.B(); sequence+='B';
      await this.L(); sequence+='L';
      await this.B(); sequence+='B';
    }
    else if((this.state.board[2][5]==='w'||this.state.board[3][6]==='w')||(this.state.board[3][5]==='w'&&this.state.board[2][5]!=='g')){
      await this.u(); sequence+='u';
      await this.B(); sequence+='B';
      await this.U(); sequence+='U';
      await this.B(); sequence+='B';
    }
    else if((this.state.board[5][6]==='w'||this.state.board[6][5]==='w')||(this.state.board[5][5]==='w'&&this.state.board[6][5]!=='b')){
      await this.r(); sequence+='r';
      await this.B(); sequence+='B';
      await this.R(); sequence+='R';
      await this.B(); sequence+='B';
    }
    else if((this.state.board[6][3]==='w'||this.state.board[5][2]==='w')||(this.state.board[5][3]==='w'&&this.state.board[6][3]!=='b')){
      await this.d(); sequence+='d';
      await this.B(); sequence+='B';
      await this.D(); sequence+='D';
      await this.B(); sequence+='B';
    }
    else{
      sideChecked=true;
    }
  }

  
  sideChecked=false;
  while(!sideChecked){
    //moving white corner pieces facing rear into place
    if(this.state.board[3][9]==='w'||this.state.board[3][11]==='w'||this.state.board[5][9]==='w'||this.state.board[5][11]==='w'){
      if(this.state.board[3][11]==='w'&&this.state.board[3][0]==='g'){
        await this.l();sequence+='l';
        await this.B();sequence+='B';
        await this.B();sequence+='B';
        await this.L();sequence+='L';
        await this.B();sequence+='B';
        await this.l();sequence+='l';
        await this.b();sequence+='b';
        await this.L();sequence+='L';
      }
      else if(this.state.board[3][9]==='w'&&this.state.board[0][5]==='o'){
        await this.u();sequence+='u';
        await this.B();sequence+='B';
        await this.B();sequence+='B';
        await this.U();sequence+='U';
        await this.B();sequence+='B';
        await this.u();sequence+='u';
        await this.b();sequence+='b';
        await this.U();sequence+='U';
      }
      else if(this.state.board[5][9]==='w'&&this.state.board[5][8]==='b'){
        await this.r();sequence+='r';
        await this.B();sequence+='B';
        await this.B();sequence+='B';
        await this.R();sequence+='R';
        await this.B();sequence+='B';
        await this.r();sequence+='r';
        await this.b();sequence+='b';
        await this.R();sequence+='R';
      }
      else if(this.state.board[5][11]==='w'&&this.state.board[8][3]==='r'){
        await this.d();sequence+='d';
        await this.B();sequence+='B';
        await this.B();sequence+='B';
        await this.D();sequence+='D';
        await this.B();sequence+='B';
        await this.d();sequence+='d';
        await this.b();sequence+='b';
        await this.D();sequence+='D';
      }
      else{
        await this.B(); sequence+='B';
      }
    }
    // moving 1st half of side facing corner pieces into place
    else if(this.state.board[3][0]==='w'||this.state.board[0][5]==='w'||this.state.board[5][8]==='w'||this.state.board[8][3]==='w'){
      if(this.state.board[3][0]==='w'&&this.state.board[0][3]==='g')
      {
        await this.l();sequence+='l';
        await this.b();sequence+='b';
        await this.L();sequence+='L';
      }
      else if(this.state.board[0][5]==='w'&&this.state.board[3][8]==='o')
      {
        await this.u();sequence+='u';
        await this.b();sequence+='b';
        await this.U();sequence+='U';
      }
      else if(this.state.board[5][8]==='w'&&this.state.board[8][5]==='b')
      {
        await this.r();sequence+='r';
        await this.b();sequence+='b';
        await this.R();sequence+='R';
      }
      else if(this.state.board[8][3]==='w'&&this.state.board[5][0]==='r')
      {
        await this.d();sequence+='d';
        await this.b();sequence+='b';
        await this.D();sequence+='D';
      }
      else{
        await this.B();sequence+='B'
      }
    }
    //moving 2nd half of side facing corner pieces into place
    else if(this.state.board[0][3]==='w'||this.state.board[3][8]==='w'||this.state.board[8][5]==='w'||this.state.board[5][0]==='w'){
      if(this.state.board[0][3]==='w'&&this.state.board[3][0]==='r')
      {
        await this.U();sequence+='U';
        await this.B();sequence+='B';
        await this.u();sequence+='u';
      }
      else if(this.state.board[3][8]==='w'&&this.state.board[0][5]==='g')
      {
        await this.R();sequence+='R';
        await this.B();sequence+='B';
        await this.r();sequence+='r';
      }
      else if(this.state.board[8][5]==='w'&&this.state.board[5][8]==='o')
      {
        await this.D();sequence+='D';
        await this.B();sequence+='B';
        await this.d();sequence+='d';
      }
      else if(this.state.board[5][0]==='w'&&this.state.board[8][3]==='b')
      {
        await this.L();sequence+='L';
        await this.B();sequence+='B';
        await this.l();sequence+='l';
      }

      else{
        await this.B();sequence+='B'
      }
    }
    else{
      sideChecked=true;
    }
  }

 

  // if(this.opstimiseSequence(sequence)===sequence){
  //   console.log("Optimized: "+sequence);
  // }
  // else{
  //   if(sequence!==''){
  //     console.log(sequence)
  //     console.log("Optimized: "+this.opstimiseSequence(sequence));
  //   }
  // }
  console.log(sequence);

  
}




  // 3 moves in a row is the same as that move backwards
  // one move then another in the opposite direction is the same as no movement
  // this function replaces 3 moves with 1 move and removes useless moves 
  opstimiseSequence(seq){
    for(let i=0;i<seq.length;i++)
    {
      if(seq[i]===seq[i].toUpperCase())
      {
        //i uppercase
        if(seq[i+1]!==undefined){
          if(seq[i+1]===seq[i]){
            //i & i+1 uppercase
            if(seq[i+2]!==undefined&&seq[i]===seq[i+2]){
            //3 in a row
              seq=seq.slice(0,i-1)+seq[i].toLowerCase()+seq.slice(i+3,seq.length)
            }
          }
          else if(seq[i+1]===seq[i].toLowerCase()){
            //i uppercase i+1 lowercase
            seq=seq.slice(0,i)+seq.slice(i+2,seq.length);
          }         
        }
      }
      else{
        //i lower case
        if(seq[i+1]!==undefined){
          if(seq[i+1]===seq[i]){
            //i & i+1 lowercase
            if(seq[i+2]!==undefined&&seq[i]===seq[i+2]){
            //3 in a row
              seq=seq.slice(0,i-1)+seq[i].toUpperCase()+seq.slice(i+3,seq.length)
            }
          }
          else if(seq[i+1]===seq[i].toUpperCase()){
            //i lowercase i+1 uppercase
            seq=seq.slice(0,i)+seq.slice(i+2,seq.length);
          }         
        }
      }

    }
    return seq;
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          RRubix
          <div className='Sub-App-Header'>
            RRubix is still in development, sit tight!
          </div>
        </header>
        <div className='App-body'>
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
                        <td className='buttonCell'>
                          <Button function={this.R} text='R'/>
                          <Button function={this.r.bind(this)} text="R'"/>
                        </td>
                      </tr>
                      <tr>
                        <td className='buttonCell'>
                        <Button function={this.U} text='U'/>
                        <Button function={this.u.bind(this)} text="U'"/>
                        </td>          
                      </tr>
                      <tr>
                        <td className='buttonCell'>
                          <Button function={this.L} text='L'/>
                          <Button function={this.l.bind(this)} text="L'"/>
                        </td>
                      </tr>
                      <tr>
                        <td className='buttonCell'>
                          <Button function={this.B} text='B'/>
                          <Button function={this.b.bind(this)} text="B'"/>
                        </td>
                      </tr>
                      <tr>
                        <td className='buttonCell'>
                          <Button function={this.D} text='D'/>
                          <Button function={this.d.bind(this)} text="D'"/>
                        </td>
                      </tr>
                      <tr><td colSpan='2'><Button function={this.Solve.bind(this)} text='Solve' solve='solve'/></td></tr>
                      
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
        </div>
      </div>
    );
  }

  
}

export default App;
