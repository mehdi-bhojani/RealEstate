import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed,FaBath,FaParking,FaChair } from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <>
      {loading && (
        <p className="text-center my-20 text-2xl uppercase">Loading...</p>
      )}
      {error && (
        <p className="text-center my-20 text-2xl text-red-700">
          Something Went Wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{ background: `url(${url}) center no-repeat`,backgroundSize: 'cover',backgroundPosition: 'bottom' }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="details flex flex-col gap-3 p-5 my-7">
            <h1 className="text-2xl font-semibold ">{listing.name} - ${listing.regularPrice}/month</h1>
            <div className="flex items-center gap-2">
              <FaLocationDot/>  
              <p>{listing.address}</p>
            </div> 

            <div className="flex items-center gap-4 my-5">
              
              <span className="type p-3 bg-blue-300 text-white rounded-md px-10">{listing.type && listing.type==='rent'?  'For Rent':'For sale'}</span>
              {listing.offer &&  (<span className="discount p-3 bg-green-300 text-white rounded-md">{listing.offer? `Discount :  ${+listing.regularPrice - +listing.discountPrice} $` : ''}</span>)}
            </div>

            {listing.description?(
              <p className="text-slate-500 ">
              <b className='font-bold text-black'>Description - </b>
                {listing.description}</p>
            ): ''}

            <div className="flex item-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <FaBed />
                {listing.bedrooms}
                {listing.bedrooms>1?" beds": " bed"}
              </div>
              <div className="flex items-center gap-2">
                <FaBath />
                {listing.bathrooms}
                {listing.bathrooms>1?" baths": " bath"}
              </div>
              <div className="flex items-center gap-2">
                <FaParking />
                {listing.parking ? " Parking Spot": " No Parking"}
              </div>
              <div className="flex items-center gap-2">
                <FaBed />
                {listing.furnished ? " Furnished": " Not Furnished"}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
