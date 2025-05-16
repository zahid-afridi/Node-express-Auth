import React from 'react';
import { IoCameraOutline, IoCloseOutline } from 'react-icons/io5';

export default function PickupModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          <IoCloseOutline  cursor={"pointer"}/>
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-3">What are you returning?</h2>

        {/* Item Description Input */}
        <input
          type="text"
          placeholder='Ex: "Black shirt, size small"'
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Upload Label */}
        <label className="block text-sm font-medium text-purple-600 mb-1">
          Photo of Item<span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Helps us identify your return quickly, and avoid any delays!
        </p>

        {/* Upload Box */}
        <div className="w-full border-2 border-dashed border-purple-400 rounded-xl flex flex-col items-center justify-center py-10 text-purple-600 cursor-pointer mb-6 hover:bg-purple-50 transition">
          <IoCameraOutline className="text-3xl mb-2" />
          <span className="font-medium">Upload Item Photo</span>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 mb-4 text-center">
          *Only add items that belong to this same return shipping label.
        </p>

        {/* Save Button */}
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition"
          onClick={onClose}
        >
          Save Order
        </button>
      </div>
    </div>
  );
}
