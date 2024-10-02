import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fetchMunrosAPI from '../../src/services/HillDataBaseAPI'

const initialState = {
    munroList: [],
    status : "null"
  }

  const munroListSlice = createSlice ({
    name: "munroList",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getMunroAsync.pending, (state) => {
            state.status = "pending"
        }),
        builder.addCase(getMunroAsync.fulfilled, (state, action) => {
            const munros = [];

            for (let climb in action.payload){
                munros.push({
                    key: climb,
                    A: action.payload[climb].A, 
                    Area: action.payload[climb].Area, 
                    B: action.payload[climb].B, 
                    BL: action.payload[climb].BL, 
                    Bg: action.payload[climb].Bg, 
                    Bin: action.payload[climb].Bin, 
                    C: action.payload[climb].C,
                    CT: action.payload[climb].CT,
                    Ca: action.payload[climb].Ca,
                    Classification: action.payload[climb].Classification,
                    Climbed: action.payload[climb].Climbed,
                    Cm: action.payload[climb].Cm,
                    CoA: action.payload[climb].CoA,
                    CoA_twin: action.payload[climb].CoA_twin,
                    CoH: action.payload[climb].CoH,
                    CoH_twin: action.payload[climb].CoH_twin,
                    CoL: action.payload[climb].CoL,
                    CoL_twin: action.payload[climb].CoL_twin,
                    CoU: action.payload[climb].CoU,
                    Col_grid_ref: action.payload[climb].Col_grid_ref,
                    Col_height: action.payload[climb].Col_height,
                    Comments: action.payload[climb].Comments,
                    Country: action.payload[climb].Country,
                    County: action.payload[climb].County,
                    County_Top: action.payload[climb].County_Top,
                    D: action.payload[climb].D,
                    DDew: action.payload[climb].DDew,
                    DT: action.payload[climb].DT,
                    Dew: action.payload[climb].Dew,
                    Dil: action.payload[climb].Dil,
                    Drop: action.payload[climb].Drop,
                    F: action.payload[climb].F,
                    Feature: action.payload[climb].Feature,
                    Feet: action.payload[climb].Feet,
                    Fel: action.payload[climb].Fel,
                    G: action.payload[climb].G,
                    GT: action.payload[climb].GT,
                    Geograph: action.payload[climb].Geograph,
                    Grid_ref: action.payload[climb].Grid_ref,
                    Grid_ref_10: action.payload[climb].Grid_ref_10,
                    GridrefXY: action.payload[climb].GridrefXY,
                    HF: action.payload[climb].HF,
                    Hew: action.payload[climb].Hew,
                    Hill_bagging: action.payload[climb].Hill_bagging,
                    Hu: action.payload[climb].Hu,
                    Hu_twin: action.payload[climb].Hu_twin,
                    Island: action.payload[climb].Island,
                    Latitude: action.payload[climb].Latitude,
                    Longitude: action.payload[climb].Longitude,
                    M: action.payload[climb].M,
                    MT: action.payload[climb].MT,
                    MVNumber: action.payload[climb].MVNumber,
                    Ma: action.payload[climb].Ma,
                    Ma_twin: action.payload[climb].Ma_twin,
                    Map_1_25k: action.payload[climb].Map_1_25k,
                    Map_1_50k: action.payload[climb].Map_1_50k,
                    Metres: action.payload[climb].Metres,
                    Mur: action.payload[climb].Mur,
                    N: action.payload[climb].N,
                    Name: action.payload[climb].Name,
                    Number: action.payload[climb].Number,
                    O: action.payload[climb].O,
                    Observations: action.payload[climb].Observations,
                    Parent_Ma: action.payload[climb].Parent_Ma,
                    Parent_SMC: action.payload[climb].Parent_SMC,
                    Parent_name_Ma: action.payload[climb].Parent_name_Ma,
                    Parent_name_SMC: action.payload[climb].Parent_name_SMC,
                    Region: action.payload[climb].Region,
                    Revision: action.payload[climb].Revision,
                    SIB: action.payload[climb].SIB,
                    Section: action.payload[climb].Section,
                    Sim: action.payload[climb].Sim,
                    // StreetmapMountainViews: action.payload[climb].Streetmap/MountainViews,
                    Survey: action.payload[climb].Survey,
                    Sy: action.payload[climb].Sy,
                    T100: action.payload[climb].T100,
                    Topo_Section: action.payload[climb].Topo_Section,
                    Tu: action.payload[climb].Tu,
                    Un: action.payload[climb].Un,
                    VL: action.payload[climb].VL,
                    W: action.payload[climb].W,
                    WO: action.payload[climb].WO,
                    Xcoord: action.payload[climb].Xcoord,
                    Ycoord: action.payload[climb].Ycoord,
                    _Section: action.payload[climb]._Section,
                    s4: action.payload[climb].s4,
                    s5: action.payload[climb].s5,
                    sHu: action.payload[climb].sHu,
                    sMa: action.payload[climb].sMa,
                    sSim: action.payload[climb].sSim,
                    xC: action.payload[climb].xC,
                    xDT: action.payload[climb].xDT,
                    xG: action.payload[climb].xG,
                    xMT: action.payload[climb].xMT,
                    xN: action.payload[climb].xN,
                })
            }

            state.munroList = munros;
            state.status = "fulfilled";

            // {"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "A": 0, "Area": null, "B": 0, "BL": 0, "Bg": 0, "Bin": 0, "C": 0, "CT": 0,
            //  "Ca": 0, "Classification": "Ma,M,Sim", "Climbed": null, "Cm": 0, "CoA": 0, "CoA_twin": 0, "CoH": 0, "CoH_twin": 0, "CoL": 0,
            //  "CoL_twin": 0, "CoU": 0, "CoU=": 0, "Col_grid_ref": "NN 5609 2772", "Col_height": 283.4, 
            //  "Comments": "col height measured with Leica RX1250", "Country": "S", "County": "Perth and Kinross", "County_Top": null, 
            //  "D": 0, "DDew": 0, "DT": 0, "Dew": 0, "Dil": 0, "Drop": 648, "F": 0, "Feature": "cairn/shelter", "Feet": 3054, "Fel": 0, 
            //  "G": 0, "GT": 0, "Geograph": "http://www.geograph.org.uk/gridref/NN7732430857", "Grid_ref": "NN773308", 
            //  "Grid_ref_10": "NN 77326 30850", "GridrefXY": "NN7732430857", "HF": 0, "Hew": 0, 
            //  "Hill_bagging": "http://www.hill-bagging.co.uk/mountaindetails.php?qu=S&rf=1", "Hu": 1, "Hu_twin": 0, "Island": null, 
            //  "Latitude": 56.453851, "Longitude": -3.992057, "M": 1, "MT": 0, "MVNumber": null, "Ma": 1, "Ma_twin": 0, 
            //  "Map_1_25k": "OL47W 368W 379W", "Map_1_50k": "51 52", "Metres": 931, "Mur": 1, "N": 0, "Name": "Ben Chonzie", "Number": 1, 
            //  "O": 0, "Observations": null, "Parent_Ma": 1, "Parent_SMC": null, "Parent_name_Ma": null, "Parent_name_SMC": null, 
            //  "Region": "01A: Loch Tay to Perth", "Revision": "11-Jul-21", "SIB": 0, "Section": "01A", "Sim": 1, 
            //  "Streetmap/MountainViews": "http://www.streetmap.co.uk/map?X=277324&Y=730857&SV=277324,730857&A=Y&Z=115", 
            //  "Survey": "Abney level", "Sy": 0, "T100": 0, "Topo_Section": "N04:Lochearnhead to Strath Tay", "Tu": 1, "Un": 0, "VL": 0, 
            //  "W": 0, "WO": 0, "Xcoord": 277324, "Y": 1, "Ycoord": 730857, "_Section": 1.1, "s4": 0, "s5": 0, "sHu": 0, "sMa": 0, 
            //  "sSim": 0, "xC": 0, "xDT": 0, "xG": 0, "xMT": 0, "xN": 0}
        }),
        builder.addCase(getMunroAsync.rejected, (state) => {
            state.status = "rejected"
        })
    },
});

export const getMunroAsync = createAsyncThunk(
    "munroList/getMunroAsync",
    async () => {
        return await fetchMunrosAPI().then(
            (data) => {
                return (data)
            },
            (message) => {
                console.log("Error: " + message)
            }
        )
    } 
)

export default munroListSlice.reducer;