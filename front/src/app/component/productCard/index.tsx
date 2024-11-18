"use client";
import { postPurchase } from "@/app/controller/login";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    id: product.id,
    quantity: 1,
  });
  const [quantityTotal, setQuantityTotal] = useState(product.quantity);
  const makePurchase = async () => {
    const response = await postPurchase(purchaseForm);
    if (response.res_code == "0000") {
      setQuantityTotal(+quantityTotal - +purchaseForm.quantity);
    }
    return response;
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(product.item_picture, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageSrc("https://via.placeholder.com/150");
      }
    };

    fetchImage();
  }, [product.item_picture]);

  const openModal = async () => {
    setIsModalOpen(true);
  };
  const onCloseModal = async () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    makePurchase();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <div className="h-40 bg-gray-300 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.item_name}
            className="object-contain h-full w-full"
          />
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold">{product.item_name}</h3>
      <p className="text-emerald-600 mt-1 font-bold">{`฿ ${product.cost}`}</p>
      <p className="text-xs text-gray-500">ส่งฟรี</p>
      <button
        className="mt-2 w-full bg-emerald-800 text-white py-1 rounded-md"
        onClick={openModal}
      >
        สั่งซื้อ
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="h-40 bg-gray-300 flex items-center justify-center">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={product.item_name}
                  className="object-contain h-full w-full"
                />
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>
            <h3 className="mt-2 text-sm font-semibold">{product.item_name}</h3>
            <p className="text-emerald-600 mt-1 font-bold">
              {`฿ ${product.cost}`}
            </p>
            <p className="text-gray-500 mt-1 font-bold">
              {`สินค้าเหลือ ${quantityTotal} ชิ้น`}
            </p>
            <div className="mb-4">
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="สั่งซื้อ"
                min="1"
                defaultValue="1"
                max={product.quantity}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  setPurchaseForm({ ...purchaseForm, quantity: +input.value });
                  if (+input.value > product.quantity) {
                    input.value = product.quantity.toString();
                  } else if (+input.value < 0) {
                    input.value = "0";
                  }
                }}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
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

export default ProductCard;
