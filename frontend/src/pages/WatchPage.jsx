import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useContentStore } from "../store/content";
import { useRef } from "react";
import { Navbar } from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import { WatchPageSkeleton } from "../components/WatchPageSkeleton";

export const WatchPage = () => {
  const { id } = useParams();
  const { contentType } = useContentStore();
  const [trailers, setTrailers] = useState([]);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.results);
      } catch (error) {
        if (error.message.includes("404")) setTrailers([]);
      }
    };
    getTrailers();
  }, [id, contentType]);

  useEffect(() => {
    const getContentSimilar = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.results);
      } catch (error) {
        if (error.message.includes("404")) setSimilarContent([]);
      }
    };
    getContentSimilar();
  }, [id, contentType]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.results);
      } catch (error) {
        if (error.message.includes("404")) setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [id, contentType]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content)
    return (
      <div className="h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="h-full mx-auto px-4 py-8 mt-40 text-center">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥{" "}
            </h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container h-full mx-auto px-4 py-8">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <button
              className={`
                        bg-gray-500/70 hover:bg-gary-500 text-white py-2 px-4 rounded ${
                          currentTrailerIdx === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`
                        bg-gray-500/70 hover:bg-gary-500 text-white py-2 px-4 rounded ${
                          currentTrailerIdx === trailers.length - 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 sm:mb-10 md:mb-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto rounded-lg overflow-hidden"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl text-balance font-bold">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div className="max-w-5xl mx-auto mt-12 relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    to={`/watch/${content.id}`}
                    key={content.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster image"
                      className="w-full h-[250px] rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content?.title || content?.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
