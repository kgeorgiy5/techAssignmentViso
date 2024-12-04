import {ICategory} from "../../types.ts";
import {FC} from "react";
import Button from "../Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../../reducers/filterReducer.ts";
import {RootState} from "../../store.ts";

interface CategoryButtonProps {
    category: ICategory;
}

const CategoryButton:FC<CategoryButtonProps> = ({category}) => {
    const dispatch = useDispatch();
    const currentCategory = useSelector((state:RootState) => state.filter.category);

    const handleClick = () => {
        dispatch(setCategory(category.strCategory));
    }

    return(
        <Button disabled={currentCategory === category.strCategory} onClick={handleClick}>
            <img src={category.strCategoryThumb} alt={category.strCategory} className="aspect-square object-cover"/>
            {category.strCategory}
        </Button>
    )
};

export default CategoryButton;