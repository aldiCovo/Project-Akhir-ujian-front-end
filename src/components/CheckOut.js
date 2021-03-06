import React from "react";
import axios from "axios";

import {connect} from "react-redux"
import cookies from "universal-cookie";
import {  Link, Redirect } from "react-router-dom";

import swal from '@sweetalert/with-react'

import {editUserData, getUser} from '../actions/user'
import {onUpdateProduct} from '../actions/product'
import { editUserAddress, addAddress, getUserAddress} from '../actions/address'

const cookie = new cookies();

class CheckOut extends React.Component {

  state={
    //bokir:"",
    //bayar:[],
    kur:"",
    okr:"",
    bnk:"",
    rek:"",
    totOkr:0,
    addressCart: []

  }

  componentDidMount(){
    //this.props.getUser()
    this.getAddres()
    this.setState({addressCart: this.props.alamat})
  }


getAddres = async () => {
  const userId = cookie.get("idLogin");
  console.log(userId);
  
  var res = await axios.get(`http://localhost:2020/getuserAddress/${userId}`)
    
      console.log(res.data);

     return this.setState({ addressCart: res.data }); 
}

  shiping = async () =>{

    const shipmentId = parseInt(this.pengiriman.value)
    
    if(shipmentId !== 0) {
      var res = await axios.get(`http://localhost:2020/getOngkir/shipmentId/${shipmentId}`)
    
      console.log(res.data[0]);
      console.log(res.data[0].ongkir);
  
     this.setState({ kur: res.data[0].kurir });
     this.setState({ okr: res.data[0].ongkir });
    } else {

      this.setState({ kur: this.pengiriman.value });
      this.setState({ okr: this.pengiriman.value });

    }

    this.totalOngkir()
    //this.newstock()

   
}

  transfer = async () =>{

    const shipmentId = parseInt(this.pembayaran.value)
    console.log(shipmentId);
    

    if(shipmentId !== 0) {
      var res = await axios.get(`http://localhost:2020/getPayment/paymentId/${shipmentId}`)
    
      console.log(res.data[0]);
      console.log(res.data[0].bank);
      console.log(res.data[0].no_rek);
  
     this.setState({ bnk: res.data[0].bank});
     this.setState({ rek: res.data[0].no_rek});
    } else {

      this.setState({ bnk: this.pembayaran.value });
      this.setState({ rek: this.pembayaran.value });

    }
   
}

  onMapCart = () => {
    return this.props.carts.map(item => {
      return (
        //<div>
        <tr key={item.id}>
          <td>{item.id}</td>
          {/* <td>{item.productId}</td> */}
          <td>{item.first_name}</td>
          {/* <td>{item.desc}</td> */}
          <td>Rp {item.product_price.toLocaleString()}</td>
          {/* <td><img className='list' src={item.src} alt={item.name}/></td> */}
          <td>{item.qty}</td>
          <td>{(item.product_stock - item.qty).toLocaleString()}</td>
          <td>Rp {(item.product_price * item.qty).toLocaleString()}</td>
        </tr>
        //</div>
      );
    });
  };

