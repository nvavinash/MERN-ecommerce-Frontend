import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { set, useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selecteEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
 
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleAdd = (data) => {
    
    const newUser = {...user, addresses:[...user.addresses , data]};
    dispatch(updateUserAsync(newUser))
    setShowAddressForm(false)
  };

  return (
    <>
      <div>
        <div className="mx-auto mt-8 bg-white max-w-7xl py-4 px-4 sm:px-6 lg-px-8">
          <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
            {" "}
            Name : {user.name ? user.name : " Guest "}
          </h1>
          {/* <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
              {" "}
             Mobile No.
            </h3> */}
          <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
            {" "}
            Email Address : {user.email ? user.email : " dem0@gmail.com "}
          </h3>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                           {/* ============================ Add Nw Address =======*/}
          <div>
         
         {showAddressForm ? (
           <form
             className="bg-white mt-20 p-10"
             noValidate
             onSubmit={handleSubmit((data) => {
               handleAdd(data);
               reset();
             })}
           >
             <div className="space-y-12">
               <div className="border-b border-gray-900/10 mt-15 pb-12">
                 <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                   Personal Information
                 </h2>
                 <p className="mt-1 text-sm leading-6 text-gray-600">
                   Use a permanent address where you can receive mail.
                 </p>

                 <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                   <div className="sm:col-span-6">
                     <label
                       htmlFor="name"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Full name
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         {...register("name", {
                           required: "Name is required",
                         })}
                         id="name"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-4">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Email address
                     </label>
                     <div className="mt-2">
                       <input
                         id="email"
                         {...register("email", {
                           required: "Email is required",
                         })}
                         type="email"
                         autoComplete="email"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-2">
                     <label
                       htmlFor="tel"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Phone No.
                     </label>
                     <div className="mt-2">
                       <input
                         id="phone"
                         {...register("phone", {
                           required: "Phone no is required",
                         })}
                         type="tel"
                         maxLength={10}
                         className="inline w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-3">
                     <label
                       htmlFor="country"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Country
                     </label>
                     <div className="mt-2">
                       <select
                         id="country"
                         {...register("country", {
                           required: "Country is required",
                         })}
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                       >
                         <option>India</option>
                       </select>
                     </div>
                   </div>

                   <div className="col-span-full">
                     <label
                       htmlFor="street"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Street address
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         {...register("street", {
                           required: "Address is required",
                         })}
                         id="street-address"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-2 sm:col-start-1">
                     <label
                       htmlFor="city"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       City
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         {...register("city", {
                           required: "City is required",
                         })}
                         id="city"
                         autoComplete="address-level2"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-2">
                     <label
                       htmlFor="state"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       State
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         {...register("state", {
                           required: "state is required",
                         })}
                         id="region"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>

                   <div className="sm:col-span-2">
                     <label
                       htmlFor="pinCode"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Postal code
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         {...register("pinCode", {
                           required: "Postal Code is required",
                         })}
                         id="pinCode"
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                     </div>
                   </div>
                 </div>
                 <div className="mt-10 flex items-center justify-end gap-x-6">
                   <button
                     onClick={(e) => setShowAddressForm(false)}
                     type="submit"
                     className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                   >
                     Cancel
                   </button>
                   <button
                     type="submit"
                     className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                   >
                     Add New Address
                   </button>
                 </div>
               </div>
             </div>
           </form>
         ) : null}
       </div>
      
  {/* All user addresses will be display here form ============================ */}
            {user.addresses &&
              user.addresses.map((address, index) => (
                <div>
                     {/* ============================ Edit Old Address =======*/}
         <div>
                    {selecteEditIndex  === index ? (
                      <form
                        className="bg-white mt-20 p-10"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          console.log(data);
                          handleEdit(data, index);
                          reset();
                        })}
                      >
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 mt-15 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                              Personal Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Use a permanent address where you can receive
                              mail.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-6">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Full name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("name", {
                                      required: "Name is required",
                                    })}
                                    id="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="email"
                                    {...register("email", {
                                      required: "Email is required",
                                    })}
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="tel"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone No.
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="phone"
                                    {...register("phone", {
                                      required: "Phone no is required",
                                    })}
                                    type="tel"
                                    maxLength={10}
                                    className="inline w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Country
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="country"
                                    {...register("country", {
                                      required: "Country is required",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  >
                                    <option>India</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="street"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("street", {
                                      required: "Address is required",
                                    })}
                                    id="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("city", {
                                      required: "City is required",
                                    })}
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("state", {
                                      required: "state is required",
                                    })}
                                    id="region"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="pinCode"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("pinCode", {
                                      required: "Postal Code is required",
                                    })}
                                    id="pinCode"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-10 flex items-center justify-end gap-x-6">
                              <button
                                onClick={(e) => setSelectedEditIndex(-1)}
                                type="submit"
                                className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Save Address
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : null}
                  </div>
                <div
                    key={index}
                    className="flex gap-auto mt-3 py-5 border-y-2"
                  >
                    <div className="min-w-0 flex-auto gap-x-2 ">
                    
                      <p className="mt-1 font-semibold text-sm text-gray-500">
                        Address : {index + 1}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-gray-900">
                        {address.name.toUpperCase()}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                        {address.phone}
                      </p>
                    </div>
                    <div className=" gap-x-2">
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.city}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-evenly my-2">
                      <button
                      onClick={(e) =>{ handleEditForm(index); setSelectedEditIndex(index); setShowAddressForm(false)}}
                        type="button"
                        className="cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 mb-1 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="cursor-pointer items-center justify-center rounded-md border border-transparent bg-red-600 mt-1 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    
                  </div>
                </div>
              ))}
          </div>
          <button
            onClick={(e)=> {setShowAddressForm(true); setSelectedEditIndex(-1);reset();}}
              type="submit"
              className="rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>
        </div>
      </div>
    </>
  );
}
