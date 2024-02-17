import { useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import { WeatherContext } from "./context";

// background images
import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/snow.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

function getBackgroundImage(climate) {
  switch (climate) {
    case "Rain":
      return RainyDayImage;
    case "Clouds":
      return ScatterdCloudsImage;
    case "Clear":
      return ClearSkyImage;
    case "Snow":
      return SnowImage;
    case "Thunder":
      return ThunderStormImage;
    case "Fog":
      return WinterImage;
    case "Haze":
      return FewCloudsImage;
    case "Mist":
      return MistImage;
    default:
      return ClearSkyImage;
  }
}

export default function Page() {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");

  useEffect(() => {
    const bgImage = getBackgroundImage(weatherData.climate);
    setClimateImage(bgImage);
  }, [weatherData.climate]);

  return (
    <>
      {loading.state ? (
        <div className="flex bg-gray-200 rounded-md w-96 mt-14 mx-auto p-6">
          <p className="text-center text-3xl text-black">{loading.message}</p>
        </div>
      ) : (
        <div
          className="grid place-items-center h-screen bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('${climateImage}')`,
          }}
        >
          <Header />
          <main>
            <WeatherBoard />
          </main>
        </div>
      )}
    </>
  );
}
