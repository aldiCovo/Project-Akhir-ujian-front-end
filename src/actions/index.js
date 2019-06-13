import axios from "../config/axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onRegisterClick = (a, b, c, d, e) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/getusers/${d}`)
      console.log(res.data);
      
     if (res.data.length === 0){
      axios
      .post("/register", {
        username: a,
        first_name: b,
        last_name: c,
        email: d,
        password: e
        
      })
      .then(res => {
        console.log(res.data);

        dispatch({
          type: "AUTH_SUCCESS",
          payload: "Registrasi berhasil "
        });
        setTimeout(() => {
          dispatch({
            type: "SET_TIMEOUT"
          });
        }, 3000);
      });
     } else {
       return dispatch({
         type: 'AUTH_ERROR',
         payload: 'Email or username has been taken'
       })
     }
  
    } catch (e){
      console.log(e);
      
    }
      
   
  };
};


export const addAddress = (location_name, street, city, province, country, postal_code, phone) => {
  return async dispatch => {
    try {
      const user_id = cookie.get('idLogin')
     // const res = await axios.get(`/getAddress/${city}`)
     // console.log(res.data);
      
     //if (res.data.length === 0){
      axios
      .post(`/addAddress/${user_id}`, {
        location_name,
        street,
        city,
        province,
        country,
        postal_code,
        phone
        
      })
      .then(res => {
        console.log(res.data);

        dispatch({
          type: "ADD_USERADDRESS",
          //payload: "Registrasi berhasil "
        });
        setTimeout(() => {
          dispatch({
            type: "SET_TIMEOUT"
          });
        }, 3000);
      });
     //} 
     //else {
      //  return dispatch({
      //    type: 'AUTH_ERROR',
      //    payload: 'Email or username has been taken'
      //  })
     //}
  
    } catch (e){
      console.log(e);
      
    }
      
   
  };
};
// export const onRegisterClick = (a, b, c, d, e) => {
//   return dispatch => {
//     axios
//       .post("http://localhost:2020/register", {
//         username: a,
//         first_name: b,
//         last_name: c,
//         email: d,
//         password: e
        
//       })
//       .then(res => {
//         console.log(res.data);

//         dispatch({
//           type: "AUTH_SUCCESS",
//           payload: "Registrasi berhasil "
//         });
//         setTimeout(() => {
//           dispatch({
//             type: "SET_TIMEOUT"
//           });
//         }, 3000);
//       });
//   };
// };


