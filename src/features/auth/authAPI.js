// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        resolve({ data });
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      reject( error );
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}

export function checkAuth(){
  return new Promise(async (resolve,reject) => {
    try {
    const response = await fetch('/auth/check');
    if(response.ok){
      const data = await response.json();
      resolve({data});
    }else{
      const error = await response.text();
      reject(error);
    }
    } catch (error) {
      reject(error);
    }

  });
}
