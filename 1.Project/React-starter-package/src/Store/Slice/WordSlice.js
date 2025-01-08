import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    word : JSON.parse( localStorage.getItem("word")) || [
        { id: 1, word: "hello", translation: "hola", meaning: "A greeting or expression of goodwill", isLearnt: false },
        { id: 2, word: "cat", translation: "gato", meaning: "A small domesticated carnivorous mammal", isLearnt: false },
        { id: 3, word: "dog", translation: "perro", meaning: "A domesticated carnivorous mammal", isLearnt: false },
        { id: 4, word: "book", translation: "libro", meaning: "A set of written or printed pages", isLearnt: false },
        { id: 5, word: "house", translation: "casa", meaning: "A building for human habitation", isLearnt: false },
        { id: 6, word: "love", translation: "amor", meaning: "An intense feeling of deep affection", isLearnt: false },
        { id: 7, word: "friend", translation: "amigo", meaning: "A person whom one knows and with whom one has a bond of mutual affection", isLearnt: false },
        { id: 8, word: "school", translation: "escuela", meaning: "An institution for educating children", isLearnt: false },
        { id: 9, word: "car", translation: "coche", meaning: "A road vehicle, typically with four wheels, powered by an internal combustion engine", isLearnt: false },
        { id: 10, word: "apple", translation: "manzana", meaning: "A round fruit with red or green skin and a whitish interior", isLearnt: false },
        { id: 11, word: "sun", translation: "sol", meaning: "The star around which the earth orbits", isLearnt: false },
        { id: 12, word: "moon", translation: "luna", meaning: "The natural satellite of the earth", isLearnt: false },
        { id: 13, word: "water", translation: "agua", meaning: "A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain", isLearnt: false },
        { id: 14, word: "tree", translation: "árbol", meaning: "A woody perennial plant, typically having a single stem or trunk", isLearnt: false },
        { id: 15, word: "food", translation: "comida", meaning: "Any nutritious substance that people or animals eat or drink", isLearnt: false },
        { id: 16, word: "music", translation: "música", meaning: "Vocal or instrumental sounds combined to produce harmony", isLearnt: false },
        { id: 17, word: "bird", translation: "pájaro", meaning: "A warm-blooded egg-laying vertebrate with feathers", isLearnt: false },
        { id: 18, word: "mountain", translation: "montaña", meaning: "A large natural elevation of the earth's surface", isLearnt: false },
        { id: 19, word: "river", translation: "río", meaning: "A large natural stream of water flowing towards an ocean or lake", isLearnt: false },
        { id: 20, word: "city", translation: "ciudad", meaning: "A large town or a municipality", isLearnt: false },
        { id: 21, word: "computer", translation: "computadora", meaning: "An electronic device for storing and processing data", isLearnt: false },
        { id: 22, word: "phone", translation: "teléfono", meaning: "A device for transmitting speech or data", isLearnt: false },
        { id: 23, word: "table", translation: "mesa", meaning: "A flat surface, typically supported by legs", isLearnt: false },
        { id: 24, word: "chair", translation: "silla", meaning: "A separate seat for one person, typically with a back and four legs", isLearnt: false },
        { id: 25, word: "shoe", translation: "zapato", meaning: "A covering for the foot, typically made of leather or plastic", isLearnt: false },
        { id: 26, word: "shirt", translation: "camisa", meaning: "A cloth garment for the upper body", isLearnt: false },
        { id: 27, word: "pen", translation: "pluma", meaning: "An instrument for writing or drawing", isLearnt: false },
        { id: 28, word: "carrot", translation: "zanahoria", meaning: "A long orange root vegetable", isLearnt: false },
        { id: 29, word: "fish", translation: "pez", meaning: "A limbless cold-blooded vertebrate animal with gills and fins", isLearnt: false },
        { id: 30, word: "tree", translation: "árbol", meaning: "A large, woody plant with branches and leaves", isLearnt: false },
        { id: 31, word: "door", translation: "puerta", meaning: "A hinged, sliding, or revolving barrier for opening and closing an entrance", isLearnt: false },
        { id: 32, word: "window", translation: "ventana", meaning: "An opening in a wall or vehicle, typically with glass", isLearnt: false },
        { id: 33, word: "hat", translation: "sombrero", meaning: "A shaped covering for the head, often with a brim", isLearnt: false },
        { id: 34, word: "sunshine", translation: "luz solar", meaning: "The light and warmth received from the sun", isLearnt: false },
        { id: 35, word: "cloud", translation: "nube", meaning: "A visible mass of condensed water vapor", isLearnt: false },
        { id: 36, word: "friendship", translation: "amistad", meaning: "The emotional bond between friends", isLearnt: false },
        { id: 37, word: "holiday", translation: "vacaciones", meaning: "An extended period of leisure and rest", isLearnt: false },
        { id: 38, word: "tree", translation: "árbol", meaning: "A tall plant with a single woody stem", isLearnt: false },
        { id: 39, word: "language", translation: "idioma", meaning: "A system of communication used by a particular country or community", isLearnt: false },
        { id: 40, word: "country", translation: "país", meaning: "A nation with its own government and borders", isLearnt: false },
        { id: 41, word: "stadium", translation: "estadio", meaning: "A large structure for sporting events", isLearnt: false },
        { id: 42, word: "teacher", translation: "maestro", meaning: "A person who educates others", isLearnt: false },
        { id: 43, word: "student", translation: "estudiante", meaning: "A person who is learning at a school or university", isLearnt: false },
        { id: 44, word: "exam", translation: "examen", meaning: "A formal test of knowledge or ability", isLearnt: false },
        { id: 45, word: "exam", translation: "examen", meaning: "A formal assessment of a student’s knowledge or skills", isLearnt: false },
        { id: 46, word: "ticket", translation: "boleto", meaning: "A piece of paper or card that provides admission to an event", isLearnt: false },
        { id: 47, word: "market", translation: "mercado", meaning: "A place where goods are bought and sold", isLearnt: false },
        { id: 48, word: "computer", translation: "computadora", meaning: "An electronic machine for processing data", isLearnt: false },
        { id: 49, word: "phone", translation: "teléfono", meaning: "A device for transmitting sound over distances", isLearnt: false },
        { id: 50, word: "mountain", translation: "montaña", meaning: "A large natural elevation of the earth's surface", isLearnt: false },
      ],
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

