"use client";
import { useEffect, useState } from "react";
import Pagination from "./component/pagination";
import { findAllCategory, findProducts } from "./controller/login";
import ProductCard from "./component/productCard";

const ProductsPage = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSearch, setIsSearch] = useState("");
  const findAllProducts = async (page) => {
    const response = await findProducts(
      page,
      itemsPerPage,
      selectedCategory,
      search
    );
    setProducts(response.res_data.rows);
    setTotalPages(Math.ceil(response.res_data.count / 10));
    return response;
  };

  const findCategory = async () => {
    const response = await findAllCategory();
    setCategoryOption(response.res_data);
    return response;
  };
  useEffect(() => {
    findAllProducts(currentPage);
    findCategory();
  }, []);

  const goToPage = (page) => {
    findAllProducts(page);
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      findAllProducts(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      findAllProducts(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    findAllProducts(1);
    setIsSearch(search);
    setSearch("");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCancleSearch = (e) => {
    findAllProducts(1);
    setIsSearch("");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center py-4 bg-gray-100 gap-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedCategory}
          onChange={handleOptionChange}
        >
          <option value="">ทั้งหมด</option>
          {categoryOption.map((option) => (
            <option key={option.id} value={option.id}>
              {option.category_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border rounded-md w-full md:w-1/2"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>ค้นหา</button>
      </div>

      <div className="bg-gray-200 py-8">
        {isSearch ? (
          <div className="container mx-auto px-4" onClick={handleCancleSearch}>
            <h1 className="font text-black mb-6">รายการค้นหา...{isSearch}</h1>
          </div>
        ) : (
          <></>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
