import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({

name : 'user',
initialState : {

userData : null,
otherUsers : null,
searchUser:null,
selectedUser : null,

onlineUsers: [],

},

reducers : {
    setUserData:(state,action)=>{
       state.userData = action.payload
    },
    setOtherUsers :(state,action)=> {
        state.otherUsers = action.payload

    },
    setSearchUser :(state,action)=>{
        state.searchUsers = action.payload
    },

    setSelectedUser :(state,action)=>{
        state.selectedUser = action.payload
    },
     
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

}


})



export default userSlice.reducer

export const {setUserData, setOtherUsers , 
setSelectedUser , setOnlineUsers, setSearchUser
} = userSlice.actions 


