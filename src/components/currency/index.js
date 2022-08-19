
import './currency.css';



import React from 'react';
import { connect } from "react-redux";
import { setcurrency } from "../../redux/currencySlice.js";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import arrow from "./downArrow.svg";
const Get_Currencies = gql`
 query{
  currencies{
    label
    symbol
  }
    
}
`;

class Currency extends React.Component {
  componentDidUpdate() {
//to set the initial value after closing the tap. we set currency inside local storage and then checking for it
    if (localStorage.getItem("currencyIndex") != null // to see if i decided the currency before then closed the tap
      && !this.props.data.loading && //to see if apollo finished from getting the data
      this.props.currencyIndexArray === 0) { // to set the 
 this.props.setcurrency({
          currencyIndexArray: localStorage.getItem("currencyIndex"),
          label: this.props.data.currencies[ localStorage.getItem("currencyIndex")].label,
        });
    }
    // in the first time ever. we set state to (USD)
    else if (localStorage.getItem("currencyIndex") === null//to check if i opened the app ever
      && !this.props.data.loading &&
      this.props.currencyIndexArray === 0)
    {
      this.props.setcurrency({
          currencyIndexArray: 0,
          label: this.props.data.currencies[0].label,
        });
      }
   
 }

  getCurrencies() {
      if (!this.props.data.loading) {
     
       
 return  <div className="dropdown">
   <button className="dropbtn">{this.props.data.currencies[this.props.currencyIndexArray].symbol} <img src={arrow} alt="" style={this.props.iscartopened ? {transform:" rotate(0deg)"}:{}}/>

    </button>
   <div className="dropdown-content" style={this.props.iscartopened ? {display:"none"}:{}}>
     {
       this.props.data.currencies.map((currency,index) => {
         return  <a key={index} href="#0" onClick={()=>this.props.setcurrency({currencyIndexArray:index,label:currency.label})}>{currency.symbol +" " + currency.label}</a>
       })
     }
     
            </div>
            </div>
     }
        else return <h1>Loading...</h1>
  }
  render() {
    return (

      <div>
  { this.getCurrencies()}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyIndexArray: state.currency.currencyIndexArray,
iscartopened:state.cart.opened,
      label: state.currency.label,
});

const mapDispatchToProps = { setcurrency };
const WithGraphql = graphql(Get_Currencies)(Currency);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);


