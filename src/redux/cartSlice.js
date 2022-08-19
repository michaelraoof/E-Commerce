import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalcountProducts: 0,

opened:false,
    products: [
     
    ]
  },
  reducers: {
    changeimgindex: (state, action) => {
      state.products[action.payload.productindex].imgindex = action.payload.value;
 },
    emptyCart: (state, action) => {
      state.opened = false;
      state.products.splice(0, state.products.length);
      state.totalcountProducts = 0;
    }
    ,
    selectAttribute: (state, action) => {
      state.products[action.payload.indexproduct].attributes[action.payload.indexattribute].indexSelectedAttribute = action.payload.valueindexSelectedAttribute;
    }
    ,
    togglepopupCart: (state, action) => {
      state.opened = !state.opened;
    },
    plusCart: (state, action) => {
         state.totalcountProducts++;
         state.products[action.payload.index].count++;
    }
    ,
     minusCart: (state, action) => {
       if (state.products[action.payload.index].count !== 0) {
         state.totalcountProducts--;
         state.products[action.payload.index].count--;
       }
       if (state.products[action.payload.index].count === 0) {
         state.products.splice(action.payload.index, 1);
       }
    }
    ,
    addProductToCart: (state, action) => {
      var index = state.products.findIndex(product => product.id === action.payload.id);
 
      state.totalcountProducts++;

      if (index === -1) {//if index = -1 it means that it is the first time for the product to be added
        

  
        
        state.products.push({
          count: 1,
          name: action.payload.name,
          brand: action.payload.brand,
          id: action.payload.id,
          prices: action.payload.prices,
          attributes:action.payload.attributes,
          gallery: action.payload.gallery,
          imgindex:0,
        });

      } else { // if index = any num that means produc added before so we just need to ++ our state.products[index].count
        state.products[index].count++;

      }
             
     
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {changeimgindex, addProductToCart,togglepopupCart ,selectAttribute,plusCart,minusCart,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;