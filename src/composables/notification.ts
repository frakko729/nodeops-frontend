import { reactive, watch } from "vue";

export enum NotificationType {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface Notification {
  show: boolean;
  type: NotificationType | string;
  title: string;
  message: string;
  timeout: number;
}

const notification: Notification = reactive<Notification>({
  show: false,
  type: "",
  title: "",
  message: "",
  timeout: 5000,
});

const notificationType = NotificationType;

export const useNotification = () => {
  const showSuccess = (message: string) => {
    notification.type = notificationType.SUCCESS;
    notification.message = message;
    notification.title = "Success!";
    notification.show = true;
  };

  const showError = (
    message = "Something went wrong, please try again later"
  ) => {
    notification.type = notificationType.ERROR;
    notification.message = message;
    notification.title = "Oops!";
    notification.show = true;
  };

  const close = () => {
    notification.show = false;
  };

  watch(
    () => notification.show,
    (selection) => {
      if (selection) {
        setTimeout(() => (notification.show = false), notification.timeout);
      }
    }
  );

  return { notification, close, showError, showSuccess, notificationType };
};
