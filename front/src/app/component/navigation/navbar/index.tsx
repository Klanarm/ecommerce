"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import useStore from "@/app/hook/useStore";
import { uploadImage } from "@/app/controller/upload";
import { addItem, getCategory } from "@/app/controller/admin";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { accInfo, setAccInfo, auth, setAuth } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addItemForm, setAddItemForm] = useState({
    name: "",
    category: "",
    quantity: "",
    cost: "",
    image: null,
  });
  useEffect(() => {
    const token = accInfo.info;
    setIsLoggedIn(!!token);
  }, [accInfo]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuth({ token: null });
    setAccInfo({ info: null });
  };

  const handleCategorySelect = (categoryName) => {
    setAddItemForm((prevForm) => ({
      ...prevForm,
      category: categoryName,
    }));
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddItemForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    const filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const response = await uploadImage(file);
    setAddItemForm((prevForm) => ({
      ...prevForm,
      image: response.res_data,
    }));
  };

  const handleSubmit = async () => {
    const response = await addItem(addItemForm);
    setAddItemForm({
      name: "",
      category: "",
      quantity: "",
      cost: "",
      image: null,
    });
    setIsModalOpen(false);
    setShowSuggestions(false);
    window.location.reload();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSeachCategory = async () => {
    const response = await getCategory();
    setShowSuggestions(true);
    setFilteredCategories(response.res_data);
    setCategories(response.res_data);
  };

  const onCloseModal = () => {
    setAddItemForm({
      name: "",
      category: "",
      quantity: "",
      cost: "",
      image: null,
    });
    setShowSuggestions(false);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full h-12 bg-gray-600 sticky top-0 rounded-b-md">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <ul className="md:flex gap-x-6 text-white">
            <li>
              <Link href="/">
                <p>Shop</p>
              </Link>
            </li>
          </ul>
          <ul className="md:flex gap-x-6 text-white items-center">
            {isLoggedIn && accInfo.info ? (
              <>
                <li className="flex items-center">
                  <Link href="/">
                    <p className="text-white hidden custom-md:block">
                      {JSON.stringify(accInfo.info) || "User"}
                    </p>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-white font-bold py-2 rounded"
                    onClick={toggleModal}
                  >
                    Add item
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-white font-bold py-2 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">
                  <p>Login</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Item</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={addItemForm.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={addItemForm.category}
                onChange={handleInputChange}
                onClick={handleSeachCategory}
                placeholder="Enter or select a category"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              {showSuggestions && (
                <ul className="absolute bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 w-full overflow-auto z-50">
                  {filteredCategories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() =>
                        handleCategorySelect(category.category_name)
                      }
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {category.category_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={addItemForm.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="cost"
              >
                Cost
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={addItemForm.cost}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="image"
              >
                Insert Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-gray-700"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-red-600"
                onClick={onCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
