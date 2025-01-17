import api from "../../../common/api";
import { replace } from "connected-react-router";
import { apiErrorToast } from "../../../common/api/apiErrorToast";
import { setLoading, ActionTypes } from "../list";
import { toast } from "react-toastify";

/* Actions */
function success(producttype) {
  return {
    type: ActionTypes.CREATE,
    producttype
  };
}

function handleError(dispatch, error) {
  apiErrorToast(error);
  
  return dispatch(setLoading(false));
}

export function create(producttype) {
  return function(dispatch) {
    dispatch(setLoading(true));
    return api
      .post(`/producttype/`, producttype)
      .then(response => {
        if (!response.data.success) {
          var error = {response: {data: {Message: response.data.message}}};

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("Congrats! El tipo de producto se creó con éxito");
        
        return dispatch(replace("/producttype"));
      })
      .catch(error => {
        return handleError(dispatch, error);
      });
  };
}
