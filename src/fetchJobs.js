import { useReducer, useEffect } from 'react';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
}

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: []}
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] }
    default:
      return state;
  }
}

export default function FetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true })
  let str = '&'
  const paramsToUrl = () => {
    params.map(param => {
      //console.log(`${param.name}=${param.value}`)
      return str += `${param.name}=${param.value}&`;
    })
  }
  paramsToUrl()
  useEffect(() => {
    console.log(`${BASE_URL}?page=${page}${str}`)
    dispatch({ type: ACTIONS.MAKE_REQUEST })
    fetch(`${BASE_URL}?page=${page}${str}`).then(respone => respone.json()).then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res }})
    }).catch(err => {
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
    });
    
  }, [params, page])

  return state;
}


