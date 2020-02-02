
import React from 'react';
import { motion } from "framer-motion"


class Button extends React.Component{
  render(){
  return (
      <motion.div initial={{scale:0.9}} whileHover={{scale:1}} whileTap={{scale:0.8}} className={'button'} onClick={this.props.function}>{this.props.text}</motion.div>
  );
  }
}


  export default Button