export const BaseUrl='http://localhost:5000/api/v1/';

/*
|--------------------------------------------------------------------------
| Userlogin related endpoint
|--------------------------------------------------------------------------
*/
export const LoginUrl=BaseUrl+'auth/login';
export const RegistrationUrl=BaseUrl+'auth/registration';

/*
|--------------------------------------------------------------------------
| Score related endpoint
|--------------------------------------------------------------------------
*/
export const postScoreUrl=BaseUrl+'score/create/';
export const getScoreUrl=BaseUrl+'score/';
export const getAllScoreUrl=BaseUrl+'score/get/all';
export const updateScoreUrl=BaseUrl+'score/update/';
export const deleteScoreUrl=BaseUrl+'score/delete/';