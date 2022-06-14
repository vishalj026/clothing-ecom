import { useNavigate } from "react-router-dom";
import { CategoryListContainer, Body, BackgroundImage} from "./category-list-item.styles";

const CategoryListItem = (props) => {
  const navigate = useNavigate();
  const { imageUrl, title, route } = props.category;

  const onNavigateHandler = () => navigate(route);
  return (
  <CategoryListContainer onClick={onNavigateHandler}>
    <BackgroundImage imageUrl={imageUrl} />
    <Body>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </Body>
  </CategoryListContainer>
  );
};

export default CategoryListItem;
