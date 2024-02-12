import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Contact({listing}) {
  const [landlord, setLandlord] = useState(null); // Initialize landlord as null
  const [message, setMesssage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  
  const onChange = (e) => {
    setMesssage(e.target.value);    
  }
  // Conditionally render landlord.name if landlord exists
  return (
    <div className="flex flex-col gap-2">
        {landlord && (
          <>
          <p>Contact <span className="font-semibold capitalize">{landlord.userName}</span> for <span className="font-semibold lowercase">{listing.name}</span> </p>
          <textarea onChange={onChange} className="bg-slate-100 w-full border-none outline-none p-3" placeholder="Send your message here" name="message" id="message" value={message} rows="5"></textarea>
          <Link className="p-3 text-center text-white bg-slate-600 hover:opacity-85" to={`mailto:${landlord.email}?subject=regarding ${listing.name}&body=${message}`} >Send Message</Link>
          </>
        )}
    </div>
  )
}

export default Contact
