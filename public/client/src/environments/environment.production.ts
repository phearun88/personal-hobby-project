export const environment = {
    CLIENT: "client",

    //URL ENDPOINT
    BASE_URL: "http://localhost:3000/api/foods",
    BASE_URL_USERS: "http://localhost:3000/api/users",

    FOODS_ENDPOINT: "/foods/",
    COUNTRY_ENDPOINT: "/country/",
    REGISTER_ENDPOINT: "/register",
    LOGIN_ENDPOINT: "/login",

    //PATH ROUTER
    PATH_GET_ALL_FOODS: "foods",
    PATH_GET_ONE_FOOD: "foods/:foodId",
    PATH_EDIT_ONE_FOOD: "editfood/:foodId",
    PATH_ADD_ONE_FOOD: "addfood",
    PATH_ADD_ONE_COUNTRY: "addcountry/:foodId",
    PATH_EDIT_ONE_COUNTRY: "foods/:foodId/country/:countryId",
    PATH_REGISTER: "register",
    PATH_SEARCH: "search",
    PATH_ERROR: "**",

    //NUMBER OF ITEM
    COUNT: "5",
    OFFSET: "0",
    NUMBER_SHOW_ITEMS: "5",

    //QUERY_PARAMS
    QUERY_PARAMS_OFFSET: "?offset=",
    QUERY_PARAMS_COUNT: "&count=",
    QUERY_PARAMS_SEARCH: "&keysearch=",

    //ITEMS ID
    FOOD_ID: "foodId",
    COUNTRY_ID: "countryId",

    //STYLE
    HIDDEN_ALERT_ID: "hiddenId",
    DISPLAY_BLOCK: "block",
    DISPLAY_NONE: "none",

    //MESSAGE
    MESSAGE_REGISTER_SUCCUESS: "Register successful!",
    MESSAGE_REGISTER_FAIL: "Register Unsuccessful!",

    MESSAGE_DELETE_SUCCUESS: "Delete successful!",
    MESSAGE_DELETE_FAIL: "Delete Unsuccessful!",

    MESSAGE_UPDATE_SUCCUESS: "Update successful!",
    MESSAGE_UPDATE_FAIL: "Update Unsuccessful!",

    MESSAGE_CONFIRM_PASSWOR: "Password and Repeat Password must be the same",

    MESSAGE_CONFIRM_DELETE: "Are you sure you want to delete ?",
    MESSAGE_CONFIRM_UPDATE: "Are you sure you want to update ?",
    MESSAGE_CONFIRM_SAVE: "Are you sure you want to save ?",

    //FORM
    ADD_COUNTRY_FORM: "addCountryForm",

    //TOKEN 
    TOKEN :"token",
    _TOKEN :"_token",
    AUTHORIZATION: "Authorization",
};
