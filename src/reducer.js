import { createSlice } from '@reduxjs/toolkit'

const reducerSlice = createSlice({
  name: 'user_interface',
  initialState: {
    cars: [{manufacturer: 'VW',model: 'Tiguan',price: 30000,color: 'white',url: 'tiguan.jpg'},
    {manufacturer: 'Subaru',model: 'Forester',price: 28000,color: 'blue',url: 'forester.jpg'},
    {manufacturer: 'Audi',model: 'A5',price: 45000,color: 'green',url: 'a5.jpg'}],
    isOpenCart: false,
    cart: [],
    total_sum: 0
  },
  reducers: {
    addToCart: (state, action) => {
      state.isOpenCart = true;
      if (state.cart.length == 0) {
        state.cart = state.cart.concat({id: action.payload,quantity: 1,discount: false});
        state.total_sum += state.cars[action.payload].price;
      } else {
        state.cart = state.cart.concat({id: action.payload,quantity: 1,discount: true});
        state.total_sum += state.cars[action.payload].price*0.95;
      }      
    },
    enlargeCarQuantity: (state, action) => {
      for (var i=0;i<state.cart.length;i++) {
        if (state.cart[i].id == action.payload) {
          state.cart[i].quantity += 1;
          if (state.cart[i].discount) {
            state.total_sum += state.cars[action.payload].price*0.95;
          } else {
            state.total_sum += state.cars[action.payload].price;
          }
        }
      }
    },
    decreaseCarQuantity: (state, action) => {
      for (var i=0;i<state.cart.length;i++) {
        if (state.cart[i].id == action.payload) {
          if (state.cart[i].quantity > 1) {
            state.cart[i].quantity -= 1;
            if (state.cart[i].discount) {
              state.total_sum -= state.cars[action.payload].price*0.95;
            } else {
              state.total_sum -= state.cars[action.payload].price;
            }
          }
        }
      }
    },
    removeCarFromCart: (state, action) => {
      for (var i=0;i<state.cart.length;i++) {
        if (state.cart[i].id == action.payload) {
          if (!state.cart[i].discount && state.cart.length>1) {
            state.cart[i+1].discount = false;
            state.total_sum -= state.cart[i+1].quantity*state.cars[state.cart[i+1].id].price*0.95;
            state.total_sum += state.cart[i+1].quantity*state.cars[state.cart[i+1].id].price;
          }
          if (state.cart[i].discount) {
            state.total_sum -= state.cars[action.payload].price*state.cart[i].quantity*0.95;
          } else {
            state.total_sum -= state.cars[action.payload].price*state.cart[i].quantity;
          }
          state.cart.splice(i,1);
        }
      }
      if (state.cart.length == 0) {
        state.isOpenCart = false;
      }
    },
  }
})

export const { addToCart, enlargeCarQuantity, decreaseCarQuantity, removeCarFromCart } = reducerSlice.actions

export default reducerSlice.reducer