import { postRequest } from './axios';
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const UserAuthSession = (data) =>
  postRequest(`${API_URL}/user/auth`, data);

export const addFav = (data) => postRequest(`${API_URL}/casino/favorite`, data);
export const setUserDefaultCurrency = (data) =>
  postRequest(`${API_URL}/user/set-default`, data);

export const claimYourBonus = (data) =>
  postRequest(`${API_URL}/user/avail-bonus`, data);
export const DepositPayment = (data) =>
  postRequest(`${API_URL}/payment/create-payment`, data);
export const WithdrawPayment = (data) =>
  postRequest(`${API_URL}/payment/withdraw-amount`, data);

export const userSignUp = (data) =>
  postRequest(`${API_URL}/user/sign-up`, data);

export const userLogin = (data) => postRequest(`${API_URL}/user/login`, data);

export const forgotPassword = (data) =>
  postRequest(`${API_URL}/user/forget-password`, data);

export const verifyForgotPassword = (data) =>
  postRequest(`${API_URL}/user/verify-forget-password`, data);

export const awailFaucet = (payload) =>
  postRequest(`${API_URL}/faucet`, payload);

export const createTicket = (payload) =>
  postRequest(`${API_URL}/ticket`, payload);

export const createVerification = (payload) =>
  postRequest(`${API_URL}/verification/session`, payload);

export const createTicketMessage = (payload) =>
  postRequest(`${API_URL}/ticket/message`, payload);

export const joinChatGroup = (payload) =>
  postRequest(`${API_URL}/live-chat/join-chat-group`, payload);

//spin wheel
export const getSpinWheelResultData = (payload) =>
  postRequest(`${API_URL}/spin-wheel-configuration/generate-index`, payload);

export const createChatRain = (payload) =>
  postRequest(`${API_URL}/live-chat/emit-chat-rain`, payload);

export const claimChatRain = (payload) =>
  postRequest(`${API_URL}/live-chat/claim-chat-rain`, payload);

export const createTip = (payload) =>
  postRequest(`${API_URL}/live-chat/send-tip`, payload);

export const claimBonusDrop = (payload) =>
  postRequest(`${API_URL}/bonus/claim-bonus-drop`, payload);

export const createPayment = (payload) =>
  postRequest(`${API_URL}/payment/create-payment`, payload);