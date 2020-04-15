
import React from 'react';
import { motion } from "framer-motion"


class Button extends React.Component{
  render(){
  return (
      <motion.div initial={{scale:0.8}} whileHover={{scale:0.99}} whileTap={{scale:0.8}} className={this.props.css!==undefined?this.props.css+'button':'button'} onClick={this.props.function}>{this.props.text}</motion.div>
  );
  }
}


  export default Button