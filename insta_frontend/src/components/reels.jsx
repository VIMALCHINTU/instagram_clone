import { Navigate, NavLink } from "react-router-dom";
import { Auth,Authprovider } from "../Context/Auth";
import { useContext } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiRepost } from "react-icons/bi";
const reels = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 3,
    video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  },
  {
    id: 4,
    video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  },
  {
    id: 5,
    video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  },
  {
    id: 6,
    video: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
  },
  {
    id: 7,
    video: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
  },
];

const Reels = () => {
    const {user,logout}=useContext(Auth)
     if (!user) {
        return <Navigate to="/" />;
    }
  return (
    <div className="h-screen overflow-y-scroll ">
  {reels.map((reel) => (
    
    <div
      key={reel.id}
      className="h-screen w-full  flex items-center justify-center"
    >
      <video
        src={reel.video}
        className="h-full w-96 object-cover"
        autoPlay
        controls
        loop
        playsInline
      />
      <div  style={{color:"white",paddingLeft:"10px",marginTop:"320px"}}  >
        <div>
            <div style={{fontSize:"30px",marginBottom:"2px"}}  ><FcLike/></div>
            <p style={{marginLeft:"2px"}} >456</p>

        </div>
        <div>
            <div style={{fontSize:"27px", marginTop:"25px"}}   ><FaRegComment/></div>
            <div style={{marginLeft:"6px"}}>96</div>
        </div>
        <div style={{fontSize:"30px", marginTop:"25px"}}   ><RiTelegram2Line/></div>
            <div style={{fontSize:"30px", marginTop:"25px"}}   ><IoBookmarkOutline/></div>
            <div style={{fontSize:"30px", marginTop:"25px"}}   ><BiRepost/></div>

              <div style={{fontSize:"30px", marginTop:"25px"}}   ><HiOutlineDotsVertical/></div>
      </div>
    </div>
  ))}
</div>
  );
};

export default Reels;