import React, { Component } from "react";
import axios from "axios";

import ProductItem from "./ProductItem";
import { connect } from "react-redux";

//import { getProducts} from '../actions/index'
import { getProducts} from '../actions/product'

class Pop extends Component {
  state = {
    products: [],
    productSearch: [],
    // productSearchPop: [],
    // productSearchRock: [],
    // productSearchCountry: [],
    // productSearchJazz: [],
  };

  componentDidMount() {
    this.getProductSearch();
    
  }

  getProductSearch = () => {
    axios.get('http://localhost:2020/getProduct').then(res => {
      
      this.setState({ products: res.data, productSearch: res.data });
    });
  };


  onBtnSearch = () => {
    const product_tittle = this.tittle.value;
    const product_artist = this.artist.value;
    const min = parseInt(this.min.value);
    const max = parseInt(this.max.value);

    console.log(product_tittle);
    console.log(product_artist);
    console.log(this.props.address);
    

    // SERCHING ALL PRODUCTS

    var arrSearch = this.state.products.filter(item => {
      //return item.price <= max;
      // isNaN(min) = kalau isi min nya selaian number = true
      if (isNaN(min) && isNaN(max) && product_artist === "" && product_tittle !== "") {
        // search hanya dengan tittle lalu artist, min dan max kosong
        return item.product_tittle.toLowerCase().includes(product_tittle.toLowerCase());
      } else if (isNaN(min) && isNaN(max) && product_tittle === "" && product_artist !== "" ) {
         // search hanya dengan artist lalu tittle, min dan max kosong
         return item.product_artist.toLowerCase().includes(product_artist.toLowerCase());
      } else if (isNaN(min)) {
        // jika minya kosong lalu tittle, artist dan max ada
        return (
          item.product_tittle.toLowerCase().includes(product_tittle.toLowerCase()) &&
          item.product_artist.toLowerCase().includes(product_artist.toLowerCase()) &&
          item.product_price <= max);
      } else if (isNaN(max)) {
        // jika max nya kosong lalu tittle, artist dan min ada
        return (
          item.product_tittle.toLowerCase().includes(product_tittle.toLowerCase()) &&
          item.product_artist.toLowerCase().includes(product_artist.toLowerCase()) &&
          item.product_price >= min);
      } 
      // else if ((max)&&(min)) {
      //   // jika max dan min nya tidak kosong
      //   return (
      //     item.product_tittle.toLowerCase().includes(product_tittle.toLowerCase()) &&
      //     item.product_artist.toLowerCase().includes(product_artist.toLowerCase()) &&
      //     item.product_price <= max &&
      //     item.product_price >= min);
      // } else {
      //   return(
      //     this.setState({ products: arrSearch })
      //   )
      // }
      else {
        // jika max dan min nya tidak kosong
        return (
          item.product_tittle.toLowerCase().includes(product_tittle.toLowerCase()) &&
          item.product_artist.toLowerCase().includes(product_artist.toLowerCase()) &&
          item.product_price <= max &&
          item.product_price >= min);
      }
    });

    //this.setState({ products: arrSearch });
    this.setState({ productSearch: arrSearch });
  };


  // BUTTON SEARCH GENRE
  onBtnSearchGenre = () => {
    const product_genre = this.genre.value;
    

    //console.log(product_genre);
    

    // SERCHING GENRE
    if (product_genre == "pop"){
      var arrSearchPop = this.state.products.filter(item => {
        
          return item.product_genre.toLowerCase().includes("pop".toLowerCase());
       
        
      });
  
      //this.setState({ products: arrSearch });
      this.setState({ productSearchPop: arrSearchPop, productSearch: arrSearchPop });
    } else if (product_genre == "rock") {
    var arrSearchPop = this.state.products.filter(item => {
     
        return item.product_genre.toLowerCase().includes("rock".toLowerCase());
      
      
    });

    //this.setState({ products: arrSearch });
    this.setState({ productSearchPop: arrSearchPop, productSearch: arrSearchPop })
  } else if (product_genre == "country") {
    var arrSearchPop = this.state.products.filter(item => {
      
        return item.product_genre.toLowerCase().includes("country".toLowerCase());
      
      
    });

    //this.setState({ products: arrSearch });
    this.setState({ productSearchPop: arrSearchPop, productSearch: arrSearchPop })
  } else if (product_genre == "jazz") {
    var arrSearchPop = this.state.products.filter(item => {
      
        return item.product_genre.toLowerCase().includes("jazz".toLowerCase());
     
      
    });

    //this.setState({ products: arrSearch });
    this.setState({ productSearchPop: arrSearchPop, productSearch: arrSearchPop })
  } else {
    return console.log("No Input");
    
  }
  
  }


  
  renderList = () => {
    return this.state.productSearch.map(iteem => {
      if (iteem.product_genre === "country") {

        return <ProductItem item={iteem} />; // iteem merupakan tampungan dari objek products yang berisi { id:..., name:..., dec:..., price:...}
      }
    
    });
  };

  
   




  render() {
    console.log(this.props.products);
    return (
      <div className="row my-5 ">
        <div className="col-2">
          {/* <h1 className="display-4">Search</h1> */}
          <div className="mt-1 row">
            <div className="mx-auto card">
              <div className="card-body">
                <div className="border-bottom border-secondary card-title">
                  <h1>Search</h1>
                </div>
                {/* <div className="card-title mt-1">
                  <h4>Genre</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => (this.genre = input)}
                    className="form-control"
                    // defaultValue="genre"
                    type="text"
                  />
                </form>
                <button
                  onClick={this.onBtnSearchGenre}
                  className="btn btn-outline-secondary btn-block mt-2 mb-5"
                >
                  Search Genre
                </button> */}
                <div className="card-title mt-1">
                  <h4>Tittle</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => (this.tittle = input)}
                    className="form-control"
                    // defaultValue="tittle"
                    type="text"
                  />
                </form>
                <div className="card-title mt-1">
                  <h4>Artist</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => (this.artist = input)}
                    className="form-control"
                    // defaultValue="artist"
                    type="text"
                  />
                </form>
                <div className="card-title mt-1">
                  <h4>Price</h4>
                </div>
                <form className="input-group">
                  <input
                    placeholder="Minimum"
                    ref={input => (this.min = input)}
                    className="form-control mb-2"
                    type="text"
                  />
                </form>
                <form className="input-group">
                  <input
                    placeholder="Maximum"
                    ref={input => (this.max = input)}
                    className="form-control"
                    type="text"
                  />
                </form>
                <button
                  onClick={this.onBtnSearch}
                  className="btn btn-outline-secondary btn-block mt-5"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row col-10 ">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
     products: state.auth.products, address: state.auth.address
  }
}

export default connect (mapStateToProps,{getProducts}) (Pop);

