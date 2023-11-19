import { FC } from "react";
import ImageSlider from "../Slider";
import "./cardItem.scss";
import { Link } from "react-router-dom";
import { MainEstate } from "../../types/types";

import apartmentLogo from "../../assets/apartment.png";
import areaLogo from "../../assets/area.png";
import doorLogo from "../../assets/door.png";

const CardItem: FC<MainEstate> = (props) => {
  const {
    images,
    price,
    createdAt,
    street,
    totalFloor,
    currentFloor,
    rooms,
    area,
  } = props;

  const date = new Date(createdAt);
  const today = new Date();
  const timeDifference = Math.abs(today.getTime() - date.getTime());
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  let dateString;

  if (minutesDifference < 60) dateString = `${minutesDifference} minutes ago`;
  else if (hoursDifference < 24) dateString = `${hoursDifference} hours ago`;
  else if (hoursDifference < 48) dateString = "Yesterday";
  else dateString = `${daysDifference} days ago`;

  return (
    <div className="card_item">
      <div className="card_item--content">
        <div className="images">
          <ImageSlider images={images} />
        </div>
        <Link to={`/estate/${props._id}`} className="desc">
          <div className="desc--main">
            <p className="price">{price} AZN</p>
            <span>{dateString}</span>
          </div>
          <div className="desc--location">
            <p>{street}</p>
          </div>
          <div className="desc--footer">
            <div className="floor_info">
              <img src={apartmentLogo} alt="door" height={20} width={20} />
              <p>{`${currentFloor}/${totalFloor}`}</p>
            </div>
            <div className="room_info">
              <img src={doorLogo} alt="door" height={20} width={20} />
              <p>{rooms} rooms</p>
            </div>
            <div className="area_info">
              <img src={areaLogo} alt="door" height={20} width={20} />
              <p>
                {area}m<sup>2</sup>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
