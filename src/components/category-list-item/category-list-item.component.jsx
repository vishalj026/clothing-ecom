import "./category-list-item.styles.scss";

const CategoryListItem = (props) => {

  const { imageUrl, title } = props.category;

  return (
  <div className="category-list-container">
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
    <div className="category-body-container">
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
  </div>
  );
};

export default CategoryListItem;
