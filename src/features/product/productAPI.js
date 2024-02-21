// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    resolve({data})
  }
    
  );
}

export function fetchProductsByFilter({filter,sort,pagination}) {
  //filter = {"category" : ["smartphone","laptop"]}
  //sort = {_sort:"price/-price"}
  //pagination = {_page:1,_limit=10}

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
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json();
    const products = data.data;
    const totalItems = data.items;
    // const totalItems = await response.headers.get('X-Total-Count')
    // console.log(`this is totalItem ${totalItems}`)
    resolve({data: {products:products, totalItems:totalItems}})
  }
    
  );
}
//============================================= for Categories=====

export function fetchCategories(){
  return new Promise(async(resolve)=>{
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json();
    resolve({data})
  })
}

//============================================= for Brands=====
export function fetchBrands(){
  return new Promise(async(resolve)=>{
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json();
    resolve({data})
  })
}

export function fetchProductById(id){
  return new Promise(async(resolve)=>{
    const response = await fetch('http://localhost:8080/products/'+id);
    const data = await response.json();
    resolve({data}) 
  })
}