  onHargaTotal = () => {
   
    console.log(this.props.carts);
    console.log(this.props.carts[0].product_stock);
    let total = 0;
    for (let i = 0; i < this.props.carts.length; i++) {
      console.log(this.props.carts[i].qty);
      
      console.log(this.props.carts[i].product_price);
       total +=
      //   //total +
         parseInt(this.props.carts[i].qty) * parseInt(this.props.carts[i].product_price);
      console.log(total);
    }
    return total;
  };


totalOngkir = () => {
  var totalProd = this.onHargaTotal()
  var ongkir = this.state.okr
  let totOkr = totalProd + ongkir
  //this.setState({totOkr:totOkr})
  return totOkr
}

// newstock = () => {
//   var updateStock = this.onHargaTotal()
//   var ongkir = this.state.okr
//   let totOkr = totalProd + ongkir
//   //this.setState({totOkr:totOkr})
//   return newStk
// }

// post cart to database
order =()=>{
  console.log(this.props.carts);
  // var total di luar biar bisa dimasukin ke for loop yg kedua
  var total = 0
  //var update_stock = 0
  //var update_stock = parseInt(this.props.carts[0].produck_stock)
  var update_stock = parseInt(this.props.carts[0].produck_stock) - parseInt(this.props.carts[0].produck_stock)
  for(let i=0;i<this.props.carts.length;i++){
    
    total += parseInt(this.props.carts[i].qty) * parseInt(this.props.carts[i].product_price);
    //update_stock -= parseInt(this.props.carts[0].produck_stock) - parseInt(this.props.carts[i].qty)
    //update_stock -= parseInt(this.props.carts[i].qty)
  }

  for(let i=0;i<this.props.carts.length;i++){
    var sameOrder = new Date()
    var year = sameOrder.getFullYear()
    var month = sameOrder.getMonth()
    var date = sameOrder.getDate()
    var hours = sameOrder.getHours()
    var minutes = sameOrder.getMinutes()
    var seconds = sameOrder.getSeconds()
    var newSameOrder = `${year}${month}${date}${hours}${minutes}${seconds}`
  // post data to orders
    axios.post(`http://localhost:2020/postOrder/order`,{
      
      orders_id : newSameOrder,
      user_id: this.props.carts[i].user_id,
      product_id: this.props.carts[i].product_id,
      qty: this.props.carts[i].qty,
      total_price: total
    }).then(res=>{console.log(this.props.carts)})
     .then(res=>{console.log(update_stock)})
    //    .then(res=>{axios.patch(`http://localhost:2020/updateProd/${this.props.carts[i].product_id}/product_image`, {
    //   //   id: this.props.carts[i].product_id,
      
    //      produck_stock : update_stock
         
         
    //     })
    //    })
      
    // Delete carts
      // .then(resOrderItem=>{
      //   axios.delete(`http://localhost:2020/deleteCart/${this.props.carts[i].id}`)
      // .then(res=>{
      //   console.log(res);
      //   this.props.test()
      // })

     // })

      // update data stock in td_stocks by prod_id
      
      const product_stock = this.props.carts[i].product_stock
      console.log(product_stock);
      
      const stok_keluar = this.props.carts[i].qty
      console.log(stok_keluar);
      
      const stok_baru = parseInt(product_stock-stok_keluar) 
      console.log(stok_baru);

      const product_tittle = this.props.carts[i].product_tittle
      const product_artist = this.props.carts[i].product_artist
      const product_desc = this.props.carts[i].product_desc
      const product_genre = this.props.carts[i].product_genre
      const product_price = this.props.carts[i].product_price
      

      if(this.props.carts.length >0){
        let prodId = this.props.carts[i].product_id
        console.log(prodId);
        
        axios.patch(`http://localhost:2020/updateProd/${prodId}/product_image`,{

          product_stock: stok_baru,
          product_tittle,
          product_artist,
          product_desc,
          product_genre,
          product_price

        })
        .then(resOrderItem=>{
          axios.delete(`http://localhost:2020/deleteCart/${this.props.carts[i].id}`)
        })
        .then(res=>{
          console.log(res);
          this.props.test()
        })
      }    
  }

  

  // console.log('Second')

  
  
    let opc_id = newSameOrder
   
    let user_id = cookie.get("idLogin");
    
    let pemesan = `${this.props.newUser[0].first_name} ${this.props.newUser[0].last_name}`
    
    let shipment = this.state.okr
    
    //let totalAmount = this.state.totalCarts[0].total_price + this.state.shipCosts
    let grand_tot = this.totalOngkir()
    
    let address = `${this.state.addressCart[0].location_name} ${this.state.addressCart[0].street} ${this.state.addressCart[0].city} ${this.state.addressCart[0].province} ${this.state.addressCart[0].country}, ${this.state.addressCart[0].postal_code}`
    
    let kurir = this.state.kur
    
    let bank = this.state.bnk
    
    let no_rek = this.state.rek
    
    let payment_stat = "waiting for payment"
    
    let shipment_stat = "waiting for payment"
    let cart_value = this.onHargaTotal()
    let penerima = this.state.addressCart[0].penerima
    console.log(penerima);
    
    
  // post data to orders_per_cart
  axios.post('http://localhost:2020/postOrderPerCart',{
    user_id,
    pemesan,
    penerima,
    address,
    opc_id,
    cart_value,
    shipment,
    grand_tot,
    kurir,
    bank,
    no_rek,
    payment_stat,
    shipment_stat

  }) 
    .then(resOpc=>{
        console.log(resOpc)
        swal({
          title: "Successfully ordered!",
          text: "You have to transfer the payment and upload",
          icon: "success",
          button: "OK",
        })
        .then(()=>{
          window.location.href = `/`
        })
    })

}


