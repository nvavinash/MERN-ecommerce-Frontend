// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products')
    const data = await response.json();
    resolve({data})
  }
    
  );
}

export function fetchProductsByFilter({filter,sort,pagination}) {
  //filter = {"category" : ["smartphone","laptop"]}
  //sort = {_sort:"price/-price"}
  //pagination = {_page:1,_per_page:10}
  //TODO: server will filter deleted product is case of not admin

  let queryString = '';
  for(let key in filter){
    const categoryValue = filter[key];
    if(categoryValue.length > 0){
      const lastCategoryValue = categoryValue[categoryValue.length-1];
    queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }

  for(let key in pagination){
    
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) =>{
    const response = await fetch('/products?'+ queryString)
    const data = await response.json();
    const products = data.data;
    const totalItems = data.items;
    // const totalItems = await response.headers.get('X-Total-Count')
    resolve({data: {products:products, totalItems:totalItems}});
  }
    
  );
}
//============================================= for Categories=====

export function fetchCategories(){
  return new Promise(async(resolve)=>{
    const response = await fetch('/categories')
    const data = await response.json();
    resolve({data})
  })
}

//============================================= for Brands=====
export function fetchBrands(){
  return new Promise(async(resolve)=>{
    const response = await fetch('/brands')
    const data = await response.json();
    resolve({data})
  })
}

export function fetchProductById({id}){
  return new Promise(async(resolve,reject)=>{
    try {
      const response = await fetch('/products/'+id);
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(new Error('Failed to fetch product data: ' + error.message));
    }
    
  })
}

export function createProduct(product){
  return new Promise(async(resolve)=>{
    const response = await fetch('/products/',{
      method : "POST",
      body: JSON.stringify(product),
      headers : {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    resolve({data}) 
  })
}

export function updateProduct(update){
  return new Promise(async(resolve)=>{
    const response = await fetch('/products/'+update.id,{
      method:"PATCH",
      body: JSON.stringify(update),
      headers:{
        "Content-Type":"application/json"
      },
    });
    const data = await response.json();
    resolve({data})
  })
}