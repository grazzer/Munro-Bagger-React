import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Database from '../../Database'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const initialState = {
    climbData: [],
    assentList: []
  }

const baggedListSlice = createSlice({
    name: 'baggedList',
    initialState,
    reducers: {
        add: (state) => {
            
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListAsync.fulfilled, (state, action) => {
            // console.log("json " + JSON.stringify(action.payload[1]))
            // console.log("return " + typeof(action.payload))
            const climbs = [];
            let assentList = [];

            for (let climb in action.payload){
                climbs.push({
                    key: climb,
                    id: action.payload[climb].id, 
                    munro: action.payload[climb].munro, 
                    date: action.payload[climb].date, 
                    weather: action.payload[climb].weather, 
                    distance: action.payload[climb].distance, 
                    time: action.payload[climb].time, 
                    friends: action.payload[climb].friends
                })
            }
            assentList = climbs.map(getMunroNumbers);
            assentList = [...new Set(assentList)]
            assentList.sort((a, b) => a-b);

            function getMunroNumbers(mapItem) {
                return mapItem.munro;
            }

            state.climbData = climbs;
            state.assentList = assentList;
        })
    },
});

export const getListAsync = createAsyncThunk(
    "baggedList/getListAsync",
    async () => {
        data = Database.getAllClimbs()
        return await data.then(
            (climbsData) => {
                return climbsData;
            },
            (message) => {
                console.log("Error: " + message)
        })    
    }
)

export const { add } = baggedListSlice.actions;
export default baggedListSlice.reducer;