import {SaberLoading} from "./index";

const SpinnerSaber = () => {

   return (
       <SaberLoading>
       <div id="loader">
          <div className="ls-particles ls-part-1"/>
          <div className="ls-particles ls-part-2"/>
          <div className="ls-particles ls-part-3"/>
          <div className="ls-particles ls-part-4"/>
          <div className="ls-particles ls-part-5"/>
          <div className="lightsaber ls-left ls-green"/>
          <div className="lightsaber ls-right ls-red"/>
       </div>
       </SaberLoading>
   )
}

export default SpinnerSaber

// <div style={{display:"flex", justifyContent:"center", alignItems:"center", width: "100%", height:"100vh"}}>
//     <ClipLoader color={"#000000"} size={50} />
// </div>