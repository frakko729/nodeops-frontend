import axios, { AxiosRequestConfig } from "axios";
import { computed, Ref, ref, watch } from "vue";
import { useNotification } from "./notification";
import { useUserStore } from "@/stores/userStore";

export const useApi = <T>(endpoint: string, token?: string) => {
  const { showError } = useNotification();
  const api = axios.create({
    responseType: "json",
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT as string,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data: Ref<T | undefined> = ref();

  const loading = ref(false);
  const error = ref();

  const post = (payload?: Record<string, any>) => {
    loading.value = true;
    error.value = undefined;

    return api
      .post<T>(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const patch = (payload?: Record<string, any>) => {
    loading.value = true;
    error.value = undefined;

    return api
      .patch<T>(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const put = (payload?: Record<string, any>) => {
    loading.value = true;
    error.value = undefined;

    return api
      .put<T>(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const get = (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loading.value = true;
    error.value = undefined;

    let queryString = "";

    if (query) {
      queryString =
        "?" +
        Object.entries(query)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
    }

    return api
      .get<T>(endpoint + queryString, config)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const del = () => {
    loading.value = true;
    error.value = undefined;

    return api
      .delete<T>(endpoint)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const errorMessage = computed(() => {
    console.log("?? compute", error.value);

    if (error.value) {
      return error.value.message;
    }
  });

  const errorDetails = computed(() => {
    if (error.value && error.value.response) {
      return error.value.response.data.message;
    }
  });

  const errorFields = computed(() => {
    if (error.value && Array.isArray(error.value.response.data.message)) {
      return (error.value.response.data.message as string[]).reduce(
        (acc: Record<string, any>, msg: string) => {
          let [field] = msg.split(" ");

          // TODO: Maximal...
          if (field == "maximal") field = "dateOfBirth";

          if (!acc[field]) {
            acc[field] = [];
          }

          acc[field].push(msg);

          return acc;
        },
        {}
      );
    }
  });

  const computedClasses = (key: string) => {
    if (errorFields.value?.hasOwnProperty(key)) {
      return ["border-red-600", "bg-red-200", "text-red-900"];
    }
    return ["border-grey-600", "bg-white", "text-gray-900"];
  };

  watch([error], () => {
    if (error.value?.response?.data?.message) {
      showError(error.value.response.data.message);
    }
    if (error.value?.response?.data?.error) {
      showError(error.value.response.data.error);
    }
  });

  return {
    loading,
    data,
    error,
    get,
    patch,
    put,
    post,
    del,
    errorMessage,
    errorDetails,
    errorFields,
    computedClasses,
  };
};
