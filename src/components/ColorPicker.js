import React from 'react';
import Color from './Color'


class ColorPicker extends React.Component {
    render() { 
      return <div>
        <table>
          <tbody>
            <tr>
              <td><Color color={this.props.selectedColor==='w'?'w':'uw'} setColor={this.props.setColor}/></td>
              <td><Color color={this.props.selectedColor==='y'?'y':'uy'} setColor={this.props.setColor}/></td>
              <td><Color color={this.props.selectedColor==='g'?'g':'ug'} setColor={this.props.setColor}/></td>
              <td><Color color={this.props.selectedColor==='b'?'b':'ub'} setColor={this.props.setColor}/></td>
              <td><Color color={this.props.selectedColor==='r'?'r':'ur'} setColor={this.props.setColor}/></td>
              <td><Color color={this.props.selectedColor==='o'?'o':'uo'} setColor={this.props.setColor}/></td>
              </tr>
          </tbody>
        </table>
      </div>;
  }
}


export default ColorPicker;
