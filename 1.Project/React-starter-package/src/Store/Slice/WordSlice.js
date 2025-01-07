import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    word : JSON.parse( localStorage.getItem("word")) || [],
}


const wordSlice = createSlice({
     name:"words",
     initialState,
     reducers:{
         addWord:(state,action)=>{
             state.word.push(action.payload)
             localStorage.setItem("word",JSON.stringify(state.word))
         },
         removeWord:(state,action)=>{
             state.word = state.word.filter((item)=>item.id !== action.payload)
             localStorage.setItem("word",JSON.stringify(state.word))
         },
         editWord:(state,action)=>{
             state.word = state.word.map((item)=>{
                 if(item.id === action.payload.id){
                     return action.payload
                 }
                 return item
             })
             localStorage.setItem("word",JSON.stringify(state.word))
         },
         deleteWord:(state,action)=>{
             state.word = state.word.filter((item)=>item.id !== action.payload)
             localStorage.setItem("word",JSON.stringify(state.word))
         },
         isLearnt:(state,action)=>{
            console.log(action.payload)
             state.word = state.word.map((item)=>{
                 if(item.id === action.payload){
                     return  {...item, isLearnt:!item.isLearnt}
                 }
                 return item
             })
             localStorage.setItem("word",JSON.stringify(state.word))
         }
     }   
  

})




export const {addWord,removeWord,editWord,deleteWord,isLearnt} = wordSlice.actions

export default wordSlice.reducer

