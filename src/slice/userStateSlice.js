import { createSlice } from '@reduxjs/toolkit'

export const userState = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    pointsSystem:true,
    categorySystem:false,
    user_LoggedIn:{

      
    },
    rewardifyOptions:{

    }
  },
  reducers: {

    assignRewardifyState:(state,action) => {
      state.rewardifyOptions= action.payload;
     // console.log("rewardify state ",state.rewardifyOptions);
    },
  },
})

// Action creators are generated for each case reducer function
export const { assignRewardifyState} = userState.actions

export default userState.reducer