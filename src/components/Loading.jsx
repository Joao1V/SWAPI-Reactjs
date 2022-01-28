import {ClipLoader} from "react-spinners";

const LoadingSpinner = () => {
   return (
       <div style={{display:"flex", justifyContent:"center", alignItems:"center", width: "100%", height:"100vh"}}>
           <ClipLoader color={"#000000"} size={50} />
       </div>
   )
}

export default LoadingSpinner