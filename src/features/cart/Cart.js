import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import Modal from "../common/Modal";

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(null);
  const [open, setOpen] = useState(true);

  const totalAmount = items.reduce((amount, item) => {
    const price = item.discountPrice ? item.discountPrice : item.price;
    return price * item.quantity + amount;
  }, 0);

  const totalItems = items.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
    console.log("handleRemove", id);
  };

  useEffect(() => {
    // Do something when items array changes
  }, [items]);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg-px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {" "}
          Shopping Cart
        </h1>
        <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.thumbnail}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        {item.discountPrice && (
                          <p className="line-through text-gray-700">
                            Rs.{item.price}
                          </p>
                        )}
                        {item.discountPrice ? (
                          <p className="ml-2">Rs. {item.discountPrice}</p>
                        ) : (
                          <p className="ml-2 strike-through">Rs.{item.price}</p>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.brand}
                        {item.id}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 mx-50">
                        <label
                          htmlFor="password"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Quantity
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Delete ${item.title}`}
                          message="Are You Sure..?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e)=>handleRemove(e,item.id)}
                          cancelAction = {()=> setOpenModal(-1)}
                          showModal = {openModal === item.id}
                        ></Modal>
                        {item.id && (
                          <button
                            onClick={(e) =>{setOpenModal(item.id)} }
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>Rs. {totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkOutPage"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
