import React from 'react';
import { AnimatePresence,motion } from "framer-motion";

// const ErrorMessage =({isToggled,Children})=>{
//     return(
//         <AnimatePresence>
//             {isToggled&&(
//              <div>
//                  {Children}
//              </div>   

//             )}
//         </AnimatePresence>
//     )
// }
const ErrorMessage = ({ isVisible,ErrorMessage }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="errorMessage"
            key='1234'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
         {ErrorMessage}   
        </motion.div>
      )}
    </AnimatePresence>
)

// class ErrorMessage extends React.Component{




//   render(){
//       if(this.props.errorMessage!=='')
//       {
//         return (
//             <motion.div initial={{opacity:0}}animate={{opacity:1}} transition={{duration:0.5}}className="errorMessage">{this.props.errorMessage}</motion.div>
//           );
//       }
//       else
//       {
//           return(
//             <div className="ErrorSpace"></div>
//           );
//       }
 
//   }
// }





 export default ErrorMessage