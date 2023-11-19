import "./home.scss";
import Filter from "../../components/Filter";
import CardItem from "../../components/CardItem";
import { getEstatesAsync } from "../../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const estatesList = useAppSelector(
    (state) => state.products.estates.estatesList
  );
  const estatesLoading = useAppSelector(
    (state) => state.products.estates.loading
  );

  useEffect(() => {
    dispatch(getEstatesAsync());
  }, []);

  return (
    <div className="home_page">
      <Filter />
      <div className="products_list">
        <div className="container">
          <div
            style={{ height: estatesLoading ? "600px" : "auto" }}
            className="products_list--content"
          >
            {estatesLoading && <Loading />}
            {!estatesLoading &&
              estatesList.map((estate, index) => (
                <CardItem key={index} {...estate} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
