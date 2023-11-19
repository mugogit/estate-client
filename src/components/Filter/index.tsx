import React, { useState, FC, useRef, useEffect, useReducer } from "react";
import "./filter.scss";
import SelectBox from "../SelectBox";
import { arrow } from "../../constants/svgs";
import { FilterState, PriceRange } from "../../types/types";

import searchLogo from "../../assets/search.png";
import { useAppDispatch } from "../../redux/store";
import { getEstatesAsync } from "../../redux/productsSlice";

const initialState: FilterState = {
  price: {
    minPrice: 0,
    maxPrice: 500000,
  },
  roomCount: [],
  title: "",
};

const roomFilterStates = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5+", value: 5 },
];

const priceGap = 30000;
const totalMaxPrice = 500000;
const totalMinPrice = 0;

type PriceFilterPopupProps = PriceRange & {
  setShow: () => void;
  onChange: (payload: PriceRange) => void;
};

const PriceFilterPopup: FC<PriceFilterPopupProps> = (props) => {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: props.minPrice,
    maxPrice: props.maxPrice,
  });

  const rangeRef = useRef<HTMLDivElement | null>(null);

  const minChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (priceRange.maxPrice - value <= priceGap) {
      setPriceRange({
        ...priceRange,
        minPrice: priceRange.maxPrice - priceGap,
      });
    } else {
      setPriceRange({
        ...priceRange,
        minPrice: value,
      });
    }
  };
  const maxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value - priceRange.minPrice <= priceGap) {
      setPriceRange({
        ...priceRange,
        maxPrice: priceRange.minPrice + priceGap,
      });
    } else {
      setPriceRange({
        ...priceRange,
        maxPrice: value,
      });
    }
  };

  const renderProgress = () => {
    if (rangeRef.current) {
      const rightValue = 100 - (priceRange.maxPrice / totalMaxPrice) * 100;
      const leftValue = (priceRange.minPrice / totalMaxPrice) * 100;

      rangeRef.current.style.right = `${rightValue}%`;
      rangeRef.current.style.left = `${leftValue}%`;
    }
  };

  const clearPriceRange = () => {
    setPriceRange({
      minPrice: props.minPrice,
      maxPrice: props.maxPrice,
    });
    props.setShow();
  };

  useEffect(() => {
    renderProgress();
    props.onChange(priceRange);
  }, [priceRange]);

  return (
    <div className="price-dropdown filter-dropdown-popup">
      <div onMouseDown={props.setShow} className="overlay"></div>
      <div className="content">
        <div className="prices">
          <p className="min-price">
            <span>$</span>
            {priceRange.minPrice}
          </p>
          <p className="max-price">
            <span>$</span>
            {priceRange.maxPrice}
          </p>
        </div>
        <div className="prices-range">
          <div className="slider">
            <div ref={rangeRef} className="progress"></div>
          </div>

          <div className="range-input">
            <input
              type="range"
              className="range-min"
              min={totalMinPrice}
              max={totalMaxPrice}
              value={priceRange.minPrice}
              onChange={minChangeHandler}
              step="100"
            />
            <input
              type="range"
              className="range-max"
              min={totalMinPrice}
              max={totalMaxPrice}
              value={priceRange.maxPrice}
              onChange={maxChangeHandler}
              step="100"
            />
          </div>
        </div>
        <div className="actions">
          <button type="button" onClick={clearPriceRange} className="clear">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

type RoomFilterPopupProps = {
  setShow: () => void;
  onChange: (payload: number[]) => void;
};
const RoomFilterPopup: FC<RoomFilterPopupProps> = ({ setShow, onChange }) => {
  const [roomCount, setRoomCount] = useState<number[]>([]);

  const toggleRoom = (room: number) => {
    if (roomCount.includes(room)) {
      setRoomCount(roomCount.filter((r) => r !== room));
    } else setRoomCount([...roomCount, room]);
  };

  const clearRoomCount = () => {
    setRoomCount([]);
    setShow();
  };

  useEffect(() => {
    onChange(roomCount);
  }, [roomCount]);

  return (
    <div className="room-dropdown filter-dropdown-popup">
      <div onMouseDown={setShow} className="overlay"></div>
      <div className="content">
        <div className="options">
          {roomFilterStates.map((room) => (
            <button
              key={room.name}
              className="option"
              data-active={roomCount.includes(room.value)}
              onClick={() => toggleRoom(room.value)}
              type="button"
            >
              {room.name}
            </button>
          ))}
        </div>
        <div className="actions">
          <button type="button" onClick={clearRoomCount} className="clear">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

const Filter = () => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showRoomFilter, setShowRoomFilter] = useState(false);

  const dispatch = useAppDispatch();

  const [filterState, setFilterState] = useState<FilterState>(initialState);

  const priceRangeChangeHandler = (payload: PriceRange) => {
    setFilterState({ ...filterState, price: payload });
  };

  const roomCountChangeHandler = (payload: number[]) => {
    setFilterState({ ...filterState, roomCount: payload });
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({ ...filterState, title: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getEstatesAsync(filterState));
  };
  return (
    <div className="filter">
      <div className="container">
        <form onSubmit={submitHandler} className="filter--content">
          <div className="filter--content__simple">
            <SelectBox
              onChange={(option: string) => console.log(option)}
              options={[
                { value: "1", label: "For Rent" },
                { value: "2", label: "For Sale" },
              ]}
            />
            <input
              type="text"
              placeholder="Place, Neighborhood, School or Ag..."
              value={filterState.title}
              onChange={titleChangeHandler}
            />
          </div>
          <div
            className="filter--content__dropdown"
            data-active={showPriceFilter}
          >
            <button
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              data-active={showPriceFilter}
              className="filter-dropdown-btn"
              type="button"
            >
              <span>Price</span>
              {arrow}
            </button>

            <PriceFilterPopup
              data-active={showPriceFilter}
              maxPrice={totalMaxPrice}
              minPrice={totalMinPrice}
              onChange={priceRangeChangeHandler}
              setShow={() => setShowPriceFilter(!showPriceFilter)}
            />
          </div>
          <div
            className="filter--content__dropdown"
            data-active={showRoomFilter}
          >
            <button
              onClick={() => setShowRoomFilter(!showRoomFilter)}
              data-active={showRoomFilter}
              type="button"
              className="filter-dropdown-btn"
            >
              <span>Rooms</span>
              {arrow}
            </button>
            <RoomFilterPopup
              onChange={roomCountChangeHandler}
              setShow={() => setShowRoomFilter(!showRoomFilter)}
            />
          </div>
          <button className="submit_btn" type="submit">
            <img src={searchLogo} alt="Search" />
            <span>Axtar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
