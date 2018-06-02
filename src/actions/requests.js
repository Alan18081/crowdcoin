import {
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS,
  CREATE_REQUEST,
  CREATE_REQUEST_START,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILED,
  APPROVE_REQUEST,
  APPROVE_REQUEST_FAILED,
  FINALIZE_REQUEST,
  FINALIZE_REQUEST_FAILED
} from './types';

export const fetchRequests = (address) => ({
  type: FETCH_REQUESTS,
  payload: address
});

export const fetchRequestsSuccess = (requests,approversCount) => ({
  type: FETCH_REQUESTS_SUCCESS,
  payload: {
    requests,
    approversCount
  }
});

export const createRequest = (address,info,cb) => ({
  type: CREATE_REQUEST,
  payload: {
    address,
    info,
    cb
  }
});

export const createRequestStart = () => ({
  type: CREATE_REQUEST_START
});

export const createRequestSuccess = () => ({
  type: CREATE_REQUEST_SUCCESS
});

export const createRequestFailed = (error) => ({
  type: CREATE_REQUEST_FAILED,
  payload: error
});

export const approveRequest = (address,id,cb) => ({
  type: APPROVE_REQUEST,
  payload: {
    address,
    id,
    cb
  }
});

export const approveRequestFailed = (error) => ({
  type: APPROVE_REQUEST_FAILED,
  payload: error
});

export const finalizeRequest = (address,id) => ({
  type: FINALIZE_REQUEST,
  payload: {
    address,
    id
  }
});

export const finalizeRequestFailed = (error) => ({
  type: FINALIZE_REQUEST_FAILED,
  payload: error
});