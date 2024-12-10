import React from "react";
import './CategoryMenu.css';

interface CategoryMenuProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onCategorySelect: (category: string) => void;
  onBackToCategories: () => void;
  setSelectedSubCategory: (subCategory: string | null) => void;
}

const categories: Record<
  "Tops" | "Bottoms" | "Shoes",
  Record<string, { name: string; image: string }[]>
> = {
  Tops: {
    TShirts: [
      { name: "Red T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_17_465751_3x4.jpg?width=400" },
      { name: "Blue T-Shirt", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/465751/item/goods_61_465751_3x4.jpg?width=400" },
    ],
    Hoodies: [
      { name: "Grey Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/475855/sub/goods_475855_sub14_3x4.jpg?width=400" },
      { name: "Black Hoodie", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/456261/item/goods_09_456261_3x4.jpg?width=400" },
    ],
  },
  Bottoms: {
    Jeans: [
      { name: "Blue Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464744/item/goods_64_464744_3x4.jpg?width=400" },
      { name: "Black Jeans", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/471374/sub/goods_471374_sub14_3x4.jpg?width=400" },
    ],
    Shorts: [
      { name: "Denim Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464945001/sub/goods_464945001_sub14_3x4.jpg?width=400" },
      { name: "Khaki Shorts", image: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/467052/item/goods_33_467052_3x4.jpg?width=400" },
    ],
  },
  Shoes: {
    Sneakers: [
      { name: "White Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/340740/3407401060_zm.jpg" },
      { name: "Black Sneakers", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/190032/1900327270_zm.jpg" },
    ],
    Boots: [
      { name: "Brown Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/149501/1495016020_zm.jpg" },
      { name: "Black Boots", image: "https://d2ob0iztsaxy5v.cloudfront.net/product/141179/1411797060_zm.jpg" },
    ],
  },
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onBackToCategories,
  setSelectedSubCategory,
}) => {
  const renderMainCategories = () => (
    <div className="category-menu">
      <h2>Select a Category</h2>
      <ul>
        {Object.keys(categories).map((category) => (
          <li key={category}>
            <button
              className="menu-item"
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSubCategories = () => (
    <div className="category-menu">
      <h2>{selectedCategory} Subcategories</h2>
      <button
        className="menu-item"
        onClick={onBackToCategories}
      >
        Back to Categories
      </button>
      <ul>
        {Object.keys(categories[selectedCategory as "Tops" | "Bottoms" | "Shoes"]).map(
          (subCategory) => (
            <li key={subCategory}>
              <button
                className="menu-item"
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                {subCategory}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );

  const renderItems = () => (
    <div className="category-menu">
      <h2>{selectedSubCategory} Items</h2>
      <button
        className="menu-item"
        onClick={() => setSelectedSubCategory(null)}
      >
        Back to {selectedCategory}
      </button>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {categories[selectedCategory as "Tops" | "Bottoms" | "Shoes"][
          selectedSubCategory!
        ].map((item) => (
          <li key={item.name} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="item-image"
            />
            <p className="item-name">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="category-menu">
      {selectedCategory ? (
        selectedSubCategory ? (
          renderItems()
        ) : (
          renderSubCategories()
        )
      ) : (
        renderMainCategories()
      )}
    </div>
  );
};

export default CategoryMenu;
