import about from "../Model/aboutText.json";

export default function About(){
    return(
          <>
        <br></br><br></br>
        <h2 className="text-pink-400">About us</h2>
            <br></br>
        <div className="aboutUs">
            <h3 className="text-center text-pink-500 text-2xl">{about.par1}</h3>
            <br></br><br></br>
            <div className="w-[40vw] mx-auto">
                <h4>{about.par2}</h4>
                <br></br><br></br>
                <h4>{about.par3}</h4>
                <br></br><br></br>
                <h4>{about.par4}</h4>
                <br></br>
                <h4>{about.par5}</h4>
            </div>

        </div>
        </>
    )
    }