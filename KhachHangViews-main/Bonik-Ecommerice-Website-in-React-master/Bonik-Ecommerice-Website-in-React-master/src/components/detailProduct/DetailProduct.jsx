import ImageProduct from "./ImageProduct";
import InforProduct from "./InforProduct";
import "./style.css";
const DetailProduct = (props) => {
  const { id } = props.match.params;
  return (
    <>
      <p>{id}</p>
      <div className="container row mb-5 mt-5">
        <div className="col-6">
          {" "}
          <ImageProduct></ImageProduct>
        </div>
        <div className="col-6 ">
          {" "}
          <InforProduct id={id}></InforProduct>
        </div>
      </div>
    </>
  );
};
export default DetailProduct;