  render() {
    if(this.state.addressCart.length !== 0 ){
     //if(this.state.addressCart.length !== 0  && this.state.okr !==0 && this.state.okr !=="" && this.state.rek !==0 && this.state.rek !==""){
      var {city, street, country, postal_code, province, phone, location_name, penerima} = this.state.addressCart[0]
      console.log(this.state.addressCart[0].city);
   // }
  
    

    if(this.props.newUser.length !==0) {
      var {username, first_name, last_name, email, avatar} = this.props.newUser[0]
    }


    // if(this.props.newAddress.length !== this.state.profile) {
    //   var {location_name, street, city, province, country, postal_code, phone } = this.props.newAddress[0]
    // }
    
    return (
      <div className="text-center">
        <h1 className="display-4 text-center font-weight-bold">TOTAL</h1>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITTLE</th>
              <th scope="col">PRICE</th>
              <th scope="col">QTY</th>
              <th scope="col">SISA STOCK</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>{this.onMapCart()}</tbody>
          <thead>
            <tr>
            
              <th scope="col">Jenis Pengiriman</th>
              <th scope="col"><select className="form-control" ref={select=>{this.pengiriman = select}}>
                <option value="0" >Select</option>
                <option  value="1">JNE YES</option>
                <option  value="2">JNE Reguler</option>
                <option  value="3">Tiki ONS</option>
                <option  value="4">Tiki Reguler</option>
                <option  value="5">JNT Reguler</option>
                <option  value="6">JNT Reguler</option>
                </select></th>
              <th scope="col"> 
              <button
              className="btn btn-primary btn-sm m-center"
              onClick={() => {
                this.shiping();
              }}
            >
            Confrim
            </button>
              </th>
              <th scope="col">
              {console.log(this.state.kur)}
              {this.state.kur}
              
              </th>
              <th scope="col">
                {console.log(this.state.okr)}
                Rp {this.state.okr}
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">BANK</th>
              <th scope="col">NO REK</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">PEMBAYARAN</th>
              <th scope="col">
              <select className="form-control" ref={select=>{this.pembayaran = select}}>
                <option value="0" >Transfer Via</option>
                <option  value="1">BCA</option>
                <option  value="2">BNI</option>
                <option  value="3">BRI</option>
                <option  value="4">MANDIRI</option>
                
                </select>
              </th>

              <th scope="col"> 

              <button
              className="btn btn-primary btn-sm m-center"
              onClick={() => {
                this.transfer();
              }}
            >
            Confrim
            </button>

              </th>
              <th scope="col">
              {this.state.bnk}
              </th>
              <th scope="col">
                {this.state.rek}
              </th>
            </tr>
          </thead>
        </table>
        <div>
          <span className="font-weight-bold">TOTAL BAYAR :</span>
              <h4>
                
              Rp{" "}
         
              {this.totalOngkir()} {"  "} ( Total Prodak : Rp {this.onHargaTotal()} + Ongkir : Rp {this.state.okr})
              </h4>
        </div>
        <div>
          {/* <h4>
              DATA PENGIRIMAN :
          </h4> */}
        </div>

        {/* ------DETAIL DATA USER------ */}
        <div>
        <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-3 h2 text-center"> DATA PENGIRIMAN :</h2>
              {/* <h2 className="my-3 h2 text-center">{profile.first_name}'s Profile</h2> */}
              <div className="card container">
               
                <strong>
                  <label>Pemesan</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.firstname = input)}
                    className="form-control "
                    type="text"
                    // defaultValue={profile.first_name}
                  /> */}
                  {first_name} {last_name}
                </div>
                <strong>
                  <label>Penerima</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.lastname = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.last_name}
                  /> */}
                  {penerima}
                </div>

                <strong>
                  <label>Address</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.address = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.address}
                  /> */}
                  {/* <h6>{console.log(this.state.addressCart[0].street)}</h6>; */}
                 {location_name} {street} {city} {province} {country}
                </div>
                <strong>
                  <label>Pos Code</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.phone = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.telephone}
                  /> */}
                  {postal_code}
                </div>
                <strong>
                  <label>Phone</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.phone = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.telephone}
                  /> */}
                  {phone}
                </div>
                <strong>
                  <label>Email</label>
                </strong>
                {/* <input
                  ref={input => (this.email = input)}
                  className="form-control"
                  type="email"
                  // defaultValue={profile.email}
                /> */}
                {email}
              
                {/* <button
                  className="btn btn-primary mr-2"
                  // onClick={() => {
                  //   this.onSaveProfiles(profile.username);
                  // }}
                >
                  Add Address
                </button> */}
                <Link class="nav-link" to="/manageprofile">
                <button
                  className="btn btn-primary mr-2"
                  // onClick={() => {
                  //   this.onSaveProfiles(profile.username);
                  // }}
                >
                  Edit Data
                </button>
                </Link>
                <Link class="nav-link" to="/allproduct">
                <button
                  // onClick={() => {
                  //   this.setState({ selectedId: 0 });
                  // }}
                  onClick={() => {
                    this.order();
                  }}
                  className="btn btn-danger"
                >
                 Procces
                </button>
                </Link>
              </div>
              <div>
                <h2>*Jika belum memilih jenis shipment dan bank maka anda memilih JNE REGULER dan BANK BCA</h2>
              </div>
            </div>
          </main>

        </div>
      </div>
    );
    
  } 
  // else if(this.state.addressCart.length !== 0  && this.state.okr ===0  && this.state.rek ===0 ){
  //  return (
  //     <div>
  //       <h4>ISI DULU PILIHAN KURIR DAN BANK</h4>
  //     </div>

  // )
  // }
  // else if(this.state.addressCart.length !== 0   && this.state.okr ===""  && this.state.rek ===""){
  //  return (
  //     <div>
  //       <h4>ISI DULU PILIHAN KURIR DAN BANK</h4>
  //     </div>

  // )
  // }

  // Saat user belum isi address
  else{
   

    return (
      <div className="text-center">
        <h1 className="display-4 text-center font-weight-bold">TOTAL</h1>
        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITTLE</th>
              <th scope="col">PRICE</th>
              <th scope="col">QTY</th>
              <th scope="col">SISA STOCK</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>{this.onMapCart()}</tbody>
          <thead>
            <tr>
            
              <th scope="col">Jenis Pengiriman</th>
              <th scope="col"><select className="form-control" ref={select=>{this.pengiriman = select}}>
                <option value="0" >Select</option>
                <option  value="1">JNE YES</option>
                <option  value="2">JNE Reguler</option>
                <option  value="3">Tiki ONS</option>
                <option  value="4">Tiki Reguler</option>
                <option  value="5">JNT Reguler</option>
                <option  value="6">JNT Reguler</option>
                </select></th>
              <th scope="col"> 
              <button
              className="btn btn-primary btn-sm m-center"
              onClick={() => {
                this.shiping();
              }}
            >
            Confrim
            </button>
              </th>
              <th scope="col">
              {console.log(this.state.kur)}
              {this.state.kur}
              
              </th>
              <th scope="col">
                {console.log(this.state.okr)}
                Rp {this.state.okr}
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">BANK</th>
              <th scope="col">NO REK</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">PEMBAYARAN</th>
              <th scope="col">
              <select className="form-control" ref={select=>{this.pembayaran = select}}>
                <option value="0" >Transfer Via</option>
                <option  value="1">BCA</option>
                <option  value="2">BNI</option>
                <option  value="3">BRI</option>
                <option  value="4">MANDIRI</option>
                
                </select>
              </th>

              <th scope="col"> 

              <button
              className="btn btn-primary btn-sm m-center"
              onClick={() => {
                this.transfer();
              }}
            >
            Confrim
            </button>

              </th>
              <th scope="col">
              {this.state.bnk}
              </th>
              <th scope="col">
                {this.state.rek}
              </th>
            </tr>
          </thead>
        </table>
        <div>
          <span className="font-weight-bold">TOTAL BAYAR :</span>
              <h4>
                
              Rp{" "}
         
              {this.totalOngkir()} {"  "} ( Total Prodak : Rp {this.onHargaTotal()} + Ongkir : Rp {this.state.okr})
              </h4>
        </div>
        <div>
          {/* <h4>
              DATA PENGIRIMAN :
          </h4> */}
        </div>

        {/* ------DETAIL DATA USER------ */}
        <div>
        <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-3 h2 text-center"> DATA PENGIRIMAN :</h2>
              {/* <h2 className="my-3 h2 text-center">{profile.first_name}'s Profile</h2> */}
              <div className="card container">
               
                <strong>
                  <label>Pemesan</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.firstname = input)}
                    className="form-control "
                    type="text"
                    // defaultValue={profile.first_name}
                  /> */}
                  {first_name} {last_name}
                </div>
                <strong>
                  <label>Penerima</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.lastname = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.last_name}
                  /> */}
                  {penerima}
                </div>

                <strong>
                  <label>Address</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.address = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.address}
                  /> */}
                  {/* <h6>{console.log(this.state.addressCart[0].street)}</h6>; */}
                 {location_name} {street} {city} {province} {country}
                </div>
                <strong>
                  <label>Pos Code</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.phone = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.telephone}
                  /> */}
                  {postal_code}
                </div>
                <strong>
                  <label>Phone</label>
                </strong>
                <div>
                  {/* <input
                    ref={input => (this.phone = input)}
                    className="form-control"
                    type="text"
                    // defaultValue={profile.telephone}
                  /> */}
                  {phone}
                </div>
                <strong>
                  <label>Email</label>
                </strong>
                {/* <input
                  ref={input => (this.email = input)}
                  className="form-control"
                  type="email"
                  // defaultValue={profile.email}
                /> */}
                {email}
                <Link class="nav-link" to="/addaddress"> 
                <button
                  className="btn btn-primary mr-2"
                  // onClick={() => {
                  //   this.onSaveProfiles(profile.username);
                  // }}
                >
                  Add Address
                </button>
                </Link> 
                {/* <Link class="nav-link" to="/manageprofile"> */}
                {/* <button
                  className="btn btn-primary mr-2"
                  // onClick={() => {
                  //   this.onSaveProfiles(profile.username);
                  // }}
                >
                  Edit Data
                </button> */}
                {/* </Link> */}
                {/* <button
                  // onClick={() => {
                  //   this.setState({ selectedId: 0 });
                  // }}
                  onClick={() => {
                    this.order();
                  }}
                  className="btn btn-danger"
                >
                 Procces
                </button> */}
              </div>
            </div>
          </main>

        </div>
      </div>
    );


  }
  }
}





const mapStateToProps = state => {
  return { newUser: state.auth.users, newAddress: state.auth.address };
};



//export default CheckOut;

export default connect(
  mapStateToProps,
  {getUser, getUserAddress, addAddress, editUserData, editUserAddress, onUpdateProduct}
)(CheckOut);