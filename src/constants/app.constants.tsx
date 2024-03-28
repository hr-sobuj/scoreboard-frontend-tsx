export const baseUrl='http://localhost:3300/api/v1/';

/*
|--------------------------------------------------------------------------
| User-login related endpoint
|--------------------------------------------------------------------------
*/
export const loginUrl=baseUrl+'auth/login';
export const registrationUrl=baseUrl+'auth/registration';
export const refreshTokenUrl=baseUrl+'auth/refresh-token';
export const avatarUrl=baseUrl+'auth/upload/avatar';

/*
|--------------------------------------------------------------------------
| Score related endpoint
|--------------------------------------------------------------------------
*/
export const postScoreUrl=baseUrl+'score/create/';
export const getScoreUrl=baseUrl+'score/';
export const getAllScoreUrl=baseUrl+'score/get/all';
export const updateScoreUrl=baseUrl+'score/update/';
export const deleteScoreUrl=baseUrl+'score/delete/';