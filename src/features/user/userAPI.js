// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrder() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/order/own')
    const data = await response.json();
    resolve({data})
  }
    
  );
}

export function fetchLoggedInUser(){
  return new Promise(async(resolve)=>{
    const response = await fetch('/users/own')
    const data = await response.json();
    resolve({data})
  })
}

export function updateUser(update){
  return new Promise(async(resolve)=>{
    const response = await fetch ('/users/'+update.id,{
      method : "PATCH",
      body: JSON.stringify(update),
      headers : {
        "Content-Type" : "application/json"
      }
    });
    const data = await response.json()
    resolve({data})
  })
}