export const onLoginClick = (email, password) => {
  return async dispatch => {
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res);

      if(!res.data.id){
        return dispatch({
          type: "AUTH_ERROR",
          payload: "Email and Password is incorrect"
       
        })
        
      }
      
      //cookie.set("masihLogin", res.data.name, { path: "/" });
      cookie.set("idLogin", res.data.id, { path: "/" });
      cookie.set("usernameLogin", res.data.username, { path: "/" });
      cookie.set("last_nameLogin", res.data.last_name, { path: "/" });
      cookie.set("first_nameLogin", res.data.first_name, { path: "/" });
      cookie.set("emailLogin", res.data.email, { path: "/" });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data._id,
          name: res.data.name,
          age: res.data.age,
          email: res.data.email
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onLogoutUser = () => {
  cookie.remove("masihLogin", { path: "/" });
  cookie.remove("idLogin", { path: "/" });
  cookie.remove("usernameLogin", { path: "/" });
  cookie.remove("last_nameLogin", { path: "/" });
  cookie.remove("first_nameLogin", {path:"/"});
  cookie.remove("emailLogin", { path: "/" });
  return {
    type: "AUTH_LOGOUT"
  };
};


// Edit data user
export const editUserData = (username, first_name, last_name, email, password, avatar) => {
  return async (dispatch) => {
    try {

      const formData = new FormData()

      formData.append('username', username)
      formData.append('first_name', first_name)
      formData.append('last_name', last_name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('avatar', avatar)

      const userId = cookie.get("idLogin")
      const res = await axios.patch(`/updateuser/${userId}/avatar`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      console.log(res);

      if(res.data[0].username){
        return dispatch ({
          type: "EDIT_USERDATA",
          payload: res
        })
      }
      
    } catch (e) {
      console.log(e);
      
    }
  }
}

// Edit data address
export const editUserAddress = (location_name, street, city, province, country, postal_code, phone) => {
  return async (dispatch) => {
    try {
      const userId = cookie.get("idLogin")
      const res = await axios.patch(`/updateaddress/${userId}`,{
        location_name,
        street,
        city,
        province,
        country,
        postal_code,
        phone
      })
      console.log(res);
      
        return dispatch ({
          type: "EDIT_USERADDRESS",
          payload: res
        })
      
      
    } catch (e) {
      console.log(e);
      
    }
  }
}




// export const onEdit = (name, age, /*email,*/ userId) => {
//   return async dispatch => {
//     try {
//       const res = await axios.patch(`/users/${userId}`, {
//         name,
//         age
//         //email
//       });
//       cookie.set("masihLogin", res.data.name, { path: "/" });
//       cookie.set("idLogin", res.data._id, { path: "/" });
//       //cookie.set("emailLogin", res.data.email, { path: "/" });
//       cookie.set("ageLogin", res.data.age, { path: "/" });
//       dispatch({
//         type: "EDIT_SUCCESS",
//         payload: {
//           id: res.data._id,
//           name: res.data.name,
//           // email: res.data.email,
//           age: res.data.age
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };

export const keepLogin = (name, id, age, email) => {
  if (name === undefined || id === undefined) {
    return {
      type: "KEEP_LOGIN",
      payload: {
        id: "",
        name: "",
        email: "",
        age: 0
      }
    };
  }

  return {
    type: "KEEP_LOGIN",
    payload: {
      id,
      name,
      email,
      age
    }
  };
};

// get userData(username, firstName, lastName, email, password) by username
export const getUser = () => {
  return async dispatch => {
    try {
      const userId = cookie.get("idLogin")
      const res = await axios.get (`/getusers/${userId}`)
      console.log(res.data);

      return dispatch ({
        type: "EDIT_USERDATA",
        payload: res
      })
      
    } catch (e) {
      console.log(e);
      
    }
  }
}

// get userAddress by userId
export const getUserAddress = () => {
  return async dispatch => {
    try {
      const userId = cookie.get("idLogin")
      const res = await axios.get (`/getuserAddress/${userId}`)
      console.log(res.data);

      return dispatch ({
        type: "EDIT_USERADDRESS",
        payload: res
      })
      
    } catch (e) {
      console.log(e);
      
    }
  }
}


// get userData (username and email) => sebagai proteksi di register
export const getAuthUser = () => {
  return async () => {
    try {
      const email = cookie.get('email')
      const username = cookie.get("KEEP_LOGIN")
      const res = await axios.get(`/getuser/${email}/${username}`)
      console.log(res);
    } catch (e) {
      console.log(e);
      
    }
  }
}



// PRODUCT ROUTER


export const onUploadProduct = (
  //jumlahStock,
  product_artist,
  product_tittle,
  product_genre,
  product_desc,
  product_price,
  product_image
) => {
  
  return async dispatch => {
    try {

      const formData = new FormData()

      formData.append('product_artist', product_artist)
      formData.append('product_tittle', product_tittle)
      formData.append('product_genre', product_genre)
      formData.append('product_desc', product_desc)
      formData.append('product_price', product_price)
      formData.append('product_image', product_image)

      //const userId = cookie.get("idLogin")
      await axios.post("/postProd",formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      //console.log(res);

      // if(res.data[0].username){
        dispatch ({
          type: 'ADD_PROD_SUCCESS',
          payload: 'Product has been added succesfully'
         })
      // }
      
    } catch (e) {
      console.log(e);
      
    }
  }
};


// EDIT PRODUCT
export const onUpdateProduct = (
  id, 
  editArtist,
  editTittle,
  editGenre,
  editDesk,
  editHarga,
  editGambar
) => {
  return async (dispatch) => {
    try {

      const formData = new FormData()

      formData.append('product_artist', editArtist)
      formData.append('product_tittle', editTittle)
      formData.append('product_genre', editGenre)
      formData.append('product_desc', editDesk)
      formData.append('product_price', editHarga)
      formData.append('product_image', editGambar)
      

     
      const res = await axios.patch(`/updateProd/${id}/product_image`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      console.log(res);

      //if(res.data[0].username){
        return dispatch ({
          type: "EDIT_PRODUCT",
          payload: res
        })
      //}
      
    } catch (e) {
      console.log(e);
      
    }
  }


}
